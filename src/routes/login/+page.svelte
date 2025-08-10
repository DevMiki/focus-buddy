<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { toasts } from '$lib/services/toasts.svelte';

	let username: string = $state('');
	let password: string = $state('');
	let isSubmitting: boolean = $state(false);

	let redirectTo = $derived(page.url.searchParams.get('redirectTo') ?? '/');
</script>

<div class="auth-container">
	<div class="auth-card">
		<h1>Log in your Account</h1>
		<form
			action="?/login"
			method="POST"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					 toasts.addToast({ type: 'success', message: 'You have correctly logged in!', duration: 2500 });
					isSubmitting = false;
				};
			}}
		>
			<div class="form-group">
				<label for="username">Username</label>
				<input id="username" name="username" type="text" required bind:value={username} />
			</div>

			<div class="form-group">
				<label for="password"> Password </label>
				<input id="password" name="password" type="text" required bind:value={password} />
			</div>
			<div class="button-wrapper">
				<button type="submit" class="submit-btn" disabled={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Login'}
				</button>
			</div>
			<input type="hidden" name="redirectTo" value={redirectTo} />
		</form>
        <p class="auth-link">Don't you have an account? <a href="/signup">Sign up</a></p>
	</div>
</div>

<style>
	.auth-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80vh;
		padding: 2rem;
	}

	.auth-card {
		width: 100%;
		max-width: 400px;
		padding: 2rem;
		background: rgba(20, 20, 25, 0.7);
		border: 1px solid #444;
		border-radius: 12px;
		backdrop-filter: blur(10px);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 600;
		text-align: center;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
	}

	input {
		padding: 0.75rem;
		background: rgba(217, 251, 255, 0.3);
		border: 1px solid #555;
		border-radius: 6px;
		color: white;
		font-size: 1rem;
	}

	.submit-btn {
		padding: 0.75rem;
		margin-top: 0.75rem;
		background: var(--color-primary, #3b82f6);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.submit-btn:hover {
		filter: brightness(1.1);
	}
	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.button-wrapper {
		display: flex;
		justify-content: center;
	}
    .auth-link {
		text-align: center;
		color: #ccc;
	}
	.auth-link a {
		color: var(--color-primary, #3b82f6);
		text-decoration: none;
	}
</style>
