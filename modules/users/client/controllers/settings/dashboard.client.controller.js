(function () {
  'use strict';

  angular
    .module('users')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$http', 'Authentication', 'UsersService', 'Notification', 'ListingpropertiesService'];

  function DashboardController($scope, $http, Authentication, UsersService, Notification, ListingpropertiesService) {
    var vm = this;

    vm.user = Authentication.user;
    console.log(vm.ListingpropertiesService);


    $http.get('/api/listingproperties/')
      .success(function(data) {
        $scope.names = data;
        console.log(data[0].name)
        $scope.name = data[0].name;
        $scope.address = data[0].address;
        $scope.flagValue = data[0].flagValue;
        console.log(data)
      })
      .error(function(data) {
        alert(data);
        console.log('Error: ' + data);
      });

  }
}());
