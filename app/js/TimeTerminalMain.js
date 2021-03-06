var timeTerminal = angular.module("timeTerminal", []);


var Action = function(id, description)
{
	this.id = id;
	this.description = description;
};

var Person = function(id, name)
{
	return {"id" : id, "name" : name, "actions": []};
};

timeTerminal.factory("MemoryData", function() {
	return {
				self : this,
				_pendingdata : [],
				_data : [],
				
				add : function(id, data){
					toAdd = { 'id': id, 'data' : data};
					this._pendingdata.push(toAdd);
				},

				save : function(){
					this._data.push.apply(this._data, this._pendingdata);
					this._pendingdata = [];
				},

				getById : function(id){
					for (var i = this._data.length - 1; i >= 0; i--) {
						if (this._data[i].id==id)
						return this._data[i].data;
					}; 
					return null;
				},

				getAll : function() {
					return _data;
				}			

	}
});


timeTerminal.factory("Layout", function() {
	//return {message: "data from service!"}
	return { rows: [ ["1","2","3"],
					["4","5","6"],
					["7","8","9"],
					["<","0","!"]],
			 actionButtons : [	new Action(0, 'In'), 
    							new Action(1, 'out lunch'),
    							new Action(2, 'in lunch'),
    							new Action(3, 'Out'), 
							 ]
				};
});

timeTerminal.factory("InputLogic", function(MemoryData) {
	return { 
			personId: "",



	}
})


function TimeTerminalMainController($scope,Layout,InputLogic,MemoryData, $log, $timeout)
{
	$scope.layout = Layout;
	$scope.data = MemoryData;
	$scope.data.add(1, new Person(1,"Nils Nilsson"));
	$scope.data.save();

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
}