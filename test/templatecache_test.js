'use strict';

var fs = require('fs');
var grunt = require('grunt');

exports.templatecache = {
  test: function(test) {
    var files = fs.readdirSync('test/expected');

    test.expect(files.length);

    files.forEach(function(file) {
      var actual = grunt.file.read('tmp/' + file);
      var expected = grunt.file.read('test/expected/' + file);
      test.equal(actual, expected, 'test failed on ' + file);
    });
    test.done();
  }
};
