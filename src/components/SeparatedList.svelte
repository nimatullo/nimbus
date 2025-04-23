<script lang="ts">
	interface SeparatedListProps {
		items: Array<{ label: string; value: string }>;
	}

	let { items }: SeparatedListProps = $props();
</script>

<ul class="list-none text-slate-800 dark:text-slate-50 [&:not(:last-child)]:mb-2">
	{#each items as item}
		<li class="flex justify-between border-b border-slate-200 py-2">
			<span class="font-bold">{item.label}</span>
			{item.value}
		</li>
	{/each}
</ul>
