(function () {
    'use strict';
        angular
            .module('publicApp')
            .controller('statsController', StatsController);

    StatsController.$inject = ['$scope', 'statsService', '$mdDialog'];

    function StatsController($scope, StatsService, $mdDialog) {
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        vm.statsService = StatsService;
        vm.getStatsSuccess = _getStatsSuccess;
        vm.getStatsError = _getStatsError;
        vm.allTimes;
        vm.delete = _delete;
        vm.deleteSuccess = _deleteSuccess;
        vm.deleteError = _deleteError;
        vm.userId = 1;
        vm.deleteId = 0;

        function _onInit() {
            vm.statsService.getTimes(vm.userId)
                .then(vm.getStatsSuccess).catch(vm.getStatsError);

            $mdDialog.show({
                contentElement: "#showEnglishStats",
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        }
        function _getStatsSuccess(res) {
            console.log(res);
            vm.allTimes = res.data.Items;
        };

        function _getStatsError(res) {
            console.log(res);
        };

        function _delete(id) {
            console.log(id)
            vm.deleteId = id;
            vm.statsService.deleteTimes(id)
                .then(vm.deleteSuccess).catch(vm.deleteError);
        }

        function _deleteSuccess(res) {
            console.log(res)
            // find the index of the item where the EnglishId == the id of the item clicked and remove it form the array 
            var index = vm.allTimes.findIndex(x => x.EnglishId == vm.deleteId);
            console.log(index);
            vm.allTimes.splice(index, 1);
        }

        function _deleteError() {
            console.log(res)
        }   

    }


})();