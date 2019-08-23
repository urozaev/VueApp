let gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify-es').default,
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  // browserSync = require('browser-sync').create(),
  paths = {
    css: ['styles/dist/*.css'],
    sass: ['styles/dist/*.sass','styles/dist/*.scss'],
    js: ['js/dist/*.js']
  },
  dest = {
    compiled: ['styles/dist'],
    css: ['styles/min'],
    js: ['js/min']
  };

// gulp.task('serve', function() {
//   browserSync.init({
//       server: {
//           baseDir: "local/templates/ipdesign_vizitka"
//       }
//   });
// });

//Uglify
gulp.task("uglify", () => {
  return gulp.src(paths.js)
      .pipe(rename(function (path) {
        path.basename += "-min";
        // path.extname += ".js";
      }))
      .pipe(uglify(/* options */))
      .pipe(gulp.dest(dest.js))
      // .on('end',browserSync.reload);
});

//Sass
gulp.task('sass', function() {
  return gulp.src(paths.sass) //Берем источник
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //Преобразуем Sass в CSS
      .pipe(gulp.dest(dest.compiled))
});

//Minify-css
gulp.task('minify-css', () => {
return gulp.src(paths.css)

  .pipe(rename(function (path) {
    path.basename += "-min";
    // path.extname += ".js";
  }))
  .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest(dest.css))
  // .pipe('end',browserSync.reload({
  //   stream:true
  // }));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, gulp.series('sass'))
  gulp.watch(paths.css, gulp.series('minify-css'))
  gulp.watch(paths.js, gulp.series('uglify'))
})

gulp.task('default', gulp.series(
  gulp.series('sass','minify-css','uglify'),
  'watch'
));