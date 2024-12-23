<script lang="ts">
	let { value = $bindable(), min = 0, max = 100, ...rest } = $props();
	let rangePercentage = $derived(((value - min) / (max - min)) * 100);
</script>

<input
	bind:value
	{min}
	{max}
	{...rest}
	id="default-range"
	type="range"
	class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
	style="--range-percentage: {rangePercentage}%;"
/>

<style>
	input[type='range'] {
		background: linear-gradient(
			to right,
			#64748b 0%,
			#64748b var(--range-percentage),
			#222630 var(--range-percentage),
			#222630 100%
		);
	}
</style>
