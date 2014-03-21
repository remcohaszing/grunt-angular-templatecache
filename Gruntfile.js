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
            postprocess: {
                options: {
                    htmlmin: {
                        collapseWhitespace: true
                    },
                    postprocess: function(content, name) {
                        return '<!doctype html>\n' + content;
                    }
                },
                src: 'index.html',
                dest: 'tmp/postprocess.js',
                cwd: 'test/fixtures'
            },
            preprocess: {
                options: {
                    htmlmin: {
                        collapseWhitespace: true
                    },
                    preprocess: function(content, name) {
                        return '<!doctype html>\n' + content;
                    }
                },
                src: 'index.html',
                dest: 'tmp/preprocess.js',
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
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'tasks/**/*.js',
                'test/*.js',
                'Gruntfile.js'
            ]
        },
        lintspaces: {
            options: {
                newline: true,
                trailingspaces: true,
                indentation: 'spaces',
                spaces: 4,
                ignores: [
                    'js-comments'
                ]
            },
            js: {
                src: ['<%= jshint.files %>']
            }
        },
        nodeunit: {
            tests: 'test/**/*_test.js'
        },
        watch: {
            src: {
                files: ['tasks/**', 'test/**', 'Gruntfile.js'],
                tasks: ['jshint', 'lintspaces', 'test']
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-lintspaces');

    grunt.registerTask('test', 'Clean and run the tests.', [
        'clean',
        'angularTemplateCache',
        'nodeunit'
    ]);

    grunt.registerTask(
        'default',
        'Watch files and run jshint and tests on changes.', [
            'watch'
        ]
    );
};
