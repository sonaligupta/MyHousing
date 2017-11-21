(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'Authentication', '$location', 'Notification'];
    function HomeController($scope, $rootScope, Authentication,$location, Notification) {
      var vm = this;
      if(Authentication.user){
        $rootScope.isUserLoggedIn = true;
      }
  
      // Get an eventual error defined in the URL query string:
      if ($location.search().err) {
        Notification.error({ message: $location.search().err });
      } 
      // If user is signed in then redirect back home
      if (!Authentication.user) {
        $location.path('/');
      }else{
        $location.path('/settings/dashboard');
      }
      $scope.isSignInClicked = false;
      $scope.signupClicked = function(){
        $scope.isSignInClicked = true;
      };
    }
  }());
