require-patternlab
=======

`require-patternlab` is a [Browserify](https://github.com/substack/node-browserify) plugin to require [Pattern Lab](http://patternlab.io/) templates using pattern naming.

### Installation
With [`npm`](http://npmjs.org/) as a local development dependency:

```bash
npm install --save-dev require-patternlab
```

### Usage

In your module
```js
var template = require('pattern:atoms-title');
```

### Options

name | type | description | default
-----|------|-------------|---------
path | string | search pattern path | Get value of browserify.opts.paths
resolutionPrefix | string | prefix to identify pattern requirement | pattern:
templateExtension | string | template engine extension | twig

### Register with the command-line

```bash
browserify test.js -p [ require-patternlab -path ./source/_patterns ] > test-bundle.js
```
