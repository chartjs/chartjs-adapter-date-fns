'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var { exec } = require('child_process');

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
	run('rollup/dist/bin/rollup', ['-c', argv.watch ? '--watch' : ''], done);
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

gulp.task('default', gulp.parallel('build'));
