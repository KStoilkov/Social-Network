'use strict';

var app = angular.module('Social Network', ['ngRoute']);

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

    $routeProvider.when('/user/:username', {
        templateUrl: 'partials/user/user-wall.html',
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

    $routeProvider.when('/user/change-password', {
        templateUrl: 'partials/user/change-password.html',
        controller: 'ChangePasswordController'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');
app.constant('defaultCoverImageUrl', 'img/DefaultCoverImage.jpg');
app.constant('defaultProfileImageUrl', 'img/DefaultProfileImage.jpg');