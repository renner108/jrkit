//load prerequisities
//---------------------
const gulp = require('gulp')
const { series, parallel } = require('gulp')
//code
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const rollup = require('gulp-better-rollup')
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
//html
const fileInclude = require('gulp-file-include')
const strip = require('gulp-strip-comments')
const pretty = require('@nean/gulp-pretty')
const minifyInline = require('gulp-minify-inline')
const validator = require('gulp-w3c-html-validator')
//const markdown = require('markdown')
//assets
const favicon = require('gulp-real-favicon')
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminZopfli = require('imagemin-zopfli')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminGiflossy = require('imagemin-giflossy')
//utils
const _ = require('lodash')
const beep = require('beepbeep')
const cache = require('gulp-cache')
const plumber = require('gulp-plumber')
const filter = require('gulp-filter')
const rename = require('gulp-rename')
const replaceName = require('gulp-replace-name')
const replace = require('gulp-replace')
const eol = require('gulp-eol')
const gulpif = require('gulp-if')
const debug = require('gulp-debug')
const using = require('gulp-using')
const tap = require('gulp-tap')
const del = require('del')
const fs = require('fs')
const pathResolve = require('path').resolve
const argv = require('yargs').argv
const es = require('event-stream')
const c = require('ansi-colors')
//https://github.com/microsoft/terminal/issues/1802#issuecomment-508960470
//chcp.com 65001

//init
const init = require('./html/init/scripts/init')
init.loaded()


//load data
//------------
const PACKAGE_DATA = JSON.parse(fs.readFileSync('./package.json'))
const PROJECT_SETTINGS = JSON.parse(fs.readFileSync('./project.json'))
function collectData() {
  const socialsArray = ((o) => {
    let a = []
    Object.values(o).forEach(v => v && a.push(v))
    return a
  })(PROJECT_SETTINGS.socials)
  const socialsJson = JSON.stringify(socialsArray)
  const data = {
    'package': PACKAGE_DATA,
    'project': PROJECT_SETTINGS,
    'socials': {
      'object': PROJECT_SETTINGS.socials,
      'array': socialsArray,
      'json': socialsJson
    },
    'now': (new Date().toISOString().replace('T', ' ').substr(0, 19)),
    'includeRobotsProduction': argv.rp ? true : false,
    'verbose': argv.verbose ? true : false,
    'currentFile': false,
    'currentPage': false,
    'current': false
  }
  //functions
  if (data.project.support.tel) data.project.support.tel__nospaces = String(data.project.support.tel).replace(/\s/g, '')
  return data
}
const DATA = collectData()
global.DATA = DATA
//console.log(DATA)

//cli
const cc = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}
cc.azure = cc.cyan
cc.purple = cc.magenta
var ERRORS = false


//Code
//======

