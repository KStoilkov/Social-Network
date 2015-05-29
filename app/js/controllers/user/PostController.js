'use strict';

app.controller('PostController', function ($scope, $rootScope, $routeParams,postService) {
    $scope.currentUserUsername = $routeParams.username;

    $scope.postData = {
        username : $routeParams.username,
        postContent: ''
    };

    $scope.addPost = function (postData) {
        postService.addPost(
            postData,
            function () {
                $scope.postData.postContent = '';
                reloadPosts();
            },
            function (err) {
                console.log(err);
            });
    };

    $scope.likePost = function (postId) {
        postService.likePost(
            postId,
            function () {
                reloadPosts();
            },
            function (err) {
                console.error(err);
                alertify.error('Failed to like post');
            }
        );
    };

    $scope.unlikePost = function (postId) {
        postService.unlikePost(
            postId,
            function () {
                reloadPosts();
            },
            function (err) {
                console.error(err);
                alertify.error('Failed to unlike post');
            })
    };

    $scope.getPostDetailedLikes = function(postId) {
        postService.getPostDetailedLikes(
            postId,
            function (data) {
                $scope.userLikes = [];
                $scope.postDetailedLikes = [];

                data.forEach(function (postLike) {

                    if ($scope.userLikes.length < 3) {
                        $scope.userLikes.push(postLike.user.username);
                    } else {
                        $scope.postDetailedLikes.push(postLike.user.username);
                    }
                })
            },
            function (err) {
                console.log(error);
            }
        );
    };

    function reloadPosts() {
        $rootScope.$broadcast('PostAddedLikedUnliked');
    };
});