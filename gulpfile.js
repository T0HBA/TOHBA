import gulp from 'gulp';
import webpackStream from 'webpack-stream';

gulp.task('default', () => gulp.watch(['src/**/*.js'], () => {
    return gulp.src('src/**/*.js')
        .pipe(webpackStream({
            mode: 'production',
            output: {
                filename: 'TOHBA.min.js'
            }
        }))
        .pipe(gulp.dest('release'));
}));