/**
 * Created by seshasai on 23/07/2017.
 */

(function(){
    angular.module('SkyCast')
        .controller('PastWeatherDetailsController',PastWeatherDetailsController);

    function PastWeatherDetailsController(WeatherService,$routeParams){

        var vm = this;
        getData();

        function getData(){
            latitude = $routeParams.lat
            longitude = $routeParams.lon
            date = $routeParams.date.substring(0,$routeParams.date.length-5)
            WeatherService.getPastWeatherDetails(latitude,longitude,date)
                .then(function(response){
                    vm.past = response.data.currently;
                    vm.weekdata = response.data.daily.data;
                    vm.weeksummary = response.data.daily.summary;
                });
        }
    }
})()