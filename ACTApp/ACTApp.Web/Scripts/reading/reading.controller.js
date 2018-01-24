(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller('readingController', ReadingController);

    ReadingController.$inject = ['$scope'];

    function ReadingController($scope) {
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        vm.currentSection = '';
        //here I need to create the variables for pacing for the reading section and bind them to the timer-details component
        vm.pace = 9;

        function _onInit() {
            vm.currentSection = "reading";
            console.log(vm.currentSection);
        }

    }

})();