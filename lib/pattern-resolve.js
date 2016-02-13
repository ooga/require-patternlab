'use strict';

var bresolve = require('browser-resolve');
var find = require('find');
var path = require('path');

var findPattern = function (path, pattern, ext) {
    var order = '(\d*-)?';
    var full = false;
    var parts = pattern.split('-');
    var patternType = parts[0];
    var patternName = parts[1];

    var dirs = find.dirSync(new RegExp(order + patternType), path);
    for(var i=0; i<dirs.length; i++) {
        var files = find.fileSync(new RegExp(order + patternName + '\.' + ext), dirs[i]);
        if (files.length > 0) {
            full = files[0];
            break;
        }
    }

    return full;
};


function patternResolver(opts) {
    if (!opts) {
        opts = {};
    }

    if (!(this instanceof patternResolver)) return new patternResolver(opts);

    this.path = (opts.path)? opts.path : null;
    this.resolutionPrefix = (opts.resolutionPrefix)? opts.resolutionPrefix : 'pattern:';
    this.templateExtension = (opts.templateExtension)? opts.templateExtension : 'twig';
    this.patternTypes = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
};

patternResolver.prototype.needCustomResolution = function(id) {
    return id.match(new RegExp('^' + this.resolutionPrefix));
};

patternResolver.prototype.getPatternName = function(id) {
    var patternName = id;
    var matches = id.match(new RegExp('^' + this.resolutionPrefix + '(' + this.patternTypes.join('|') + ')(-.+)'));
    if (matches) {
        patternName = matches[1] + matches[2];
    }
    return patternName;
};

patternResolver.prototype.resolve = function(id, opts, cb, resolver) {
    if (this.needCustomResolution(id)) {
        var patterName = this.getPatternName(id);
        var file = false;
        var paths = (this.path)? [path.resolve(opts.package.__dirname, this.path)] : opts.paths;
        for (var i=0; i<paths.length; i++) {
            file = findPattern(paths[i], patterName, this.templateExtension);
            if (file) {
                break;
            }
        }

        if (!file) {
            cb("Error: Cannot find pattern '" + patterName + "' form '" + path.dirname(opts.filename) + "'");
        } else {
            cb(null, file);
        }
    } else {
        resolver(id, opts, cb);
    }
};

module.exports = patternResolver;
