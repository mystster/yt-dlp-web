import { sveltekit } from '@sveltejs/kit/vite';
import { workerPlugin } from './src/lib/vite-plugin-worker/worker';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [workerPlugin(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
