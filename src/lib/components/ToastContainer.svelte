<script lang="ts">
	import { toasts } from '$lib/services/toasts.svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
</script>

<div class="toast-container" aria-live="polite">
	{#each $toasts as toast (toast.id)}
		<div
			class="toast"
			class:info={toast.type === 'info'}
			class:success={toast.type === 'success'}
            class:error={toast.type === 'error'}
            class:warning={toast.type === 'warning'}
			role="status"
			animate:flip={{ duration: 300 }}
			transition:slide={{ duration: 300 }}
		>
			<p>{toast.message}</p>
		</div>
	{/each}
</div>

<style>
	.toast-container {
        width: 10.5rem;
        font-size:0.8rem;
		position: fixed;
		top: 5rem;
		right: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		z-index: 9999;
	}

	.toast {
		padding: 0.5rem 1rem;
		border-radius: 8px;
		color: white;
		font-weight: 500;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		/* The will-change property is a performance hint for the browser */
		will-change: transform;
	}

	.toast.info {
		background-color: #3b82f6; /* Blue */
	}
	.toast.success {
		background-color: #22c55e; /* Green */
	}
	.toast.error {
		background-color: #ef4444; /* Red */
	}
	.toast.warning {
		background-color: #f59e0b; /* Orange */
	}
</style>
