describe('weatherController', function() {
   
   var $httpBackend, $rootScope, createController;

   beforeEach(module('weatherApp'));

   beforeEach(inject(function($injector) {

     $httpBackend = $injector.get('$httpBackend');
     $rootScope = $injector.get('$rootScope');
     weatherService = $injector.get('weatherService')
     authRequestHandler = $httpBackend.when('GET', YAHOO_TEST_URL)
                            .respond(TEST_JSON_DATA);
	
     var $controller = $injector.get('$controller');
	
     createController = function() {
       return $controller('MyController', {'$scope' : $rootScope, weatherService: weatherService });
     };
   }));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });


   it('should fetch weather data', function() {
     var controller = createController();
     $rootScope.selectedCity = 'Test City';	
     controller.onChage();	
     expect($rootScope.currentData).toBe(EXPECTED_WEATHER_DATA);
     expect($rootScope.forcastData).toBe(EXPECTED_FORCAST_DATA);	
   });
});
