const gulp = require('gulp');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');

gulp.task('default', () =>
    gulp.src('src/**/*', {base: 'src'})
        .pipe(plumber())
        .pipe(imagemin([
            imageminJpegRecompress({
                loops:6,
                min: 40,
                max: 85,
                quality:'low',
                progressive: true
            }),
            imageminPngquant({
                speed: 1,
                quality: 70-90, //lossy settings
                floyd: 1
            }),
            imageminZopfli({
                more: true
            }),
            imagemin.gifsicle({interlaced: true}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('dist'))
);