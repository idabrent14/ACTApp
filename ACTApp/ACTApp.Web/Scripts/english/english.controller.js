(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller('englishController', EnglishController);

    EnglishController.$inject = ['$scope', '$mdDialog', '$window'];

    function EnglishController($scope, $mdDialog, $window) {
        var vm = this;
        vm.$scope = $scope;
        vm.timerRunning = false;
        vm.startTimer = _startTimer
        vm.stopTimer = _stopTimer;
        vm.resumeTimer = _resumeTimer;
        vm.resetTimer = _resetTimer;
        vm.displayTime = _displayTime;
        vm.okClicked = _okClicked;

        vm.start = true;
        vm.stop = false;
        vm.resume = false;
        vm.reset = false;
        vm.lap = false;

        vm.secondsPassed = 0;
        vm.showSeconds = 0;

        function _displayTime() {
            vm.showSeconds = vm.secondsPassed;
        }

        function _startTimer () {
            $scope.$broadcast('timer-start');
            vm.timerRunning = true;

            vm.start = false;
            vm.stop = true;
            vm.resume = false;
            vm.reset = false;
            vm.lap = true;
        };

        function _stopTimer () {
            $scope.$broadcast('timer-stop');
            vm.timerRunning = false;

            vm.start = false;
            vm.stop = false;
            vm.resume = true;
            vm.reset = true;
            vm.lap = true;
        };

        function _resumeTimer() {
            $scope.$broadcast('timer-resume');
            vm.timerRunning = true;

            vm.start = false;
            vm.stop = true;
            vm.resume = false;
            vm.reset = false;
            vm.lap = true;
        };

        function _resetTimer() {
            $window.location.reload();
            vm.start = true;
            vm.stop = false;
            vm.resume = false;
            vm.reset = false;
            vm.lap = false;
        };

        $scope.$on('timer-stopped', function (event, data) {
            console.log('Timer Stopped - data = ', data);
        });

        $scope.$on('timer-tick', function (event, data) {
            vm.secondsPassed = data.seconds;
            if (data.seconds === 10) {
                $mdDialog.show({
                    contentElement: "#timeAlert",
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });
            }
        });

        function _okClicked() {
            $mdDialog.cancel();
        }




    }
})();