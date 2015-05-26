'use strict';

app.controller('LoginController', function ($rootScope, $scope, $location, authService) {
    $scope.userData = {};

    $scope.login = function (userData) {
        authService.login(userData, function (data) {
            $location.path('/');
            $rootScope.$broadcast('LoginSuccessfully')
        }, function (err) {
            console.error('Logged Failed', err);
        });
    };

});