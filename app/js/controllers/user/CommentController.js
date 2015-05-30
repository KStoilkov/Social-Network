'use strict';

app.controller('CommentController', function ($scope, commentService) {

    $scope.getPostComments = function (postId) {
        commentService.getPostComments(
            postId,
            function (data) {
                $scope.comments = data;
            },
            function (err) {
                console.log(err);
            }
        );
    };

    $scope.getCommentLikes = function (postId, commentId) {
        $scope.displayCommentLikes = [];
        $scope.restCommentLikes = [];

        commentService.getCommentLikes(
            postId,
            commentId,
            function (data) {
                data.forEach(function (like) {
                    if ($scope.displayCommentLikes.length < 2) {
                        $scope.displayCommentLikes.push(like.user);
                    } else {
                        $scope.restCommentLikes.push(like.user);
                    }
                });

            },
            function (err) {
                console.log(err);
            }
        );

        $scope.lastElementId = $scope.displayCommentLikes[1];
    };
});