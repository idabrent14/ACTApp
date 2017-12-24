(function () {
    "use strict";
    angular
        .module("publicApp")
        .controller("loginController", LoginController);

    LoginController.$inject = ["$scope", "loginService", "toaster", "$location"];

    function LoginController($scope, LoginService, toaster, $location) {
        var vm = this;
        vm.$scope = $scope;
        vm.loginService = LoginService;
        vm.login = _login;
        vm.loginSuccess = _loginSuccess;
        vm.loginError = _loginError;
        vm.loiginUser = {};

        function _login() {
            console.log("login button clicked")
            vm.loginService.login(vm.loginUser)
                .then(vm.loginSuccess).catch(vm.loginError);
        }
        function _loginSuccess(res) {
            console.log(res);
            toaster.pop('success', "Success", "Successfully Logged in");
            $location.path('/home');
        }
        function _loginError(res) {
            console.log(res);
            toaster.pop('error', 'Error', "Incorrect Email or Password")
        }
    }
})();