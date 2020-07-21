import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { name, version, homepage, license } from './package.json';

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${new Date().getFullYear()} Chart.js Contributors
 * Released under the ${license} license
 */`;

export default [
	{
		input: 'src/index.js',
		output: {
			file: `dist/${name}.js`,
			banner,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				'date-fns': 'dateFns'
			}
		},
		external: [
			'chart.js',
			'date-fns'
		]
	},
	{
		input: 'src/index.js',
		output: {
			file: `dist/${name}.min.js`,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				'date-fns': 'dateFns'
			}
		},
		plugins: [
			terser({
				output: {
					preamble: banner
				}
			})
		],
		external: [
			'chart.js',
			'date-fns'
		]
	},
	{
		input: 'src/index.js',
		output: {
			file: `dist/${name}.esm.js`,
			banner,
			format: 'esm',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				'date-fns': 'dateFns'
			}
		},
		external: [
			'chart.js',
			'date-fns'
		]
	},
	{
		input: 'src/index.js',
		output: {
			file: `dist/${name}.bundle.js`,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart'
			}
		},
		plugins: [
			resolve(),
		],
		external: [
			'chart.js'
		]
	},
	{
		input: 'src/index.js',
		output: {
			file: `dist/${name}.bundle.min.js`,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart'
			}
		},
		plugins: [
			resolve(),
			terser({
				output: {
					preamble: banner
				}
			})
		],
		external: [
			'chart.js'
		]
	}
];
