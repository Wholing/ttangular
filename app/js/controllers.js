'use strict';

/* Controllers */
	var Person = function(id, name)
		{
			return {"id" : id, "name" : name, "actions": []};
		};
  		
angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope','$timeout', 'MemoryData','TimeServices', 'InputValidation', function($scope, $timeout, MemoryData, TimeServices, InputValidation) {
  		

  		$scope.data = MemoryData;
  		$scope.dataList = MemoryData.getAll();
		//$scope.data.add(1, new Person(1,"Nils Nilsson"));
		//$scope.data.add(1, {"id" : 1, "name" : "Nils Nilsson", "actions": []});
		// $scope.data.add({"id" : 1, "name" : "Nils Nilsson", "actions": []});
		// $scope.data.save();

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

	$scope.showClock = true;
	$scope.message = {
		text : "some information",
		textClass : "info",
		visible : false,
		displayTime : 2000
	} 
	$scope.last = { person : null,
					action : null
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
		$scope.showClock = false;
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
	 	$scope.showClock = true;
	};

	$scope._getPerson = function() {
	    	return MemoryData.getById($scope.personId);
	};

	$scope.addAction = function(actionButton) {
		var person = this._getPerson();
		if (person == null)
		{
		    $scope.showErrorMessage("Person not found");
		}
		else
		{
			var action = {	"id": MemoryData.nextId(), 
							"description": actionButton.description,
							"time": TimeServices.currentDateTime(),
						};
			
			var validationResult = InputValidation.validateAction(person, action);
			if ( validationResult.value != 0)
			{
				$scope.showErrorMessage(validationResult.message);
			}
			else {
				person.actions.push(action);
				MemoryData.add(person);
				MemoryData.save();
				$scope.showInfoMessage("Data saved.");
				$scope.last.person = person;
			}
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
  	$scope.dataList = MemoryData.getAll();
  	$scope.text = "Hej!"
  }]);