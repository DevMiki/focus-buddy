<script lang="ts">
	// This component receives all the unique information it needs as props.
	let {
		href,
		label,
		iconHtml
	}: {
		href: string;
		label:string;
		iconHtml: string;
	} = $props();
</script>

<!-- The 'group' class for the hover effect is on the root element. -->
<!-- Using an `<a>` tag is more semantic and accessible for navigation. -->
<a {href} class="group relative px-4 cursor-pointer">
	<div class="icon-wrapper">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<!-- {@html} is a Svelte feature to render raw HTML. It's perfect for our SVG paths. -->
			{@html iconHtml}
		</svg>
	</div>
	<span class="tooltip">
		{label}
	</span>
</a>

<style>
	/* --- Component Theme & Configuration --- */
	a {
		--icon-size: 2rem; /* h-10 w-10 -> 2.5rem if using 16px base, but let's use 2rem */
		--icon-color-hover: #3b82f6; /* text-blue-500 */
		--tooltip-transition: 300ms ease-in-out;
        --icon-color: #549fca;
	}

	.icon-wrapper {
        color: var(--icon-color);
		display: flex;
		height: var(--icon-size);
		width: var(--icon-size);
		align-items: center;
		justify-content: center;
		border-radius: 9999px; /* rounded-full */
		transition: color 0.2s;
	}
	
	a:hover .icon-wrapper {
		color: var(--icon-color-hover);
	}

	.icon-wrapper svg {
		/* Let the SVG inherit color and scale to a reasonable size */
		height: 1.5rem; /* 24px */
		width: 1.5rem;  /* 24px */
		stroke-width: 1.5;
		stroke: currentColor;
	}
	
	.tooltip {
		/* Using the exact Tailwind classes from your example */
		position: absolute;
		top: -2rem; /* -top-8 */
		left: 50%;
		transform: translateX(-50%) scale(0);
		transform-origin: bottom; /* Changed for a nicer pop-up effect */
		z-index: 20;
		border-radius: 0.5rem; /* rounded-lg */
		border: 1px solid #d1d5db; /* border-gray-300 */
		background-color: #ffffff; /* bg-white */
		padding: 0.5rem 0.75rem; /* px-3 py-2 */
		font-size: 0.875rem; /* text-sm */
		font-weight: 500; /* font-medium */
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* shadow-md */
		transition: transform var(--tooltip-transition);
		white-space: nowrap; /* Prevents text wrapping */
	}

	a.group:hover .tooltip {
		transform: translateX(-50%) scale(1);
	}
</style>