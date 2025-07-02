<script lang="ts">
	import '../app.css';

	let theme = 'dark_mountain';

	function toggleTheme() {
		theme = theme === 'dark_mountain' ? 'image' : 'dark_mountain';
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<button on:click={toggleTheme}>
	Toggle Theme
</button>

<slot />
