'use strict';

app.controller('MyProfileController',
    function ($scope, userService, defaultCoverImageUrl, defaultProfileImageUrl) {

        function getUserData() {
            userService.getLoggedUserData(function (data) {
                $scope.user = data;
            }, function (err) {
                console.log(err);
            });
        }

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        getUserData();
});