'use strict';

app.controller('LoginController', function ($rootScope, $scope, $location, authService) {
    $scope.userData = {};

    $scope.login = function (userData) {
        authService.login(userData, function () {
            $rootScope.$broadcast('LoginSuccessful');
            $location.path('/');
            alertify.success('Login Successful');
        }, function (err) {
            console.log(err);
            alertify.error(err);
        });
    };
});