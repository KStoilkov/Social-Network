'use strict';

app.controller('MyWallController', function ($scope, $routeParams, friendsService, userService, postService) {

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

    $scope.$on('PostAddedLikedUnliked', function () {
        $scope.getWallPosts($routeParams.username)
    });
});