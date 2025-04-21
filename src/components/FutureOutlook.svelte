<script lang="ts">
	import type { ChartConfiguration, ChartItem } from 'chart.js';
	import Chart from 'chart.js/auto';

	interface FutureOutlookProps {
		config: ChartConfiguration;
	}

	let { config }: FutureOutlookProps = $props();

	const handleChart = (element: ChartItem, config: ChartConfiguration) => {
		let chart = new Chart(element, config);
		return {
			update(config: ChartConfiguration) {
				chart.destroy();
				chart = new Chart(element, config);
			},
			destroy() {
				chart.destroy();
			}
		};
	};
</script>

<div class="w-auto">
	<canvas use:handleChart={config}></canvas>
</div>
