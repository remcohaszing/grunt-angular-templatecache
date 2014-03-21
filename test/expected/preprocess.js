'use strict';

angular.module('hello.world').
run(['$templateCache', function($templateCache) {
  $templateCache.put('index.html', '<!doctype html><html></html>');
}]);
