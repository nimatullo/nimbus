<script lang="ts">
	interface FancyButtonProps {
		label: string;
		onClick: () => void;
	}
	let { label, onClick }: FancyButtonProps = $props();
</script>

<div class="group relative inline-flex items-center justify-center gap-4">
	<div
		class="transitiona-all absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 opacity-60 blur-lg filter duration-1000 group-hover:opacity-100 group-hover:duration-200"
	></div>
	<button
		class="hover:-trangray-y-0.5 group relative rounded-xl px-8 py-3
      bg-gray-50
     text-base font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100/90 hover:shadow-lg dark:bg-gray-800 dark:text-gray-50 hover:dark:bg-gray-800/90"
		onclick={onClick}
		>{label}
	</button>
</div>
