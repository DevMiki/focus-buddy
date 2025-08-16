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
        href="?pageNumber={pageNumber - 1}&pageSize={pageSize}"
        class="nav-button"
            aria-label={`Go to previous page (${pageNumber - 1} of ${totalPages})`}
			aria-disabled={pageNumber <= 1}
			class:disabled={pageNumber <= 1}
		>&laquo; Previous</a>
        <span class="page-info">Page {pageNumber} of {totalPages}</span>
		<a
			href="?pageNumber={pageNumber + 1}&pageSize={pageSize}"
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
		padding: 1rem;
		margin-top: -1rem;
		font-size: 0.875rem;
		color: #e2e8f0;
		border: 1px solid #444;
		border-radius: 8px;
		background-color: rgba(30, 41, 59, 0.5);
		backdrop-filter: blur(12px);
		width: 100%;
		box-sizing: border-box;
	}

	.navigator {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-button {
		padding: 0.625rem 1.25rem;
		border: 1px solid #444;
		border-radius: 8px;
		text-decoration: none;
		color: white;
		background-color: rgba(255, 255, 255, 0.1);
		transition: all 0.2s ease;
		font-weight: 500;
	}

	.nav-button:not(.disabled):hover {
		background-color: rgba(255, 255, 255, 0.2);
		border-color: #666;
		transform: translateY(-1px);
	}

	.nav-button.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.page-info {
		padding: 0 1rem;
		color: #94a3b8;
		font-weight: 500;
	}

	.summary {
		color: #94a3b8;
		font-size: 0.875rem;
	}
</style>
