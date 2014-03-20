'use strict';

angular.module('hello.world').
run(['$templateCache', function($templateCache) {
  $templateCache.put('index.html', '<html></html>');
  $templateCache.put('multiline.html',
    '<html>\n' +
    '    <head></head>\n' +
    '    <body>\n' +
    '        <h1>Hello world!</h1>\n' +
    '    </body>\n' +
    '</html>'
  );
}]);
