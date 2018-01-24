(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller('scienceController', ScienceController);

    ScienceController.$inject = ['$scope'];

    function ScienceController($scope) {
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        vm.currentSection = '';
        //here I need to create the variables for pacing for the science section and bind them to the timer-details component
        vm.pace = 5;

        function _onInit() {
            vm.currentSection = "science";
            console.log(vm.currentSection);
        }

    }

})();