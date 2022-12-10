import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {readFileSync} from 'fs';

const {name, version, homepage, main, license} = JSON.parse(readFileSync('./package.json'));

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${new Date().getFullYear()} chartjs-adapter-date-fns Contributors
 * Released under the ${license} license
 */`;

const input = 'src/index.js';
const external = [
  'chart.js',
  'date-fns'
];
const globals = {
  'chart.js': 'Chart',
  'date-fns': 'dateFns'
};

export default [
  {
    input,
    output: {
      file: main,
      banner: banner,
      format: 'esm',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    output: {
      file: main.replace('.esm.js', '.js'),
      banner: banner,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    output: {
      file: main.replace('.esm.js', '.min.js'),
      format: 'umd',
      indent: false,
      globals
    },
    plugins: [
      terser({
        output: {
          preamble: banner
        }
      })
    ],
    external
  },
  {
    input,
    output: {
      file: main.replace('.esm.js', '.bundle.js'),
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
    input,
    output: {
      file: main.replace('.esm.js', '.bundle.min.js'),
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
