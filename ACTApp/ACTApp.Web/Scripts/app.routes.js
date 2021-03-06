﻿(function () {
    'use strict';
    angular
        .module('publicApp.routes', [])
        .config(_configureStates);

    _configureStates.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function _configureStates($stateProvider, $locationProvider, $urlRouteProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
        });
        $urlRouteProvider.otherwise('/home');
        $stateProvider
            .state({
                name: 'home',
                url: '/home',
                templateUrl: 'app/home.html',
                title: 'home'
            })
            .state({
                name: 'register',
                url: '/register',
                templateUrl: 'app/register.html',
                title: 'register',
                controller: 'registerController as registerCtrl'
            })
            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'app/login.html',
                title: 'login',
                controller: 'loginController as loginCtrl'
            })
            .state({
                name: 'english',
                url: '/english',
                templateUrl: 'app/english.html',
                title: 'english',
                controller: 'englishController as englishCtrl'
            })
            .state({
                name: 'math',
                url: '/math',
                templateUrl: 'app/math.html',
                title: 'math',
                controller: 'mathController as mathCtrl'
            })
            .state({
                name: 'reading',
                url: '/reading',
                templateUrl: 'app/reading.html',
                title: 'reading',
                controller: 'readingController as readingCtrl'
            })
            .state({
                name: 'science',
                url: '/science',
                templateUrl: 'app/science.html',
                title: 'science',
                controller: 'scienceController as scienceCtrl'
            })
            .state({
                name: 'stats',
                url: '/stats',
                templateUrl: 'app/stats.html',
                title: 'stats',
                controller: 'statsController as statsCtrl'
            })
            .state({
                name: 'testDates',
                url: '/testDates',
                templateUrl: 'app/testDates.html',
                title: 'testDates',
                controller: 'testDatesController as testDatesCtrl'
            })



    }




})();