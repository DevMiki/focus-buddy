<script lang="ts">
	import { goto } from '$app/navigation';
	import FilterControls from '$lib/components/FilterControls.svelte';
	import PaginationControls from '$lib/components/PaginationControls.svelte';
	import SessionDetail from '$lib/components/SessionDetail.svelte';
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

	function handleSort(sortBy: string, sortOrder: 'asc' | 'desc') {
		const url = new URL(data.url);
		url.searchParams.set('sortBy', sortBy);
		url.searchParams.set('sortOrder', sortOrder);
		url.searchParams.set('pageNumber', '1');
		goto(url, { keepFocus: true, noScroll: true });
	}

	function handleFilterChange(filters: Record<string, string | string[] | number>) {
		const url = new URL(data.url);
		for (const [key, value] of Object.entries(filters)) {
			if (value) {
				url.searchParams.set(key, String(value));
			} else {
				url.searchParams.delete(key);
			}
		}
		url.searchParams.set('pageNumber', '1');
		goto(url, { keepFocus: true, noScroll: true, invalidateAll: true });
	}
</script>

<div class="insights-page">
	<div class="insights-header flex flex-col gap-4 text-center">
		<h1>Your Study Insights</h1>
		<p>
			Review your past sessions to understand your focus patterns. Click a session to see details.
		</p>
	</div>

	<FilterControls initialFilters={data.filters} onFilterChange={handleFilterChange} />

	<div class="table-wrapper">
		<SessionTable
			sortBy={data.sortBy}
			sortOrder={data.sortOrder as 'asc' | 'desc'}
			sessions={data.sessions}
			onSessionSelect={handleSessionSelect}
			{handleSort}
		/>
	</div>
	<PaginationControls
		pageNumber={data.pageNumber}
		pageSize={data.pageSize}
		totalStudySessionsCount={data.totalCount}
	/>

	{#if selectedSession}
		<div class="detail-wrapper">
			<h2>Details for session on {new Date(selectedSession.createdAt).toLocaleDateString()}</h2>
			<SessionDetail session={selectedSession} />
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
	h2 {
		text-shadow:
			0 0 0.5px rgba(255, 255, 255, 0.331),
			0 0.5px 0.5px rgba(57, 57, 57, 0.7);
	}
	p {
		color: #eee;
	}
</style>
