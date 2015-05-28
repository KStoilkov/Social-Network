'use strict';

app.controller('MyWallController', function ($scope, $routeParams, friendsService, userService, postService) {

    getUserData();

    $scope.getWallPosts = function (username) {
        postService.getWallPosts(
            username,
            0,
            5,
            function (data) {
                $scope.posts = data;
            },
            function (err) {
                console.log(err);
            });
    };

    $scope.getWallPosts($routeParams.username);

    function getUserData () {
        userService.getLoggedUserData(function (data) {
            $scope.user = data;
        });
    };

    $scope.$on('PostLikedUnliked', function () {
        $scope.getWallPosts($routeParams.username)
    });
});