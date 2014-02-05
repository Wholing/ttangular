'use strict';

/* Controllers */
	var Person = function(id, name)
		{
			return {"id" : id, "name" : name, "actions": []};
		};
  		
angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope','$timeout', 'MemoryData', function($scope, $timeout, MemoryData) {
  		

  		$scope.data = MemoryData;
		//$scope.data.add(1, new Person(1,"Nils Nilsson"));
		$scope.data.add(1, {"id" : 1, "name" : "Nils Nilsson", "actions": []});
		$scope.data.save();

	  	$scope.layout = { rows: [ ["1","2","3"],
						["4","5","6"],
						["7","8","9"],
						["<","0","!"]],
				 actionButtons : [ 	{"id": 0, "description": "In"},
				 					{"id": 1, "description": "out lunch"},
				 					{"id": 2, "description": "in lunch"},
				 					{"id": 3, "description": "Out"}
								 ]
					};



	$scope.personId = "";
	$scope.message = {
		text : "some information",
		textClass : "info",
		visible : true,
		displayTime : 2000
	} 

 	$scope.buttonPress = function(newValue) {
		$scope.addValue(newValue);
	};

	$scope.addValue = function(newValue) {
	 	if (newValue=='<')
			{
				this.removeLastValue();
				return;
			}
		if (newValue=="!")
		{
			$scope.clearValues();
			return;
		}
	 	this.personId = this.personId + newValue;
	}
	
	$scope.clearValues = function() {
		$scope.personId='';
 	};
			 
	 $scope.removeLastValue = function() {
	 	if ($scope.personId.length > 0)
		{
			var actualValues = $scope.personId;
			var newValues = actualValues.substring(0, actualValues.length-1);
			$scope.personId = newValues;
		}
	 };


	$scope.actionButtonPress = function(actionButton) {
	 	$scope.addAction(actionButton);
	};

	$scope._getPerson = function() {
	    	return MemoryData.getById($scope.personId);
	};

	$scope.addAction = function(action) {
		var person = this._getPerson();
		if (person == null)
		{
		    $scope.showErrorMessage("Person not found");
		}
		else
		{
			person.actions.push(action);
			MemoryData.add(person);
			MemoryData.save();
			$scope.showInfoMessage("Data saved.")
			//self.actions.push(action);
		}
		$scope.clearValues();
	};

	$scope.showErrorMessage = function (text) {
		$scope.showMessage(text, "alert alert-danger");
	};

	$scope.showInfoMessage = function (text) {
		$scope.showMessage(text, "alert alert-success");
	};

	$scope.showMessage = function (text, textclass) {
		$scope.message.text = text;
		$scope.message.textClass = textclass;	
		$scope.message.visible = true;	
		$timeout($scope.clearMessage, $scope.message.displayTime);
	};


	$scope.clearMessage = function () {		
		$scope.message.visible = false;
	}	





  }])
  .controller('MyCtrl2', ['$scope','$timeout', 'MemoryData', function($scope, $timeout, MemoryData) {
  	$scope.data = MemoryData.getAll();
  	$scope.text = "Hej!"
  }]);