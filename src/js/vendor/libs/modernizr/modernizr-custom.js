/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-cookies-inlinesvg-svg-svgasimg-touchevents-video-mq-setclasses !*/
!function(e,n,o){function t(e,n){return typeof e===n}function a(){var e,n,o,a,i,s,r;for(var c in u)if(u.hasOwnProperty(c)){if(e=[],n=u[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(o=0;o<n.options.aliases.length;o++)e.push(n.options.aliases[o].toLowerCase());for(a=t(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],r=s.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),d.push((a?"":"no-")+r.join("-"))}}function i(e){var n=f.className,o=Modernizr._config.classPrefix||"";if(v&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");n=n.replace(t,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(n+=" "+o+e.join(" "+o),v?f.className.baseVal=n:f.className=n)}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):v?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(e,n){if("object"==typeof e)for(var o in e)y(e,o)&&r(o,e[o]);else{e=e.toLowerCase();var t=e.split("."),a=Modernizr[t[0]];if(2==t.length&&(a=a[t[1]]),"undefined"!=typeof a)return Modernizr;n="function"==typeof n?n():n,1==t.length?Modernizr[t[0]]=n:(!Modernizr[t[0]]||Modernizr[t[0]]instanceof Boolean||(Modernizr[t[0]]=new Boolean(Modernizr[t[0]])),Modernizr[t[0]][t[1]]=n),i([(n&&0!=n?"":"no-")+t.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function c(){var e=n.body;return e||(e=s(v?"svg":"body"),e.fake=!0),e}function l(e,o,t,a){var i,r,l,d,u="modernizr",p=s("div"),v=c();if(parseInt(t,10))for(;t--;)l=s("div"),l.id=a?a[t]:u+(t+1),p.appendChild(l);return i=s("style"),i.type="text/css",i.id="s"+u,(v.fake?v:p).appendChild(i),v.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,v.fake&&(v.style.background="",v.style.overflow="hidden",d=f.style.overflow,f.style.overflow="hidden",f.appendChild(v)),r=o(p,e),v.fake?(v.parentNode.removeChild(v),f.style.overflow=d,f.offsetHeight):p.parentNode.removeChild(p),!!r}var d=[],u=[],p={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var o=this;setTimeout(function(){n(o[e])},0)},addTest:function(e,n,o){u.push({name:e,fn:n,options:o})},addAsyncTest:function(e){u.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=p,Modernizr=new Modernizr,Modernizr.addTest("cookies",function(){try{n.cookie="cookietest=1";var e=-1!=n.cookie.indexOf("cookietest=");return n.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(o){return!1}}),Modernizr.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var f=n.documentElement,v="svg"===f.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=s("audio"),n=!1;try{n=!!e.canPlayType,n&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(o){}return n}),Modernizr.addTest("video",function(){var e=s("video"),n=!1;try{n=!!e.canPlayType,n&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),n.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),n.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(o){}return n}),Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var h=p._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];p._prefixes=h;var y;!function(){var e={}.hasOwnProperty;y=t(e,"undefined")||t(e.call,"undefined")?function(e,n){return n in e&&t(e.constructor.prototype[n],"undefined")}:function(n,o){return e.call(n,o)}}(),p._l={},p.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},p._trigger=function(e,n){if(this._l[e]){var o=this._l[e];setTimeout(function(){var e,t;for(e=0;e<o.length;e++)(t=o[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){p.addTest=r}),Modernizr.addTest("svgasimg",n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var m=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var o=n(e);return o&&o.matches||!1}:function(n){var o=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){o="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),o}}();p.mq=m;var g=p.testStyles=l;Modernizr.addTest("touchevents",function(){var o;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)o=!0;else{var t=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");g(t,function(e){o=9===e.offsetTop})}return o}),a(),i(d),delete p.addTest,delete p.addAsyncTest;for(var w=0;w<Modernizr._q.length;w++)Modernizr._q[w]();e.Modernizr=Modernizr}(window,document);