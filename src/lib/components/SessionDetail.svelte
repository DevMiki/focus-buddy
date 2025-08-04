<script lang="ts">
	import { slide } from 'svelte/transition';

	type SessionSummary = {
		id: number;
		startTime: number;
		endTime: number;
	};
	let { session: sessionSummary }: { session: SessionSummary } = $props();

	type Segment = {
		type: 'study' | 'pause';
		startTime: number;
		endTime: number;
	};
	let segments = $state<Segment[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// --- 3. SIDE EFFECTS: Fetching Data from the Server ---
	// This `$effect.pre` block is the heart of our data fetching logic. It runs
	// automatically whenever its dependency (`sessionSummary.id`) changes.
	$effect.pre(() => {
		// Reset state each time a new session is selected.
		isLoading = true;
		error = null;
		segments = [];

		// The AbortController is a web standard for cancelling fetch requests.
		// This is CRUCIAL to prevent race conditions.
		const controller = new AbortController();

		async function fetchSegments() {
			try {
				const segmentsAPIResponse = await fetch(`/api/sessions/${sessionSummary.id}/segments`, {
					signal: controller.signal // Link the fetch to the controller.
				});

				if (!segmentsAPIResponse.ok) {
					const errorData = await segmentsAPIResponse.json();
					throw new Error(errorData.message || 'Failed to load session details.');
				}

				segments = await segmentsAPIResponse.json();
			} catch (e: any) {
				// We ignore AbortErrors, as they are intentional cancellations.
				if (e.name !== 'AbortError') {
					error = e.message;
				}
			} finally {
				isLoading = false;
			}
		}

		fetchSegments();

		// The effect's cleanup function: This is the magic part.
		// It runs if the user selects another session before this fetch completes.
		// It cancels the outdated request, ensuring we only render the latest data.
		return () => {
			controller.abort();
		};
	});

	// --- 4. DERIVED STATE: Transforming Data for the UI ---
	// This `$derived` rune creates a computed value that automatically updates
	// whenever its dependencies change. This keeps our template logic clean.
	let timelineData: {
		totalDuration: number;
		segments: Array<{ type: 'study' | 'pause'; offset: number; width: number }>;
	} | null = $derived.by(() => {
		if (isLoading || error || segments.length === 0) {
			return null;
		}

		const sessionDuration = sessionSummary.endTime - sessionSummary.startTime;
		if (sessionDuration <= 0) return { totalDuration: 0, segments: [] }; 

		const processedSegments = segments.map( segment => {
			const segmentDuration = segment.endTime - segment.startTime;
			const offsetPercent = ((segment.startTime - sessionSummary.startTime) / sessionDuration) * 100;
			const segmentPercentageOfTotal = (segmentDuration / sessionDuration) * 100;

			return {
				type: segment.type,
				offset: offsetPercent,
				width: segmentPercentageOfTotal
			};
		});

		console.log(processedSegments);

		return {
			totalDuration: sessionDuration,
			segments: processedSegments
		};
	});
</script>

<!-- 5. TEMPLATE: The Component's Visual Representation -->
<div class="session-detail-card" transition:slide|local>
	{#if isLoading}
		<p class="status-message">Loading details...</p>
	{:else if error}
		<p class="status-message error">Error: {error}</p>
	{:else if timelineData && timelineData.segments.length > 0}
		<div class="timeline-container">
			<h3 class="timeline-title">Session Timeline</h3>
			<div class="timeline-track">
				{#each timelineData.segments as segment, i (i)}
					<div
						class="timeline-segment"
						class:study={segment.type === 'study'}
						class:pause={segment.type === 'pause'}
						style="left: {segment.offset}%; width: {segment.width}%;"
						title="{segment.type.charAt(0).toUpperCase() + segment.type.slice(1)} ({Math.round(
							segment.width
						)}%)"
					></div>
				{/each}
			</div>
			<div class="timeline-legend">
				<div class="legend-item"><span class="legend-color study"></span>Study</div>
				<div class="legend-item"><span class="legend-color pause"></span>Pause</div>
			</div>
		</div>
	{:else}
		<p class="status-message">No detailed segment data was recorded for this session.</p>
	{/if}
</div>

<style>
	.session-detail-card {
		padding: 1.5rem 2rem;
		background-color: rgba(20, 20, 25, 0.5);
		border: 1px solid #444;
		border-radius: 12px;
		margin-top: 2rem;
		backdrop-filter: blur(10px);
	}

	.status-message {
		color: #ccc;
		text-align: center;
		padding: 2rem 0;
		font-style: italic;
	}

	.status-message.error {
		color: #f87171; /* A shade of red */
	}

	.timeline-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.timeline-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: #eee;
	}

	.timeline-track {
		position: relative;
		width: 100%;
		height: 2.5rem;
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.timeline-segment {
		position: absolute;
		top: 0;
		height: 100%;
		opacity: 0.9;
		transition: all 0.3s ease;
	}

	.timeline-segment.study {
		/* Use the CSS variables provided by the layout for theming */
		background-color: var(--color-primary, #3b82f6);
	}

	.timeline-segment.pause {
		/* Use the CSS variables provided by the layout for theming */
		background-color: var(--color-secondary, #ef4444);
	}

	.timeline-legend {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1.5rem;
		font-size: 0.9rem;
		color: #bbb;
		padding-top: 0.25rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 3px;
	}

	.study {
		background-color: var(--color-primary);
	}

	.pause {
		background-color: var(--color-secondary);
	}
</style>
