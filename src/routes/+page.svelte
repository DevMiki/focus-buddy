<script lang="ts">
	import PlayPauseButtons from '$lib/play-pause-buttons.svelte';
	import ResetButton from '$lib/reset-button.svelte';

	const MINUTE = 60; 
	const INITIAL_DURATION_SECONDS = 30 * MINUTE;

	let counter_seconds = $state(INITIAL_DURATION_SECONDS);
	let isRunning = $state(false);

	// No change needed here, but let's rename for clarity
	let time_display = $derived(new Date(counter_seconds * 1000).toISOString().slice(14, 19));

	// 1. THE NEW CORE DERIVED STATE: Progress from 0.0 to 1.0
	let progress = $derived((INITIAL_DURATION_SECONDS - counter_seconds) / INITIAL_DURATION_SECONDS);

	$effect(() => {
		console.log('progress', progress);
		console.log('progress-off', progress_offset);
		if (!isRunning) return;
		const interval = setInterval(() => {
			if (counter_seconds > 0) {
				counter_seconds--;
			} else {
				isRunning = false;
			}
		}, 1000);
		return () => clearInterval(interval);
	});

	function onPlay() {
		isRunning = true;
	}
	function onPause() {
		isRunning = false;
	}
	function onReset() {
		isRunning = false;
		counter_seconds = INITIAL_DURATION_SECONDS;
	}

	// 2. SVG GEOMETRY AND ANIMATION STATE
	const CIRCLE_RADIUS = 45; // Our circle's radius in the 100x100 viewBox
	const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

	// This is the value we will bind to our SVG
	let progress_offset = $derived(CIRCUMFERENCE * (1 - progress));
</script>


<div class="clock-timer-wrapper">
	<!-- The SVG is now simpler and more declarative -->
	<svg class="progress-ring" viewBox="0 0 100 100">
		<!-- The background track -->
		<circle class="progress-ring__background" r={CIRCLE_RADIUS} cx="50" cy="50" />
		<!-- The moving progress bar -->
		<circle
			class="progress-ring__bar"
			r={CIRCLE_RADIUS}
			cx="50"
			cy="50"
			stroke-dasharray={CIRCUMFERENCE}
			stroke-dashoffset="{progress_offset}"
		/>
	</svg>

	<div class="timer">
		<!-- Use the renamed state variable for clarity -->
		<h1>{time_display}</h1>
		<div class="action-buttons">
			<PlayPauseButtons {onPlay} {onPause} />
			<ResetButton {onReset} />
		</div>
	</div>
</div>


<style lang="scss">
	.clock-timer-wrapper {
		margin: 0 auto;
		width: min(80vw, 80vh);
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.progress-ring {
		width: 100%;
		height: 100%;
		// Rotates the entire SVG so the drawing starts at the top (12 o'clock)
		transform: rotate(-90deg);
	}

	.progress-ring__background,
	.progress-ring__bar {
		fill: none; // Makes the circles hollow
		stroke-width: 3; // Thinner lines
		stroke-linecap: round; // Nice rounded ends
	}

	.progress-ring__background {
		// A subtle track color
		stroke: rgba(255, 255, 255, 0.15);
	}

	.progress-ring__bar {
		// A vibrant, eye-catching color
		stroke: #7df9ff; // Electric Blue, for example
		// Add a transition for super smooth updates!
		transition: stroke-dashoffset 0.3s ease-out;
	}

	.timer {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h1 {
			font-size: clamp(3rem, 10vw, 6rem);
			font-weight: 700;
			color: #fff;
			text-shadow: 0px 0px 12px #cae2fd;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		gap: clamp(0.5rem, 1vw, 1.5rem);
	}

	.action-buttons {
		display: flex;
		align-items: center;
		justify-items: center;
		justify-content: flex-end;
		gap: 0.6rem;
	}
</style>
