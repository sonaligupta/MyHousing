(function () {
  'use strict';

  // Listingproperties controller
  angular
    .module('listingproperties')
    .controller('ListingpropertiesController', ListingpropertiesController);

  ListingpropertiesController.$inject = ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'listingpropertyResolve', 'ListingpropertiesService', 'Notification'];

  function ListingpropertiesController($scope, $state, $http, $location, $window, Authentication, listingproperty, ListingpropertiesService, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.listingproperty = listingproperty;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.flagVal = flagVal;

    // Remove existing Listingproperty
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.listingproperty.$remove($state.go('listingproperties.list'));
      }
    }


    $http.get('api/allpackages',function(item){
      $scope.packageType = item;
      console.log($scope.packageType);
    });


    // Save Listingproperty
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.listingpropertyForm');
        console.log('test');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.listingproperty._id) {
        vm.listingproperty.$update(successCallback, errorCallback);
      } else {
        vm.listingproperty.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('listingproperties.list', {
          listingpropertyId: res._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Property saved successfully!' });

        console.log(res);

      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    };

    function flagVal(){
      listingproperty.flagValue = 1;
      console.log(listingproperty.flagValue +'......'+ listingproperty._id);
      console.log(vm.listingproperty);
      $http.put('/api/listingproperties/' + listingproperty._id, vm.listingproperty).success(function() {
        Notification.success('Property flagged successfully');
      }).error(function() {
        Notification.error('Property flagged failed');
      });
    }

    // function propertyVerification(){
    //   console.log("Property Flag verification.");
    //   listingproperty.propertyVerificationFlag = 1;
    //   console.log(listingproperty.propertyVerificationFlag +'......'+ listingproperty._id);
    //   console.log(vm.listingproperty);
    //   $http.put('/api/listingproperties/' + listingproperty._id, vm.listingproperty).success(function() {
    //     Notification.success('Property verified successfully');
    //   }).error(function() {
    //     Notification.error('Property verification failed');
    //   });
    // }

    };

}());
