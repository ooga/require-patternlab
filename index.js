'use strict';

var resolve = require('resolve');
var presolve = require('./lib/pattern-resolve');

function plugin(b, opts) {
    var patternResolver = presolve(opts);
    var baseResolve = b._bresolve;

    b._bresolve = function (id, opts, cb) {
        patternResolver.resolve(id, opts, cb, baseResolve);
    }
}

module.exports = plugin;
