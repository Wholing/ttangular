'use strict';

/* Directives */


var ttDirectives = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);



  ttDirectives.directive('ttPresenslist', function() {
  	 return {
      			templateUrl: 'partials/PresensList.html'
      			//template : '<span>MyDirective</span>'
    		};

  });
