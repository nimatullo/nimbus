import { averageReturns } from '../config';
import { formatPercentage } from '../format';

export class BudgetCalculator {
	income = $state(0);
	billsPercentage = $state(40);
	savingsPercentage = $state(15);
	investmentsPercentage = $state(10);
	guiltFreeSpendingPercentage = $state(35);
	monthlyPayFrequency = $state(4);
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
		const { investment, savings } = averageReturns;
		const { savings: perPaySavings, investments: perPayInvestments } = this.budget;

		const yearlySavingsContribution = perPaySavings * this.monthlyPayFrequency * 12;
		const yearlyInvestmentsContribution = perPayInvestments * this.monthlyPayFrequency * 12;

		const savingsValues: number[] = [];
		const investmentsValues: number[] = [];

		let compoundSavings = 0;
		let compoundInvestments = 0;

		for (let year = 1; year <= this.futureTime; year++) {
			compoundSavings = compoundSavings * (1 + savings) + yearlySavingsContribution;
			compoundInvestments = compoundInvestments * (1 + investment) + yearlyInvestmentsContribution;
			savingsValues.push(compoundSavings);
			investmentsValues.push(compoundInvestments);
		}

		return {
			labels: Array.from({ length: this.futureTime }, (_, i) => i + 1),
			datasets: [
				{
					label: 'Savings',
					data: savingsValues
				},
				{
					label: 'Investments',
					data: investmentsValues
				}
			]
		};
	}
}
