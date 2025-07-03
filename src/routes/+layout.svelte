<script lang="ts">
	import Navbar from '$lib/navbar.svelte';
	import '../app.css';
	import type { Snippet } from 'svelte';

	let DEFAULT_BACKGROUND = 'mountain.jpg';
	let { children }: { children: Snippet } = $props();

	let selectedBackground = $state(null);
	let activeBackground = $derived(selectedBackground ?? DEFAULT_BACKGROUND);

</script>

<div class="app-container" style="--bg-image: url('/{activeBackground}')">
	
	<Navbar bind:selectedBackground />

	<main class="page-content">
		{@render children()}
	</main>
</div>
