<script lang="ts">
	import { browser } from '$app/environment';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { toasts } from './services/toasts.svelte';
	import type { AuthUser, Theme } from './types/database';

	let {
		activeTheme = $bindable(),
		themes = [],
		user = null
	}: {
		activeTheme?: Theme | null;
		themes: Theme[];
		user: AuthUser | null;
	} = $props();
	let isPanelOpen = $state(false);
	let dropdownWrapper: HTMLDivElement;

	// This effect runs only in the browser and only when the panel is open.
	$effect(() => {
		if (!browser || !isPanelOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownWrapper && !dropdownWrapper.contains(event.target as Node)) {
				isPanelOpen = false;
			}
		};

		// We add the listener on the 'capture' phase (the `true` at the end).
		// This helps prevent conflicts with other click events.
		window.addEventListener('click', handleClickOutside, true);

		return () => {
			window.removeEventListener('click', handleClickOutside, true);
		};
	});
</script>

<nav>
	<!-- Main nav links -->
	<a href="/" class="brand"> 🧘🏽Focus Buddy </a>
	<ul>
		<li>
			<a href="/">Timer</a>
		</li>
		<li>
			<!-- We'll create this page next -->
			<a href="/insights">Insights</a>
		</li>
	</ul>

	<!-- THE CUSTOM DROPDOWN -->
	<div class="right-menu">
		<div class="background-selector" bind:this={dropdownWrapper}>
			<!-- 1. The Trigger Button -->
			<button
				class="dropdown-trigger"
				class:open={isPanelOpen}
				onclick={() => (isPanelOpen = !isPanelOpen)}
				aria-haspopup="true"
				aria-expanded={isPanelOpen}
			>
				<span>🎨 Theme</span>
				<!-- An inline SVG for the chevron icon. It's clean and can be styled with CSS. -->
				<svg
					class="chevron"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			<!-- 2. The Options Panel -->
			{#if isPanelOpen}
				<div class="dropdown-panel" transition:fade={{ duration: 150 }}>
					<ul class="theme-options-list">
						{#each themes as theme}
							<li>
								<button
									class="option-button"
									onclick={() => {
										activeTheme = theme;
										isPanelOpen = false;
									}}
								>
									<!-- The text and the indicator are now properly separated for styling -->
									<span class="option-text">{theme.name}</span>
									{#if activeTheme?.image_url === theme.image_url}
										<span class="active-indicator"></span>
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		{#if !user}
			{#if page.route.id === '/signup'}
				<a href="/login" class="auth-button">Login</a>
			{:else}
				<a href="/signup" class="auth-button">Sign up</a>
			{/if}
		{:else}
			<form action="/logout" method="POST" use:enhance={() => {

				return async({result}) => {
					if(result.type === 'redirect') {
						toasts.addToast({
							message: "You have been logged out successfully",
							type: "success",
							duration: 3000
						})
						await applyAction(result);
					}
				}
			}}>
				<button type="submit" class="auth-button">Logout</button>
			</form>
		{/if}
	</div>
</nav>

<style lang="postcss">
	/* === Main Nav Styles (Unchanged) === */
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid #444;
	}
	.brand {
		font-weight: bold;
		font-size: 1.2rem;
	}
	ul {
		display: flex;
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	a {
		color: white;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}

	.right-menu {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.auth-button {
		padding: 0.5rem 1rem;
		border-radius: 6px;
		background-color: #f43f5e;
		color: white;
		font-weight: 600;
		transition: background-color 0.2s;
	}

	.auth-button:hover {
		background-color: #be123c;
		text-decoration: none;
	}

	/* The main container for positioning */
	.background-selector {
		position: relative;
		font-family: inherit; /* Use the same font as the rest of the nav */
	}

	/* The button that the user clicks */
	.dropdown-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between; /* Pushes text left, icon right */
		width: 10.5rem; /* A fixed width for consistency */
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		border: 1px solid #555;
		background-color: rgba(255, 255, 255, 0.05);
		color: #e0e0e0;
		font-size: 0.9rem;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
	}

	.dropdown-trigger:hover {
		background-color: rgba(255, 255, 255, 0.1);
		border-color: #777;
	}

	/* The chevron icon inside the trigger */
	.dropdown-trigger .chevron {
		width: 1.25rem;
		height: 1.25rem;
		color: #aaa;
		transition: transform 0.2s ease;
	}

	/* Rotate the chevron when the dropdown is open */
	.dropdown-trigger.open .chevron {
		transform: rotate(180deg);
	}

	/* The panel that appears */
	.dropdown-panel {
		position: absolute;
		top: calc(100% + 4px); /* Position below the trigger with a small gap */
		right: 0;
		width: 100%; /* Take the full width of the parent container */
		z-index: 10;
		background-color: #2a2a2a;
		border: 1px solid #555;
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
		padding: 0.25rem; /* A little space around the list */
		overflow: hidden; /* Ensures border-radius is respected by children */
	}

	.theme-options-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.125rem; /* A small gap between options */
	}

	/* The individual option buttons */
	.option-button {
		display: flex;
		align-items: center;
		justify-content: space-between; /* Key for alignment */
		width: 100%;
		background: none;
		border: none;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		font-size: 0.9rem;
		color: #e0e0e0;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.2s ease;
	}

	.option-button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	/* The little dot indicator */
	.active-indicator {
		margin-left: 5px;
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: #f43f5e;
		/* A little shadow to make it pop */
		box-shadow: 0 0 8px #f43f5e;
	}
</style>
