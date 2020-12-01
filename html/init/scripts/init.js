const _ = require('lodash')
module.exports.loaded = () => console.log('jrkit init scripts loaded...')


//prepares data for initialization
function initData(done) {

  DATA.init = { bootstrap: {} }

  //bootstrap
  //colors
  let colors = {
    //variables
    "vars": {
      //grays
      "white": "#fff",
      "gray-100": "#f8f9fa",
      "gray-200": "#e9ecef",
      "gray-300": "#dee2e6",
      "gray-400": "#ced4da",
      "gray-500": "#adb5bd",
      "gray-600": "#6c757d",
      "gray-700": "#495057",
      "gray-800": "#343a40",
      "gray-900": "#212529",
      "black": "#000",
      //colors
      "blue": "#007bff",
      "indigo": "#6610f2",
      "purple": "#6f42c1",
      "pink": "#e83e8c",
      "red": "#dc3545",
      "orange": "#fd7e14",
      "yellow": "#ffc107",
      "green": "#28a745",
      "teal": "#20c997",
      "cyan": "#17a2b8",
      //theme-colors
      "primary": "$blue",
      "secondary": "$gray-600",
      "success": "$green",
      "info": "$cyan",
      "warning": "$yellow",
      "danger": "$red",
      "light": "$gray-100",
      "dark": "$gray-800"
    },
    //maps
    "grays": {
      "100": "$gray-100",
      "200": "$gray-200",
      "300": "$gray-300",
      "400": "$gray-400",
      "500": "$gray-500",
      "600": "$gray-600",
      "700": "$gray-700",
      "800": "$gray-800",
      "900": "$gray-900"
    },
    "colors": {
      "blue": "$blue",
      "indigo": "$indigo",
      "purple": "$purple",
      "pink": "$pink",
      "red": "$red",
      "orange": "$orange",
      "yellow": "$yellow",
      "green": "$green",
      "teal": "$teal",
      "cyan": "$cyan",
      "gray": "$gray-600",
      "gray-dark": "$gray-800",
      "black": "$black",
      "white": "$white"
    },
    "themeColors": {
      "primary": "$primary",
      "secondary": "$secondary",
      "success": "$success",
      "info": "$info",
      "warning": "$warning",
      "danger": "$danger",
      "dark": "$dark",
      "light": "$light"
    },
    "customColors": {}
  }
  let myColors = DATA.project.bootstrap.colors
  //remove originals
  for (let [mapkey, map] of Object.entries(myColors)) {
    for (let [colorkey, color] of Object.entries(map)) {
      if (color === 'original')
        myColors[mapkey][colorkey] = colors[mapkey][colorkey]
    }
  }
  //evaluate
  myColors = _evaluate(myColors)
  //merge
  colors = _.merge({}, colors, myColors)
  colors.vars = Object.assign({}, colors.customColors, colors.vars)
  //evaluate
  colors = _evaluate(colors)
  //export
  global.DATA.init.bootstrap.colors = DATA.init.bootstrap.colors = colors
  //console.log(DATA.init.bootstrap.colors)
  done()
}
module.exports.initData = initData
//
function _evaluate(colorsObject) {
  let known = {}, knownLength
  while (knownLength !== Object.keys(known).length) {
    knownLength = Object.keys(known).length
    for (let [mapkey, map] of Object.entries(colorsObject)) {
      for (let [colorkey, color] of Object.entries(map)) {
        if (/^#/.test(color)) {
          known[colorkey] = color
        } else if (known[color.replace('$', '')]) {
          colorsObject[mapkey][colorkey] = known[color.replace('$', '')]
        }
      }
    }
  }
  return colorsObject
}


//
function initSettigns(done) {

  done()
}
module.exports.initSettigns = initSettigns


//
function initCss(done) {

  done()
}
module.exports.initCss = initCss


//
function initJs(done) {

  done()
}
module.exports.initJs = initJs


//
function initGtm(done) {

  done()
}
module.exports.initGtm = initGtm


//
function initRobots(done) {

  done()
}
module.exports.initRobots = initRobots


//
function initHumans(done) {

  done()
}
module.exports.initHumans = initHumans
