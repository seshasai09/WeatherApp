/**
 * Created by seshasai on 22/07/2017.
 */

(function(){
    angular.module('SkyCast')
        .controller('CurrentLocationController',CurrentLocationController);

    function CurrentLocationController($scope,WeatherService){

        var vm = this;
        vm.errorMessage = ""
        currentLocationweather();


        function currentLocationweather(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(pos){
                    $scope.$apply(function(){
                        WeatherService.getCurrentWeather(pos.coords.latitude,pos.coords.longitude)
                            .then(function(response){
                                console.log(response);
                                vm.current = response.data.currently;
                                vm.weekdata = response.data.daily.data;
                                vm.weeksummary = response.data.daily.summary;
                            });
                    })
                }, function(err){
                    vm.errorMessage = "Browser is preventing us from locating you !! Please use alternative browser or You can use Weather Details link";
                    vm.current = null;
                });
            }
        }


    }
})();
