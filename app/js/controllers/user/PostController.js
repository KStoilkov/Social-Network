'use strict';

app.controller('PostController',
    function ($scope, $rootScope, $routeParams, postService, userService, defaultProfileImageUrl) {
        $scope.currentUserUsername = $routeParams.username;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.postData = {
            username : $routeParams.username,
            postContent: ''
        };

        $scope.addPost = function (postData) {
            postService.addPost(
                postData,
                function () {
                    $scope.postData.postContent = '';
                    alertify.success('Successfully posted on ' + getDisplayName() + ' wall!');
                    reloadPosts();
                },
                function (err) {
                    console.log(err);
                });

            function getDisplayName() {
                if ($routeParams.username === $scope.loggedUser.username) {
                    return 'your';
                }

                return $routeParams.username + '\'s' ;
            }
        };

        $scope.likePost = function (postId) {
            postService.likePost(
                postId,
                function () {
                    reloadPosts();
                },
                function (err) {
                    console.error(err);
                    alertify.error('Failed to like post.');
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
                    alertify.error('Failed to unlike post.');
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

        $scope.getUserPreview = function(username) {
            $scope.previewUser = {};

            userService.getUserPreview(
                username,
                function (data) {
                    $scope.previewUser = data;
                },
                function (err) {
                    console.log(err);
                }
            );
        };

        $scope.deletePost = function (postId) {
            alertify.confirm('Are you sure you want to delete this post?', function (responce) {
                if(responce) {
                    postService.deletePost(
                        postId,
                        function () {
                            alertify.success('Post deleted.');
                            reloadPosts();
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                }
            });
        };

        $scope.editPost = function (postId, postContent) {
            alertify.prompt('Enter new comment content.', function (responce, input) {
                if(responce) {
                    var newData = {
                        postContent: input
                    };

                    postService.editPost(
                        postId,
                        newData,
                        function () {
                            alertify.success('Post edited.');
                            reloadPosts();
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                }
            }, postContent);

        }

        function reloadPosts() {
            $rootScope.$broadcast('PostAddedLikedUnliked');
        };
});