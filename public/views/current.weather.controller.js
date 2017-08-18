/**
 * Created by seshasai on 18/07/2017.
 */

(function(){
    angular.module('SkyCast')
        .controller('CurrentWeatherController',CurrentWeatherController);

    function CurrentWeatherController(WeatherService,$scope,$rootScope,GoogleApiService,$location,UserService){
        var vm = this;
        vm.historicalWeatherTrends = historicalWeatherTrends
        $rootScope.query = null


        vm.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 8 };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: { draggable: true },
            events: {
                dragend: function (marker, eventName, args) {
                    console.log('marker dragend');
                    $rootScope.lat = marker.getPosition().lat();
                    $rootScope.lon = marker.getPosition().lng();
                    GoogleApiService.getLocationDataFromCoordinates($rootScope.lat,$rootScope.lon)
                        .then(function(response){
                            components = response.data.results[0].address_components
                            for (comp in components){
                                if(components[comp].types[0] === 'postal_code'){
                                    vm.query= components[comp].long_name
                                    $rootScope.query=vm.query;
                                }
                            }
                            var query = {
                                username: $rootScope.currentUser.username,
                                latitude: $rootScope.lat,
                                longitude: $rootScope.lon,
                                pincode: $rootScope.query
                            }
                            UserService.saveUserSearchQuery(query);
                            locationweather($rootScope.lat,$rootScope.lon);
                            vm.drag = false;
                        });

                }
            }
        };

        function locationweather(lat,lon){
            WeatherService.getCurrentWeather(lat,lon)
                .then(function(response){
                    vm.current = response.data.currently;
                    vm.weekdata = response.data.daily.data;
                    vm.weeksummary = response.data.daily.summary;
                });

        }

        function historicalWeatherTrends(){
            $location.path('/historicalweathertrends');
        }



    }
})();
