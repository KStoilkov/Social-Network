'use strict';

app.controller('MyProfileController',
    function ($scope, $routeParams, $rootScope, userService, friendsService, defaultCoverImageUrl, defaultProfileImageUrl) {

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.$on('FriendRequestSend', function () {
            getCurrentUserFullData($routeParams.username)
        });

        function getCurrentUserFullData(username) {
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

        $scope.sendFriendRequest = function (username) {
            friendsService.sendFriendRequest(
                username,
                function () {
                    $rootScope.$broadcast('FriendRequestSend');
                    alertify.success('Send request to ' + username + ' send successfully!');
                },
                function (err) {
                    alertify.error('Failed to send friend request');
                }
            );
        };

        getCurrentUserFullData($routeParams.username);
});