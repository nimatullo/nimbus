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

	totalPercentage = $derived(
		this.billsPercentage +
			this.savingsPercentage +
			this.investmentsPercentage +
			this.guiltFreeSpendingPercentage
	);

	hasError = () => {
		if (this.totalPercentage < 100) {
			return `Unallocated by ${100 - this.totalPercentage}%`;
		} else if (this.totalPercentage > 100) {
			return `Overallocated by ${this.totalPercentage - 100}%`;
		}
		return false;
	};
}
