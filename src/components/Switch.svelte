<script lang="ts">
	type numstring = string | number;
	interface SwitchProps {
		options: Array<{ label: numstring; value: numstring }>;
		selected: numstring;
		onChange: (value: numstring) => void;
		className?: string;
	}

	let { options, selected = $bindable(), onChange, className }: SwitchProps = $props();
</script>

<div class={`flex w-fit gap-px rounded-2xl bg-gray-100 dark:bg-gray-700 ${className}`}>
	{#each options as option}
		<label
			class={`min-w-[50px] cursor-pointer rounded-2xl px-2 py-1 transition-all duration-200 hover:bg-gray-700 hover:text-gray-50 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-100 ${
				selected === option.value
					? 'bg-gray-700 text-gray-50 shadow-md dark:bg-gray-300 dark:text-gray-800'
					: 'text-gray-800 dark:text-gray-100'
			}`}
			aria-checked={selected === option.value}
		>
			<input
				type="radio"
				name="switch"
				value={option.value}
				onchange={() => onChange(option.value)}
				class="hidden"
			/>
			{option.label}
		</label>
	{/each}
</div>
