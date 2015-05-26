'use strict';

app.controller('NavigationController', function ($scope, $location, authService) {
    $scope.isLogged = function () {
        return authService.isLogged();
    };

    $scope.$on('LoginSuccessfully', function () {
        getUserData();
    });

    $scope.$on('RegisterSuccessfully', function () {
        getUserData();
    });

    $scope.logout = function () {
        authService.logout();
        $location.path('/');
    };

    function getUserData() {
        authService.getLoggedUserData(function (data) {
            $scope.user = data;
        })
    }
});