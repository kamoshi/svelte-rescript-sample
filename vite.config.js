import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { exec } from "node:child_process";
import { readFileSync } from "node:fs";
import { promisify } from "node:util";
import { defineConfig } from "vite";

const execAsync = promisify(exec);

function asCommand(content) {
  return `./node_modules/.bin/bsc -bs-package-name svelte-rescript -bs-package-output esmodule:.:esmodule -I lib/bs/src -e "${content}"`;
}

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
        const cmd = asCommand(content);

				await execAsync(cmd);
        const code = readFileSync('tmpesmodule').toString().replace('./src/', './');

        //console.log(code);

				return {
					code,
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
      ],
    })
  ],
});
