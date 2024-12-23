<script lang="ts">
	let {
		value = $bindable(),
		label,
		formatter = (value: string) => value,
		parser = (value: string) => value,
		className = '',
		...rest
	} = $props();

	let displayValue = $state(value ? formatter(String(value)) : '');

	function handleInput(e: Event) {
		const t = e.target as HTMLInputElement;
		const rawV = t.value;
		value = Number(rawV);
	}

	function handleFocus() {
		if (value === 0) {
			displayValue = '';
			return;
		}
		displayValue = parser(String(value));
	}

	function handleBlur() {
		displayValue = formatter(String(value));
	}
</script>

<div class={className}>
	<label class="text-gray-900 dark:text-white" for="input">{label}</label>
	<input
		class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
		placeholder={label}
		bind:value={displayValue}
		oninput={handleInput}
		onblur={handleBlur}
		onfocus={handleFocus}
		{...rest}
	/>
</div>
