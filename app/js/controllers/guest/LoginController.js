'use strict';

app.controller('LoginController', function ($rootScope, $scope, $location, authService) {
    $scope.userData = {};

    $scope.login = function (userData) {
        authService.login(userData, function () {
            $location.path('/');
            alertify.success('Login Successful');
            $rootScope.$broadcast('LoginSuccessful');
        }, function (err) {
            console.log(err);
            alertify.error(err);
        });
    };

});