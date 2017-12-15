(function () {
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
                templateUrl: 'app/register/register.html',
                title: 'register',
                controller: 'registerController as registerCtrl'
            })

    }




})();