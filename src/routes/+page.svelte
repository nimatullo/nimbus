<script lang="ts">
	import CategoryItem from '../components/CategoryItem.svelte';
	import FancyButton from '../components/FancyButton.svelte';
	import FormattedInputField from '../components/FormattedInputField.svelte';
	import FutureOutlook from '../components/FutureOutlook.svelte';
	import Modal from '../components/Modal.svelte';
	import Select from '../components/Select.svelte';
	import SeparatedList from '../components/SeparatedList.svelte';
	import Switch from '../components/Switch.svelte';
	import { averageReturns, payFrequencyOptions } from '../config';
	import { formatMoney, formatPercentage } from '../format';
	import { BudgetCalculator } from '../models/budget.svelte';

	const calculator = new BudgetCalculator();
	const error = $derived(calculator.hasError());
	const metadata = $derived(calculator.futureOutlookMetadata);

	let showFutureOutlook = $state(false);
	const isDarkMode = $derived(() => {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	let config = $derived({
		type: 'line' as 'line',
		options: {
			maintainAspectRatio: false,
			plugins: {
				subtitle: {
					display: true,
					text: `Assuming investment growth of ${formatPercentage(averageReturns.investment * 100)} and HYSA growth of ${formatPercentage(averageReturns.savings * 100)}`,
					position: 'bottom' as 'bottom',
					color: isDarkMode() ? '#fff' : '#000',
					padding: { bottom: 10 },
					font: { family: 'Libre Baskerville', size: 14 }
				},
				tooltip: {
					callbacks: {
						label: (t: any) =>
							`In ${t.label} year(s), you will have ${formatMoney(t.raw as number)}`
					}
				}
			},
			interaction: {
				mode: 'index' as 'index',
				intersect: false
			},
			scales: {
				y: {
					ticks: { callback: (v: any) => formatMoney(v), color: isDarkMode() ? '#fff' : '#000' }
				},
				x: {
					title: { display: true, text: 'Years', color: isDarkMode() ? '#fff' : '#000' }
				}
			}
		},
		data: calculator.futureOutlook
	});
</script>

<div
	class="flex w-[90dvw] flex-col gap-4 rounded-2xl border-2 border-slate-200/80 bg-slate-100/80 p-10 shadow-lg md:w-[80dvw] dark:border-slate-600/80 dark:bg-slate-700/80"
>
	<div class="flex items-end gap-4">
		<FormattedInputField
			formatter={(v) => formatMoney(+v)}
			parser={(value: string) => value.replace(/[^0-9.]/g, '')}
			label="Enter your income"
			placeholder="Income..."
			bind:value={calculator.income}
			className="flex-grow w-full"
		/>

		<Select
			bind:value={calculator.annualPaymentFrequency}
			options={payFrequencyOptions}
			label="Pay frequency"
		/>
	</div>
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

	{#if calculator.income}
		<div class="flex flex-wrap gap-4">
			<FancyButton label="Show future outlook" onClick={() => (showFutureOutlook = true)} />

			<button
				class="rounded-lg bg-slate-900 px-8 py-3 font-semibold text-slate-100 shadow-md transition-all duration-200 hover:bg-slate-900 dark:bg-slate-100/30 dark:text-slate-900 dark:hover:bg-slate-100/50
					"
				onclick={calculator.reset}
			>
				Reset
			</button>
		</div>
	{/if}

	<p class={`text-red-500 ${error ? '' : 'opacity-0'}`}>
		{error}
	</p>
</div>

<Modal bind:open={showFutureOutlook}>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div class="col-span-1 md:col-span-2">
			<Switch
				className="mb-4"
				bind:selected={calculator.futureTime}
				onChange={(value) => (calculator.futureTime = value as number)}
				options={[
					{ label: '5 years', value: 5 },
					{ label: '10 years', value: 10 },
					{ label: '20 years', value: 20 },
					{ label: '40 years', value: 40 }
				]}
			/>
			<FutureOutlook {config} />
		</div>
		<div
			class="flex flex-col justify-around rounded-md bg-gray-100 p-2 dark:bg-gray-700 [&:not(:last-child)]:mb-4"
		>
			<div>
				<h3 class="text-gray-800 dark:text-gray-50">High Yield Savings</h3>
				<SeparatedList
					items={[
						{ label: 'Monthly amount', value: formatMoney(metadata.monthlySavings) },
						{ label: 'Your total money', value: formatMoney(metadata.savingsMoney) },
						{ label: 'Free money', value: formatMoney(metadata.savingsEarnings) }
					]}
				/>
			</div>

			<div>
				<h3 class="text-gray-800 dark:text-gray-50">Investments</h3>
				<SeparatedList
					items={[
						{ label: 'Monthly amount', value: formatMoney(metadata.monthlyInvestments) },
						{ label: 'Your total money', value: formatMoney(metadata.investmentsMoney) },
						{ label: 'Free money', value: formatMoney(metadata.investmentsEarnings) }
					]}
				/>
			</div>
		</div>
	</div>
</Modal>
