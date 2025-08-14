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
	let plannedDuration_gt = $state(Number(initialFilters.plannedDuration_gt) || 0);
	let plannedDuration_lt = $state(Number(initialFilters.plannedDuration_lt) || 0);
	let totalStudyTime_gt = $state(Number(initialFilters.totalStudyTime_gt) || 0);
	let totalStudyTime_lt = $state(Number(initialFilters.totalStudyTime_lt) || 0);
	let totalPauseTime_gt = $state(Number(initialFilters.totalPauseTime_gt) || 0);
	let totalPauseTime_lt = $state(Number(initialFilters.totalPauseTime_lt) || 0);
	let focusScore_gt = $state(Number(initialFilters.focusScore_gt) || 0);
	let focusScore_lt = $state(Number(initialFilters.focusScore_lt) || 0);

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
		plannedDuration_gt = 0;
		plannedDuration_lt = 0;
		totalStudyTime_gt = 0;
		totalStudyTime_lt = 0;
		totalPauseTime_gt = 0;
		totalPauseTime_lt = 0;
		focusScore_gt = 0;
		focusScore_lt = 0;
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
						bind:value={dateFrom}
						class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div class="flex items-center">
					<label for="dateTo" class="block text-sm font-medium text-gray-300">To:</label>
					<input
						type="date"
						id="dateTo"
						bind:value={dateTo}
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
					<label for="plannedDuration_gt" class="block text-sm font-medium text-gray-300"
						>Min:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="plannedDuration_gt"
							bind:value={plannedDuration_gt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => plannedDuration_gt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (plannedDuration_gt = Math.max(0, plannedDuration_gt - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="plannedDuration_lt" class="block text-sm font-medium text-gray-300"
						>Max:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="plannedDuration_lt"
							bind:value={plannedDuration_lt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => plannedDuration_lt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (plannedDuration_lt = Math.max(0, plannedDuration_lt - 1))}>-</button
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
					<label for="totalStudyTime_gt" class="block text-sm font-medium text-gray-300">Min:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalStudyTime_gt"
							bind:value={totalStudyTime_gt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => totalStudyTime_gt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (totalStudyTime_gt = Math.max(0, totalStudyTime_gt - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="totalStudyTime_lt" class="block text-sm font-medium text-gray-300">Max:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalStudyTime_lt"
							bind:value={totalStudyTime_lt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => totalStudyTime_lt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (totalStudyTime_lt = Math.max(0, totalStudyTime_lt - 1))}>-</button
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
					<label for="totalPauseTime_gt" class="block text-sm font-medium text-gray-300">Min:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalPauseTime_gt"
							bind:value={totalPauseTime_gt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => totalPauseTime_gt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (totalPauseTime_gt = Math.max(0, totalPauseTime_gt - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="totalPauseTime_lt" class="block text-sm font-medium text-gray-300">Max:</label
					>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							id="totalPauseTime_lt"
							bind:value={totalPauseTime_lt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => totalPauseTime_lt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (totalPauseTime_lt = Math.max(0, totalPauseTime_lt - 1))}>-</button
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
					<label for="focusScore_gt" class="block text-sm font-medium text-gray-300">Min:</label>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							max="100"
							id="focusScore_gt"
							bind:value={focusScore_gt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => focusScore_gt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (focusScore_gt = Math.max(0, focusScore_gt - 1))}>-</button
							>
						</div>
					</div>
				</div>
				<div class="flex items-center">
					<label for="focusScore_lt" class="block text-sm font-medium text-gray-300">Max:</label>
					<div class="relative w-full">
						<input
							type="number"
							min="0"
							max="100"
							id="focusScore_lt"
							bind:value={focusScore_lt}
							class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
						/>
						<div class="spin-buttons">
							<button class="spin-button up" onclick={() => focusScore_lt++}>+</button>
							<button
								class="spin-button down"
								onclick={() => (focusScore_lt = Math.max(0, focusScore_lt - 1))}>-</button
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
		background-color: rgba(51, 65, 85, 0.7);
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
