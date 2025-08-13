<script lang="ts">
	import type { StudySession } from '$lib/types/session';
	import SortableHeader from './SortableHeader.svelte';

	export type SortableColumn = keyof StudySession;

	type FieldLabel = Record<
		keyof Omit<StudySession, 'id' | 'endTime' | 'segments' | 'startTime'>,
		string
	>;

	const studySessionsLabels: FieldLabel = {
		createdAt: 'Date',
		plannedDuration: 'Planned Duration',
		totalStudyTime: 'Total Study Time',
		totalPauseTime: 'Total Pause Time',
		totalPauses: 'Total Pauses',
		focusScore: 'Focus Score'
	};

	let {
		sortBy,
		sortOrder,
		sessions,
		onSessionSelect,
		handleSort
	}: {
		sortBy: SortableColumn;
		sortOrder: 'asc' | 'desc';
		sessions: StudySession[];
		onSessionSelect: (sessionId: number) => void;
		handleSort: (sortBy: SortableColumn, sortOrder: 'asc' | 'desc') => void;
	} = $props();

	function formatDuration(seconds: number): string {
		return new Date(seconds * 1000).toISOString().slice(14, 19);
	}
</script>

<div class="table-container" class:has-results={sessions}>
	<table>
		<thead>
			<tr>
				{#each Object.entries(studySessionsLabels) as [columnId, label]}
					<SortableHeader
						{columnId}
						{label}
						currentSortBy={sortBy}
						currentSortOrder={sortOrder}
						{handleSort}
					/>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if sessions.length === 0}
				<tr>
					<td colspan="6">No sessions found.</td>
				</tr>
			{/if}
			{#each sessions as session}
				<tr onclick={() => onSessionSelect(session.id)} title="Click to see details">
					<td>{new Date(session.createdAt).toLocaleDateString()}</td>
					<td>{formatDuration(session.plannedDuration)}</td>
					<td>{formatDuration(session.totalStudyTime)}</td>
					<td>{formatDuration(session.totalPauseTime)}</td>
					<td>{session.totalPauses}</td>
					<td>{session.focusScore}%</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		overflow-x: auto;
		border: 1px solid #444;
		border-radius: 8px;
		background-color: rgba(106, 106, 106, 0.3);
	}

	.table-container.has-results {
		display: block;
		min-height: 307px;
		overflow: auto;
		width: 100%;
		box-sizing: border-box;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}
	td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #444;
	}
	thead {
		background-color: rgba(255, 255, 255, 0.1);
	}
	tbody tr {
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	tbody tr:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}
	tbody tr:last-child td {
		border-bottom: none;
	}
</style>
