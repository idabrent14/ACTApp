(function () {
    'use strict';
    angular
        .module('publicApp')
        .factory('testDatesService', TestDatesService);

    TestDatesService.$inject = ["$http", "$q"];

    function TestDatesService($http, $q) {
        return {
            getDates: _getDates,
        }

        function _getDates() {
            return $http.get("http://localhost:62891/api/testdates/", { withCredentials: true })
                .then(success).catch(error);
        };

        function success(res) {
            return res;
        };

        function error(res) {
            return $q.reject(res);
        };


    }



})();