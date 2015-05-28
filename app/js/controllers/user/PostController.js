'use strict';

app.controller('PostController', function ($scope, $rootScope, $routeParams,postService) {
    $scope.postData = {
        username : $routeParams.username
    };

    $scope.addPost = function (postData) {
        postService.addPost(
            postData,
            function (data) {
                console.log('Post success');
            },
            function (err) {
                console.log(err);
            });
    };

    $scope.likePost = function (postId) {
        postService.likePost(
            postId,
            function () {
                $rootScope.$broadcast('PostLikedUnliked');
            },
            function (err) {
                console.error(err.error_description);
                alertify.error('Failed to like post');
            }
        );
    };

    $scope.unlikePost = function (postId) {
        postService.unlikePost(
            postId,
            function () {
                $rootScope.$broadcast('PostLikedUnliked');
            },
            function (err) {
                console.error(err.error_description);
                alertify.error('Failed to unlike post');
            })
    }
});