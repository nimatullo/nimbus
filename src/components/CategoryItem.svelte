<script lang="ts">
	import { formatMoney, formatPercentage } from '../format';
	import FormattedInputField from './FormattedInputField.svelte';
	import Range from './Slider.svelte';

	interface CategoryItemProps {
		title: string;
		description: string;
		value: number;
		percentage: number;
		income: number;
		externalLink?: string;
	}

	let {
		title,
		description,
		value = $bindable(),
		percentage = $bindable(),
		income,
		externalLink
	}: CategoryItemProps = $props();

	let editMode = $state(false);
</script>

<div
	class="grid grid-cols-1 items-center gap-4 py-4 text-slate-900 md:grid-cols-3 dark:text-slate-100"
>
	<div class="col-span-3">
		<div class="mb-1 flex flex-col justify-between md:flex-row">
			<h2 class="text-lg">
				{#if externalLink}
					<a href={externalLink} target="_blank" rel="noopener noreferrer" class="hover:underline">
						{title}
					</a>
				{:else}
					{title}
				{/if}
			</h2>

			<div class={`flex gap-2 ${value > 0 ? '' : 'opacity-0'}`}>
				{#if editMode}
					<FormattedInputField
						bind:value
						formatter={(v) => formatMoney(+v)}
						parser={(value: string) => value.replace(/[^0-9.]/g, '')}
						onchange={(e) => {
							const t = e.target as HTMLInputElement;
							const v = Number(t.value);
							percentage = (v / income) * 100;
						}}
					/>
				{:else}
					<p class="font-semibold">{formatMoney(value)} / pay period</p>
				{/if}

				<button class={`${value == 0 && 'hidden'} text-sm`} onclick={() => (editMode = !editMode)}
					>[{editMode ? 'Save' : 'Edit'}]</button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<p class="col-span-2">{description}</p>

			<div class="flex items-center justify-end">
				<Range bind:value={percentage} />
				<p class="ml-2">{formatPercentage(percentage)}</p>
			</div>
		</div>
	</div>
</div>
