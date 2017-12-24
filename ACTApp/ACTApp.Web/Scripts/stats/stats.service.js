(function () {
    'use strict';
    angular
        .module('publicApp')
        .factory('statsService', StatsService);

    StatsService.$inject = ["$http", "$q"];

    function StatsService($http, $q) {
        return {
            getTimes: _getTimes,
            deleteTimes: _deleteTimes
        }

        function _getTimes(userId) {
            return $http.get("http://localhost:62891/api/english/" + userId, { withCredentials: true })
                .then(success).catch(error);
        };

        function _deleteTimes(englishId) {
            return $http.delete("http://localhost:62891/api/english/" + englishId, { withCredentials: true })
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