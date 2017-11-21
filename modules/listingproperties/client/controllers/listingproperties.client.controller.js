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


    function flagVal() {
      // vm.flagValue = '1';
      // console.log(vm.flagValue);
      //var user = new ListingpropertiesService(vm.user);
      // vm.listingproperty.$update(function () {
      //
      //   $scope.listingproperty.flagValue = '1';
      //   vm.listingproperty.flagValue = '1';
      //   console.log($scope.flagValue)
      //
      //   Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Property has been flagged!' });
      //
      // }, function (errorResponse) {
      //   Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      // });

      console.log("id " + vm.listingproperty._id)
      var url = $location.host()
      $.post(url + '/api/listingproperties/'+ vm.listingproperty._id, {flagValue: '1'},
      function(data, status, headers, config) {
            console.log("Inside Success HTTP.")
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Property has been flagged!' });
      })
      // error(function(data, status, headers, config) {
      //
      // });
    }
    };

}());
