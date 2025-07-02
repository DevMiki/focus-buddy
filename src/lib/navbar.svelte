<!-- src/lib/components/Navbar.svelte -->

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
</style>