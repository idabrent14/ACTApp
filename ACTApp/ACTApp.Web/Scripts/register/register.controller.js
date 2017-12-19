(function () {
    "use strict";
    angular
        .module("publicApp")
        .controller("registerController", RegisterController);

    RegisterController.$inject = ["$scope", "registerService"];

    function RegisterController($scope, RegisterService) {
        var vm = this;
        vm.$scope = $scope;
        vm.registerService = RegisterService;
        vm.register = _register;
        vm.registerSuccess = _registerSuccess;
        vm.registerError = _registerError;
        vm.registerUser = {};

        function _register() {
            console.log("Register button clicked")
            vm.registerService.register(vm.registerUser)
                .then(vm.registerSuccess).catch(vm.registerError);
        }
        function _registerSuccess(res) {
            console.log(res);
        }
        function _registerError(res) {
            console.log(res);
        }
    }
})();