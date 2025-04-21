<script lang="ts">
	interface ModalProps {
		open: boolean;
	}

	let { open = $bindable() }: ModalProps = $props();

	function close() {
		open = false;
	}

	function onBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
		on:click={onBackdropClick}
		tabindex="-1"
		aria-modal="true"
		role="dialog"
	>
		<div class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
			<button
				class="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
				on:click={close}
				aria-label="Close modal"
			>
				&times;
			</button>
			<slot />
		</div>
	</div>
{/if}
