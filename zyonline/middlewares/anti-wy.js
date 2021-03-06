var url = require('url');
var path = require('path');
var Options = require('options')

function AntiLeech(opts) {
  var option = new Options({
    allow: ['localhost'],
    exts: [],
    strict: false,
    log: null,
    default: ''
  }).merge(opts);

  var hosts = option.value.allow;
  var exts = option.value.exts;
  var picture = option.value.default;
  var strict = option.value.strict;
  var log = option.value.log;

  var inWhiteList = function(referer) {
    // no referer, if strict not trust
    if (!referer) {
      if (strict) {
        return false;
      } else {
        return true;
      }
    }
    var host = url.parse(referer).host;
    for (var i = 0; i < hosts.length; i++) {
      if (host.indexOf(hosts[i])>-1) {
        return true;
      }
    }
    return false;
  };

  var filter = function(url) {
    var ext = path.extname(url);
    for (var i = 0; i < exts.length; i++) {
      if (ext == exts[i]) {
        return true;
      }
    }
    return false;
  };

  var reply = function(baseUrl,url, res) {
    if (url != picture) {
      if (!!picture) {
        res.redirect(baseUrl+picture);
      } else {
        res.send('');
      }
      return true;
    }
    return false;
  };

  var record = function(req) {
    if (log) {
      var referer = req.headers.referer;
      var url = req.url;
      if (log == console.log) {
        log('request :' + url + ' from ' + referer + ' was blocked');
      } else {
        log(url, referer, req);
      }
    }
  };

  return function session(req, res, next) {

    // ignore these methods
    if ('POST' == req.method) return next();

    var url = req.url;
    var baseUrl = req.baseUrl;
    var referer = req.headers.referer;

    if (filter(url)) {
      if (!inWhiteList(referer)) {
        if (reply(baseUrl,url, res)) {
          record(req);
          return;
        }
      }
    }

    next();

  };
};

module.exports = AntiLeech;