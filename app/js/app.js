'use strict';

var app = angular.module('Social Network', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login/', {
        templateUrl: 'partials/guest/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register/', {
        templateUrl: 'partials/guest/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/:username/', {
        templateUrl: 'partials/user/user-wall.html',
        controller: 'MyWallController',
        resolve: {
            isLogged: function ($location) {
                if (!sessionStorage['Authorization']) {
                    alertify.error('You have to login first.');
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/profile/', {
        templateUrl: 'partials/user/edit-profile.html',
        controller: 'EditProfileController',
        resolve: {
            isLogged: function ($location) {
                if (!sessionStorage['Authorization']) {
                    alertify.error('You have to login first.');
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/changepassword/', {
        templateUrl: 'partials/user/change-password.html',
        controller: 'ChangePasswordController',
        resolve: {
            isLogged: function ($location) {
                if (!sessionStorage['Authorization']) {
                    alertify.error('You have to login first.');
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/friends/', {
        templateUrl: 'partials/user/friendlist.html',
        controller: 'NavigationController',
        resolve: {
            isLogged: function ($location) {
                if (!sessionStorage['Authorization']) {
                    alertify.error('You have to login first.');
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');
app.constant('defaultCoverImageUrl', 'img/DefaultCoverImage.jpg');
app.constant('defaultProfileImageUrl', 'img/DefaultProfileImage.jpg');
app.constant('defaultStartPostId', 0);
app.constant('defaultPageSize', 5);