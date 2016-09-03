var handlebars = require('gulp-compile-handlebars');
var inline = require('gulp-inline');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var gulp = require('gulp');
var helpers = require('handlebars-helpers');
var fs = require('fs');


exports.fbc = function(data, dest){
    data.actors = JSON.parse(fs.readFileSync('actors.json')).results;
    var opts = { };

    helpers({
        handlebars: handlebars.Handlebars
    });

    gulp.src('fb.hbs')
        .pipe(handlebars(data, opts))
        .pipe(inline())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS:true,
            minifyCSS:true,
            removeComments:true
        }))
        .pipe(rename('fb.html'))
        .pipe(gulp.dest(dest));
};