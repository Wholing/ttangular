'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myServices = angular.module('myApp.services', []).
  value('version', '0.1');

myServices.factory("ActionTypes", function() {
	return {
		isInAction : function(action) {
			return action.description == 'In';
		},
		isLunchOutAction : function(action) {
			return action.description == 'out lunch';
		},
		isLunchInAction : function(action) {
			return action.description == 'in lunch';
		},
		isOutAction : function(action) {
			return action.description == 'Out';
		}
	}
});

myServices.factory("InputValidation", [ 'ActionTypes', function(actionTypes){
	return {
		validateAction : function(person, action) {
			var lastAction = this.getLastAction(person);
			if (lastAction == null) {
				return this.returnOkStatus();
			}

			if (actionTypes.isInAction(action)) {
				return this.validateIn(lastAction, action);
			} 
			else if (actionTypes.isLunchOutAction(action)) {
				return this.validateLunchOut(lastAction, action);
			} 
			else if (actionTypes.isLunchInAction(action)) {
				return this.validateLunchIn(lastAction, action);
			} 
			else if (actionTypes.isOutAction(action)) {
				return this.validateOut(lastAction, action);
			}

			return this.returnStatus(2, 'Unknown action');
		},

		validateIn : function(lastAction, action) {
			return this.returnRequiredAction(actionTypes.isOutAction(lastAction), "out")
		},

		validateLunchOut : function(lastAction, action) {
			return this.returnRequiredAction(actionTypes.isInAction(lastAction), "in")
		},

		validateLunchIn : function(lastAction, action) {
			return this.returnRequiredAction(actionTypes.isLunchOutAction(lastAction), "in")
		},

		validateOut : function(lastAction, action) {
			var toReturn = actionTypes.isInAction(lastAction);
			if (!toReturn)
			{
				toReturn = actionTypes.isLunchInAction(lastAction);
			}
			return this.returnRequiredAction(toReturn, "in or lunch out");
		},

		getLastAction : function(person) {
			if (person.actions.length > 0)
			{
				return person.actions[person.actions.length-1];
			}
			return null;
		},

		returnStatus : function(value, message)
		{
			return { "value" : value, "message" : message }
		},

		returnOkStatus : function()
		{
			return this.returnStatus(0, "ok");
		},

		returnRequiredAction : function(isValidated, requiredActionText) {
			if (isValidated)
			{
				return this.returnOkStatus();
			}
			return this.returnStatus(1, "Last action is not a " + requiredActionText)
		}


	}
}])

myServices.factory("MemoryData", function() {
	return {
				self : this,
				_pendingdata : [],
				_data : [	

				{ "id": 1, "name": "Nils Nilsson", "actions": [ { "id": 4, "description": "In", "time": "2014-02-24 @ 23:16:44" }, { "id": 4, "description": "Out", "time": "2014-02-24 @ 23:19:44" }, { "id": 4, "description": "In", "time": "2014-02-24 @ 23:22:44" } ] },
				//{"id" : 1, "name" : "Nils Nilsson", "actions": []},
							{"id" : 2, "name" : "Sven Svensson", "actions": []},
							{"id" : 3, "name" : "Jan Jansson", "actions": []},
							{"id" : 4, "name" : "Per Persson", "actions": []},
							{"id" : 5, "name" : "Rune Runesson", "actions": []},
							{"id" : 6, "name" : "Ivar Ivarsson", "actions": []},
							{"id" : 7, "name" : "Orvar Burjesson", "actions": []},
							{"id" : 8, "name" : "Locko Flack", "actions": []}
						],
				_index : 1, 


				getIndex : function(id)
				{
					for (var i = this._data.length - 1; i >= 0; i--) {
						if (this._data[i].id==id)
						return i;
					}; 
					return -1;
				},

				add : function(data){
					this._pendingdata.push(data);
				},

				save : function(){
					for (var i = this._pendingdata.length - 1; i >= 0; i--) {
						var index = this.getIndex(this._pendingdata[i].id);
						if (index < 0)
						{
							this._data.push(this._pendingdata[i]);
						}
						else
						{
							this._data[index] = this._pendingdata[i];
						}
					}
					this._pendingdata = [];
				},

				getById : function(id){
					var index = this.getIndex(id);
					if (index > -1)
					{
						return this._data[index];
					}
					return null;
				},

				getAll : function() {
					return this._data;
				},

				nextId : function() {
					this._index++;
					return this._index;
				}	

			}
});

var pad = function(num, size)
{
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
}

myServices.factory("TimeServices", function() {

	return {

		currentDateTime :  function() {
			var currentdate = new Date();
			var currentmonth  = pad(currentdate.getMonth()+1, 2);
			var currentday = pad(currentdate.getDate(), 2);
			var toReturn= currentdate.getFullYear() + "-"
			 					+ currentmonth + "-" 
								+ currentday
				                + " @ "  
				                + currentdate.getHours() + ":"  
				                + currentdate.getMinutes() + ":" 
				                + currentdate.getSeconds();
			return toReturn;
		}
	}
});
