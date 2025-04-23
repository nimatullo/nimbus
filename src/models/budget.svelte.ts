import { averageReturns, PayFrequency } from '../config';
import { formatPercentage } from '../format';

const savingsSeriesStyle = {
	backgroundColor: 'oklch(88.5% 0.062 18.334)',
	borderColor: 'oklch(80.8% 0.114 19.571)'
};

const investmentSeriesStyle = {
	backgroundColor: 'oklch(89.4% 0.057 293.283)',
	borderColor: 'oklch(81.1% 0.111 293.571)'
};

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

	calculateInvestment(monthlyContribution: number, years: number, annualInterestRate: number) {
		const annualContribution = monthlyContribution * 12;
		return (
			annualContribution * ((Math.pow(1 + annualInterestRate, years) - 1) / annualInterestRate)
		);
	}

	get futureOutlook() {
		const { investment, savings } = averageReturns;
		const { savings: perPaySavings, investments: perPayInvestments } = this.budget;

		const paidPerMonth = this.annualPaymentFrequency / 12;
		const mSaving = perPaySavings * paidPerMonth;
		const mInvestment = perPayInvestments * paidPerMonth;
		const yearsRange = Array.from({ length: this.futureTime }, (_, i) => i + 1);

		return {
			labels: yearsRange,
			datasets: [
				{
					label: 'Savings',
					data: yearsRange.map((_, i) => this.calculateInvestment(mSaving, i + 1, savings)),
					...savingsSeriesStyle
				},
				{
					label: 'Investments',
					data: yearsRange.map((_, i) => this.calculateInvestment(mInvestment, i + 1, investment)),
					...investmentSeriesStyle
				}
			]
		};
	}

	get futureOutlookMetadata() {
		const { savings: perPaySavings, investments: perPayInvestments } = this.budget;
		const monthlySavings = perPaySavings * (this.annualPaymentFrequency / 12);
		const monthlyInvestments = perPayInvestments * (this.annualPaymentFrequency / 12);

		const savingsTotal = this.futureOutlook.datasets[0].data[this.futureTime - 1];
		const investmentsTotal = this.futureOutlook.datasets[1].data[this.futureTime - 1];

		const savingsEarnings = savingsTotal - monthlySavings * this.futureTime * 12;
		const investmentsEarnings = investmentsTotal - monthlyInvestments * this.futureTime * 12;

		return {
			monthlyInvestments,
			monthlySavings,
			savingsEarnings,
			investmentsEarnings,
			savingsMoney: monthlySavings * this.futureTime * 12,
			investmentsMoney: monthlyInvestments * this.futureTime * 12
		};
	}
}
