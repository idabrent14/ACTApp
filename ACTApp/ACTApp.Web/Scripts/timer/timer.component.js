(function () {
    'use strict';
    angular
        .module('publicApp')
        .component('timerDetails', {
            templateUrl: "app/timer-details.html",
            bindings: {
                section: '=',
                pace: '='
            },
            controller: "timerDetailsController"
        })
})();

