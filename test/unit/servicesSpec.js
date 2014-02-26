'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });


  describe('ActionTypes tests', function() {
  	it('In action should be possible to be interpreted', inject(function(ActionTypes) {
  		var inAction = { "id": 4, "description": "In", "time": "2014-02-24 @ 23:16:44" };
  		expect(ActionTypes.isInAction(inAction)).toBe(true);
  	}));
    it('Out action should be possible to be interpreted', inject(function(ActionTypes) {
  		var outAction = { "id": 4, "description": "Out", "time": "2014-02-24 @ 23:16:44" };
  		expect(ActionTypes.isOutAction(outAction)).toBe(true);
  	}));
  	it('Lunch In action should be possible to be interpreted', inject(function(ActionTypes) {
  		var inAction = { "id": 4, "description": "in lunch", "time": "2014-02-24 @ 23:16:44" };
  		expect(ActionTypes.isLunchInAction(inAction)).toBe(true);
  	}));
    it('Lunch Out action should be possible to be interpreted', inject(function(ActionTypes) {
  		var outAction = { "id": 4, "description": "out lunch", "time": "2014-02-24 @ 23:16:44" };
  		expect(ActionTypes.isLunchOutAction(outAction)).toBe(true);
  	}));
  })

var inAction = { "id": 4, "description": "In", "time": "2014-02-24 @ 23:16:44" };
var outAction = { "id": 4, "description": "Out", "time": "2014-02-24 @ 23:16:44" };
var lunchInAction = { "id": 4, "description": "in lunch", "time": "2014-02-24 @ 23:16:44" };
var lunchOutAction = { "id": 4, "description": "out lunch", "time": "2014-02-24 @ 23:16:44" };

 describe('InputValidation.validateIn', function() {
  	it('Should be valid to create in action if last action is out', inject(function(InputValidation) {
  		var result = InputValidation.validateIn(outAction, inAction);
  		expect(result.value).toBe(0);
  	}));
  	it('Should not be valid to create in action if last action is lunch out', inject(function(InputValidation) {
  		var result = InputValidation.validateIn(lunchOutAction, inAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should not be valid to create in action if last action is lunch in', inject(function(InputValidation) {
  		var result = InputValidation.validateIn(lunchInAction, inAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should not be valid to create in action if last action is in', inject(function(InputValidation) {
  		var result = InputValidation.validateIn(inAction, inAction);
  		expect(result.value).toBe(1);
  	}));

  })


  describe('InputValidation.validateOut', function() {
  	it('Should be valid to create out action if last action is in', inject(function(InputValidation) {
  		var result = InputValidation.validateOut(inAction, outAction);
  		expect(result.value).toBe(0);
  	}));
  	it('Should not be valid to create out action if last action is lunch out', inject(function(InputValidation) {
  		var result = InputValidation.validateOut(lunchOutAction, outAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should be valid to create out action if last action is lunch in', inject(function(InputValidation) {
  		var result = InputValidation.validateOut(lunchInAction, outAction);
  		expect(result.value).toBe(0);
  	}));
  	it('Should not be valid to create out action if last action is out', inject(function(InputValidation) {
  		var result = InputValidation.validateOut(outAction, outAction);
  		expect(result.value).toBe(1);
  	}));

  })





 describe('InputValidation.validateLunchIn', function() {
  	it('Should not be valid to create lunch in action if last action is out', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchIn(outAction, lunchInAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should be valid to create lunch in action if last action is lunch out', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchIn(lunchOutAction, lunchInAction);
  		expect(result.value).toBe(0);
  	}));
  	it('Should not be valid to create lunch in action if last action is lunch in', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchIn(lunchInAction, lunchInAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should not be valid to create lunch in action if last action is in', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchIn(inAction, lunchInAction);
  		expect(result.value).toBe(1);
  	}));

  })


  describe('InputValidation.validateLunchOut', function() {
  	it('Should be valid to create out action if last action is in', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchOut(inAction, lunchOutAction);
  		expect(result.value).toBe(0);
  	}));
  	it('Should not be valid to create out action if last action is lunch out', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchOut(lunchOutAction, lunchOutAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should not be valid to create out action if last action is lunch in', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchOut(lunchInAction, lunchOutAction);
  		expect(result.value).toBe(1);
  	}));
  	it('Should not be valid to create out action if last action is out', inject(function(InputValidation) {
  		var result = InputValidation.validateLunchOut(outAction, lunchOutAction);
  		expect(result.value).toBe(1);
  	}));

  })




});
