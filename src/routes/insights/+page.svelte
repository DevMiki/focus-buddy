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

<div class="insights-page max-w-7xl mx-auto px-4 py-8">
	<div class="insights-header mb-8 text-center">
		<h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Your Study Insights</h1>
		<p class="text-gray-300 max-w-2xl mx-auto">
			Review your past sessions to understand your focus patterns. Click a session to see details.
		</p>
	</div>

	<div class="mb-8">
		<FilterControls initialFilters={data.filters} onFilterChange={handleFilterChange} />
	</div>

	<div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
		<SessionTable
			sortBy={data.sortBy}
			sortOrder={data.sortOrder as 'asc' | 'desc'}
			sessions={data.sessions}
			onSessionSelect={handleSessionSelect}
			{handleSort}
		/>
	</div>
	
	<div class="mb-8">
		<PaginationControls
			pageNumber={data.pageNumber}
			pageSize={data.pageSize}
			totalStudySessionsCount={data.totalCount}
		/>
	</div>

	{#if selectedSession}
		<div class="detail-wrapper bg-gray-800 rounded-lg shadow-lg p-6">
			<h2 class="text-xl font-semibold text-white mb-4">
				Details for session on {new Date(selectedSession.createdAt).toLocaleDateString()}
			</h2>
			<SessionDetail session={selectedSession} />
		</div>
	{/if}
</div>

<style>
	.insights-page {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
