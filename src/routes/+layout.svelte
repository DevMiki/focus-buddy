<script lang="ts">
	import Navbar from '$lib/navbar.svelte';
	import type { Theme } from '$lib/types/database';
	import '../app.css';
	import type { Snippet } from 'svelte';

	let DEFAULT_BACKGROUND = 'mountain.jpg';
	let { data, children }: { children: Snippet, data: {themes: Theme[]} } = $props();
	let selectedBackground = $state(null);
	let activeBackground = $derived(selectedBackground ?? DEFAULT_BACKGROUND);
</script>

<div class="app-container" style="--bg-image: url('/{activeBackground}')">
	
	<Navbar bind:selectedBackground themes={data.themes} />

	<main class="page-content">
		{@render children()}
	</main>
</div>
