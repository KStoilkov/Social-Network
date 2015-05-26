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

    $routeProvider.when('/user/wall', {
        templateUrl: 'partials/user/myWall.html',
        controller: 'MyWallController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'partials/user/profile.html',
        controller: 'MyProfileController'
    });

    $routeProvider.when('/user/profile/edit-profile', {
        templateUrl: 'partials/user/edit-profile.html',
        controller: 'EditProfileController'
    });
});

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');
app.constant('defaultCoverImageUrl', 'img/DefaultCoverImage.jpg');
app.constant('defaultProfileImageUrl', 'img/DefaultProfileImage.jpg');