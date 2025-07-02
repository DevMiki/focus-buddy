<script lang="ts">
	import Navbar from '$lib/navbar.svelte';
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let selectedBackground = $state('dark_mountain.jpg');
</script>

<div class="app-container" style="--bg-image: url('/{selectedBackground}')">
	
	<Navbar bind:selectedBackground />

	<main class="page-content">
		{@render children()}
	</main>
</div>
