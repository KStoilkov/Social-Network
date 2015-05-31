'use strict';

app.controller('CommentController', function ($scope, commentService) {

    $scope.getPostComments = function (postId, type) {
        commentService.getPostComments(
            postId,
            function (data) {
                $scope.allComments = data;
                $scope.displayComments = $scope.allComments.slice(0, 3);

                if (type === 'showAll') {
                    $scope.comments = $scope.allComments;
                } else {
                    $scope.comments = $scope.displayComments;
                }
            },
            function (err) {
                console.log(err);
            }
        );
    };

    $scope.getCommentLikes = function (postId, commentId) {
        commentService.getCommentLikes(
            postId,
            commentId,
            function (data) {
                var display = [],
                    rest = [];

                data.forEach(function (like) {
                    if (display.length < 2) {
                        display.push(like.user);
                    } else {
                        rest.push(like.user);
                    }
                });

                $scope.displayCommentLikes = display;
                $scope.restCommentLikes = rest;
            },
            function (err) {
                console.log(err);
            }
        );
    };

    $scope.showAllComments = function (postId) {
        $scope.allCommentsShowed = true;
        $scope.getPostComments(postId, 'showAll');
    };

    $scope.showLessComments = function (postId) {
        $scope.allCommentsShowed = false;
        $scope.getPostComments(postId);
    };

    $scope.likeComment = function (postId, commentId) {
        commentService.likeComment(
            postId,
            commentId,
            function () {
                $scope.getPostComments(postId, commentId);
            },
            function (err) {
                console.log(err);
            }
        );
    };

    $scope.unlikeComment = function (postId, commentId) {
        commentService.unlikeComment(
            postId,
            commentId,
            function () {
                $scope.getPostComments(postId);
            },
            function (err) {
                console.log(err);
            }
        );
    };

    $scope.addComment = function (postId) {
        alertify.prompt('Enter your comment here.', function (responce, text) {
            if (responce) {
                var data = {
                    commentContent : text
                };

                commentService.addComment(
                    data,
                    postId,
                    function() {
                        alertify.success('Comment added.');
                        $scope.getPostComments(postId);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
            }
        });

    };
});