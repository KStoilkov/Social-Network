'use strict';

app.controller('ChangePasswordController',
    function ($scope, $location, userService) {

        $scope.changePassword = function (newPasswordData) {
            alertify.confirm('Are you sure?', function (responce) {
                if (responce) {
                    userService.changePassword(newPasswordData, function () {
                        console.log('Password changed successfully');
                        alertify.success('Password changed successfully');
                        $location.path('/');
                    });
                }
            });
        }
});