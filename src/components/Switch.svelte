<script lang="ts">
	type numstring = string | number;
	interface SwitchProps {
		options: Array<{ label: numstring; value: numstring }>;
		selected: numstring;
		onChange: (value: numstring) => void;
	}

	let { options, selected = $bindable(), onChange }: SwitchProps = $props();
</script>

<div class="flex w-fit gap-px rounded-2xl bg-slate-100 dark:bg-slate-700">
	{#each options as option}
		<label
			class={`flex cursor-pointer items-center justify-center rounded-2xl px-4 py-1 transition-all duration-200 hover:bg-slate-700 hover:text-slate-50
				dark:text-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-100
			 ${
				selected === option.value ? 'bg-slate-700 text-slate-50 dark:bg-slate-300 dark:text-slate-800' : 'text-slate-800 dark:text-slate-100'
			}`}
			aria-checked={selected === option.value}
		>
			<input
				type="radio"
				name="switch"
				value={option.value}
				bind:group={selected}
				onchange={() => onChange(option.value)}
				class="hidden"
			/>
			{option.label}
		</label>
	{/each}
</div>