//private functions
//compiles src/scss/index.php file to dist/css/index.css
function style(done, isProduction = false, verbose = false) {
  let imported = []
  verbose = verbose || argv.verbose
  return gulp.src('src/scss/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        importer: (url, prev, done) => {
          let path = pathResolve(
            (prev.replace(/(\\|\/)[^\\\/]*$/, '') + '/' + url)
              .replace(/^.*(\\|\/)node_modules(\\|\/)/, 'node_modules$2')
          )
          if (verbose) console.log(prev, '<- ' + url)
          //import once
          if (imported.indexOf(path) >= 0) {
            if (verbose) console.log(cc.purple, '[path already imported: skipping file]', cc.reset)
            return { contents: '' }
          }
          imported.push(path)
          //determine file type
          let cssPath = path + '.css'
          let scssPath = path + '.scss'
          let scss_Path = pathResolve(path.replace(/(\\|\/)([^\\\/]*)$/, '\/_$2') + '.scss')
          let scssFile = fs.existsSync(scss_Path) ? scss_Path : (fs.existsSync(scssPath) ? scssPath : false)
          let cssFile = scssFile ? false : (fs.existsSync(cssPath) ? cssPath : false)
          let file = scssFile || cssFile
          if (!file) {
            if (verbose) console.log(cc.red, 'File not found!', cc.reset)
            if (verbose) console.log(cc.dim, 'tried paths:\n' + scss_Path + '\n' + scssPath + '\n' + cssPath, cc.reset)
            return null
          }
          let filesize = fs.statSync(file).size
          if (verbose) console.log(cc.dim, 'file: ' + file, '~' + Math.ceil(filesize / 1024) + 'kB', cc.reset)
          //skip empty files
          if (!filesize) {
            if (verbose) console.log(cc.purple, '[empty file]', cc.reset)
            return null
          }
          //skip CSS files
          if (cssFile) {
            let contents = fs.readFileSync(cssFile).toString()
            //console.log(contents)
            //SASS vs. CSS min() max() workaround
            //https://css-tricks.com/when-sass-and-new-css-features-collide/
            contents = contents.replace(/(\s|:|\(|\)|,)(min)\(/g, '$1Min(')
            contents = contents.replace(/(\s|:|\(|\)|,)(max)\(/g, '$1Max(')
            //console.log(contents)
            if (verbose) console.log(cc.yellow, '[imported as pure CSS]', cc.reset)
            return { contents: contents }
          }
          //continue with SASS
          if (verbose) console.log(cc.azure, '[parsed with SASS -> CSS]', cc.reset)
          return null
        }
      })
      .on('complete', () => console.log(sass.compiler.info))
      //https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch#toc-swallow-the-error
      .on('error', (err) => {
        console.log(cc.red, _.trim(err.formatted), cc.reset)
        console.log(cc.azure, '\n' + _.trim(sass.compiler.info), cc.reset)
        ERRORS = true
        beep()
      }))
    .pipe(gulpif(isProduction, autoprefixer()))
    .pipe(gulpif(isProduction, cleanCss({ compatibility: 'ie9' })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
}

//rollup logging plugins
function _logRollInput(verbose) {
  return {
    name: '_logRollInput',
    resolveId: function (string, importer) {
      if (verbose || argv.verbose) console.log(cc.dim, importer, '<- ' + string, cc.reset)
      return null
    }
  }
}
function _logRollOutput(verbose) {
  return {
    name: '_logRollOutput'
  }
}

//compiles src/js/index.js file to dist/js/index.js
function compile(done, isProduction = false, verbose = false) {
  verbose = verbose || argv.verbose
  return gulp.src(isProduction ? 'src/js/*.js' : 'src/js/index.js')
    .pipe(gulpif(verbose, using()))
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        //inputOptions
        //https://github.com/MikeKovarik/gulp-better-rollup
        //@see https://rollupjs.org/guide/en/#inputoptions-object
        {
          plugins: [
            resolve(),
            _logRollInput(verbose),
            //babel presets are in package.json
            //https://stackoverflow.com/a/56116292/14314001
            babel()
          ],
          onwarn: (warn) => {
            if (['THIS_IS_UNDEFINED', 'SOURCEMAP_ERROR'].indexOf(warn.code) >= 0) return
            if (typeof warn.message !== 'undefined') console.log(cc.yellow, warn.message, cc.reset)
            if (typeof warn.loc === 'object') console.log(cc.yellow, cc.dim, '\n' + warn.loc.file, warn.loc.line, cc.reset)
          },
          treeshake: isProduction
        },
        //outputOptions
        //@see https://rollupjs.org/guide/en/#outputoptions-object
        {
          format: 'iife',
          plugins: [
            _logRollOutput(verbose)
          ]
        }
      )
    )
    .on('error', (err) => {
      beep()
      console.log(err)
      ERRORS = true
    })
    //omg, https://github.com/dimsemenov/PhotoSwipe/issues/1388
    .pipe(replace('root.PhotoSwipe = factory();', 'root = window; root.PhotoSwipe = factory();'))
    .pipe(replace('root.PhotoSwipeUI_Default = factory();', 'root = window; root.PhotoSwipeUI_Default = factory();'))
    //omg^2
    .pipe(replace(/Popper(\$[0-9]+)?\.Defaults = Defaults;/, 'Popper$1.Defaults = Defaults; window.Popper = Popper$1;'))
    //omg
    .pipe(gulpif(isProduction, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }))
}

