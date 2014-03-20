'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        angularTemplateCache: {
            options: {
                module: 'hello.world'
            },
            defaultOptions: {
                src: 'index.html',
                dest: 'tmp/default_options.js',
                cwd: 'test/fixtures'
            },
            doubleQuote: {
                options: {
                    quote: '"'
                },
                src: 'index.html',
                dest: 'tmp/double_quote.js',
                cwd: 'test/fixtures'
            },
            multiline: {
                src: 'multiline.html',
                dest: 'tmp/multiline.js',
                cwd: 'test/fixtures'
            },
            multiple: {
                src: '*.html',
                dest: 'tmp/multiple.js',
                cwd: 'test/fixtures'
            },
            minified: {
                options: {
                    htmlmin: {
                        collapseWhitespace: true
                    }
                },
                src: 'multiline.html',
                dest: 'tmp/minified.js',
                cwd: 'test/fixtures'
            },
            newModule: {
                options: {
                    newModule: true
                },
                src: 'index.html',
                dest: 'tmp/new_module.js',
                cwd: 'test/fixtures'
            },
            noStrict: {
                options: {
                    strict: false
                },
                src: 'index.html',
                dest: 'tmp/no_strict.js',
                cwd: 'test/fixtures'
            },
            tabs: {
                options: {
                    indent: '\t'
                },
                src: 'index.html',
                dest: 'tmp/tabs.js',
                cwd: 'test/fixtures'
            }
        },
        clean: {
            tmp: ['tmp']
        },
        nodeunit: {
            tests: 'test/**/*_test.js'
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', 'Clean and run the tests', [
        'clean',
        'angularTemplateCache',
        'nodeunit'
    ]);
};
