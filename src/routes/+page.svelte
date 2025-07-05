<script lang="ts">
	import PlayPauseButtons from '$lib/play-pause-buttons.svelte';
	import ResetButton from '$lib/reset-button.svelte';

	const MINUTE = 60 * 1000;
	let counter_duration = $state(MINUTE * 30);
	let isRunning = $state(false);
	let time = $derived(new Date(counter_duration).toISOString().slice(14, 19));

	let minutesToShow = $derived(Math.ceil(counter_duration / MINUTE));

	$effect(() => {
		if (!isRunning) {
			return;
		}

		const interval = setInterval(() => {
			if (counter_duration > 0) {
				counter_duration -= 1000;
			} else {
				isRunning = false;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function handlePlay() {
		isRunning = true;
	}

	function handlePause() {
		isRunning = false;
	}

	function handleReset() {
		counter_duration = MINUTE * 30;
		isRunning = false;
	}
</script>

<div class="clock-timer-wrapper">
	<div class="clock-container">
		<svg class="clock-svg" viewBox="0 0 100 100">
			<g transform="translate(50, 50)">
				{#each Array.from({ length: 30 }, (_, i) => i + 1) as minute}
					<!-- Only show the line if its minute number is <= minutes left -->
					{#if minute <= minutesToShow}
						<line class="minute-mark" y1="-45" y2="-50" transform="rotate({minute * (360 / 30)})" />
					{/if}
				{/each}
			</g>
		</svg>
	</div>

	<div class="timer">
		<h1>{time}</h1>
		<div class="action-buttons">
			<PlayPauseButtons onPlay={handlePlay} onPause={handlePause} />
			<ResetButton onReset={handleReset} />
		</div>
	</div>
</div>

<style lang="scss">
	.clock-timer-wrapper {
		margin:0 auto;
		width: min(80vw, 80vh);
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.clock-container {
		width: 85%;
		height: 85%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.minute-mark {
		stroke: rgba(255, 255, 255, 0.7);
		stroke-width: 1;
		stroke-linecap: round;
	}

	.clock-svg {
		width: 90%;
		height: 90%;
		overflow: visible;
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
