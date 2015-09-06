var gulp = require("gulp"),
	jade = require('gulp-jade'),
	prettify = require('gulp-prettify'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	gulpif = require('gulp-if'),
	filter = require('gulp-filter'),
	size = require('gulp-size'),
	imagemin = require('gulp-imagemin'),
	minifyCss = require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	gutil = require('gulp-util'),
	ftp = require('vinyl-ftp'),
	reload = browserSync.reload,
	uncss = require('gulp-uncss'),
	sass = require('gulp-sass');

// ====================================================
// ====================================================
// ============== Локальная разработка APP ============

// Компилируем Jade в html
gulp.task('jade', function () {
	gulp.src('app/jade/pages/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.on('error', log)
	.pipe(gulp.dest('app/'))
	.pipe(reload({stream: true}));
});

// Компилируем scss в css
gulp.task('scss', function () {
	gulp.src('app/scss/main.scss')
	.pipe(sass())
	.on('error', log)
	.pipe(gulp.dest('app/css'))
	.pipe(reload({stream: true}));
});

// Запускаем локальный сервер (только после компиляции jade)
gulp.task('server', ['jade'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});



// Подключаем ссылки на bower
gulp.task('wiredep', function() {
	gulp.src('app/templates/common/*.jade')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app/templates/common/'))
});

// слежка и запуск задач
gulp.task('watch', function () {
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch([
		'app/js/**/*.js',
		'app/css/*.css',
		'app/*.html'
	]).on('change', reload);
});


// по команде gulp происходит всё что выше
gulp.task('default', ['server', 'watch']);

// ====================================================
// ====================================================
// ===================== Функции ======================

// сообщение возникающее при ошибке
var log = function (error) {
  console.log([
	'',
	"----------ERROR MESSAGE START----------",
	("[" + error.name + " in " + error.plugin + "]"),
	error.message,
	"----------ERROR MESSAGE END----------",
	''
  ].join('\n'));
  this.end();
};

// ====================================================
// ====================================================
// ================= Сборка DIST ======================

// Очистка папки dist
gulp.task('clean', function() {
	return gulp.src('dist')
		.pipe(clean());
});

// Переносим HTML, CSS, JS в папку dist
gulp.task('useref', function () {
	var assets = useref.assets();
	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

// Перенос шрифтов в dist
gulp.task('fonts', function() {
	gulp.src('app/fonts/*')
		.pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
		.pipe(gulp.dest('dist/fonts/'))
});

// Картинки в dist
gulp.task('images', function () {
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img'));
});

// Остальные файлы, такие как favicon.ico и пр.

gulp.task('extras', function () {
	return gulp.src([
		'app/*.*',
		'app/.htaccess',
		'!app/*.html'
	]).pipe(gulp.dest('dist'));
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// удаляем лишний css
gulp.task('uncss', function () {
	return gulp.src('dist/css/*.css')
		.pipe(uncss({
			html: ['dist/*.html']
		}))
		.pipe(gulp.dest('dist/css'));
});

// ОСНОВНАЯ команда для сборки gulp-build
gulp.task('build', ['clean', 'jade'], function () {
	gulp.start('dist')
		.start('uncss');
});

// сервер для dist gulp server-dist - проверка сборки
gulp.task('server-dist', function() {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'dist'
		}
	});
});

// deploy на хостинг gulp deply
gulp.task('deploy', function() {
	var conn = ftp.create({
		host: '',
		user: '',
		password: '',
		parallel: 10,
		log: gutil.log
	});

	var globs = [
		'dist/**/*'
	];

	return gulp.src(globs, { base: 'dist/', buffer: false})
		.pipe(conn.dest('public_html/'));
});
