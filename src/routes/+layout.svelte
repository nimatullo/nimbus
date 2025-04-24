<script lang="ts">
	import '../app.css';
	import BlobBackground from '../components/BlobBackground.svelte';

	let reduceMotion = $state(false);

	let { children } = $props();
</script>

<BlobBackground {reduceMotion} />
<div class="flex w-full justify-end p-2">
	<label class="text-sm text-slate-900/30 dark:text-slate-100/30" for="moveBlobs"
		>Reduce motion</label
	>
	<input
		id="moveBlobs"
		type="checkbox"
		bind:checked={reduceMotion}
		class="ml-2 cursor-pointer rounded-full border-2 border-slate-900/30 bg-slate-900/30 p-1 text-slate-900/30 dark:border-slate-100/30 dark:bg-slate-100/30"
	/>
</div>
<div class="relative my-5 flex w-dvw flex-col items-center justify-center md:my-0 md:h-dvh">
	<div class="flex">
		<h2
			class="text-3xl font-black text-slate-900/30
		drop-shadow-md
	 dark:text-slate-100/30"
		>
			nimbus
		</h2>
		<a class="text-3xl text-slate-900/30 dark:text-slate-100/30" href="/about">*</a>
	</div>
	{@render children()}
</div>
