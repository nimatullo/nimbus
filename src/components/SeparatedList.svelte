<script lang="ts">
	interface SeparatedListProps {
		items: Array<{ label: string; value: string }>;
	}

	let { items }: SeparatedListProps = $props();
</script>

<ul class="list-none text-gray-600 dark:text-gray-50 [&:not(:last-child)]:mb-2">
	{#each items as item, i (item)}
		<li
			class="flex justify-between py-2 text-sm"
			class:border-b={i !== items.length - 1}
			class:border-gray-200={i !== items.length - 1}
		>
			<span class="font-bold">{item.label}</span>
			{item.value}
		</li>
	{/each}
</ul>
