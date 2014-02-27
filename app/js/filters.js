'use strict';

/* Filters */
var myFilters = angular.module('myApp.filters', []);
 myFilters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

 myFilters.filter('object2Array', function() {
     return function(input) {
      var out = []; 
      var i=0;
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  });
