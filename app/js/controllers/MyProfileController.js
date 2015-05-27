'use strict';

app.controller('MyProfileController',
    function ($scope, userService, defaultCoverImageUrl, defaultProfileImageUrl) {

        function getUserData() {
            userService.getLoggedUserData(function (data) {
                $scope.user = data;

                if($scope.user.gender === 1) {
                    $scope.user.displayGender = 'Male';
                } else if ($scope.user.gender === 2) {
                    $scope.user.displayGender = 'Female';
                } else {
                    $scope.user.displayGender = 'Unknown'
                }

            }, function (err) {
                console.log(err);
            });
        }

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        getUserData();
});