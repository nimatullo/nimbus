import { averageReturns, PayFrequency } from '../config';
import { formatPercentage } from '../format';

export class BudgetCalculator {
	income = $state(0);
	billsPercentage = $state(40);
	savingsPercentage = $state(15);
	investmentsPercentage = $state(10);
	guiltFreeSpendingPercentage = $state(35);
	annualPaymentFrequency: PayFrequency = $state(PayFrequency.Weekly);
	futureTime = $state(10); // in years

	budget = $derived({
		bills: (this.income * this.billsPercentage) / 100,
		savings: (this.income * this.savingsPercentage) / 100,
		investments: (this.income * this.investmentsPercentage) / 100,
		guiltFreeSpending: (this.income * this.guiltFreeSpendingPercentage) / 100
	});

	totalPercentage = $derived.by(() => {
		const total =
			this.billsPercentage +
			this.savingsPercentage +
			this.investmentsPercentage +
			this.guiltFreeSpendingPercentage;

		return Math.round(total);
	});

	hasError = () => {
		if (this.totalPercentage < 100) {
			const fp = formatPercentage(100 - this.totalPercentage);
			return `Unallocated by ${fp}`;
		} else if (this.totalPercentage > 100) {
			const fp = formatPercentage(this.totalPercentage - 100);
			return `Overallocated by ${fp}`;
		}
		return false;
	};

	reset = () => {
		this.income = 0;
		this.billsPercentage = 40;
		this.savingsPercentage = 15;
		this.investmentsPercentage = 10;
		this.guiltFreeSpendingPercentage = 35;
	};

	get futureOutlook() {
		const calculateAnnualReturns = (
			monthlyInvestment: number,
			rate: number,
			years: number
		): number[] => {
			const monthlyRate = rate / 12;
			const res: number[] = [];
			let total = 0;
			for (let m = 1; m <= years * 12; m++) {
				total = (total + monthlyInvestment) * (1 + monthlyRate);
				if (m % 12 === 0) res.push(total);
			}
			return res;
		};

		const { investment, savings } = averageReturns;
		const { savings: perPaySavings, investments: perPayInvestments } = this.budget;

		const paidPerMonth = this.annualPaymentFrequency / 12;
		const monthlySavings = perPaySavings * paidPerMonth;
		const monthlyInvestments = perPayInvestments * paidPerMonth;

		return {
			labels: Array.from({ length: this.futureTime }, (_, i) => i + 1),
			datasets: [
				{
					label: 'Savings',
					data: calculateAnnualReturns(monthlySavings, savings, this.futureTime)
				},
				{
					label: 'Investments',
					data: calculateAnnualReturns(monthlyInvestments, investment, this.futureTime)
				}
			]
		};
	}
}
