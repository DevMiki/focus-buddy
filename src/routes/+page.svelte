<script lang="ts">
	import PlayPauseButtons from '$lib/play-pause-buttons.svelte';
	import ResetButton from '$lib/reset-button.svelte';

	const MINUTE = 60 * 1000;
	let counter_duration = $state(MINUTE * 30);
	let isRunning = $state(false);
	let time = $derived(new Date(counter_duration).toISOString().slice(14, 19));

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

<div class="timer">
	<h1>{time}</h1>
	<div class="action-buttons">
		<PlayPauseButtons onPlay={handlePlay} onPause={handlePause} />
		<ResetButton onReset={handleReset} />
	</div>
</div>

<style lang="scss">
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

	.timer {
		display: flex;
		flex-direction: column;
		align-items: center;
		> h1 {
			font-size: clamp(3rem, 20vw, 10rem);
			margin-bottom: 3% !important;
			font-weight: 700;
			color: #fff;
			text-shadow: 0px 0px 12px #cae2fd;
		}
	}
</style>
