'use strict';

var app = angular.module('Social Network', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'partials/guest/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'partials/guest/register.html',
        controller: 'RegisterController'
    });
});

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');