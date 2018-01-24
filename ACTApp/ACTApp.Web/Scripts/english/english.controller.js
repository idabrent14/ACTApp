(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller('englishController', EnglishController);

    EnglishController.$inject = ['$scope'];

    function EnglishController($scope) {
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;
        vm.currentSection = '';
        //here I need to create the variables for pacing for the english section and bind them to the timer-details component
        vm.pace = 9;

        function _onInit() {
            vm.currentSection = "english";
            console.log(vm.currentSection);
        }

    }
})();