//enters watchmode and runs server
function watch(done, serverOnly = false) {
  serverOnly = serverOnly || argv.so || argv.s || argv.o
  if (!serverOnly) {
    style(done)
    compile(done)
    //htmlDelete(done)
    htmlMake(done)
    canonical(done)
    publish(done)
  }
  browserSync.init({
    server: {
      baseDir: '.',
      index: '/index.html'
    }
  })
  if (serverOnly) return
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], () => style(done))
  gulp.watch(['src/js/*.js', 'src/js/**/*.js']).on('change', () => compile(done))
  gulp.watch(['./*.html', './html/*.{html,htm,tpl,txt,md}', './project.json']).on('change', () => (htmlMake(done) && canonical(done) && browserSync.reload()))
  gulp.watch(['src/assets/**/*.{jpeg,jpg,gif,png,svg}']).on('change', () => (publish(done) && browserSync.reload()))
}
//runs server only
function serve(done) {
  watch(done, true)
}

//export tasks
exports.style = exports.s = done => style(done, false, true)
exports.compile = exports.c = done => compile(done, false, true)
exports.watch = exports.w = watch
exports.serve = exports.srv = exports.so = serve
//compiles all CSS and JS src files to dist/ autoprefixed and minified
exports.prod = series(done => style(done, true, argv.verbose), done => compile(done, true, argv.verbose), htmlDelete, htmlMake, canonical, publish)
//compiles CSS and JS index files to dist/
exports.dev = series(style, compile, htmlDelete, htmlMake, canonical, publish)


//Assets
//========

//images
//--------
//private functions
//copies all doc and web image file types from src/ to dist/
function assetsPublish() {
  return gulp.src('src/assets/**/*.{jpeg,jpg,gif,webp,png,svg,apng,ico,pdf,doc,docx,txt}')
    //ommit specific filenames
    .pipe(filter(file => !(/(\/|\\)_/).test(file.path)))
    .pipe(filter(file => !(/^(readme|todo)\./i).test(file.basename)))
    //rename .fw.png -> .png
    .pipe(replaceName(/\.fw.png$/, '.png'))
    .pipe(gulp.dest('dist/assets'))
}
//copies PNG files only if does not end with .fw.png
function assetsPublishNotFw() {
  return gulp.src('src/assets/**/*.png')
    //ommit path with /_
    .pipe(filter(file => !(/(\/|\\)_/).test(file.path)))
    .pipe(filter(file => !(/\.fw\.png$/).test(file.basename)))
    .pipe(gulp.dest('dist/assets'))
}

