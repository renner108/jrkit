//Popper
//--------
//treeshakeable
//import Popper from 'popper.js/dist/esm/popper'
//prevents from treeshaking
//see also Popper export hack in gulpfile.js function "compile"
//window.Popper = Popper

//every component requires util.js
import 'bootstrap/js/dist/util'

//components
//------------
import 'bootstrap/js/dist/alert'
//import 'bootstrap/js/dist/button'
//import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/collapse'
//dropdown (not in navbar) depends on Popper!
import 'bootstrap/js/dist/dropdown'
//import 'bootstrap/js/dist/modal'
//tooltip depends on Popper!
//import 'bootstrap/js/dist/tooltip'
//popover depends on tooltip!
//import 'bootstrap/js/dist/popover'
//import 'bootstrap/js/dist/scrollspy'
//import 'bootstrap/js/dist/tab'
//import 'bootstrap/js/dist/toast'
