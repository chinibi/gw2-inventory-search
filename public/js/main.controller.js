(function () {
  "use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$http", "$window"];

  function MainController($http, $window) {
    var vm = this;

    vm.apiKey           = '';
    vm.results          = [];
    vm.setAPIKey        = setAPIKey;
    vm.searchFor        = '';
    vm.getCharacterList = getCharacterList;
    vm.itemToSearch     = '';
    vm.getItemList      = getItemList;
    vm.searchInventory  = searchInventory;
    vm.loading          = false;
    // vm.beginSearch = beginSearch;

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
    }

    function renderLoadingScreen() {
      vm.loading = true;
      vm.results = [];
    }

    function getCharacterList() {
      setAPIKey();
      renderLoadingScreen();

      $http({
        method: 'GET',
        url: '/characters/' + vm.apiKey
      })
      .then(characters => {
        vm.loading = false;
        vm.results = characters.data;
      })
    }

    function getItemList() {
      renderLoadingScreen();
      var query = vm.itemsearch.replace(/ /g, '%20');

      $http({
        method: 'GET',
        url: '/items/' + query
      })
      .then(function(items) {
        vm.loading = false;
        vm.results = items.data;
      })
    }

    function searchInventory() {
      renderLoadingScreen();
      var query = vm.itemToSearch.replace(/ /g, '%20');

      $http({
        method: 'GET',
        url: '/search/' + vm.apiKey + '/' + vm.itemToSearch
      })
      .then(function(response) {
        vm.loading = false;
        vm.results = response.data;
      })
    }

  }
})();
