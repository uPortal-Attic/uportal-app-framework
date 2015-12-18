var path = require('path');

var urlJoin = require('url-join');
var asArray = require('as-array');
var _isUrl = require('is-url');

var exports = module.exports = function () {

  var paths = asArray(arguments).map(replaceUndefined);

  return isUrl(paths[0])
    ? urlJoin.apply(urlJoin, paths)
    : path.join.apply(path, paths);
};

var isUrl = exports.isUrl = function (url) {

  return _isUrl(url)
    || url === 'http://'
    || url === 'https://'
    || url === 'ftp://';
};

var replaceUndefined = exports.replaceUndefined = function (p, idx, paths) {

  return  (p === undefined || p === null)
    ? isUrl(paths[0]) ? '/' : path.sep
    : p;
}
