# grunt-angular-templatecache

> Put AngularJS templates in the template cache.

This package is still untested.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-templatecache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-templatecache');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*



## angularTemplateCache task
_Run this task with the `grunt angularTemplateCache` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### htmlmin
Type: `Object`  
Default: `{}`

These options are passed to [minify](https://github.com/kangax/html-minifier#options-quick-reference). before putting the templates in the template cache.

#### module
Type: `String`

The name of the AngularJS module to use.

#### quote
Type: `String`  
Choices: `'`, `"`  
Default: `'`

The quote character to use in the generated JavaScript file.

#### strict
Type: `Boolean`  
Default: `true`

If `true`, `'use strict';` is prepended to the top of the file.

#### newModule
Type: `Boolean`  
Default: `false`

If `true`, a new module is created which can be included. If `false`, an existing module is used.

#### indent
Type: `String`  
Default: `'  '`

The string to use for indentation.


### Usage examples
```js
angularTemplateCache: {
    options: {
        module: 'my.project',
        indent: '    ',
        htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true
        }
    },
    dist: {
        cwd: 'src',
        src: ['**/*.html', '!index.html'],
        dest: 'dist/templates.js'
    }
}
```


## License

MIT
