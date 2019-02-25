# chartjs-adapter-date-fns

## Overview

This adapter allows to use date-fns with the Chart.js.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **2.8.0** or later and [date-fns](https://date-fns.org/) **1.30.1** or later.

## Getting started

### npm
    npm install chartjs-adapter-date-fns --save

### CDN
By default, `https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns` returns the latest (minified) version, however it's [highly recommended](https://www.jsdelivr.com/features) to always specify a version in order to avoid breaking changes. This can be achieved by appending `@{version}` to the url:

    https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@0.1.0

Read more about jsDeliver versioning on their [website](http://www.jsdelivr.com/).

## Integration

### HTML
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/date-fns@1.30.1/index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@0.1.0"></script>

### Module
    import Chart from 'chart.js';
	import 'chartjs-adapter-date-fns';

## Registration

This adapter overrides default date-adapter provided in Chart.js as a side-effect when loaded. No registration is needed.

## Configuration

You can configure [displayFormats](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#display-formats) in Chart.js time options. See [date-fns documentation](https://date-fns.org/v1.30.1/docs/format) for available tokens.
This adapter provides following defaults:

    datetime: 'MMM D, YYYY, h:mm:ss a',
    millisecond: 'h:mm:ss.SSS a',
    second: 'h:mm:ss a',
    minute: 'h:mm a',
    hour: 'ha',
    day: 'MMM d',
    week: 'DD',
    month: 'MMM YYYY',
    quarter: '[Q]Q - YYYY',
    year: 'YYYY'

**Note:** This configuration section is not complete, consult [Chart.js documention](https://www.chartjs.org/docs/latest) for other possible date/time related options.

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

    > npm install

The following commands will then be available from the repository root:

    > gulp build            // build dist files
    > gulp build --watch    // build and watch for changes
    > gulp lint             // perform code linting

## License

`chartjs-adapter-date-fns` is available under the [MIT license](LICENSE.md).
