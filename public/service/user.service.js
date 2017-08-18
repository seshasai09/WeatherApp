/**
 * Created by seshasai on 21/07/2017.
 */

(function(){
    angular.module('SkyCast')
        .factory('UserService',UserService);
    function UserService($http){
        return {
            register : register,
            login : login,
            userPreviousSearchs : userPreviousSearchs,
            isLogedIn : isLogedIn,
            logout : logout,
            saveUserSearchQuery : saveUserSearchQuery
        }

        function register(user){
            return $http.post('/api/skycast/signup',user);

        }

        function login(user){
            return $http.post('/api/skycast/login',user);
        }

        function userPreviousSearchs(userName){
            return $http.get('/api/skycast/user/previoussearches/'+userName+'');

        }

        function isLogedIn(){
            return $http.get('/api/skycast/loggedin');
        }

        function logout(){
            return $http.get('/api/skycast/logout');
        }

        function saveUserSearchQuery(query){
            return $http.post('/api/skycast/usersearchquery',query);
        }
    }
})();
