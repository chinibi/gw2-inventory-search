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


  }
})();
