<script lang="ts">
	import type { BudgetCalculator } from '../models/budget.svelte';
	import Range from './Slider.svelte';

	let { calculator } = $props() as { calculator: BudgetCalculator };

	const ranges = [
		{ name: 'Bills', prop: 'billsPercentage' as keyof BudgetCalculator },
		{ name: 'Investments', prop: 'investmentsPercentage' as keyof BudgetCalculator },
		{ name: 'Savings', prop: 'savingsPercentage' as keyof BudgetCalculator },
		{ name: 'Guilt-free Spending', prop: 'guiltFreeSpendingPercentage' as keyof BudgetCalculator }
	];

	export { calculator };
</script>

<div
	class="rounded-md
		bg-gray-50
		p-4 text-gray-700
  dark:bg-gray-700 dark:text-gray-400"
>
	<div class="flex h-full flex-col justify-between">
		{#each ranges as range}
			<div class="max-w-screen-md">
				<label class="whitespace-nowrap font-medium text-gray-900 dark:text-white" for="range">
					{range.name}
				</label>
				<div class="flex items-center gap-4">
					<Range min={0} max={100} bind:value={calculator[range.prop]} />
					<h3>{calculator[range.prop]}%</h3>
				</div>
			</div>
		{/each}
	</div>

	{#if calculator.totalPercentage < 100}
		<p>Unallocated percentage: {100 - calculator.totalPercentage}%</p>
	{:else if calculator.totalPercentage > 100}
		<p>Overallocated percentage: {calculator.totalPercentage - 100}%</p>
	{/if}
</div>
