'use strict';

angular.module('hello.world').
run(['$templateCache', function($templateCache) {
  $templateCache.put('multiline.html', '<html><head></head><body><h1>Hello world!</h1></body></html>');
}]);
