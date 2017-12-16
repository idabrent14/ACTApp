(function () {
    'use strict';
    angular
        .module("publicApp")
        .factory("registerService", RegisterService);

    RegisterService.$inject = ["$http", "$q"]

    function RegisterService($http, $q) {
        return {
            register: _register
        }

        function _register(data) {
            return $http.post("http://localhost:62891/api/register", data, { withCredentials: true })
                .then(success).catch(error);
        }

        function success(res) {
            return res;
        }

        function error(err) {
            return $q.reject(err);
        }
    }


})();