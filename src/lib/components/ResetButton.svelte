<script lang="ts">
	let { onReset } = $props<{ onReset: () => void }>();
</script>

<div class="scale-wrapper">
	<button class="btn-class-name" onclick={onReset}>
		<span class="back"></span>
		<span class="front">reset</span>
	</button>
</div>

<!-- src/lib/reset-button.svelte -->
<style>
	.scale-wrapper {
		transform: scale(0.75);
		transform-origin: center;
		display: inline-block;
	}

	.btn-class-name {
		top: -1px;
		/* These local variables are still a good idea for readability. */
		--primary: var(--color-primary, #549fca); /* Fallback color */
		--secondary: var(--color-secondary, #460c7c); /* Fallback color */
		
		width: 53px;
		height: 47px;
		border: none;
		outline: none; /* We will use box-shadow for the outline effect */
		cursor: pointer;
		user-select: none;
		touch-action: manipulation;
		border-radius: 100%;
		position: relative;
		transition: 0.3s;

		/* CORRECTED OUTLINE: Use box-shadow. It's more flexible and handles color/alpha perfectly. */
		/* This creates a shadow with 0 offset, 0 blur, and an 8px spread, effectively an outline. */
		box-shadow: 0 0 0 8px color-mix(in srgb, var(--primary) 50%, transparent);
	}

	.btn-class-name .back {
		/* This was already correct! */
		background: var(--secondary);
		border-radius: 100%;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.btn-class-name .front {
		/* CORRECTED GRADIENT: We mix the primary color with transparency to create the lighter shade. */
		background: linear-gradient(
			0deg,
			color-mix(in srgb, var(--primary) 60%, transparent) 20%,
			var(--primary) 50%
		);

		/* CORRECTED SHADOW: Same color-mix technique. */
		box-shadow: 0 0.5em 1em -0.2em color-mix(in srgb, var(--secondary) 50%, transparent);
		
		border-radius: 100%;
		position: absolute;
		/* This was correct */
		border: 1px solid var(--secondary);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
		font-family: inherit;
		transform: translateY(-15%);
		transition: 0.15s;
		/* This was correct */
		color: var(--secondary);
	}

	.btn-class-name:active .front {
		transform: translateY(0%);
		/* CORRECTED: Clear the front element's shadow on click, but keep the main button's outline shadow */
		box-shadow: none;
	}
</style>
