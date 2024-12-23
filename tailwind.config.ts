import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				serif: ['Libre Baskerville', 'sans-serif']
			}
		}
	},

	plugins: []
} satisfies Config;
