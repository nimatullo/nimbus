<script>
	let { calculator, className } = $props();

	const { bills, investments, savings, guiltFreeSpending } = $derived(calculator.budget);
	const isValid = $derived(calculator.totalPercentage === 100);

	const headers = ['Category', 'Amount'];
	const rows = $derived([
		['Bills', bills],
		['Investments', investments],
		['Savings', savings],
		['Guilt-free spending', guiltFreeSpending]
	]);

	export { calculator };
</script>

<div class={`relative overflow-x-auto sm:rounded-lg ${className}`}>
	<table
		class="w-full rounded-md text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
	>
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#each headers as header}
					<th
						scope="row"
						class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
						>{header}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as [category, amount]}
				<tr
					class="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
				>
					<td class="px-6 py-4">{category}</td>
					<td class="px-6 py-4">
						{#if isValid}
							{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
								+amount
							)}
						{:else}
							—
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
