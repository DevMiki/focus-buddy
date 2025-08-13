<script lang="ts">
	import type { SortableColumn } from './SessionTable.svelte';

	let {
		columnId,
		label,
		currentSortBy,
		currentSortOrder,
		handleSort
	}: {
		columnId: string;
		label: string;
		currentSortBy: string;
		currentSortOrder: 'asc' | 'desc';
		handleSort: (sortBy: SortableColumn, sortOrder: 'asc' | 'desc') => void;
	} = $props();

	let isActive = $derived(currentSortBy === columnId);
	let nextSortOrder = $derived(isActive && currentSortOrder === 'asc' ? 'desc' : 'asc');
</script>

<th>
	<button
		onclick={() => handleSort(columnId as SortableColumn, nextSortOrder as 'asc' | 'desc')}
		class="sortable-header"
		aria-current={isActive ? 'page' : undefined}
	>
		<span>{label}</span>
		<div class="sort-icons" class:active={isActive}>
			{#if nextSortOrder === 'asc'}
				<span class="sort-arrow">▲</span>
			{:else if nextSortOrder === 'desc'}
				<span class="sort-arrow">▼</span>
			{/if}
		</div>
	</button>
</th>

<style>
    th {
        padding:20px;
    }
	.sortable-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: inherit;
		user-select: none;
		white-space: nowrap;
	}
	.sortable-header:hover {
		opacity: 0.85;
	}

	.sort-icons {
		display: flex;
		flex-direction: column;
		opacity: 0.3; /* Default state for inactive columns */
		transition: opacity 0.2s ease;
	}
	.sortable-header:hover .sort-icons {
		opacity: 0.7;
	}
	.sort-icons.active {
		opacity: 1;
	}

	.sort-arrow {
		font-size: 1em;
		line-height: 0.8;
		opacity: 0.5; /* Both arrows are visible but faded in the default state */
		transition: opacity 0.2s ease;
	}
</style>
