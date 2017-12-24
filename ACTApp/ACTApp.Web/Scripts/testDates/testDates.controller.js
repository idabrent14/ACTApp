(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller("testDatesController", TestDatesController);

    TestDatesController.$inject = ['$scope', 'testDatesService', "$mdDialog"];

    function TestDatesController($scope, TestDatesService, $mdDialog) {
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        vm.testDatesService = TestDatesService;
        vm.getDatesSuccess = _getDatesSuccess;
        vm.getDatesError = _getDatesError;
        vm.allDates = [];
        vm.testDates = [];

        function _onInit() {
            console.log("Hello from the test dates controller")
            vm.testDatesService.getDates()
                .then(vm.getDatesSuccess).catch(vm.getDatesError);

            $mdDialog.show({
                contentElement: "#showTestDates",
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        }

        function _getDatesSuccess(res) {
            console.log(res)
            vm.allDates = res.data.Items;
            //only want to scrape the first 21 dates
            for (var i = 0; i < 21; i++) {
                if (i % 3 === 0) {
                    vm.testDates.push(vm.allDates[i]);
                }
            }
        }

        function _getDatesError(res) {
            console.log(res);
        }
    }

})();