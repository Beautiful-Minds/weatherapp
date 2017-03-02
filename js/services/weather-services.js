weatherApp.factory('weatherService', function($http){
	return {
		getWeatherDataforCity: function(city){
			var url = 'https://query.yahooapis.com/v1/public/yql?q=';
 			var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+city+'")&format=json';
			url = url + query;
			return $http.get(url);
		}
	};
});
