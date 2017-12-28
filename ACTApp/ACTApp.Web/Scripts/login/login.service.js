(function () {
    'use strict';
    angular
        .module('publicApp')
        .factory('loginService', LoginService);

    LoginService.$inject = ["$http", "$q"];

    function LoginService($http, $q) {
        return {
            login: _login
        }

        function _login(data) {
            return $http.post("http://localhost:62891/api/login", data, { withCredentials: true })
                .then(success).catch(error);
        }

        function success(res) {
            return res;
        }

        function error(res) {
            return $q.reject(res);
        }


    }



})();