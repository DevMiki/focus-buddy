<script lang="ts">
	let {
		initialFilters,
		onFilterChange
	}: {
		initialFilters: Record<string, string | string[] | number>;
		onFilterChange: (filters: Record<string, string | string[] | number>) => void;
	} = $props();

	let dateFrom = $state(initialFilters.dateFrom ?? '');
	let dateTo = $state(initialFilters.dateTo ?? '');
	let plannedDuration_gt = $state(initialFilters.plannedDuration ?? '');
	let plannedDuration_lt = $state(initialFilters.plannedDuration ?? '');
	let totalStudyTime_gt = $state(initialFilters.totalStudyTime ?? '');
	let totalStudyTime_lt = $state(initialFilters.totalStudyTime ?? '');
	let totalPauseTime_gt = $state(initialFilters.totalPauseTime ?? '');
	let totalPauseTime_lt = $state(initialFilters.totalPauseTime ?? '');
	let focusScore_gt = $state(initialFilters.totalFocusScore ?? '');
	let focusScore_lt = $state(initialFilters.totalFocusScore ?? '');

	$effect(() => {
		const allFilters: Record<string, string | string[] | number> = {
			dateFrom,
			dateTo,
			plannedDuration_gt,
			plannedDuration_lt,
			totalStudyTime_gt,
			totalStudyTime_lt,
			totalPauseTime_gt,
			totalPauseTime_lt,
			focusScore_gt,
			focusScore_lt
		};

		const timer = setTimeout(() => {
			onFilterChange(allFilters);
		}, 500);

		return () => clearTimeout(timer);
	});
</script>

<div class="filter-controls">
	<div class="filter-group">
		<label for="dateFrom">Date From:</label>
		<input type="date" id="dateFrom" bind:value={dateFrom} />
	</div>
	<div class="filter-group">
		<label for="dateTo">Date To:</label>
		<input type="date" id="dateTo" bind:value={dateTo} />
	</div>
	<div class="filter-group">
		<label for="plannedDuration_gt">Planned Duration Greater Than:</label>
		<input type="text" id="plannedDuration_gt" bind:value={plannedDuration_gt} />
	</div>
	<div class="filter-group">
		<label for="plannedDuration_lt">Planned Duration Less Than:</label>
		<input type="text" id="plannedDuration_lt" bind:value={plannedDuration_lt} />
	</div>
	<div class="filter-group">
		<label for="totalStudyTime_lt">Total Study Time Less Than:</label>
		<input type="text" id="totalStudyTime_lt" bind:value={totalStudyTime_lt} />
	</div>
	<div class="filter-group">
		<label for="totalStudyTime_gt">Total Study Time Greater Than:</label>
		<input type="text" id="totalStudyTime_gt" bind:value={totalStudyTime_gt} />
	</div>
	<div class="filter-group">
		<label for="totalPauseTime_gt">Total Pause Time Greater Than:</label>
		<input type="text" id="totalPauseTime_gt" bind:value={totalPauseTime_gt} />
	</div>
	<div class="filter-group">
		<label for="totalPauseTime_lt">Total Pause Time Less Than:</label>
		<input type="text" id="totalPauseTime_lt" bind:value={totalPauseTime_lt} />
	</div>
	<div class="filter-group">
		<label for="totalFocusScore_gt">Total Focus Score Greater Than:</label>
		<input type="text" id="totalFocusScore_gt" bind:value={focusScore_gt} />
	</div>
	<div>
		<label for="totalFocusScore_lt">Total Focus Score Less Than:</label>
		<input type="text" id="totalFocusScore_lt" bind:value={focusScore_lt} />
	</div>
</div>

<style>
	.filter-controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 8px;
	}
	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	/* ... add other styles ... */
</style>
