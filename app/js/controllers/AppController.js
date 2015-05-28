'use strict';

app.controller('AppController', function ($scope, authService, userService) {
    $scope.isLogged = function () {
        return authService.isLogged();
    };

    function getLoggedUserData() {
        if($scope.isLogged()) {
            userService.getLoggedUserData(function (data) {
                $scope.loggedUser = data;

                if($scope.loggedUser.gender === 1) {
                    $scope.loggedUser.displayGender = 'Male';
                } else if ($scope.loggedUser.gender === 2) {
                    $scope.loggedUser.displayGender = 'Female';
                } else {
                    $scope.currentUser.displayGender = 'Unknown'
                }

            });
        }
    };

    $scope.$on('LoginSuccessfully', function () {
        getLoggedUserData();
    });

    $scope.$on('RegisterSuccessful', function () {
        getLoggedUserData();
    });

    getLoggedUserData();
});