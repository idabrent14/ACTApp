//(function () {
//    'use strict';
//    angular
//        .module('publicApp')
//        .factory('englishService', EnglishService);

//    EnglishService.$inject = ["$http", "$q"];

//    function EnglishService($http, $q) {
//        return {
//            postTimes: _postTimes
//        }

//        function _postTimes(data) {
//            return $http.post("http://localhost:62891/api/english", data, { withCredentials: true })
//                .then(success).catch(error);
//        }

//        function success(res) {
//            return res;
//        }

//        function error(res) {
//            return $q.reject(res);
//        }
   

//    }



//})();