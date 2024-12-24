import { formatPercentage } from '../format';

export class BudgetCalculator {
	income = $state(0);
	billsPercentage = $state(40);
	savingsPercentage = $state(15);
	investmentsPercentage = $state(10);
	guiltFreeSpendingPercentage = $state(35);

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
}
