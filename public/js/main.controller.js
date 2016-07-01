(function () {
  "use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$http", "$window"];

  function MainController($http, $window) {
    var vm = this;

    vm.apiKey           = '';
    vm.errMsg           = '';
    vm.results          = [];
    vm.setAPIKey        = setAPIKey;
    vm.itemToSearch     = '';
    vm.searchInventory  = searchInventory;
    vm.loading          = false;

    console.log("main controller loaded");

    var local = $window.localStorage;

    getAPIKey();
    function getAPIKey() {
      if (local.getItem("gw2_API_Key")) {
        vm.apiKey = local.getItem("gw2_API_Key");
      }
    }

    function setAPIKey() {
      local.setItem("gw2_API_Key", vm.apiKey);
      console.log("vm.apiKey: " + vm.apiKey)
      console.log(local.getItem("gw2_API_Key"))
    }

    function renderLoadingScreen() {
      vm.loading = true;
      vm.results = [];
    }

    function searchInventory() {
      vm.errMsg = '';
      renderLoadingScreen();
      var query = vm.itemToSearch.replace(/ /g, "%20");

      $http({
        method: "GET",
        url: "/search/" + vm.apiKey + "/" + vm.itemToSearch
      })
      .then(function(response) {
        vm.loading = false;
        vm.results = response.data;
        console.log(vm.results)
        if (!response.data.length) {
          vm.errMsg = 'No items found'
        }
      })
    }

  }
})();
