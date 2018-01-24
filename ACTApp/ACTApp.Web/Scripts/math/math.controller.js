(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller('mathController', MathController);

    MathController.$inject = ['$scope'];

    function MathController($scope) {
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        vm.currentSection = '';
        //here I need to create the variables for pacing for the math section and bind them to the timer-details component
        vm.pace = 12;

        function _onInit() {
            vm.currentSection = "math";
            console.log(vm.currentSection);
        }

    }
})();