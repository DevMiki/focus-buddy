<script lang="ts">
	let {
		initialFilters,
		onFilterChange
	}: {
		initialFilters: Record<string, string | string[] | number>;
		onFilterChange: (filters: Record<string, string | string[] | number>) => void;
	} = $props();

	let filters: Record<string, string | string[] | number> = $state({
		dateFrom: initialFilters.dateFrom ?? '' as string,
		dateTo: initialFilters.dateTo ?? '' as string,
		plannedDuration_gte: initialFilters.plannedDuration_gte as number ?? 0,
		plannedDuration_lte: initialFilters.plannedDuration_lte as number ?? 0,
		totalStudyTime_gte: initialFilters.totalStudyTime_gte as number ?? 0,
		totalStudyTime_lte: initialFilters.totalStudyTime_lte as number ?? 0,
		totalPauseTime_gte: initialFilters.totalPauseTime_gte as number ?? 0,
		totalPauseTime_lte: initialFilters.totalPauseTime_lte as number ?? 0,
		focusScore_gte: initialFilters.focusScore_gte as number ?? 0,
		focusScore_lte: initialFilters.focusScore_lte as number ?? 0
	});

	function getActiveFilters(allFilters: typeof filters): Record<string, string | string[] | number> {
		const activeFilters: Record<string, string | string[] | number> = {};
		for (const [key, value] of Object.entries(allFilters)) {
            if (value !== '' && value !== 0 && value !== null && value !== undefined) {
				activeFilters[key] = value;
			}
		}
        return activeFilters;
	}

	$effect(() => {
		const timer = setTimeout(() => {
			onFilterChange(getActiveFilters(filters));
		}, 500);

		return () => clearTimeout(timer);
	});

	function resetFilters() {
		Object.keys(filters).forEach((key) => {
			if (initialFilters.hasOwnProperty(key)) {
				filters[key] = initialFilters[key];
			} 
		});
	}
</script>

<div class="filter-controls">
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
		<!-- Date Range -->
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

		<!-- Planned Duration -->
		<div class="filter-group">
			<h3 class="font-semibold text-white mb-2">Planned Duration (min)</h3>
			<div class="space-y-2">
				<div class="flex items-center">
					<label for="plannedDuration_gte" class="block text-sm font-medium text-gray-300"
						>Min:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="plannedDuration_gte"
							bind:value={filters.plannedDuration_gte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.plannedDuration_gte = Number(filters.plannedDuration_gte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.plannedDuration_gte = Math.max(0, Number(filters.plannedDuration_gte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="plannedDuration_lte" class="block text-sm font-medium text-gray-300"
						>Max:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="plannedDuration_lte"
							bind:value={filters.plannedDuration_lte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.plannedDuration_lte = Number(filters.plannedDuration_lte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.plannedDuration_lte = Math.max(0, Number(filters.plannedDuration_lte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Study Time -->
		<div class="filter-group">
			<h3 class="font-semibold text-white mb-2">Study Time (min)</h3>
			<div class="space-y-2">
				<div class="flex items-center">
					<label for="totalStudyTime_gte" class="block text-sm font-medium text-gray-300">Min:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalStudyTime_gte"
							bind:value={filters.totalStudyTime_gte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.totalStudyTime_gte = Number(filters.totalStudyTime_gte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.totalStudyTime_gte = Math.max(0, Number(filters.totalStudyTime_gte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="totalStudyTime_lte" class="block text-sm font-medium text-gray-300">Max:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalStudyTime_lte"
							bind:value={filters.totalStudyTime_lte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.totalStudyTime_lte = Number(filters.totalStudyTime_lte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.totalStudyTime_lte = Math.max(0, Number(filters.totalStudyTime_lte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Pause Time -->
		<div class="filter-group">
			<h3 class="font-semibold text-white mb-2">Pause Time (min)</h3>
			<div class="space-y-2">
				<div class="flex items-center">
					<label for="totalPauseTime_gte" class="block text-sm font-medium text-gray-300">Min:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalPauseTime_gte"
							bind:value={filters.totalPauseTime_gte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.totalPauseTime_gte = Number(filters.totalPauseTime_gte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.totalPauseTime_gte = Math.max(0, Number(filters.totalPauseTime_gte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="totalPauseTime_lte" class="block text-sm font-medium text-gray-300">Max:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalPauseTime_lte"
							bind:value={filters.totalPauseTime_lte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.totalPauseTime_lte = Number(filters.totalPauseTime_lte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.totalPauseTime_lte = Math.max(0, Number(filters.totalPauseTime_lte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Focus Score -->
		<div class="filter-group">
			<h3 class="font-semibold text-white mb-2">Focus Score (%)</h3>
			<div class="space-y-2">
				<div class="flex items-center">
					<label for="focusScore_gte" class="block text-sm font-medium text-gray-300">Min:</label>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							max="100"
							id="focusScore_gte"
							bind:value={filters.focusScore_gte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.focusScore_gte = Number(filters.focusScore_gte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.focusScore_gte = Math.max(0, Number(filters.focusScore_gte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="focusScore_lte" class="block text-sm font-medium text-gray-300">Max:</label>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							max="100"
							id="focusScore_lte"
							bind:value={filters.focusScore_lte}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => filters.focusScore_lte = Number(filters.focusScore_lte) + 1}>+</button>
							<button
								class="spin-button down"
								onclick={() => (filters.focusScore_lte = Math.max(0, Number(filters.focusScore_lte) - 1))}>-</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-end mt-4">
		<button
			onclick={resetFilters}
			class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Reset Filters
		</button>
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
