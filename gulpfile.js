'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var file = require('gulp-file');
var { exec } = require('child_process');
var pkg = require('./package.json');

var argv = require('yargs')
	.option('output', { alias: 'o', default: 'dist' })
	.argv;

function run(bin, args, done) {
	var exe = '"' + process.execPath + '"';
	var src = require.resolve(bin);
	var ps = exec([exe, src].concat(args || []).join(' '));

	ps.stdout.pipe(process.stdout);
	ps.stderr.pipe(process.stderr);
	ps.on('close', () => done());
}

gulp.task('build', function(done) {
	run('rollup/bin/rollup', ['-c', argv.watch ? '--watch' : ''], done);
});

gulp.task('lint', function() {
	var files = [
		'src/**/*.js',
		'*.js'
	];

	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('bower', function() {
	var json = JSON.stringify({
		name: pkg.name,
		description: pkg.description,
		homepage: pkg.homepage,
		license: pkg.license,
		version: pkg.version,
		main: argv.output + '/' + pkg.name + '.js'
	}, null, 2);

	return file('bower.json', json, { src: true })
		.pipe(gulp.dest('./'));
});

gulp.task('default', gulp.parallel('build'));
