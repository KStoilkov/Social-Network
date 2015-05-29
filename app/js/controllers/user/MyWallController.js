'use strict';

app.controller('MyWallController',
    function ($scope, $routeParams, friendsService, userService, postService, defaultStartPostId, defaultPageSize) {

    $scope.getWallPosts = function (username) {
        postService.getWallPosts(
            username,
            defaultStartPostId,
            defaultPageSize,
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