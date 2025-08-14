<script lang="ts">
	let {
		label,
		equalsAndGreaterThan = $bindable(),
		equalsAndLessThan = $bindable()
	}: {
		label: string;
		equalsAndGreaterThan: number;
		equalsAndLessThan: number;
	} = $props();
</script>

<div class="filter-group">
	<h3 class="font-semibold text-white mb-2">{label}</h3>
	<div class="space-y-2">
		<div class="flex items-center">
			<label for={label} class="block text-sm font-medium text-gray-300">Min:</label>
			<div class="relative w-full">
				<input
					type="number"
					min="0"
					bind:value={equalsAndGreaterThan}
					class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
				/>
				<div class="spin-buttons">
					<button
						class="spin-button up"
						onclick={() => (equalsAndGreaterThan = Number(equalsAndGreaterThan) + 1)}
						>+</button
					>
					<button
						class="spin-button down"
						onclick={() =>
							(equalsAndGreaterThan = Math.max(0, Number(equalsAndGreaterThan) - 1))}
						>-</button
					>
				</div>
			</div>
		</div>
		<div class="flex items-center">
			<label for={label} class="block text-sm font-medium text-gray-300">Max:</label>
			<div class="relative w-full">
				<input
					type="number"
					min="0"
					id="plannedDuration_lte"
					bind:value={equalsAndLessThan}
					class="w-full px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 number-input"
				/>
				<div class="spin-buttons">
					<button
						class="spin-button up"
						onclick={() => (equalsAndLessThan = Number(equalsAndLessThan) + 1)}
						>+</button
					>
					<button
						class="spin-button down"
						onclick={() =>
							(equalsAndLessThan = Math.max(0, Number(equalsAndLessThan) - 1))}
						>-</button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
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
