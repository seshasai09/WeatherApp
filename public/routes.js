/**
 * Created by seshasai on 18/07/2017.
 */

(function(){
    'use strict'
    angular.module('SkyCast')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/currentweather',{
                    templateUrl: "views/currentweather.view.html",
                    controller: "CurrentWeatherController",
                    controllerAs: "model",
                    resolve :{
                        isLoggedin : isLoggedin
                    }
                })
                .when('/historicalweathertrends',{
                    templateUrl: "views/historical.weather.trends.view.html",
                    controller: "HistoricalWeatherTrendsController",
                    controllerAs: "model",
                    resolve :{
                        isLoggedin : isLoggedin
                    }
                })
                .when('/signup',{
                    templateUrl: "views/signup.view.html",
                    controller: "UserController",
                    controllerAs: "model"
                })
                .when('/login',{
                    templateUrl: "views/login.view.html",
                    controller: "UserController",
                    controllerAs: "model"
                })
                .when('/userprevioussearches',{
                    templateUrl: "views/user.previous.searches.view.html",
                    controller: "PreviousSearchesController",
                    controllerAs: "model",
                    resolve :{
                        isLoggedin : isLoggedin
                    }
                })
                .when('/pastweatherdetails/:lat/:lon/:date',{
                    templateUrl: "views/pastdate.weather.details.view.html",
                    controller: "PastWeatherDetailsController",
                    controllerAs: "model",
                    resolve :{
                        isLoggedin : isLoggedin
                    }
                })
                .when('/home',{
                    templateUrl: "views/current.location.view.html",
                    controller: "CurrentLocationController",
                    controllerAs: "model"
                })
                .when('/logout',{
                    templateUrl: "views/logout.view.html"
                })
                .when('/help',{
                    templateUrl: "views/help.view.html",
                    controller: "HelpController"
                })
                .otherwise({
                    redirectTo :"/home"
                });
        });

    function isLoggedin(UserService,$location,$q,$rootScope){
        var deferred = $q.defer();

        UserService.isLogedIn()
            .then(function(response){
                var currentUser= response.data;
                if((currentUser!=null ||currentUser == ""|| currentUser == undefined) && $rootScope.currentUser.username!=null){
                    deferred.resolve();//manage the promise bt resolving it
                }else{
                    console.log("going to login")
                    deferred.reject();//rejecting the promise
                    $location.url("/login");
                }
            });
        return deferred.promise;
    }
})();