//optimizes images in dist/assets/
//@see https://gist.github.com/LoyEgor/e9dba0725b3ddbb8d1a68c91ca5452b5
function assetsOptimize() {
  //JPEG settings
  let imageminMozjpegQuality = argv.jq || 73
  //PNG settings
  let imageminPngquantSpeed = 3
  let imageminPngquantQuality = [0.6, 0.9]
  let imageminPngquantDithering = 0.3
  let imageminPngquantStrip = true
  let imageminZopfliMore = true
  let imageminZopfliIterations = 4
  imageminZopfliIterations = argv.zi || imageminZopfliIterations
  //log settings
  //JPEG
  console.log(cc.azure, 'JPEG imageminMozjpegQuality: ' + imageminMozjpegQuality, cc.reset)
  //PNG
  console.log(cc.azure, 'PNG imageminPngquantSpeed: ' + imageminPngquantSpeed, cc.reset)
  console.log(cc.azure, 'PNG imageminPngquantQuality: ' + imageminPngquantQuality, cc.reset)
  console.log(cc.azure, 'PNG imageminPngquantDithering: ' + imageminPngquantDithering, cc.reset)
  console.log(cc.azure, 'PNG imageminPngquantStrip: ' + imageminPngquantStrip, cc.reset)
  console.log(cc.azure, 'PNG imageminZopfliMore: ' + imageminZopfliMore, cc.reset)
  console.log(cc.azure, 'PNG imageminZopfliIterations: ' + imageminZopfliIterations, cc.reset)
  console.log(cc.yellow, 'optimizing images... may take ' + Math.ceil(imageminZopfliIterations * 1.5 + 1) + ' minutes', cc.reset)
  //run optimization
  return gulp.src('dist/assets/**/*.{jpeg,jpg,gif,png,svg}')
    .pipe(imagemin([
      imageminMozjpeg({
        quality: imageminMozjpegQuality
      }),
      imageminGiflossy({
        optimizationLevel: 3,
        //optimize: 'keep-empty' Preserves empty transparent frames (they are dropped by default)
        optimize: 3,
        lossy: 2
      }),
      imageminPngquant({
        //Speed/quality trade-off from 1 (brute-force) to 10 (fastest).
        //The default is 3. Speed 10 has 5% lower quality, but is 8 times faster
        speed: imageminPngquantSpeed,
        //min and max are numbers in range 0 (worst) to 100 (perfect), similar to JPEG. lossy.
        //Instructs pngquant to use the least amount of colors required to meet or exceed the max quality.
        //If conversion results in quality below the min quality the image won't be saved
        quality: imageminPngquantQuality,
        //Set the dithering level using a fractional number between 0 (none) and 1 (full).
        //Pass in false to disable dithering.
        dithering: imageminPngquantDithering,
        //Remove optional metadata
        strip: imageminPngquantStrip,
        verbose: true
      }),
      //Zopfli is data compression software that encodes data into DEFLATE, gzip and zlib formats
      //lossless. One iteration on default bundle (80 images originally 34 MB) takes cca 1-2 mins
      imageminZopfli({
        //Compress more using more iterations (depending on file size)
        more: imageminZopfliMore,
        //perform # iterations (default 15). More gives more compression but is slower
        iterations: imageminZopfliIterations
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest('dist/assets'))
      .on('end', () => beep(2))
}

function copyCovers() {
  return gulp.src([
      'dist/assets/brand/{icon,logo,thumbnail}.png',
      'dist/assets/cover/cover.png',
      'dist/assets/facebook/facebook.png'
    ])
    .pipe(gulp.dest('./'))
}

function publish(done) {
  assetsPublish()
  assetsPublishNotFw()
  return done() || true
}

function clearCache(done) {
  cache.clearAll()
  return done()
}

//export tasks
exports.assets = exports.a = series(assetsPublish, assetsPublishNotFw, assetsOptimize, copyCovers)
exports.publish = exports.p = series(assetsPublish, assetsPublishNotFw, copyCovers)
exports.optimize = exports.o = series(assetsOptimize, copyCovers)
exports.covers = copyCovers
exports.clear = clearCache

//favicons
//----------
const FAVICON_PICTURE = {
  master: './dist/assets/brand/icon.transparent.png',
  ios: './dist/assets/brand/icon__reverse.png',
  windows: './dist/assets/brand/icon__monochrome.transparent.png',
  android: './dist/assets/brand/icon__reverse.png',
  safari: './dist/assets/brand/icon__monochrome.transparent.png'
}
const FAVICON_DATA_FILE = './faviconData.json'
const FAVICON_HTML_FILE = './html_code.html'

//private functions
//generates icons for all devices
function faviconGenerate(done) {
  console.log(cc.yellow, 'generating favicons... may take 1 minute', cc.reset)
  favicon.generateFavicon({
    masterPicture: FAVICON_PICTURE.master,
    dest: './',
    iconsPath: '/',
    design: {
      ios: {
        masterPicture: FAVICON_PICTURE.ios,
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: DATA.project.favicon.themeColor,
        margin: '14%',
        assets: {
          ios6AndPriorIcons: true,
          ios7AndLaterIcons: true,
          precomposedIcons: true,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {
        design: 'raw'
      },
      windows: {
        masterPicture: FAVICON_PICTURE.windows,
        pictureAspect: 'whiteSilhouette',
        backgroundColor: DATA.project.favicon.themeColor,
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: true,
          windows10Ie11EdgeTiles: {
            small: true,
            medium: true,
            big: true,
            rectangle: true
          }
        }
      },
      androidChrome: {
        masterPicture: FAVICON_PICTURE.android,
        pictureAspect: 'backgroundAndMargin',
        margin: '13%',
        backgroundColor: DATA.project.favicon.themeColor,
        themeColor: DATA.project.favicon.themeColor,
        manifest: {
          name: DATA.project.favicon.appname,
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: true
        }
      },
      safariPinnedTab: {
        masterPicture: FAVICON_PICTURE.safari,
        pictureAspect: 'silhouette',
        themeColor: DATA.project.favicon.themeColor
      }
    },
    settings: {
      compression: 1,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: true,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, () => {
    beep(2)
    done()
  })
}

//relocates HTML code for icons to html/__html-meta-icons.html
function faviconHtml() {
  return gulp.src(FAVICON_HTML_FILE)
    .pipe(using())
    .pipe(eol())
    .pipe(replace('href="/', 'href="{{project.devel.root}}/'))
    .pipe(replace('content="/', 'content="{{project.devel.root}}/'))
    .pipe(rename('__html-meta-icons.html'))
    .pipe(gulp.dest('html'))
}

function faviconHtmlDelete(done) {
  del(FAVICON_HTML_FILE).then(() => done())
}

function faviconWebmaifest() {
  return gulp.src('./site.webmanifest')
    .pipe(using())
    .pipe(replace('"/android', '"./android'))
    .pipe(gulp.dest('./'))
}

//checks for gulp-real-favicon updates
function faviconUpdate(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version
	favicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err
		}
	})
  return done()
}

//export tasks
exports.figen = faviconGenerate
exports.fihtm = exports.fihtml = series(faviconHtml, faviconHtmlDelete, faviconWebmaifest)
exports.fiu = faviconUpdate
//completes all favicons tasks and checks for updates
exports.favicon = exports.fi = exports.f = series(faviconGenerate, faviconHtml, faviconHtmlDelete, faviconWebmaifest, faviconUpdate)


//Templating
//============

//static HTML
//------------
//private functions
function htmlMake(done) {
  let currentFile, currentPage, current
  let injectData = function (match) {
    let key = match.replace(/{|}/g, '')
    let value = _.get(DATA, key)
    if (value !== undefined) return String(value)
    return match
  }
  if (!DATA.init) init.initData(done)
  return gulp.src('html/*.html')
    .pipe(gulpif(argv.verbose, using()))
    //get data for view
    .pipe(tap(file => currentFile = file.path))
    .pipe(tap(file => currentPage = file.basename.replace(/\.htm(l)?$/, '')))
    .pipe(tap(file => current = DATA.project.sitemap[currentPage]))
    .pipe(tap(() => {
      if (argv.verbose) console.log(cc.dim, 'currentFile: ', currentFile, cc.reset)
      if (argv.verbose) console.log(cc.dim, 'currentPage: ', currentPage, cc.reset)
      if (argv.verbose) console.log(cc.dim, 'current: ', current ? cc.magenta : cc.red, current, cc.reset)
      global.DATA.currentFile = DATA.currentFile = currentFile
      global.DATA.currentPage = DATA.currentPage = currentPage
      global.DATA.current = DATA.current = current
    }))
    //just log
    //templates, e.g. __html-header.html, are using DATA.includeRobotsProduction
    .pipe(gulpif(argv.rp, replace(/__html-meta-robots-production.html/g, match => {
      console.log(cc.bright, cc.magenta, 'HEADS UP!', cc.white, 'will include __html-meta-robots-production.html!', cc.reset)
      console.log(cc.white, cc.dim, currentFile, cc.reset)
      return '__html-meta-robots-production.html'
    })))
    //include partials
    .pipe(gulpif(argv.verbose, tap(file => console.log(cc.dim, 'HTML <-', cc.azure, currentFile, cc.reset))))
    .pipe(fileInclude({
      filters: {
        //md: markdown.parse
      }
    }))
    //check {{data}}, just log warnings
    .pipe(replace(/{{[^}]+}}/g, match => {
      if ('{{canonical}}' === match) return match
      let key = match.replace(/{|}/g, '')
      let value = _.get(DATA, key)
      if (value !== undefined && value !== '') return match
      console.log(cc.yellow, 'value for tag ' + match + ' not found or empty string', cc.reset)
      console.log(cc.yellow, cc.dim, currentFile, cc.reset)
      return match
    }))
    //inject {{data}}
    .pipe(gulpif(argv.verbose, tap(file => console.log(cc.dim, '{{}} <-', cc.azure, currentFile, cc.reset))))
    .pipe(replace(/{{[^}]+}}/g, injectData))
    //2nd iteration to allow self-references in project.json
    .pipe(replace(/{{[^}]+}}/g, injectData))
    //clear data for view
    .pipe(tap(() => {
      global.DATA.currentFile = DATA.currentFile = currentFile = false
      global.DATA.currentPage = DATA.currentPage = currentPage = false
      global.DATA.current = DATA.current = current = false
    }))
    //strip HTML comments
    .pipe(strip())
    //format final HTML
    .pipe(pretty({
      ocd: true,
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'script']
    }))
    //nimify inline scripts and CSS
    .pipe(minifyInline())
    //insert trailing newline
    .pipe(eol())
    .pipe(gulp.dest('html/static'))
}

