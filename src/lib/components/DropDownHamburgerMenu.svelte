<script lang="ts">
	import Icon from './Icon.svelte'; // Import our new component

	// --- 1. DATA STRUCTURE (Unchanged, but now easier to read without SVG clutter) ---
	const menuItems = [
		{
			id: 'rename',
			label: 'Rename',
			icon: {
				path: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z M15 5l4 4'
			}
		},
		{
			id: 'addmember',
			label: 'Add Member',
			icon: { path: 'M2 21a8 8 0 0 1 13.292-6 M19 16v6 M22 19h-6', circle: { cx: 10, cy: 8, r: 5 } }
		},
		{ isSeparator: true },
		{
			id: 'settings',
			label: 'Settings',
			icon: {
				path: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
				circle: { cx: 12, cy: 12, r: 3 }
			}
		},
		{
			id: 'delete',
			label: 'Delete',
			icon: {
				path: 'M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2 M10 11v6 M14 11v6'
			},
			variant: 'danger'
		},
		{ isSeparator: true },
		{
			id: 'teamaccess',
			label: 'Team Access',
			icon: {
				path: 'M18 21a8 8 0 0 0-16 0 M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3',
				circle: { cx: 10, cy: 8, r: 5 }
			},
			variant: 'special'
		}
	];

	// --- 2. TRUE REACTIVE STATE ---
	// Manage the selected item with a reactive state variable.
	// This is more robust and flexible than a static `checked` attribute.
	let selectedId = $state(menuItems[0].id);
</script>

<!-- --- 3. THE SIMPLIFIED TEMPLATE --- -->
<div class="card">
	<ul class="list">
		{#each menuItems as item}
			{#if item.isSeparator}
				<li class="separator" aria-hidden="true"></li>
			{:else}
				<li
					class="element"
					class:danger={item.variant === 'danger'}
					class:special={item.variant === 'special'}
				>
					<label for={item.id}>
						<input
							type="radio"
							id={item.id}
							name="menu-option"
							value={item.id}
							bind:group={selectedId}
						/>
						<!-- Use our new, clean Icon component -->
						<Icon path={item.icon?.path} circle={item.icon?.circle} />
						{item.label}
					</label>
				</li>
			{/if}
		{/each}
	</ul>
</div>

<!-- --- 4. THE ENHANCED STYLES --- -->
<style>
	.card {
		/* --- Component Theme "Control Panel" --- */
		--background: linear-gradient(139deg, #242832 0%, #251c28 100%);
		--separator-color: #42434a;
		--transition-speed: 0.3s;

		/* Default variant colors */
		--active-bg: #5353ff;
		--active-text: #ffffff;
		--active-icon: #ffffff;
		--inactive-text: #7e8590;
		--inactive-icon: #7e8590;

		/* Danger variant overrides */
		--danger-bg: #8e2a2a;
		/* Special variant overrides */
		--special-bg: rgba(56, 45, 71, 0.836);
		--special-text: #bd89ff;
		--special-icon: #bd89ff;

		width: 200px;
		background-image: var(--background);
		user-select: none;
		border-radius: 10px;
		padding: 10px;
	}

	.list {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 0;
		margin: 0;
	}

	.element label {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
		color: var(--inactive-text); /* Use theme variable */
		transition: all var(--transition-speed) ease-out;
	}

	.element :global(svg) {
		/* Use :global to style child component */
		width: 19px;
		height: 19px;
		fill: none;
		stroke: var(--inactive-icon); /* Use theme variable */
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: all var(--transition-speed) ease-out;
	}

	.element input[type='radio'] {
		display: none;
	}

	/* --- THE ENHANCED VARIANT LOGIC --- */
	.element.danger {
		--active-bg: var(--danger-bg);
	}
	.element.special {
		--active-bg: var(--special-bg);
		--active-text: var(--special-text);
		--active-icon: var(--special-icon);
	}

	.element label:hover,
	.element label:has(input:checked) {
		background-color: var(--active-bg);
		color: var(--active-text);
	}

	.element label:hover :global(svg),
	.element label:has(input:checked) :global(svg) {
		stroke: var(--active-icon);
	}

	.element label:active {
		transform: scale(0.96);
	}
	.separator {
		height: 1.5px;
		background-color: var(--separator-color);
		margin: 4px 0;
	}
</style>
