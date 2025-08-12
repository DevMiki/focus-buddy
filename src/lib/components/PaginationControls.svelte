<script lang="ts">
	let {
		pageNumber,
		pageSize,
		totalStudySessionsCount
	}: { pageNumber: number; pageSize: number; totalStudySessionsCount: number } = $props();

	let totalPages = $derived(Math.ceil(totalStudySessionsCount / pageSize));
</script>

<div class="pagination-controls">
	<span class="summary">
		Showing {Math.min((pageNumber - 1) * pageSize + 1, totalStudySessionsCount)} - {Math.min(
			pageNumber * pageSize,
			totalStudySessionsCount
		)} of {totalStudySessionsCount}
	</span>
	<div class="navigator">
		<a
        href="?page={pageNumber - 1}&pageSize={pageSize}"
        class="nav-button"
            aria-label={`Go to previous page (${pageNumber - 1} of ${totalPages})`}
			aria-disabled={pageNumber <= 1}
			class:disabled={pageNumber <= 1}
		>&laquo; Previous</a>
        <span class="page-info">Page {pageNumber} of {totalPages}</span>
		<a
			href="?page={pageNumber + 1}&limit={pageSize}}"
			class="nav-button"
            aria-label={`Go to next page (${pageNumber + 1} of ${totalPages})`}
			aria-disabled={pageNumber >= totalPages}
			class:disabled={pageNumber >= totalPages}
		>
			Next &raquo;
		</a>
	</div>
</div>

<style>
	.pagination-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		font-size: 0.9rem;
		color: #ccc;
	}
	.navigator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.nav-button {
		padding: 0.5rem 1rem;
		border: 1px solid #555;
		border-radius: 6px;
		text-decoration: none;
		color: white;
		background-color: rgba(255, 255, 255, 0.1);
	}
	.nav-button:not(.disabled):hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	.nav-button.disabled {
		opacity: 0.5;
		pointer-events: none; /* Disables clicks */
	}
	.page-info {
		padding: 0 0.5rem;
	}
</style>
