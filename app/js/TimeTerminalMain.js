var timeTerminal = angular.module("timeTerminal", []);


var Action = function(id, description)
{
	this.id = id;
	this.description = description;
};


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


function TimeTerminalMainController($scope,Layout,InputLogic, $log)
{
	$scope.layout = Layout;
	$scope.inputLogic = InputLogic;
}