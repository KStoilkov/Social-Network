'use strict';

app.controller('MyWallController', function ($scope, friendsService, userService) {

    function getUserData () {
        userService.getLoggedUserData(function (data) {
            $scope.user = data;
        });
    };

    getUserData();
});