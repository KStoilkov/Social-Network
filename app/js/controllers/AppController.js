'use strict';

app.controller('AppController', function ($scope, $rootScope, authService, userService) {
    $scope.getUserPreview = function (username) {
        userService.getUserPreview(
            username,
            function (data) {
                $scope.userPreviewData = data;
            },
            function (err) {
                console.log(err);
            });
    };

    $scope.isLogged = function () {
        return authService.isLogged();
    };

    $scope.$on('LoginSuccessful', function () {
        getLoggedUserData();
    });

    $scope.$on('RegisterSuccessful', function () {
        getLoggedUserData();
    });

    $scope.$on('ProfileEdited', function () {
        getLoggedUserData();
    });

    function getLoggedUserData() {
        if($scope.isLogged()) {
            userService.getLoggedUserData(function (data) {
                $scope.loggedUser = data;

                if($scope.loggedUser.gender === 1) {
                    $scope.loggedUser.displayGender = 'Male';
                } else if ($scope.loggedUser.gender === 2) {
                    $scope.loggedUser.displayGender = 'Female';
                } else {
                    $scope.loggedUser.displayGender = 'Unknown'
                }

            });
        }
    };

    getLoggedUserData();
});