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
					return this._data;
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

timeTerminal.factory("InputLogic", function() {
	return { 
			personId: "",
			 buttonPress: function(newValue) {
	 			this.addValue(newValue);
			 },
			 addValue: function(newValue) {
			 	if (newValue=='<')
					{
						this.removeLastValue();
						return;
					}
				if (newValue=="!")
				{
					this.clearValues();
					return;
				}
			 	this.personId = this.personId + newValue;
			 },
			 clearValues: function() {
			 	this.personId='';
			 },
			 removeLastValue : function() {
			 	if (this.personId.length > 0)
				{
					var actualValues = this.personId;
					var newValues = actualValues.substring(0, actualValues.length-1);
					this.personId = newValues;
				}
			 },
			 actionButtonPress : function(actionButton) {
			 	alert("hej!");
			 }

			}
})


function TimeTerminalMainController($scope,Layout,InputLogic,MemoryData, $log)
{
	$scope.layout = Layout;
	$scope.inputLogic = InputLogic;
	$scope.data = MemoryData;
	$scope.data.add(1, new Person(1,"Nils Nilsson"));
	$scope.data.save();
}