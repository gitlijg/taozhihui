var fs   = require('fs')
var yaml = require('js-yaml')
try { var options = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf-8')) }
catch (error) { throw new Error(error) }

var yargs = require('yargs').usage(options.yargs.usage, options.yargs.argv)

var gulp   = require('gulp')
var $if    = require('gulp-if')
var plugin = require('gulp-load-plugins')({
    rename: {
        'gulp-template': 'HTMLTemplate',
        'gulp-html-replace': 'HTMLReplace',
        'gulp-ng-annotate': 'annotate',
        'gulp-minify-html': 'minifyHTML',
        'gulp-angular-templatecache': 'ngTemplate',
    }
})

var errorHandler = function(error) {
    plugin.util.log(error.toString())
    this.emit('end')
}

gulp.task('help', function() { yargs.showHelp() })

var argv   = yargs.argv
var isDev  = (argv.e === 'dev')  ? true : false
var isProd = (argv.e === 'prod') ? true : false

gulp.task('html', function() {
    return gulp.src('public/index.template.html')
        .pipe(plugin.HTMLTemplate(argv))
        .pipe(plugin.rename('index.html'))
        .pipe($if(isProd, plugin.HTMLReplace(options.replacement)))
        .pipe(gulp.dest(options.path[argv.env]))
})

gulp.task('assets', function() {
    options.path.assets = isProd ?
        options.path.assets : options.path.assets.splice(0, 2)
    var outputPath = options.path[argv.env] + '/assets'
    return gulp.src(options.path.assets, { base: 'public/assets' })
        .pipe(gulp.dest(outputPath))
})

gulp.task('vendor', function() {
    var outputPath = options.path[argv.env] + '/assets'

    return gulp.src(options.path.vendor)
        //.pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat('vendor.js'))
        //.pipe($if(isDev, plugin.sourcemaps.write('.')))
        .pipe($if(isDev, gulp.dest(outputPath)))
        .pipe($if(isProd, plugin.rename('vendor.min.js')))
        .pipe($if(isProd, plugin.uglify()))
        .pipe($if(isProd, gulp.dest(outputPath)))
})

gulp.task('bundle', function() {
    var outputPath = options.path[argv.env] + '/assets'

    return gulp.src(options.path.bundle)
        .pipe(plugin.concat('admin.js'))
        //.pipe(plugin.sourcemaps.init())
        .pipe(plugin.annotate().on('error', errorHandler))
        //.pipe($if(isDev, plugin.sourcemaps.write('.')))
        .pipe($if(isDev, gulp.dest(outputPath)))
        .pipe($if(isProd, plugin.rename('admin.min.js')))
        .pipe($if(isProd, plugin.uglify()))
        .pipe($if(isProd, gulp.dest(outputPath)))
})

gulp.task('template', function() {
    var outputPath = options.path[argv.env] + '/assets'

    return gulp.src(options.path.template)
        .pipe(plugin.minifyHTML(options.minifyHTML))
        .pipe(plugin.ngTemplate(options.template))
        .pipe(plugin.rename('template.js'))
        .pipe(plugin.wrapper(options.wrapper))
        .pipe($if(isDev, gulp.dest(outputPath)))
        .pipe($if(isProd, plugin.rename('template.min.js')))
        .pipe($if(isProd, plugin.uglify()))
        .pipe($if(isProd, gulp.dest(outputPath)))
})

gulp.task('sass', function() {
    var outputPath = options.path[argv.env] + '/assets'

    options.sass.outputStyle = isProd ? 'compressed' : options.sass.outputStyle

    gulp.src(options.path.styles)
        //.pipe($if(isDev, plugin.sourcemaps.init()))
        .pipe(plugin.flatten())
        .pipe(plugin.sass(options.sass).on('error', errorHandler))
        .pipe(plugin.autoprefixer(options.autoprefixer))
        .pipe(plugin.stripCssComments({all: true}))
        //.pipe($if(isDev, plugin.sourcemaps.write('.')))
        .pipe(gulp.dest(outputPath))
})

var proxy       = require('proxy-middleware')
var _           = require('lodash')
var url         = require('url')
var browserSync = require('browser-sync')
gulp.task('serve', function() {
    if (isProd) { options.browserSync.server.baseDir = 'dist' }

    var proxyAPIMiddleware = proxy(
        _.assign(url.parse(options.proxyAPIURL), options.proxyAPI)
    )
    var proxyImageMiddleware = proxy(
        _.assign(url.parse(options.proxyImageURL), options.proxyImage)
    )
    options.browserSync.server.middleware.push(proxyAPIMiddleware)
    options.browserSync.server.middleware.push(proxyImageMiddleware)
    browserSync(options.browserSync)
})

gulp.task('watch', function() {
    gulp.watch('public/index.template.html', ['html'])
    gulp.watch(options.path.vendor, ['vendor'])
    gulp.watch(options.path.bundle, ['bundle'])
    gulp.watch(options.path.template, ['template'])
    gulp.watch([
        options.path.styles,
        "node_modules/bootstrap-sass/assets/stylesheets/**/*.scss"
    ], ['sass'])
})

gulp.task('default', plugin.sequence(
    ['html', 'assets', 'vendor', 'bundle', 'template', 'sass'],
    isDev ? ['serve', 'watch'] : undefined
))
