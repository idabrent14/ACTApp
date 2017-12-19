(function () {
    'use strict';
        angular
            .module('publicApp')
            .controller('statsController', StatsController);

    StatsController.$inject = ['$scope', 'statsService', '$mdDialog'];

    function StatsController($scope, StatsService, $mdDialog) {
        var vm = this;
        vm.$scope = $scope;
        vm.getStats = _getStats;
        vm.statsService = StatsService;
        vm.getStatsSuccess = _getStatsSuccess;
        vm.getStatsError = _getStatsError;
        vm.allTimes;
        vm.delete = _delete;
        vm.deleteSuccess = _deleteSuccess;
        vm.deleteError = _deleteError;
        vm.showDialog = _showDialog;
        vm.userId = 1;

        function _getStats() {
            vm.statsService.getTimes(vm.userId)
                .then(vm.getStatsSuccess).catch(vm.getStatsError);
        };

        function _getStatsSuccess(res) {
            console.log(res);
            vm.allTimes = res.data.Items;
        };

        function _getStatsError(res) {
            console.log(res);
        };

        function _delete(id) {
            console.log(id)
            vm.statsService.deleteTimes(id)
                .then(vm.deleteSuccess).catch(vm.deleteError);
        }

        function _deleteSuccess(res) {
            console.log(res)
        }
        function _deleteError() {
            console.log(res)
        }   

        function _showDialog(ev) {
            $mdDialog.show({
                contentElement: "#showEnglishStats",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                targetEvent: ev
            });
        }

    }


})();