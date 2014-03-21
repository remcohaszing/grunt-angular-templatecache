'use strict';

var minify = require('html-minifier').minify;
var finalTemplate =
    '<%= strict %>angular.module(<%= moduleName %><%= newModule %>).\n' +
    'run([<%= templateCache %>, function($templateCache) {' +
    '<%= put(cache) %>\n' +
    '}]);\n';

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

        var indent = options.indent;
        var putTemplate = '$templateCache.put(<%= name %>,<%= template %>);';

        /**
         * Escape backslashes and the specified quotes and prepend and
         * append a quote.
         *
         * @param {string} The string to quote.
         * @returns The quoted string.
         */
        function q(string) {
            var quote = options.quote;
            string = string.replace(/\\/, '\\\\');
            string = string.replace(new RegExp(quote, 'g'), '\\' + quote);
            return quote + string + quote;
        }

        /**
         * Parse the templates to the putTemplate template.
         *
         * @param {templates} An object consisting of key->value pairs
         *                    of templateName->templateContent.
         */
        function parsePutTemplate(templates) {
            var out = '';
            for(var name in templates) {
                var tmpl = q(templates[name]);
                if(tmpl.indexOf('\n') === -1) {
                    tmpl = ' ' + tmpl;
                } else {
                    var ending = '\n' + indent + indent;
                    tmpl = tmpl.replace(/\n/g, '\\n' + q(' +' + ending));
                    tmpl = ending + tmpl + '\n' + indent;
                }
                out += '\n' + indent + grunt.template.process(
                    putTemplate, {
                        data: {
                            name: q(name),
                            template: tmpl
                        }
                    }
                );
            }
            return out;
        }


        this.files.forEach(function(files) {
            var cache = {};
            files.src.filter(function(f) {
                grunt.log.writeln('Found template: ' + f);
                var content = grunt.file.read(files.cwd + '/' + f);
                if (options.preprocess instanceof Function) {
                    content = options.preprocess(content, f);
                }
                if (options.htmlmin !== null) {
                    content = minify(content, options.htmlmin);
                }
                if (options.postprocess instanceof Function) {
                    content = options.postprocess(content, f);
                }
                if (options.processName instanceof Function) {
                    f = options.processName(f, content);
                }
                cache[f] = content;
            });
            var parsedTemplate = grunt.template.process(finalTemplate, {
                data: {
                    strict: options.strict ? q('use strict') + ';\n\n' : '',
                    moduleName: q(options.module),
                    newModule: options.newModule ? ', []' : '',
                    templateCache: q('$templateCache'),
                    cache: cache,
                    put: parsePutTemplate
                }
            });
            grunt.file.write(files.dest, parsedTemplate);
        });
    });
};
