<script lang="ts">
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import type { AuthUser, Theme } from '$lib/types/database';
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';

	let {
		data,
		children
	}: {
		children: Snippet;
		data: { themes: Theme[]; user: AuthUser | null };
	} = $props();
	let DEFAULT_THEME =
		data.themes.find((theme) => theme.image_url === 'dark_mountain.jpg') ?? data.themes[0];
	let activeTheme = $derived(DEFAULT_THEME);
	let activeBackgroundImage = $derived(activeTheme?.image_url);
</script>

<ToastContainer />
<div
	class="app-container"
	style="
		--bg-image: url('/{activeBackgroundImage}');
		--color-primary: {activeTheme.primary_color};
		--color-secondary: {activeTheme.secondary_color};
	"
>
	<Navbar bind:activeTheme themes={data.themes} user={data.user} />

	<main class="page-content">
		{@render children()}
	</main>
</div>