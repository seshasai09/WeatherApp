/**
 * Created by seshasai on 21/07/2017.
 */
(function(){

    angular.module('SkyCast')
        .controller('UserController',UserController);

    function UserController(UserService,$location,$scope,$rootScope){
        var vm = this;
        vm.register = register;
        vm.login = login;
        $scope.previousSearch = previousSearch;
        vm.isLogedIn = isLogedIn;
        vm.errorMessage = ""
        $scope.logout = logout
        $rootScope.currentUser={}

        function register(){
            vm.errorMessage=""
            if(vm.user.password!=vm.user.vpassword){
                vm.errorMessage = "passwords do not match";
                return ;
            }
            if(vm.user.email==null || vm.user.email==undefined){
                vm.errorMessage = "invalid email id";
                return ;
            }
            UserService.register(vm.user)
                .then(function(response){
                    $location.path('/login');
                },function(err){
                    vm.errorMessage = "user with the username already exists";
                    return ;
                });
        }

        function login(){
            vm.errorMessage ="";
            if(vm.user.password==null ||vm.user.username==null ){
                vm.errorMessage = "please enter all the fields";
                return ;
            }
            UserService.login(vm.user)
                .then(function(response){
                    $rootScope.currentUser.username = response.data.username
                    $location.path('/currentweather');
                },function(err){
                    vm.errorMessage = "incorrect user name or password";
                });
        }

        function isLogedIn(){
            UserService.isLogedIn(vm.user);
        }

        function previousSearch(){
            UserService.userPreviousSearchs($rootScope.currentUser.username)
                .then(function(response){
                    console.log(response);
                });
        }

        function logout(){
            $rootScope.currentUser=null;
            UserService.logout();
            $location.path('/logout');
        }
    }
})();