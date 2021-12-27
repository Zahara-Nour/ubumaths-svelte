import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
const { preprocess } = require('./svelte.config');
import css from 'rollup-plugin-css-only';
// import autoprefixer from 'autoprefixer'
import analyze from 'rollup-plugin-analyzer'

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
		inlineDynamicImports: true, // error with dynamic import
		// dir: 'public/build/',
		
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			preprocess
		},
		),
		json(),
		
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

// const postcssOptions = () => ({
// 	extensions: ['.scss', '.sass'],
// 	extract: false,
// 	minimize: true,
// 	use: [
// 	  ['sass', {
// 		includePaths: [
// 		  './src/theme',
// 		  './node_modules',
// 		  //'./static/sass'
// 		]
// 	  }]
// 	],
// 	plugins: [autoprefixer() ]
//   });

// export default {
// 	// external: ['mathlive'],
	
// 	input: 'src/main.js',
// 	output: {
// 		sourcemap: true,
// 		format: 'iife',
// 		name: 'app',
// 		file: 'public/build/bundle.js',
// 		// globals:{mathlive: 'Mathlive'},
// 	},
// 	plugins: [analyze({summaryOnly:true}),
// 		svelte({
// 			hydratable:true,
// 			// enable run-time checks when not in production
// 			dev: !production,
// 			// we'll extract any component CSS out into
// 			// a separate file - better for performance
// 			css: css => {
// 				css.write('public/build/bundle.css');
// 			},
// 			preprocess: preprocess()
// 		}),

// 		// If you have external dependencies installed from
// 		// npm, you'll most likely need these plugins. In
// 		// some cases you'll need additional configuration -
// 		// consult the documentation for details:
// 		// https://github.com/rollup/plugins/tree/master/packages/commonjs
// 		// problem with esm and cjs modules
// 		// https://github.com/firebase/firebase-js-sdk/issues/3397#issuecomment-657936437
		
// 		resolve({
// 			mainFields: ["module", "browser"],
// 			dedupe: ['svelte'],
// 			preferBuiltins: false
// 		}),
// 		commonjs(),

// 		// In dev mode, call `npm run start` once
// 		// the bundle has been generated
// 		!production && serve(),

// 		// Watch the `public` directory and refresh the
// 		// browser on changes when not in production
// 		!production && livereload('public'),

// 		// If we're building for production (npm run build
// 		// instead of npm run dev), minify
// 		production && terser(),

		
// 		postcss(postcssOptions()),
// 	],
// 	watch: {
// 		clearScreen: false
// 	}
// };
