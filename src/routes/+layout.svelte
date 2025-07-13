<script lang="ts">
	import Navbar from '$lib/navbar.svelte';
	import type { Theme } from '$lib/types/database';
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { data, children }: { children: Snippet; data: { themes: Theme[] } } = $props();
	let DEFAULT_THEME =
		data.themes.find((theme) => theme.image_url === 'dark_mountain.jpg') ?? data.themes[0];
	let activeTheme = $derived(DEFAULT_THEME);
	let activeBackgroundImage = $derived(activeTheme?.image_url);
</script>

<div
	class="app-container"
	style="
		--bg-image: url('/{activeBackgroundImage}');
		--color-primary: {activeTheme.primary_color};
		--color-secondary: {activeTheme.secondary_color};
	"
>
	<Navbar bind:activeTheme themes={data.themes} />

	<main class="page-content">
		{@render children()}
	</main>
</div>