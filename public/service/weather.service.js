/**
 * Created by seshasai on 18/07/2017.
 */
(function(){
    angular.module('SkyCast')
        .factory('WeatherService',WeatherService);

    function WeatherService($http){
        return{
            getCurrentWeather : getCurrentWeather,
            getHistoricalWeatherData : getHistoricalWeatherData,
            getPastWeatherDetails : getPastWeatherDetails
        }

        function getCurrentWeather(lat,lon){
            return $http.get('/getlocalweather/'+lat+','+lon);

        }

        function getHistoricalWeatherData(query,startDate,endDate){
            return $http.get(' https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=49917888911a46978a4204540171807&q='+query+'&date='+startDate+'&enddate='+endDate+'&format=json')
        }

        function getPastWeatherDetails(lat,lon,date){
            return $http.get('/getpastweatherdetails/'+lat+','+lon+','+date);
        }


    }
})();
