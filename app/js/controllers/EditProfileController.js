'use strict';

app.controller('EditProfileController', function ($scope, userService) {
    function getUserData () {
        userService.getLoggedUserData(function (data) {
            $scope.user = data;
        });
    }

    getUserData();
});