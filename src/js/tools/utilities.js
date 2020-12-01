window.JRKIT = window.JRKIT || {};

// Keeps old jQuery < 1.9 $.browser property
if (typeof $ === 'function') {
  var matched,
      browser;
  jQuery.uaMatch = function (ua) {
    var match;
    ua = ua.toLowerCase();
    match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua.replace(/trident\/7.[0-9]+(.*); rv:11.0/, 'msie 11.0')) ||
      (ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
      [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  };
  matched = jQuery.uaMatch(navigator.userAgent);
  browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionInt = parseInt(matched.version, 10);
  }
  // Chrome is Webkit, but Webkit is also Safari.
  if (browser.chrome) {
    browser.webkit = true;
  } else if (browser.webkit) {
    browser.safari = true;
  }
  $.browser = jQuery.browser = browser;
}

// Environment variables
if (typeof $ === 'function') {
  window.JRKIT.env = {
    protocol: window.location.protocol.replace(/:$/, ''),
    url: window.location.href,
    host: window.location.host,
    query: window.location.search.replace(/^\?/, ''),
    hash: window.location.hash.replace(/^#/, ''),
    ie: !!jQuery.browser.msie,
    ie8: !!(jQuery.browser.msie && jQuery.browser.versionInt === 8),
    ie9: !!(jQuery.browser.msie && jQuery.browser.versionInt === 9),
    ie10: !!(jQuery.browser.msie && jQuery.browser.versionInt === 10),
    ie11: !!(jQuery.browser.msie && jQuery.browser.versionInt === 11),
    lte8: !!(jQuery.browser.msie && jQuery.browser.versionInt <= 8),
    lte9: !!(jQuery.browser.msie && jQuery.browser.versionInt <= 9),
    lte10: !!(jQuery.browser.msie && jQuery.browser.versionInt <= 10),
    oldIe: !!(jQuery.browser.msie && jQuery.browser.versionInt < 9),
    webkit: !!jQuery.browser.webkit,
    opera: !!jQuery.browser.opera,
    mozilla: !!jQuery.browser.mozilla,
    html5: {
      audio: (window.HTMLAudioElement !== undefined),
      video: (window.HTMLVideoElement !== undefined),
      canvas: (window.HTMLCanvasElement !== undefined)
    },
    cookie: window.navigator.cookieEnabled,
    touch: (window.ontouchstart !== undefined || window.onmsgesturechange !== undefined),
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent),
    ios: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    iphone: /iPhone/i.test(navigator.userAgent),
    android: /Android/i.test(navigator.userAgent),
    windows: /Win/.test(navigator.userAgent),
    mac: /Mac/.test(navigator.userAgent),
    linux: /Linux/.test(navigator.userAgent),
    unix: /X11/.test(navigator.userAgent),
    androidv: parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf('Android') + 8))
  };
}

// Adds CSS classes to root HTML element
if (typeof $ === 'function') {
  var h = $(document.documentElement);
  if ($.browser.opera) {
    h.addClass('opera');
  }
  if ($.browser.webkit || $.browser.safari) {
    h.addClass('webkit');
  }
  if ($.browser.chrome) {
    h.addClass('chrome');
  }
  if ($.browser.safari && !/Chrome/.test(navigator.userAgent)) {
    h.addClass('safari');
  }
  if ($.browser.msie) {
    h.addClass('msie ie');
    if (JRKIT.env.oldIe) {
      h.addClass('oldie');
    }
  } else {
    h.addClass('not-ie');
  }
  if ($.browser.msie) {
    h.addClass('ie' + parseInt($.browser.version, 10));
  }
  if ($.browser.mozilla) {
    h.addClass('mozilla');
  }
  h.removeClass('no-jquery').addClass('jquery');
  h.removeClass('no-jrkit').addClass('jrkit');
  if (JRKIT.env.touch) {
    h.addClass('touch');
  }
  if (JRKIT.env.mobile) {
    h.addClass('mobile');
  }
  if (JRKIT.env.ios) {
    h.addClass('ios');
  }
  if (JRKIT.env.iphone) {
    h.addClass('iphone');
  }
  if (JRKIT.env.android) {
    h.addClass('android');
    h.addClass('android-' + parseInt(JRKIT.env.androidv, 10));
  }
  if (JRKIT.env.windows) {
    h.addClass('windows');
  }
  if (JRKIT.env.mac) {
    h.addClass('mac');
  }
  if (JRKIT.env.linux) {
    h.addClass('linux');
  }
  if (JRKIT.env.unix) {
    h.addClass('unix');
  }
}

// animated scroll to top
if (typeof $ === 'function') {
  $('a[href="#top"]').not('.jrkit-animated-scroll-bound').on('click', function () {
    var sel = (window.opera ? 'html' : 'html,body');
    $(sel).animate({
      scrollTop: 0
    }, 700);
    return false;
  }).addClass('jrkit-animated-scroll-bound');
}

// add or modify "title" to increase usability
if (typeof $ === 'function') {
  $('a[target="_blank"]').not('.jrkit-title-modified').addClass('new-win').not('.jrkit-title-nomodify').attr('title', function () {
    var t = $(this).attr('title'),
        h = $(this).attr('href'),
        n = JRKIT.__('opens in new window'),
        nt;
    if (t) {
      nt = (t + ' (' + n + ')');
    }
    else if (h && /(^htt(p|ps):\/\/)/.test(h)) {
      nt = (h.replace(/(^htt(p|ps):\/\/)/, '').replace(/\/(.*)$/, '') + ' (' + n + ')');
    }
    nt = nt || n;
    $(this).find('img').attr('title', nt);
    return nt;
  }).addClass('jrkit-title-modified');
}
