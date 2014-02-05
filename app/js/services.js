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
				_data : [],
				
				add : function(id, data){
					var toAdd = { 'id': id, 'data' : data};
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