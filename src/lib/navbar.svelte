<script lang="ts">
	let backgroundOptions: { name: string; value: string }[] = [
		{ name: 'Calm Mountains', value: 'dark_mountain.jpg' },
		{ name: 'Vivid Mountains', value: 'mountain.jpg' }
	];

	let { selectedBackground = $bindable() }: { selectedBackground?: string } = $props();
</script>

<nav>
  <a href="/" class="brand">
    🍅 Pomodoro
  </a>
  <ul>
    <li>
      <a href="/">Timer</a>
    </li>
    <li>
      <!-- We'll create this page next -->
      <a href="/about">About</a>
    </li>
  </ul>
  <div class="background-selector">
    <label for="bg-select"> Theme: </label>
    <select id="bg-select" bind:value={selectedBackground}>
      {#each backgroundOptions as background}
        <option value={background.value}>{background.name}</option>
      {/each}
    </select>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #444;
  }

  .brand {
    font-weight: bold;
    font-size: 1.2rem;
  }

  ul {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .background-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .background-selector label {
    color: white;
    font-size: 0.9rem;
  }

  .background-selector select {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #666;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
  }

  .background-selector select option {
    background-color: #333;
    color: white;
  }
</style>