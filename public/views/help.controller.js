/**
 * Created by seshasai on 24/07/2017.
 */
(function(){
    angular.module('SkyCast')
        .controller('HelpController',HelpController);

    function HelpController($scope){
        $scope.signupDisp= signupDisp
        $scope.loginDisp= loginDisp
        $scope.weatherDetailsDsip= weatherDetailsDsip
        $scope.zoomiDisp= zoomiDisp
        $scope.zoomoDisp= zoomoDisp
        $scope.locationWeatherDetailDisp= locationWeatherDetailDisp
        $scope.historicalWeatherDetailDisp= historicalWeatherDetailDisp
        $scope.humidDisp= humidDisp
        $scope.temperatureDisp= temperatureDisp
        $scope.weatherTrendDisp= weatherTrendDisp
        $scope.MinMaxtempDisp = MinMaxtempDisp

        $scope.register=false
        $scope.login=false;
        $scope.weatherDetails=false;
        $scope.zoomi=false;
        $scope.zoomo=false;
        $scope.locationWeatherDetail=false;
        $scope.historicalWeatherDetail=false;
        $scope.humid=false;
        $scope.temperature=false;
        $scope.weatherTrend=false;
        $scope.minMaxtemp = false


        function reset(){
            if($scope.register){$scope.register=false}
            if($scope.login){$scope.login=false;}
            if( $scope.weatherDetails){ $scope.weatherDetails=false;}
            if($scope.zoomi){$scope.zoomi=false;}
            if($scope.zoomo){$scope.zoomo=false;}
            if($scope.locationWeatherDetail){$scope.locationWeatherDetail=false;}
            if($scope.historicalWeatherDetail){$scope.historicalWeatherDetail=false;}
            if($scope.humid){$scope.humid=false;}
            if( $scope.temperature){ $scope.temperature=false;}
            if($scope.weatherTrend){$scope.weatherTrend=false;}
            if($scope.minMaxtemp){$scope.minMaxtemp=false;}

        }


        function MinMaxtempDisp(){
            reset()
            if( $scope.minMaxtemp) {
                $scope.minMaxtemp = false;
            }
            else{
                $scope.minMaxtemp = true;
            }
        }


        function signupDisp(){
            reset()
            if( $scope.register) {
                $scope.register = false;
            }
            else{
                $scope.register = true;
            }

        }
        function loginDisp(){
            reset()
            if( $scope.login) {
                $scope.login = false;
            }
            else{
                $scope.login = true;
            }
        }

        function weatherDetailsDsip(){
            reset()
            if( $scope.weatherDetails) {
                $scope.weatherDetails = false;
            }
            else{
                $scope.weatherDetails = true;
            }
        }

        function zoomiDisp(){
            reset()
            if( $scope.zoomi) {
                $scope.zoomi = false;
            }
            else{
                $scope.zoomi = true;
            }
        }

        function zoomoDisp(){
            reset()
            if( $scope.zoomo) {
                $scope.zoomo = false;
            }
            else{
                $scope.zoomo = true;
            }
        }

        function locationWeatherDetailDisp(){
            reset()
            if( $scope.locationWeatherDetail) {
                $scope.locationWeatherDetail = false;
            }
            else{
                $scope.locationWeatherDetail = true;
            }
        }



        function historicalWeatherDetailDisp(){
            reset()
            if( $scope.historicalWeatherDetail) {
                $scope.historicalWeatherDetail = false;
            }
            else{
                $scope.historicalWeatherDetail = true;
            }
        }

        function humidDisp(){
            reset()
            if( $scope.humid) {
                $scope.humid = false;
            }
            else{
                $scope.humid = true;
            }
        }

        function temperatureDisp(){
            reset()
            if( $scope.temperature) {
                $scope.temperature = false;
            }
            else{
                $scope.temperature = true;
            }
        }

        function weatherTrendDisp(){
            reset()
            if( $scope.weatherTrend) {
                $scope.weatherTrend = false;
            }
            else{
                $scope.weatherTrend = true;
            }
        }




    }
})();
