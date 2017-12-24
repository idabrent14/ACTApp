(function () {
    "use strict";
    angular
        .module("publicApp")
        .controller("loginController", LoginController);

    LoginController.$inject = ["$scope", "loginService", "toaster"];

    function LoginController($scope, LoginService, toaster) {
        var vm = this;
        vm.$scope = $scope;
        vm.loginService = LoginService;
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
            toaster.pop('success', "success", "Successfully Registered");
        }
        function _registerError(res) {
            console.log(res);
        }
    }
})();