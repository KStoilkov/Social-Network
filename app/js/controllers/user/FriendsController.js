'use strict';

app.controller('FriendsController', function ($scope, friendsService) {
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