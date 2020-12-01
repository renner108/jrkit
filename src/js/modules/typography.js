window.JRKIT = window.JRKIT || {};

// Applies some basic typographic rules on text.
JRKIT.typography = function (text, removeEmpty) {
  text = text.replace(/ (i|k|o|s|u|v|z|I|K|O|S|U|V|Z|A) /g, ' $1\u00a0').replace(/ (sv\.|Sv\.|ing\.|Ing\.|Dr\.|MUDr\.|JUDr\.|Doc\.|Mgr\.|Bc\.) /g, ' $1\u00a0');
  text = text
    .replace(/([0-9]) (m|cm|km|kg|g|Kč|CZK|USD|$|EUR|min|l|ml|kWh|rok|roky|let|year|years|koruny|korun|%)(<|.|,|\s)/g, '$1\u00a0$2$3')
    .replace(/([0-9]),(-|–|—) /g, '$1,—\u00a0')
    .replace(/Kč ([0-9])/g, 'Kč\u00a0$1')
    .replace(/ ([0-9]+)($|<)/g, '\u00a0$1$2');
  text = text.replace(/ (I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX|XXI|XXII|XXIII|XXIV|XXV)\. /g, ' $1.\u00a0');
  if (removeEmpty) {
    text = text.replace(/&nbsp;/g, '\u00a0').replace(/&#160;/g, '\u00a0').replace(/<p[^>]*>[ \s]*<\/p>/gi, '');
  }
  return text;
};

// Converts UTF-8 string into ASCII
JRKIT.utf2ascii = function (text) {
  var utf = ' „“”’\'()-_–—.,;!-+=*#%@0123456789ßAÁÀÂÄĄBCČÇĆDĎEÉĚÉÈÊËĘFGHIÍÏÎJKLŁMNŇÑŃOÓÔÖPQRŘSŠŚTŤUÚŮÛÜVWXYÝŸZŽŹŻ'
        + 'aáàâäąbcčćçdďeéěéèêëęfghiíïîjklłmnňñńoóôöpqrřsšśtťuúůûüvwxyýÿzžźżАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
        + 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
      ascii = ' """\'\'()-_--.,;!-+=*#%@0123456789sAAAAAABCCCCDDEEEEEEEEFGHIIIIJKLLMNNNNOOOOPQRRSSSTTUUUUUVWXYYYZZZZ'
        + 'aaaaaabccccddeeeeeeeefghiiiijkllmnnnnoooopqrrsssttuuuuuvwxyyyzzzzABVGDEOZZIJKLMNOPRSTUFHCCSSYYIEUA'
        + 'abvgdeozzijklmnoprstufhccssyyieua',
      i;
  for (i = 0; i < text.length; i++) {
    text = text.replace(text[i], (ascii[utf.indexOf(text[i])] || '?'));
  }
  return text;
};

// Converts UTF-8 string into URL/filename safe lowercase ASCII string
JRKIT.webalize = function (text, allowedLength, allowedChars, allowOptimization) {
  var al = allowedLength || 64,
      ach = allowedChars || '0123456789abcdefghijklmnopqrstuvwxyz',
      ao = Boolean(allowOptimization),
      i;
  ao = Number(ao);
  text = $.trim(text);
  text = text.toLowerCase();
  text = JRKIT.utf2ascii(text);
  for (i = 0; i < text.length; i++) {
    text = text.replace(text[i], (ach.indexOf(text[i]) > 0 ? text[i] : '-'));
  }
  text = text.replace(/-+/g, '-').replace(/(^-|-$)/g, '');
  if (text.length <= al) {
    return text;
  }
  text = text.substr(0, al + ao);
  text = (/-$/.test(text) ? text.replace(/-$/, '') : text.replace(/-[^\-]+-?$/, ''));
  text = (ao && /-/.test(text) ? text : text.substr(0, al));
  return text;
};

// apply some typography
$('.typography, .typography-remove-empty').not('.jrkit-typography-applied').addClass('jrkit-typography-applied').each(function () {
    var t = $(this),
        html = String(t.html());
    html = that.typography(html, t.is('.typography-remove-empty'));
    t.html(html);
});
