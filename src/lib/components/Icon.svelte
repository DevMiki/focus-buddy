<script lang="ts">
	// This component is a "dumb" presentation component. It just renders what it's told.
	let {
		path,
		circle
	}: {
		path?: string;
		circle?: { cx: number; cy: number; r: number };
	} = $props();
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	{#if path}
		<path d={path}></path>
	{/if}
	{#if circle}
		<circle cx={circle.cx} cy={circle.cy} r={circle.r}></circle>
	{/if}
</svg>