//canonical
function canonical() {
  let currentFileName = ''
  return gulp.src('html/static/*.html')
    .pipe(replaceName(/^.+$/, match => (currentFileName = match)))
    .pipe(replace(/{{canonical}}/g, match => {
      return DATA.project.devUrl.replace(/\/$/, '') + '/html/static/' + currentFileName
    }))
    .pipe(gulp.dest('html/static'))
}

//copy error files to root
function htmlCopy() {
  return gulp.src('html/static/error-*.html')
    .pipe(gulpif(argv.verbose, using()))
    .pipe(gulp.dest('./'))
}

//validation
function htmlValidate() {
  let notPartials = filter(file => (/^([^_]|___)/).test(file.basename))
  let errors = false
  return gulp.src('html/static/*.html')
    .pipe(gulpif(argv.verbose, using()))
    .pipe(notPartials)
    .pipe(validator({
      skipWarnings: true,
      verifyMessage: (type, message) => {
        if (type === 'error') {
          //whitelist
          let whitelist = [
            'Attribute “autocorrect” not allowed on element “input” at this point.'
          ]
          if (whitelist.indexOf(message) >= 0) {
            console.log(cc.dim, 'Whitelisted validation error: ' + message)
            return false
          }
          ERRORS = errors = true
          beep()
        }
        return true
      }
    }))
    .pipe(gulp.dest('html/static'))
      .on('end', () => errors ?
        console.log(cc.red, 'There were validation errors.', cc.reset) :
        console.log(cc.green, 'All HTML is valid.', cc.reset))
}

