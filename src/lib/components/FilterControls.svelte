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
	let plannedDuration_gt = $state(initialFilters.plannedDuration_gt ?? '');
	let plannedDuration_lt = $state(initialFilters.plannedDuration_lt ?? '');
	let totalStudyTime_gt = $state(initialFilters.totalStudyTime_gt ?? '');
	let totalStudyTime_lt = $state(initialFilters.totalStudyTime_lt ?? '');
	let totalPauseTime_gt = $state(initialFilters.totalPauseTime_gt ?? '');
	let totalPauseTime_lt = $state(initialFilters.totalPauseTime_lt ?? '');
	let focusScore_gt = $state(initialFilters.focusScore_gt ?? '');
	let focusScore_lt = $state(initialFilters.focusScore_lt ?? '');

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

	function resetFilters() {
		dateFrom = '';
		dateTo = '';
		plannedDuration_gt = '';
		plannedDuration_lt = '';
		totalStudyTime_gt = '';
		totalStudyTime_lt = '';
		totalPauseTime_gt = '';
		totalPauseTime_lt = '';
		focusScore_gt = '';
		focusScore_lt = '';
	}
</script>

<div class="filter-controls bg-gray-800 p-2 rounded-lg shadow-lg">
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
		<!-- Date Range -->
		<div class="filter-group space-y-1">
			<h3 class="text-base font-semibold text-white mb-1">Date Range</h3>
			<div class="space-y-1">
				<div>
					<label for="dateFrom" class="block text-sm font-medium text-gray-300">From:</label>
					<input
						type="date"
						id="dateFrom"
						bind:value={dateFrom}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label for="dateTo" class="block text-sm font-medium text-gray-300">To:</label>
					<input
						type="date"
						id="dateTo"
						bind:value={dateTo}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>

		<!-- Planned Duration -->
		<div class="filter-group space-y-1">
			<h3 class="text-base font-semibold text-white mb-1">Planned Duration (min)</h3>
			<div class="space-y-1">
				<div>
					<label for="plannedDuration_gt" class="block text-sm font-medium text-gray-300">Min:</label>
					<input
						type="number"
						min="0"
						id="plannedDuration_gt"
						bind:value={plannedDuration_gt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label for="plannedDuration_lt" class="block text-sm font-medium text-gray-300">Max:</label>
					<input
						type="number"
						min="0"
						id="plannedDuration_lt"
						bind:value={plannedDuration_lt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>

		<!-- Study Time -->
		<div class="filter-group space-y-1">
			<h3 class="text-base font-semibold text-white mb-1">Study Time (min)</h3>
			<div class="space-y-1">
				<div>
					<label for="totalStudyTime_gt" class="block text-sm font-medium text-gray-300">Min:</label>
					<input
						type="number"
						min="0"
						id="totalStudyTime_gt"
						bind:value={totalStudyTime_gt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label for="totalStudyTime_lt" class="block text-sm font-medium text-gray-300">Max:</label>
					<input
						type="number"
						min="0"
						id="totalStudyTime_lt"
						bind:value={totalStudyTime_lt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>

		<!-- Pause Time -->
		<div class="filter-group space-y-1">
			<h3 class="text-base font-semibold text-white mb-1">Pause Time (min)</h3>
			<div class="space-y-1">
				<div>
					<label for="totalPauseTime_gt" class="block text-sm font-medium text-gray-300">Min:</label>
					<input
						type="number"
						min="0"
						id="totalPauseTime_gt"
						bind:value={totalPauseTime_gt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label for="totalPauseTime_lt" class="block text-sm font-medium text-gray-300">Max:</label>
					<input
						type="number"
						min="0"
						id="totalPauseTime_lt"
						bind:value={totalPauseTime_lt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>

		<!-- Focus Score -->
		<div class="filter-group space-y-1">
			<h3 class="text-base font-semibold text-white mb-1">Focus Score (%)</h3>
			<div class="space-y-1">
				<div>
					<label for="focusScore_gt" class="block text-sm font-medium text-gray-300">Min:</label>
					<input
						type="number"
						min="0"
						max="100"
						id="focusScore_gt"
						bind:value={focusScore_gt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label for="focusScore_lt" class="block text-sm font-medium text-gray-300">Max:</label>
					<input
						type="number"
						min="0"
						max="100"
						id="focusScore_lt"
						bind:value={focusScore_lt}
						class="w-full p-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-end">
		<button
			on:click={resetFilters}
			class="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Reset Filters
		</button>
	</div>
</div>

<style>
	.filter-controls {
		background-color: rgba(23, 23, 23, 0.5);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	input {
		background-color: rgba(50, 50, 50, 0.5) !important;
		border: 1px solid rgba(255, 255, 255, 0.2) !important;
	}

	label {
		color: #ccc !important;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>