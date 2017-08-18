/**
 * Created by seshasai on 23/07/2017.
 */

(function(){
    angular.module('SkyCast')
        .controller('PreviousSearchesController',PreviousSearchesController);

    function PreviousSearchesController(UserService,$rootScope){
        var vm = this;
        retriveUserPreviousSearches();

        function retriveUserPreviousSearches(){
            vm.past = null
            UserService.userPreviousSearchs($rootScope.currentUser.username)
                .then(function(response){
                    vm.previousSearchs = response.data
                })
        }



    }
})();