<script lang="ts">
	import Navbar from '$lib/navbar.svelte';
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let backgroundOptions: { name: string; value: string }[] = [
		{ name: 'Calm Mountains', value: 'dark_mountain.jpg' },
		{ name: 'Vivid Mountains', value: 'mountain.jpg' }
	];

	let selectedBackground = $state(backgroundOptions[0].value);
</script>

<div class="app-container" style="--bg-image: url('/{selectedBackground}')">
	<Navbar />

	<header class="app-header">
		<label for="bg-select"> Background: </label>
		<select id="bg-select" bind:value={selectedBackground}>
			{#each backgroundOptions as background}
				<option value={background.value}>{background.name}</option>
			{/each}
		</select>
	</header>

	<main class="page-content">
		{@render children()}
	</main>
</div>
