'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myServices = angular.module('myApp.services', []).
  value('version', '0.1');

myServices.factory("MemoryData", function() {
	return {
				self : this,
				_pendingdata : [],
				_data : [	

				{ "id": 1, "name": "Nils Nilsson", "actions": [ { "id": 4, "description": "In", "time": "2014-02-24 @ 23:16:44" }, { "id": 4, "description": "In", "time": "2014-02-24 @ 23:16:44" }, { "id": 4, "description": "In", "time": "2014-02-24 @ 23:16:44" } ] },
				//{"id" : 1, "name" : "Nils Nilsson", "actions": []},
							{"id" : 2, "name" : "Sven Svensson", "actions": []},
							{"id" : 3, "name" : "Jan Jansson", "actions": []},
							{"id" : 4, "name" : "Per Persson", "actions": []},
							{"id" : 5, "name" : "Rune Runesson", "actions": []},
							{"id" : 6, "name" : "Ivar Ivarsson", "actions": []}
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
