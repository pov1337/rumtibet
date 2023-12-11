
const gulp = require('gulp')

const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const htmlmin = require('gulp-htmlmin')
const include = require('gulp-file-include')
const csso = require('gulp-csso')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const server = require('gulp-server-livereload')
const ghPages = require('gulp-gh-pages')    


gulp.task('html', function() {
    return src('src/*.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe((htmlmin)({
            collapseWhitespace: true
        }))
        .pipe(dest('dist')) 

})

gulp.task('style', function(){
    return src(['src/sass/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
})




gulp.task('js', () => {
    return gulp.src('src/js/**.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images',function (){
    return src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('server', function () {
    return gulp.src('dist/', { allowEmpty: true })
        .pipe(server({
            livereload: true,
            open: true,
            
        }))
})

gulp.task('watch', function (){
    gulp.watch('src/css/*.css', gulp.parallel('style'))
    gulp.watch('src/*.html', gulp.parallel('html'))
    gulp.watch('src/img/**', gulp.parallel('images'))
    gulp.watch('src/js/**.js', gulp.parallel('js'))


})

gulp.task('clean', function (){
    return gulp.src('./dist/', {read: false, allowEmpty: true})
        .pipe(clean())
})

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'style', 'images'), gulp.parallel('js', 'server','watch')))