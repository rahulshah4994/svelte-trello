import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	preprocess: sveltePreprocess({
		scss: {
			prependData: `@import 'src/scss/variables.scss';`
		}
	}),
	adapter: vercel()
};

export default config;
