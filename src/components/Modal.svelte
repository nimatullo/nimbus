<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ModalProps {
		open: boolean;
		children: Snippet;
	}

	let { open = $bindable(), children }: ModalProps = $props();

	let dialog: HTMLDialogElement | undefined = $state();

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

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
		onclick={onBackdropClick}
		tabindex="-1"
		aria-modal="true"
		role="dialog"
	>
		<div class="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
			<button
				class="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
				onclick={close}
				aria-label="Close modal"
			>
				&times;
			</button>
			{@render children()}
		</div>
	</div>
{/if}