//prepare gtm_container.json file
function gtmMake() {
  let errors = []
  return gulp.src('html/gtm_container.json')
    .pipe(using())
    //inject {{data}}
    .pipe(replace(/%%[^%]+%%/g, match => {
      let key = match.replace(/%/g, '')
      let value = _.get(DATA, key)
      //log warnings
      if (value !== undefined && value !== '') return String(value)
      if (errors.indexOf(match) < 0) {
        console.log(cc.yellow, 'value for tag ' + match + ' not found or empty string', cc.reset)
        errors.push(match)
      }
      if (value !== undefined) return String(value)
      return match
    }))
    .pipe(rename('gtm_container.json'))
    .pipe(gulp.dest('html/static'))
}

function htmlDelete(done) {
  del('html/static/*.html').then(() => setTimeout(done, 2000))
}

//export tasks
exports.gtm = exports.g = gtmMake
exports.make = exports.m = series(clearCache, htmlDelete, htmlMake, canonical)
exports.html = exports.h = series(clearCache, htmlDelete, htmlMake, canonical, htmlCopy, gtmMake, robots, humans)
exports.validate = exports.v = htmlValidate

//robots.txt
//------------
//private functions
//writes robots.txt from robots.development.txt or robots.production.txt
function robots(done, isProduction = false) {
  return gulp.src(gulpif(argv.rp || isProduction, 'html/robots.production.txt', 'html/robots.development.txt'))
    .pipe(using())
    .pipe(replace('{{date}}', new Date().toISOString().replace('T', ' ').substr(0, 19)))
    .pipe(replace('{{home}}', DATA.project.productionUrl.replace(/\/$/, '')))
    .pipe(rename('robots.txt'))
    .pipe(gulp.dest('./'))
}

