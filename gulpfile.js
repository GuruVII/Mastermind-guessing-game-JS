var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var flatten = require("gulp-flatten");
var webserver = require("gulp-webserver");

//scripts task

gulp.task('scripts', function () {

	//JS which will run



gulp.src(['!src/app.js','src/**/*.js'])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(notify('Javascript dela'));


gulp.src(['src/app.js'])
	.pipe(gulp.dest('dist/js'))
	.pipe(notify('prenešen app.js'));


});

gulp.task('moveBower',function(){
gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css','bower_components/bootstrap/dist/css/bootstrap-theme.min.css'])
	.pipe(flatten())
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(notify('Moved bower bootstrap CSS components to dist/assets/css'));

gulp.src(['bower_components/bootstrap/dist/js/bootstrap.min.js','bower_components/bootstrap/dist/js/npm.js'])
	.pipe(flatten())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(notify('Moved bower bootstrap js components to dist/assets/css'));

gulp.src(['bower_components/**/*.ttf', 'bower_components/**/*.woff'])
	.pipe(flatten())
	.pipe(gulp.dest('dist/assets/css/fonts'))
	.pipe(notify('Moved bower fonts components to dist/assets/fonts'));

gulp.src(['bower_components/angular-resource/angular-resource.min.js','angular-resource.min.js.map'])
	.pipe(flatten())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(notify('Moved bower fonts components to dist/assets/js'));
gulp.src(['bower_components/jquery/dist/jquery.min.js'])
	.pipe(flatten())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(notify('Moved bower jquery assets to dist/assets/js')
	);
});

gulp.task('move', function () {
//Set the source. You can exclude files with !
gulp.src(["!./src/index.html", "./src/**/*.html"])
//remove any reative golder, subfolders
.pipe(flatten())
.pipe(gulp.dest("./dist/templates"))
.pipe(notify("moved templates"));

//Set the source. You can exclude files with !
gulp.src(["./src/index.html"])
//remove any reative golder, subfolders
.pipe(flatten())
.pipe(gulp.dest("./dist"))
.pipe(notify("moved index"));


//Set the source. You can exclude files with !
gulp.src(["./src/**/*.css"])
//remove any reative golder, subfolders
.pipe(concat('style.css'))
.pipe(flatten())
.pipe(gulp.dest("./dist/css"))
.pipe(notify("moved css"));

});

gulp.task("serve", function(){
gulp.src(".")

//Start a webserver with livereload on localhost:48081
.pipe(webserver({
port: 48081,
livereload: true,
open: "http://localhost:48081/dist/index.html"
})).pipe(notify("Running webserver!"));

});

//Task for running watcher. WHen watch is called
//the serve rask will be called as well


gulp.task('watch', ['serve'], function () {
    gulp.start(['scripts','move','moveBower']);
    gulp.watch(['src/**/*.js'],['scripts']);
    gulp.watch(['src/**/*.html'],['move']);
    gulp.watch(['bower_components/**/*.js'],['moveBower']);
    gulp.watch(['bower_components/**/*.css'],['moveBower']);
    gulp.watch(['bower_components/**/*.woff','bower_components/**/*.ttf' ],['moveBower']);
    gulp.watch(['bower_components/bootstrap/dist/js/*.js'],['moveBower']);
    

});
