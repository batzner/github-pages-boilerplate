'use strict';

/**
 * Basic concept follows https://www.justinmccandless.com/post/a-tutorial-for-getting-started-with-gulp/
 */
const gulp = require('gulp');

// Include plug-ins
const babel = require('gulp-babel');

// Base for specifying paths in gulp.src and gulp.dest
const distDir = './';

// Copy all files to the dist directory. On the master-branch, we cannot clean the dist directory
// first if it is the root directory.
function _copy() {
    return gulp.src(['src/**/*']).pipe(gulp.dest(distDir));
};

// Transpile the javascript files in the dist directory (in-place)
function _javascripts() {
    return gulp.src('js/**/*.js', {base: distDir, cwd: distDir})
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest(distDir));
};

// Default task producing a jekyll-ready site in the dist folder
gulp.task('default', gulp.series(_copy, _javascripts));

// Run Jekyll
gulp.task('jekyll', gulp.series('default', function (gulpCallBack) {
    let spawn = require('child_process').spawn;
    let jekyll = spawn('jekyll', ['serve'], {stdio: 'inherit'});

    jekyll.on('exit', function (code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
}));
