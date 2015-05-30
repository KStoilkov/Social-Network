'use strict';

app.controller('MyProfileController',
    function ($scope, $routeParams, $rootScope, userService, friendsService, defaultCoverImageUrl, defaultProfileImageUrl) {

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.sendFriendRequest = function (username) {
            friendsService.sendFriendRequest(
                username,
                function () {
                    $rootScope.$broadcast('FriendRequestSend', username);
                    getCurrentUserFullData(username);
                    alertify.success('Send request to ' + username + ' send successfully!');
                },
                function (err) {
                    alertify.error('Failed to send friend request');
                }
            );
        };

        function getCurrentUserFullData(username) {
            username = username || $scope.loggedUser.username;

            if ($scope.loggedUser && username === $scope.loggedUser.username) {
                $scope.currentUser = $scope.loggedUser;
            } else {
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
                )
            }

        };

        getCurrentUserFullData($routeParams.username);
});