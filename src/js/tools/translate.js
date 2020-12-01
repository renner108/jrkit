window.JRKIT = window.JRKIT || {};

// trnaslations
JRKIT.lang = {}
JRKIT.lang.cs = {
  'opens in new window': 'otevře se v novém okně'
}

// Translates string into the currently displayed page language
JRKIT.translate = JRKIT.__ = function (s) {
  if (
    JRKIT.lang[LANG] !== undefined &&
    JRKIT.lang[LANG][s] !== undefined &&
    JRKIT.lang[LANG][s]
  ) return JRKIT.lang[LANG][s];
  return s;
};
