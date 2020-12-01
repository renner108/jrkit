let foo = 'tools/test: test ok'
const bar = () => (typeof console == 'object' && console.log('%c' + foo, 'color:green'))
bar()

const fn1 = function () {
  alert('this function is futile and should be removed with treeshaking')
}
//until i'll try to log it
//console.log('fn1 is: ' + typeof fn1)
const fn2 = function () {
  alert('this not')
}
window.fn2 = fn2

//environment
if (typeof console == 'object') {
  console.log('JRKIT is: ' + typeof JRKIT)
  if (typeof JRKIT === 'object') console.log(JRKIT)
  console.log('jQuery is: ' + typeof jQuery, ',', 'window.jQuery is: ' + typeof window.jQuery)
  console.log('$ is: ' + typeof $, ',', 'window.$ is: ' + typeof window.$, ',', '(jQuery === window.$) is: ' + (typeof $ == 'function' && jQuery === window.$))
  console.log('_ is: ' + typeof _, ',', 'window._ is: ' + typeof window._)
  console.log('Modernizr is: ' + typeof Modernizr, ',', 'window.Modernizr is: ' + typeof window.Modernizr)
  console.log('<html> classes: ' + document.documentElement.className)
  console.log('%c' + 'window.Popper is: ' + typeof window.Popper, 'color:purple')
/*
  $(function () {
    $('h1').after('<p>My popovers! <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" '
      + 'data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover on top</button><button type="button" class="btn btn-secondary" '
      + 'data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover '
      + 'on right</button><button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus '
      + 'sagittis lacus vel augue laoreet rutrum faucibus.">Popover on bottom</button><button type="button" class="btn btn-secondary" data-container="body" '
      + 'data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Popover on left</button></p>')
    $('[data-toggle="popover"]').popover()
  })
*/
  if (typeof window.$ == 'function') {
    console.log('%c' + 'jQuery version is: ' + $.fn.jquery, 'color:purple')
    console.log('jQuery.ajax is: ' + typeof $.ajax + ', assuming jQuery ' + (typeof $.ajax == 'function' ? 'FULL' : 'SLIM') + ' bundle')
  	console.log('$.cookie is: ' + typeof window.$.cookie)
  	console.log('$.fn.hoverIntent is: ' + typeof window.$.fn.hoverIntent)
  	console.log('$.fn.mousewheel is: ' + typeof window.$.fn.mousewheel)
    let bs = [
      'alert',
      'button',
      'carousel',
      'collapse',
      'dropdown',
      'modal',
      'popover',
      'scrollspy',
      'tab',
      'toast',
      'tooltip',
    ]
    bs.forEach((mod) => console.log('%c' + 'Bootstrap ' + ((s) => s[0].toUpperCase() + s.substr(1))(mod) + ' version is: '
      + (typeof $.fn[mod] == 'function' ? $.fn[mod].Constructor.VERSION : 'undefined'), typeof $.fn[mod] == 'function' ? 'color:indigo' : 'color:crimson'))
  } else {
    console.log('%c' + 'jQuery is not installed', 'color:crimson')
    console.log('%c' + 'Bootstrap is not installed', 'color:crimson')
  }
  typeof window.$ == 'function' && console.log('$.fn.owlCarousel is: ' + typeof jQuery.fn.owlCarousel)
  console.log('window.Glider is: ' + typeof window.Glider)
  console.log('window.Flickity is: ' + typeof window.Flickity)
  console.log('window.Swiper is: ' + typeof window.Swiper)
  console.log('window.mediumZoom is: ' + typeof window.mediumZoom)
  console.log('window.FsLightbox is: ' + typeof window.FsLightbox)
  console.log('window.PhotoSwipe is: ' + typeof window.PhotoSwipe)
  console.log('window.PhotoSwipeUI_Default is: ' + typeof window.PhotoSwipeUI_Default)
  typeof window.$ == 'function' && console.log('$.fn.fancybox is: ' + typeof window.$.fn.fancybox)
  typeof window.commonJsStrict == 'object' && console.log('window.commonJsStrict.addBackToTop is: ' + typeof window.commonJsStrict.addBackToTop)
  console.log('window.addBackToTop is: ' + typeof window.addBackToTop)
}
