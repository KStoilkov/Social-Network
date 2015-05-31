'use strict';

app.controller('MyWallController',
    function ($scope, $routeParams, friendsService, userService, postService, defaultStartPostId, defaultPageSize) {

        $scope.defaultPageSize = defaultPageSize;
        $scope.posts = [];
        $scope.postsRecieved = 0;
        $scope.currentPageSize = defaultPageSize;

        $scope.getWallPosts = function (username, startPostId, pageSize) {
            postService.getWallPosts(
                username,
                startPostId || '',
                defaultPageSize + 1 || pageSize,
                function (data) {
                    data.forEach(function (post) {
                        if ($scope.posts.length < $scope.currentPageSize) {
                            $scope.posts.push(post);
                            $scope.lastPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                        $scope.postsRecieved++;
                    });
                },
                function (err) {
                    console.log(err);
                });
        };

        $scope.getWallPosts($routeParams.username);

        $scope.loadMorePosts = function () {
            $scope.currentPageSize += defaultPageSize;
            $scope.getWallPosts($routeParams.username, $scope.lastPostId);
        };

        $scope.$on('PostAddedLikedUnliked', function () {
            $scope.posts = [];
            $scope.postsRecieved = 0;
            $scope.currentPageSize = defaultPageSize;
            $scope.getWallPosts($routeParams.username);
        });
});