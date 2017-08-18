/**
 * Created by seshasai on 19/07/2017.
 */
(function(){
    angular.module('SkyCast')
        .factory('GoogleApiService',GoogleApiService);

    function GoogleApiService($http){
        return{
            getLocationDataFromCoordinates : getLocationDataFromCoordinates
        }

        function getLocationDataFromCoordinates(query){

            return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCrTXKG-p7iI-sES_vOSlGvCmfqrS65XbA');
        }


    }
})();
