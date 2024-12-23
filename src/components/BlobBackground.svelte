<div class="gradient-bg bg-slate-50 dark:bg-slate-700">
	<svg xmlns="http://www.w3.org/2000/svg">
		<defs>
			<filter id="goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
					result="goo"
				/>
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>
	<div class="gradients-container">
		<div class="g1"></div>
		<div class="g2"></div>
		<div class="g3"></div>
		<div class="g4"></div>
		<div class="g5"></div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
	:root {
		--color-bg1: rgb(108, 0, 162);
		--color-bg2: rgb(0, 17, 82);
		--color1: 18, 113, 255;
		--color2: 221, 74, 255;
		--color3: 100, 220, 255;
		--color4: 200, 50, 50;
		--color5: 253, 114, 143;
		--color-interactive: 140, 100, 255;
		--circle-size: 100%;
		--blending: hard-light;
	}

	:global(html) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: #fefefe;
	}

	:global(h1, h2, h3, h4) {
		font-family: 'Libre Baskerville', serif;
	}

	.gradient-bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		overflow: hidden;
		background-image: url(data:image/png;base64,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);
		top: 0;
		left: 0;
		z-index: -1;
	}

	.gradients-container {
		filter: url(#goo) blur(40px);
		width: 100%;
		height: 100%;
	}

	.g1 {
		position: absolute;
		background: radial-gradient(
				circle at center,
				rgba(var(--color1), 0.8) 0,
				rgba(var(--color1), 0) 50%
			)
			no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: center center;
		animation: moveInCircle 30s ease infinite;

		opacity: 1;
	}

	.g2 {
		position: absolute;
		background: radial-gradient(
				circle at center,
				rgba(var(--color2), 0.8) 0,
				rgba(var(--color2), 0) 50%
			)
			no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: calc(50% - 400px);
		animation: moveInCircle 20s reverse infinite;

		opacity: 1;
	}

	.g3 {
		position: absolute;
		background: radial-gradient(
				circle at center,
				rgba(var(--color3), 0.8) 0,
				rgba(var(--color3), 0) 50%
			)
			no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: calc(50% + 400px);
		animation: moveInCircle 40s linear infinite;

		opacity: 1;
	}

	.g4 {
		position: absolute;
		background: radial-gradient(
				circle at center,
				rgba(var(--color4), 0.8) 0,
				rgba(var(--color4), 0) 50%
			)
			no-repeat;
		mix-blend-mode: var(--blending);

		width: var(--circle-size);
		height: var(--circle-size);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: calc(50% - 200px);
		animation: moveInCirlce 40s ease infinite;

		opacity: 0.7;
	}

	.g5 {
		position: absolute;
		background: radial-gradient(
				circle at center,
				rgba(var(--color5), 0.8) 0,
				rgba(var(--color5), 0) 50%
			)
			no-repeat;
		mix-blend-mode: var(--blending);

		width: calc(var(--circle-size) * 2);
		height: calc(var(--circle-size) * 2);
		top: calc(50% - var(--circle-size) / 2);
		left: calc(50% - var(--circle-size) / 2);

		transform-origin: calc(50% - 800px) calc(50% + 200px);
		animation: moveInCircle 20s ease infinite;

		opacity: 1;
	}

	@keyframes moveInCircle {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
