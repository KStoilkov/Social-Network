'use strict';

app.controller('MyProfileController',
    function ($scope, $routeParams, userService, defaultCoverImageUrl, defaultProfileImageUrl) {

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        function getUserFullData(username) {
            userService.getUserFullData(
                username,
                function (data) {
                    $scope.currentUser = data;

                    if($scope.currentUser.gender === 1) {
                        $scope.currentUser.displayGender = 'Male';
                    } else if ($scope.currentUser.gender === 2) {
                        $scope.currentUser.displayGender = 'Female';
                    } else {
                        $scope.currentUser.displayGender = 'Unknown'
                    }

                },
                function (err) {
                    console.log(err);
                }
            );
        };

        getUserFullData($routeParams.username);
});