'use strict';

app.controller('ChangePasswordController',
    function ($scope, $location, userService) {

        $scope.changePassword = function (newPasswordData) {
            userService.changePassword(newPasswordData, function () {
                console.log('Password changed successfully');
                $location.path('/');
            });
        }
});