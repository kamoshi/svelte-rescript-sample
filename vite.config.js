import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { exec } from "node:child_process";
import { readFileSync } from "node:fs";
import { promisify } from "node:util";
import { defineConfig } from "vite";

const rescriptPreprocess = () => {
	return {
		name: 'svelte-rescript',
		/**
		 * @param {object} options
		 * @param {string} options.content
		 * @param {string} options.filename
		 * @param {object} options.attributes
		 * @param {'res'} options.attributes.lang
		 */
		script: async ({ content, attributes }) => {
			if (attributes.lang == 'res') {
        console.info('content', content)
        const cmd = `./node_modules/.bin/bsc -bs-package-name svelte-rescript -bs-package-output esmodule:.:esmodule -o tmp -I /home/maciej/Desktop/svelte-test/src/ -e "${content}"`;

				await promisify(exec)(cmd);
        const jsContent = readFileSync('tmpesmodule').toString();

				return {
					code: jsContent
				};
			}
		}
	};
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: [
        vitePreprocess(),
        rescriptPreprocess(),
      ]
    })
  ],
});
