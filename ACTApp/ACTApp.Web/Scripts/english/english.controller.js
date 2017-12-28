(function () {
    'use strict';
    angular
        .module('publicApp')
        .controller('englishController', EnglishController);

    EnglishController.$inject = ['$scope', '$mdDialog', '$window', 'englishService', "Pubnub"];

    function EnglishController($scope, $mdDialog, $window, EnglishService, Pubnub) {
        var vm = this;
        vm.$scope = $scope;
        vm.englishService = EnglishService;
        vm.timerRunning = false;
        vm.startTimer = _startTimer
        vm.stopTimer = _stopTimer;
        vm.resumeTimer = _resumeTimer;
        vm.resetTimer = _resetTimer;
        vm.displayTime = _displayTime;
        vm.okClicked = _okClicked;
        vm.saveTimes = _saveTimes;
        vm.postTimesSuccess = _postTimesSuccess;
        vm.postTimesError = _postTimesError;
        vm.start = true;
        vm.stop = false;
        vm.reset = true;
        vm.lap = true;
        vm.secondsPassed = 0; //this is a live representation of how many seconds have passed
        vm.minutesPassed = 0; //this is a live representation of how many minutes have passed
        vm.showTime = []; 

        function _displayTime() {
            //push this object to an array as a way to iterate through tww arrays using ngrepeat
            var timeObject = {
                seconds: vm.secondsPassed,
                minutes: vm.minutesPassed,
            };
            vm.showTime.push(timeObject);
        }

        function _startTimer() {
            if (vm.secondsPassed > 0) {
                $scope.$broadcast('timer-resume');
                vm.stop = true;
            }
            else {
                $scope.$broadcast('timer-start');
                vm.stop = true;
            }
            vm.timerRunning = true;

            vm.start = false;
            vm.stop = true;
            vm.reset = false;
            vm.lap = true;
        };

        function _stopTimer () {
            $scope.$broadcast('timer-stop');
            vm.timerRunning = false;

            vm.start = true;
            vm.stop = false;
            vm.resume = true;
            vm.reset = true;
            vm.lap = true;
        };

        function _resumeTimer() {
            
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
            vm.minutesPassed = data.minutes;
            
            if (data.seconds === 10) {
                var theText = 'Move on to Next Passage'
                $mdDialog.show({
                    contentElement: "#timeAlert",
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(theText))
            }
        });

        function _okClicked() {
            $mdDialog.cancel();
        }

        function _saveTimes() {

            //Create an object with no times and push it to showTime array for as many times that are null
            var numPassages = vm.showTime.length;
            var incompletePassages = 5 - numPassages 
            for (var i = 0; i < incompletePassages; i++) {
                var empty = {
                    "seconds": '',
                    "minutes": ''
                }
                vm.showTime.push(empty);
            }

            //the aove needs to happen first otherwise it cannont read property of null
            var times = {
                "userId": 1,
                "passage1": vm.showTime[0].minutes + ":" + vm.showTime[0].seconds,
                "passage2": vm.showTime[1].minutes + ":" + vm.showTime[1].seconds,
                "passage3": vm.showTime[2].minutes + ":" + vm.showTime[2].seconds,
                "passage4": vm.showTime[3].minutes + ":" + vm.showTime[3].seconds,
                "passage5": vm.showTime[4].minutes + ":" + vm.showTime[4].seconds
            }

            vm.englishService.postTimes(times)
                .then(vm.postTimesSuccess).catch(vm.postTimesError);

        }

        function _postTimesSuccess(res) {
            console.log(res);
            vm.resetTimer();
        }

        function _postTimesError(res) {
            console.log(res);
        }

    }
})();