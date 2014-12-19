var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify');

var jsIncludes = [
    'components/lodash/dist/lodash.js',
    'components/angular/angular.js',
    'components/angular-animate/angular-animate.js',
    'components/angular-cookies/angular-cookies.js',
    'components/angular-ui-router/angular-ui-router.js',
    'js/app.js',
    'js/**/module.js',
    'js/**/*.js'
];

var cssIncludes = [
    'less/app.less'
];
 
gulp.task('js', function () {
    gulp.src(jsIncludes)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
    gulp.src(cssIncludes)
        .pipe(less())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', ['css'], function () {
    gulp.watch('less/**/*.less', ['css']);
});