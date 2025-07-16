<script lang="ts">
	import SessionTable from '$lib/components/SessionTable.svelte';

	let { data } = $props();
	let selectedSessionId: number | null = $state(null);

	let selectedSession = $derived(
		selectedSessionId
			? (data.sessions.find((session) => session.id === selectedSessionId) ?? null)
			: null
	);

	function handleSessionSelect(sessionId: number) {
		if (selectedSessionId === sessionId) {
			selectedSessionId = null;
		} else {
      selectedSessionId = sessionId;
    }
	}
</script>

<div class="insights-page">
	<div class="insights-header flex flex-col gap-4 text-center">
    <h1>Your Study Insights</h1>
	<p>
		Review your past sessions to understand your focus patterns. Click a session to see details.
	</p>
  </div>

	<div class="table-wrapper">
		<SessionTable sessions={data.sessions} onSessionSelect={handleSessionSelect} />
	</div>

	{#if selectedSession}
		<div class="detail-wrapper">
			<h2>Details for session on {new Date(selectedSession.createdAt).toLocaleDateString()}</h2>
		</div>
	{/if}
</div>

<style>
	.insights-page {
    margin: 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	h1 {
		font-size: 2.5rem;
		font-weight: bold;
	}
	p {
		color: #ccc;
	}
</style>