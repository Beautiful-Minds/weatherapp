weatherApp.controller('weatherController', 
['$scope', 'weatherService', function($scope, weatherService){
	$scope.selectedCity = geteKeyFromDataStore('WASelectedCity');
	$scope.cities = ['Plano, TX', 'Richardson, TX'];
	$scope.currentData = null;
        $scope.onChange =  function(){
	     seKeyinDataStore('WASelectedCity',$scope.selectedCity);
             weatherService.getWeatherDataforCity($scope.selectedCity).then(
		function(response){
			if(response.status===200){;
				$scope.currentData = {}	
				$scope.currentData.location = response.data.query.results.channel.location;
				$scope.currentData.wind = response.data.query.results.channel.wind;
				$scope.currentData.astronomy = response.data.query.results.channel.astronomy;
				$scope.currentData.atmosphere = response.data.query.results.channel.atmosphere;
				$scope.forcastData = response.data.query.results.channel.item.forecast;
			}
		});
	};
	
	function seKeyinDataStore(keyName,keyValue){
		localStorage.setItem(keyName, keyValue);
	}
	
	function geteKeyFromDataStore(keyName){
		return localStorage.getItem(keyName);
	}
	if($scope.selectedCity){
		$scope.onChange();
	}
}]);
