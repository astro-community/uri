import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { default as commonjs } from '@rollup/plugin-commonjs'
import { default as typescript } from '@rollup/plugin-typescript'
import { readFile, rename, rm, writeFile } from 'node:fs/promises'

const plugins = [
	nodeResolve({
		preferBuiltins: false,
	}),
	commonjs(),
	typescript({
		tsconfig: './tsconfig.json',
	}),
]

async function build() {
	const pathToSpecUrl = new URL(
		'./node_modules/spec-url/src/',
		import.meta.url
	)

	for (const pathname of ['host.js', 'index.js']) {
		const pathToHostJs = new URL(pathname, pathToSpecUrl)
		const dataOfHostJs = await readFile(pathToHostJs, 'utf8')
		await writeFile(pathToHostJs, dataOfHostJs.replace(
			/import \* as punycode from 'punycode'/g,
			`import punycode from 'punycode'`
		))
	}

	const configs = [
		{
			inputOptions: {
				input: 'src/RelativeURL.ts',
				plugins,
				onwarn(warning, warn) {
					if (warning.code !== 'UNRESOLVED_IMPORT') warn(warning)
				},
			},
			outputOptions: {
				inlineDynamicImports: true,
				file: 'mod.js',
				format: 'esm',
				sourcemap: true,
			},
		},
	]

	for (const config of configs) {
		const bundle = await rollup(config.inputOptions)

		// or write the bundle to disk
		await bundle.write(config.outputOptions)

		// closes the bundle
		await bundle.close()

		// cleanup the bundle
		await rename('RelativeURL.d.ts', 'mod.d.ts')
		await rename('RelativeURL.d.ts.map', 'mod.d.ts.map')

		await rm('mod.d.ts.map')
	}
}

build()
