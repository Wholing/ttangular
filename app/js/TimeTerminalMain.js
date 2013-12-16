var timeTerminal = angular.module("timeTerminal", []);

timeTerminal.factory("Layout", function() {
	//return {message: "data from service!"}
	return { rows: [ ["1","2","3"],
					["4","5","6"],
					["7","8","9"],
					["<","0","!"]]
				};
});

timeTerminal.factory("Data", function() {
	return { personId: "",
			 addToPersonId: function(data) {
			 	this.personId = this.personId + data;
			 }}
})


function TimeTerminalMainController($scope,Layout,Data, $log)
{
	$scope.layout = Layout;
	$scope.data = Data;
}