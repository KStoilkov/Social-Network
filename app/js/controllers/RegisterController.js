'use strict';

app.controller('RegisterController', function ($scope, $rootScope, $location, authService) {
    $scope.registerData = {};

    $scope.register = function (registerData) {
        authService.register(
            registerData,
            function (data) {
                $location.path('/');
                sessionStorage['Authorization'] = JSON.stringify(data);
                $rootScope.$broadcast('RegisterSuccessfully');
                $scope.registerData = {};
            },
            function (err) {
                console.log(err);
            }
        );
    };

});