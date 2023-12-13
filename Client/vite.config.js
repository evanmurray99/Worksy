/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		css: true,
		setupFiles: './src/__test__/setup.js',
		coverage: {
			reporter: ['text', 'html'],
		},
	},
	// expose to all network interfaces
	preview: {
		host: true,
		port: 3030,
	},
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 3030,
	},
});
