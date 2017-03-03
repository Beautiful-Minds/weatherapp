weatherApp.controller('weatherController', 
['$scope', 'weatherService', function($scope, weatherService){
	$scope.selectedCity = geteKeyFromDataStore('WASelectedCity');
	$scope.cities = ['Plano, TX', 'Richardson, TX'];
	$scope.currentData = null;
	$scope.error = null;
	$scope.forcastData = null;
        $scope.onChange =  function(){
	     seKeyinDataStore('WASelectedCity',$scope.selectedCity);
             weatherService.getWeatherDataforCity($scope.selectedCity).then(
		function(response){
			if(response.status===200){
				if(response.data.query.results){
					$scope.currentData = {};
					$scope.error	= '';
					$scope.currentData.location = response.data.query.results.channel.location;
					$scope.currentData.wind = response.data.query.results.channel.wind;
					$scope.currentData.astronomy = response.data.query.results.channel.astronomy;
					$scope.currentData.atmosphere = response.data.query.results.channel.atmosphere;
					$scope.forcastData = response.data.query.results.channel.item.forecast;
				}else{
			           $scope.currentData = null;
				   $scope.forcastData = null;		
				   $scope.error	= 'Enter valid City name';
				}
			}else{
				$scope.currentData = null;
				$scope.forcastData = null;	
				$scope.error = 'Error getting weather data from Yahoo';	
			}
		},
                function(error){
			$scope.currentData = null;
				$scope.forcastData = null;	
				$scope.error = 'Error getting weather data from Yahoo';	
		}
              );
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