//writes humans.txt from humans.template.txt
function humans() {
  return gulp.src('html/humans.txt')
    .pipe(using())
    .pipe(replace('{{date}}', new Date().toUTCString()))
    .pipe(rename('humans.txt'))
    .pipe(gulp.dest('./'))
}

//export tasks
exports.robots = robots
exports.humans = humans


//Deploy
//========

//private functions
function completed(done) {
  ERRORS ?
    console.log(cc.red, cc.bright, 'Failed. There were errors.', cc.reset) :
    console.log(cc.green, cc.bright, 'Ready to deploy! :)', '\n', '=======================', cc.reset)
    if (!argv.rp) console.log(cc.yellow, 'NOTE: __html-meta-robots-development.html has been included. Is it OK?', cc.reset)
    done()
}

//export tasks
//prepares all files for production
exports.dist = series(
  //compiles all CSS and JS src files to dist/ autoprefixed and minified
  done => style(done, true, argv.verbose), done => compile(done, true, argv.verbose),
  //publishes and optimizes assets
  assetsPublish, assetsPublishNotFw, assetsOptimize, copyCovers,
  //completes all favicons tasks
  faviconGenerate, faviconHtml, faviconHtmlDelete, faviconWebmaifest,
  //generates static html
  htmlDelete, htmlMake, canonical, htmlCopy, htmlValidate, gtmMake,
  //robots.txt
  done => robots(done, true), humans,
  completed
)


//Initialization
//----------------

//private functions
function _fgColor(bgColorHex) {
  bgColorHex = String(bgColorHex).replace('#', '')
  bgColorHex = bgColorHex.length > 3 ? bgColorHex : bgColorHex.replace(/(.)(.)(.)/, '$1$1$2$2$3$3')
  return (parseInt(bgColorHex.replace('#', ''), 16) > 0xffffff / 1.5) ? 'black' : 'white'
}
global.DATA._fgColor = DATA._fgColor = _fgColor
//better
//@see also https://getbootstrap.com/docs/4.5/getting-started/theming/#color-contrast
function fgColor(bgColorHex) {
  bgColorHex = String(bgColorHex).replace('#', '')
  bgColorHex = bgColorHex.length > 3 ? bgColorHex : bgColorHex.replace(/(.)(.)(.)/, '$1$1$2$2$3$3')
  let rgbval = parseInt(bgColorHex, 16)
  if (Number.isNaN(rgbval)) return 'gray'
  let r = rgbval >> 16
  let g = (rgbval & 65280) >> 8
  let b = rgbval & 255
  let brightness = r * 0.299 + g * 0.587 + b * 0.114
  return (brightness > 150) ? 'black' : 'white'
}
global.DATA.getFgColor = DATA.getFgColor = fgColor

function fileExists(filename) {
  return fs.existsSync(filename)
}
global.DATA.fileExists = DATA.fileExists = fileExists

function initServiceTemplates() {
  return gulp.src([
    'html/init/___colors.template.html',
    'html/init/gtm_container.template.json',
    'html/init/humans.template.txt',
    'html/init/robots.development.template.txt',
    'html/init/robots.production.template.txt'
  ])
    .pipe(using())
    .pipe(replaceName(/\.template\./, '.'))
    .pipe(gulp.dest('html'))
}

function initialized(done) {
  ERRORS ?
    console.log(cc.red, cc.bright, 'Failed. There were errors.', cc.reset) :
    console.log(cc.green, cc.bright, 'Project initialized! :)', '\n', '===========================', cc.reset)
    done()
}

//export tasks
exports.init = series(
  //init
  clearCache, init.initData,
  //done => { console.log(DATA); done() },
  init.initSettigns, init.initCss, init.initJs, initServiceTemplates, init.initGtm, init.initRobots, init.initHumans,
  //compile
  //style, compile,
  //publish assets
  assetsPublish, assetsPublishNotFw, copyCovers,
  //favicons
  //faviconGenerate, faviconHtml, faviconHtmlDelete, faviconWebmaifest, faviconUpdate,
  //make HTML
  htmlDelete, htmlMake, canonical, htmlCopy, htmlValidate, gtmMake, robots, humans,
  //run server
  initialized,
  //done => (ERRORS ? done() : serve(done))
)
