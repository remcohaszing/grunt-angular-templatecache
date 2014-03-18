'use strict';

var minify = require('html-minifier').minify;

module.exports = function(grunt) {

    grunt.registerMultiTask('angularTemplateCache', function() {
        var options = this.options({
            htmlmin: {},
            quote: '\'',
            strict: true,
            indent: '  '
        });

        function q(string) {
            var quote = options.quote;
            string = string.replace(/\\/, '\\\\');
            string = string.replace(new RegExp(quote, 'g'), '\\' + quote);
            return quote + string + quote;
        }

        var indent = options.indent;
        var dest;

        var prefix =
            'angular.module(' + q(options.module) + ').\n' +
            'run([' + q('$templateCache') + ', function($templateCache) {';
        if(options.strict) {
            prefix = q('use strict') + ';\n\n' + prefix;
        }
        var postfix = '\n}]);\n';

        this.files.forEach(function(files) {
            var out = '';
            files.src.filter(function(f) {
                grunt.log.writeln(f);
                var content = grunt.file.read(files.cwd+ '/' + f);
                var minified = minify(content, options.htmlmin);
                out += '\n' + options.indent + '$templateCache.put(';
                out += q(f) + ',';
                if(minified.indexOf('\n') === -1) {
                    out += ' ' + q(minified);
                } else {
                    var ending = '\n' + indent + indent;
                    out += ending;
                    ou += q(minified).replace(/\n/g, q(' +' + ending));
                    out += '\n' + indent;
                }
                out += ');'
                dest = f.dest;
            });
            grunt.file.write(files.dest, prefix + out + postfix);
        });
    });
};
