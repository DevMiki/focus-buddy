<script lang="ts">
	let { onReset } = $props<{ onReset: () => void }>();
</script>

<div class="scale-wrapper">
	<button class="btn-class-name" onclick={onReset}>
		<span class="back"></span>
		<span class="front">reset</span>
	</button>
</div>

<style>
	.scale-wrapper {
		transform: scale(0.75);
		transform-origin: center;
		display: inline-block;
	}

	.btn-class-name {
		top: -1px;
		--primary: 255, 90, 120;
		--secondary: 150, 50, 60;
		width: 53px;
		height: 47px;
		border: none;
		outline: none;
		cursor: pointer;
		user-select: none;
		touch-action: manipulation;
		outline: 8px solid rgb(var(--primary), 0.5);
		border-radius: 100%;
		position: relative;
		transition: 0.3s;
	}

	.btn-class-name .back {
		background: rgb(var(--secondary));
		border-radius: 100%;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.btn-class-name .front {
		background: linear-gradient(0deg, rgba(var(--primary), 0.6) 20%, rgba(var(--primary)) 50%);
		box-shadow: 0 0.5em 1em -0.2em rgba(var(--secondary), 0.5);
		border-radius: 100%;
		position: absolute;
		border: 1px solid rgb(var(--secondary));
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
		font-family: inherit;
		transform: translateY(-15%);
		transition: 0.15s;
		color: rgb(var(--secondary));
	}

	.btn-class-name:active .front {
		transform: translateY(0%);
		box-shadow: 0 0;
	}
</style>
