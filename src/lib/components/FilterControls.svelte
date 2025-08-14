<script lang="ts">
	import RangeFilter from './RangeFilter.svelte';

	let {
		initialFilters,
		onFilterChange
	}: {
		initialFilters: Record<string, string | string[] | number>;
		onFilterChange: (filters: Record<string, string | string[] | number>) => void;
	} = $props();

	let filters: Record<string, string | string[] | number> = $state({
		dateFrom: initialFilters.dateFrom ?? ('' as string),
		dateTo: initialFilters.dateTo ?? ('' as string),
		plannedDuration_gte: initialFilters.plannedDuration_gte ?? 0,
		plannedDuration_lte: initialFilters.plannedDuration_lte ?? 0,
		totalStudyTime_gte: initialFilters.totalStudyTime_gte ?? 0,
		totalStudyTime_lte: initialFilters.totalStudyTime_lte ?? 0,
		totalPauseTime_gte: initialFilters.totalPauseTime_gte ?? 0,
		totalPauseTime_lte: initialFilters.totalPauseTime_lte ?? 0,
		focusScore_gte: initialFilters.focusScore_gte ?? 0,
		focusScore_lte: initialFilters.focusScore_lte ?? 0
	});

	const rangeFiltersConfig = [
		{
			label: 'Planned Duration (min)',
			minKey: 'plannedDuration_gte',
			maxKey: 'plannedDuration_lte'
		},
		{ label: 'Study Time (min)', minKey: 'totalStudyTime_gte', maxKey: 'totalStudyTime_lte' },
		{ label: 'Pause Time (min)', minKey: 'totalPauseTime_gte', maxKey: 'totalPauseTime_lte' },
		{ label: 'Focus Score (%)', minKey: 'focusScore_gte', maxKey: 'focusScore_lte' }
	];

	function getActiveFilters(
		allFilters: typeof filters
	): Record<string, string | string[] | number> {
		const activeFilters: Record<string, string | string[] | number> = {};
		for (const [key, value] of Object.entries(allFilters)) {
			if (value !== '' && value !== 0 && value !== null && value !== undefined) {
				activeFilters[key] = value;
			}
		}
		return activeFilters;
	}

	$effect(() => {
		const allFilters: Record<string, string | string[] | number> = {
			...filters
		};

		const timer = setTimeout(() => {
			onFilterChange(allFilters);
		}, 500);

		return () => clearTimeout(timer);
	});

	const defaultFilters = {
		dateFrom: '' as string,
		dateTo: '' as string,
		plannedDuration_gte: 0,
		plannedDuration_lte: 0,
		totalStudyTime_gte: 0,
		totalStudyTime_lte: 0,
		totalPauseTime_gte: 0,
		totalPauseTime_lte: 0,
		focusScore_gte: 0,
		focusScore_lte: 0
	};

	function resetFilters() {
		Object.assign(filters, defaultFilters);
		onFilterChange(getActiveFilters(filters));
	}
</script>

<div class="filter-controls">
	<div class="grid lg:grid-cols-5 gap-5">
		<div class="filter-group">
			<h3 class="font-semibold text-white mb-2">Date Range</h3>
			<div class="space-y-2">
				<div class="flex items-center">
					<label for="dateFrom" class="block text-sm font-medium text-gray-300">From:</label>
					<input
						type="date"
						id="dateFrom"
						bind:value={filters.dateFrom}
						class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div class="flex items-center">
					<label for="dateTo" class="block text-sm font-medium text-gray-300">To:</label>
					<input
						type="date"
						id="dateTo"
						bind:value={filters.dateTo}
						class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>
		{#each rangeFiltersConfig as filterConfig (filterConfig.label)}
			<RangeFilter
				label={filterConfig.label}
				bind:equalsAndGreaterThan={filters[filterConfig.minKey] as number}
				bind:equalsAndLessThan={filters[filterConfig.maxKey] as number}
			/>
		{/each}
		<div class="flex justify-end col-span-5">
			<button
				onclick={resetFilters}
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Reset Filters
			</button>
		</div>
	</div>
</div>

<style>
	.filter-controls {
		background-color: rgba(30, 41, 59, 0.5);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 1rem;
		border-radius: 0.75rem;
		margin-bottom: -3rem;
	}

	h3 {
		color: #e2e8f0;
	}

	input {
		background-color: rgba(51, 65, 85, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.25);
		color: #e2e8f0;
		min-width: 120px;
		max-height: 32px !important;
	}

	label {
		color: #cbd5e1;
		white-space: nowrap;
		width: 3rem;
	}

	.number-input::-webkit-inner-spin-button,
	.number-input::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.number-input {
		-moz-appearance: textfield;
		padding-right: 1.5rem; /* Make space for custom arrows */
	}

	.relative:hover .spin-buttons {
		opacity: 1;
	}

	.spin-buttons {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}

	.spin-button {
		width: 0.75rem;
		height: 0.75rem;
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		color: white;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 1;
		border-radius: 0.25rem;
	}

	.spin-button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
</style>
