const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} chartjs-adapter-date-fns Contributors
 * Released under the ${pkg.license} license
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

module.exports = [
  {
    input,
    output: {
      file: pkg.main,
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
      file: pkg.main.replace('.js', '.min.js'),
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
      file: pkg.module,
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
      file: pkg.main.replace('.js', '.bundle.js'),
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
      file: pkg.main.replace('.js', '.bundle.min.js'),
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
