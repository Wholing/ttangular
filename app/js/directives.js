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

  ttDirectives.directive('ttPresensPerson', function() {
     return {
            restrict : 'E',
            templateUrl: 'partials/PresensPerson.html',
            scope: {
              person: '=',
              limitTo: "=?",
            },
             link: function(scope, element, attrs) {
              scope.$watch('person', function(person){

                scope.numberOfActions = 0;
                if (scope.person != undefined && scope.person != null)
                {
                  scope.numberOfActions = scope.person.actions.length;
                }
                scope.limitToInternal = scope.limitTo || 2;
                scope.moreRowsExists = scope.limitToInternal < scope.numberOfActions;
                scope.showMore = function() {
                    scope.numberOfActions = scope.person.actions.length;
                    scope.limitToInternal = scope.limitToInternal+2;
                    scope.moreRowsExists = scope.limitToInternal < scope.numberOfActions;
                } 
              })

            }
        };

  });


    ttDirectives.directive('ttClock', function() {
  	 return {
      			templateUrl: 'partials/Clock.html',
      			link : function()
      			{
      				CoolClock.findAndCreateClocks();
      			}
      			//template : '<span>MyDirective</span>'
    		};

  });
