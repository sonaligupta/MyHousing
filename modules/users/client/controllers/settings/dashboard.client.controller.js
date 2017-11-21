(function () {
  'use strict';

  angular
    .module('users')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$http', 'Authentication', 'UsersService', 'Notification', 'ListingpropertiesService'];

  function DashboardController($scope, $http, Authentication, UsersService, Notification, ListingpropertiesService) {
    var vm = this;
    vm.ListingpropertiesService = ListingpropertiesService;
    vm.user = Authentication.user;
<<<<<<< HEAD:modules/users/client/controllers/settings/dashboard.client.controller_bkp.js
    //console.log(vm.ListingpropertiesService);
=======
    vm.propertyVerification = propertyVerification;
    vm.remove= remove;
    //console.log(vm.ListingpropertiesService);

    // Remove existing Listingproperty
    function remove(id) {
        $http.get('/api/listingproperties/')
          .success(function(data) {
            console.log(data);
            $scope.names = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
        $scope.names.splice(id,1);
>>>>>>> ee29c5be3c4a114b2e7849e354010513407d3797:modules/users/client/controllers/settings/dashboard.client.controller.js

    }

    function propertyVerification(id){
      console.log(id);
      console.log("Property Flag verification.");
      ListingpropertiesService.propertyVerificationFlag = 1;
      console.log(ListingpropertiesService.propertyVerificationFlag +'......'+ id + '.......');
      //console.log(vm.ListingpropertiesService);
      $http.put('/api/listingproperties/' + id, ListingpropertiesService).success(function() {
        Notification.success('Property verified successfully');
      }).error(function() {
        Notification.error('Property verification failed');
      });
    }

    $http.get('/api/listingproperties/')
      .success(function(data) {
        $scope.names = data;
<<<<<<< HEAD:modules/users/client/controllers/settings/dashboard.client.controller_bkp.js
      //  console.log(data[0].name)
        $scope.name = data[0].name;
        $scope.address = data[0].address;
        $scope.flagValue = data[0].flagValue;
       // console.log(data)
=======
        //console.log(data[0].name)
        $scope.name = data[0].name;
        $scope.address = data[0].address;
        $scope.flagValue = data[0].flagValue;
        //console.log(data)
>>>>>>> ee29c5be3c4a114b2e7849e354010513407d3797:modules/users/client/controllers/settings/dashboard.client.controller.js
      })
      .error(function(data) {
        alert(data);
       // console.log('Error: ' + data);
      });

  }
}());
