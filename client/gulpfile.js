/**
 * Created by cwarren on 10/4/16.
 */
var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');
var path = require('path');


/**
 * Build (Webpack)
 */

gulp.task('clean:build', function() {
    del('../server/static/js/*')
});

gulp.task('build', ['clean:build'], function() {
    return gulp.src('./app/app.js')
        .pipe(webpack(webpackConfig))
        .on('error', function handleError() {
            this.emit('end'); // Recover from errors
        })
        .pipe(gulp.dest('./'));
});

gulp.task('watch:build', function() {
    return gulp.watch('./app/**/*', ['build']);
});


/**
 * Node Server (Express)
 */

gulp.task('serve:node', function(done) {
    var babelPath = path.join(__dirname, 'node_modules/.bin/babel-node');
    nodemon({
        exec: babelPath + ' ./server.js',
        watch: ['server.js'],
        ext: 'js html'
    });
});


/**
 * Main tasks
 */

gulp.task('clean', ['clean:build'])
gulp.task('serve', ['serve:node']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['serve']);