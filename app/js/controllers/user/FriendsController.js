'use strict';

app.controller('FriendsController', function ($scope, $rootScope, friendsService) {
    $scope.approveFriendRequest = function (friendRequestId) {
        alertify.confirm('Are you sure you want to confirm this friend request?', function (responce) {
            if (responce) {
                friendsService.approveFriendRequest(
                    friendRequestId,
                    function () {
                        alertify.success('Friend request approved!');
                        $rootScope.$broadcast('FriendRequestApproved');
                        getFriendRequests();
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        });
    };

    $scope.rejectFriendRequest = function (friendRequestId) {
        alertify.confirm(
            'Are you sure you want to reject this friend request?',
            function (responce) {
                if (responce) {
                    friendsService.rejectFriendRequest(
                        friendRequestId,
                        function () {
                            alertify.success('Friend request rejected')
                            getFriendRequests();
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                }
            }
        );
    };

    function getFriendRequests () {
        friendsService.getFriendRequests(
            function (data) {
                $scope.friendRequests = data;
            },
            function (err) {
                console.log(err);
            }
        );
    }

    getFriendRequests();
});