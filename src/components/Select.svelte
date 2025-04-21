<script lang="ts">
	interface SelectProps {
		value: string | number;
		options: Array<{ label: string; value: string | number }>;
		label?: string;
		className?: string;
	}
	let { value = $bindable(), options, label, ...rest }: SelectProps = $props();
</script>

<div>
	{#if label}
		<label class="text-gray-900 dark:text-white" for="select">{label}</label>
	{/if}
	<select
		id="select"
		bind:value
		{...rest}
		class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
	>
		{#each options as { label, value }}
			<option {value}>{label}</option>
		{/each}
	</select>
</div>
