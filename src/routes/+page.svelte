<script lang="ts">
	import BlobBackground from '../components/BlobBackground.svelte';
	import CategoryItem from '../components/CategoryItem.svelte';
	import FormattedInputField from '../components/FormattedInputField.svelte';
	import { formatMoney } from '../format';
	import { BudgetCalculator } from '../models/budget.svelte';

	const calculator = new BudgetCalculator();
	const error = $derived(calculator.hasError());
</script>

<BlobBackground />
<div class="my-5 flex w-dvw flex-col items-center justify-center md:my-0 md:h-dvh">
	<h2
		class="text-3xl font-black text-slate-900/30
		drop-shadow-md
	 dark:text-slate-100/30"
	>
		nimbus
	</h2>
	<div
		class="flex w-[90dvw] flex-col gap-4 rounded-2xl border-2 border-slate-200/80 bg-slate-100/80 p-10 shadow-lg md:w-[80dvw] dark:border-slate-600/80 dark:bg-slate-700/80"
	>
		<FormattedInputField
			formatter={(v) => formatMoney(+v)}
			parser={(value: string) => value.replace(/[^0-9.]/g, '')}
			label="Enter your income"
			placeholder="Income..."
			bind:value={calculator.income}
		/>

		<div class="divide-y divide-slate-500/80">
			<CategoryItem
				title="Bills"
				description="Fixed costs like paying your landlords only fans subscriptions, your only fans subscriptions, and groceries."
				income={calculator.income}
				bind:value={calculator.budget.bills}
				bind:percentage={calculator.billsPercentage}
			/>

			<CategoryItem
				title="Savings"
				description="3-6 months of expenses for a rainy day. Keep this in a high-yield savings account please."
				bind:value={calculator.budget.savings}
				bind:percentage={calculator.savingsPercentage}
				income={calculator.income}
				externalLink="https://nimatullo.notion.site/high-yield-savings-account-526b7be1675d44acb8cd658b8ee47046"
			/>

			<CategoryItem
				title="Investments"
				description="Long-term growth for retirement or other goals. We're talking 401(k), ROTH IRA, penny stocks, etc."
				bind:value={calculator.budget.investments}
				bind:percentage={calculator.investmentsPercentage}
				income={calculator.income}
				externalLink="https://nimatullo.notion.site/ira-13a4b82711408078978cd18db754957c"
			/>

			<CategoryItem
				title="Guilt-free spending"
				description="Fun money for eating out, shopping, or sports gambling."
				bind:value={calculator.budget.guiltFreeSpending}
				bind:percentage={calculator.guiltFreeSpendingPercentage}
				income={calculator.income}
			/>
		</div>

		<p class={`text-red-500 ${error ? '' : 'opacity-0'}`}>
			{error}
		</p>
	</div>
</div>
