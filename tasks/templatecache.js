'use strict';

var minify = require('html-minifier').minify;

module.exports = function(grunt) {

    grunt.registerMultiTask('angularTemplateCache', function() {
        var options = this.options({
            htmlmin: {},
            quote: '\'',
            strict: true,
            newModule: false,
            indent: '  '
        });

        if(options.module === undefined) {
            throw new Error('module must be defined.');
        }

        function q(string) {
            var quote = options.quote;
            string = string.replace(/\\/, '\\\\');
            string = string.replace(new RegExp(quote, 'g'), '\\' + quote);
            return quote + string + quote;
        }

        var indent = options.indent;
        var dest;

        var prefix = 'angular.module(' + q(options.module);
        if(options.newModule) {
            prefix += ', []';
        }
        prefix += ').\nrun([' + q('$templateCache') +
            ', function($templateCache) {';
        if(options.strict) {
            prefix = q('use strict') + ';\n\n' + prefix;
        }
        var postfix = '\n}]);\n';

        this.files.forEach(function(files) {
            var out = '';
            files.src.filter(function(f) {
                grunt.log.writeln('Found template: ' + f);
                var content = grunt.file.read(files.cwd+ '/' + f);
                var minified = minify(content, options.htmlmin);
                out += '\n' + options.indent + '$templateCache.put(';
                out += q(f) + ',';
                if(minified.indexOf('\n') === -1) {
                    out += ' ' + q(minified);
                } else {
                    var ending = '\n' + indent + indent;
                    out += ending;
                    out += q(minified).replace(/\n/g, '\\n' + q(' +' + ending));
                    out += '\n' + indent;
                }
                out += ');'
                dest = f.dest;
            });
            grunt.file.write(files.dest, prefix + out + postfix);
        });
    });
};
