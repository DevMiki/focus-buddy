<label class="hamburger">
	Menu
	<input class="inp" type="checkbox" />

	<svg viewBox="0 0 32 32">
		<path
			class="line line-top-bottom"
			d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
		></path>
		<path class="line" d="M7 16 27 16"></path>
	</svg>
	
	<section class="menu-container">
		{#each ['Food', 'Entertainment', 'Blog', 'Location'] as item, i}
			<div class="menu-list" style="--i: {i};">{item}</div>
		{/each}
	</section>
</label>

<style>
	/* --- Configuration Variables --- */
	/* Grouping configurable values at the top makes tweaking the design trivial. */
	.hamburger {
		/* Core styles */
		--background: #4a97c5;
		--text-color: white;
		--icon-color: white;

		/* SVG Animation Configuration */
		--svg-transition-duration: 600ms;
		--svg-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
		
		/* State for the top/bottom lines of the SVG */
		--path-burger: 12 63;
		--path-close: 20 300;
		--offset-burger: 0;
		--offset-close: -32.42;

		/* Menu Animation Configuration */
		--menu-stagger-delay: 0.1s;
		--menu-animation-duration: 0.4s;
	}

	/* --- Core Layout & Checkbox Hack --- */
	.hamburger {
		font-weight: 800;
		color: var(--text-color);
		background-color: var(--background);
		padding: 3px 15px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		height: 2.5rem;
		width: 12rem;
		position: relative;
		cursor: pointer;
		justify-content: space-between;
		-webkit-tap-highlight-color: transparent; /* Enhancement for mobile */
	}

	.hamburger > .inp {
		display: none;
	}

	/* --- Menu Dropdown Animation (Already well-optimized) --- */
	.menu-container {
		background-color: white;
		color: #45a0d4;
		border-radius: 10px;
		position: absolute;
		width: 100%;
		left: 0;
		top: 130%;
		clip-path: inset(0% 50% 100% 50% round 10px);
		transition: clip-path var(--menu-animation-duration) ease-in-out;
	}
	.inp:checked ~ .menu-container {
		clip-path: inset(0% 0% 0% 0% round 10px);
	}
	
	.menu-list {
		padding: 8px 10px;
		position: relative;
		transform: translateY(30px);
		opacity: 0;
		transition:
			transform var(--menu-animation-duration) calc(var(--i) * var(--menu-stagger-delay)),
			opacity var(--menu-animation-duration) calc(var(--i) * var(--menu-stagger-delay)),
			background-color 0.2s;
	}
	.inp:checked ~ .menu-container .menu-list {
		transform: translateY(0);
		opacity: 1;
	}

	/* --- Menu Item Styling --- */
	.menu-list:not(:last-child)::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 2.5%;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.15);
		width: 95%;
	}

	.menu-list:hover {
		background-color: rgb(223, 223, 223);
	}
	
	/* --- SVG Icon Animation --- */
	.hamburger svg {
		height: 3em;
		transition: transform var(--svg-transition-duration) var(--svg-transition-timing);
	}

	.line {
		fill: none;
		stroke: var(--icon-color);
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 3;
		transition:
			stroke-dasharray var(--svg-transition-duration) var(--svg-transition-timing),
			stroke-dashoffset var(--svg-transition-duration) var(--svg-transition-timing);
	}
	
	.line-top-bottom {
		/* THE ENHANCEMENT: Use variables for the default "burger" state */
		stroke-dasharray: var(--path-burger);
		stroke-dashoffset: var(--offset-burger);
	}
	
	/* --- SVG OPEN STATE: Triggered by :checked --- */
	.inp:checked + svg {
		transform: rotate(-45deg);
	}

	.inp:checked + svg .line-top-bottom {
		/* THE ENHANCEMENT: Simply switch to the "close" state variables */
		stroke-dasharray: var(--path-close);
		stroke-dashoffset: var(--offset-close);
	}
</style>