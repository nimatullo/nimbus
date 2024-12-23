<script lang="ts">
	import Range from './Slider.svelte';

	interface CategoryItemProps {
		title: string;
		description: string;
		value: number;
		percentage: number;
		externalLink?: string;
	}

	const formatValue = (value: number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
	};

	let {
		title,
		description,
		value = $bindable(),
		percentage = $bindable(),
		externalLink
	}: CategoryItemProps = $props();
</script>

<div
	class="grid grid-cols-1 items-center gap-4 py-4 text-slate-900 md:grid-cols-3 dark:text-slate-100"
>
	<div class="col-span-2">
		<h2 class="text-lg">
			{#if externalLink}
				<a href={externalLink} target="_blank" rel="noopener noreferrer" class="hover:underline">
					{title}
				</a>
			{:else}
				{title}
			{/if}
		</h2>
		<p>{description}</p>
		<p class={`font-semibold ${value > 0 ? '' : 'opacity-0'}`}>{formatValue(value)} / month</p>
	</div>
	<div class="flex items-center justify-end">
		<Range bind:value={percentage} />
		<p class="ml-2">{percentage}%</p>
	</div>
</div>
