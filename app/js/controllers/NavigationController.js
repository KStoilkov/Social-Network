'use strict';

app.controller('NavigationController', function ($scope, $location, authService, userService) {
    $scope.isLogged = function () {
        return authService.isLogged();
    };

    checkIfUserIsLogged();

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
        userService.getLoggedUserData(function (data) {
            $scope.user = data;
        })
    };

    function checkIfUserIsLogged() {
        if ($scope.isLogged()){
            getUserData();
        }
    };
});