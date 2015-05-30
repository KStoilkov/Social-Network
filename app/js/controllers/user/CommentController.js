'use strict';

app.controller('CommentController', function ($scope, commentService) {

    $scope.getPostComments = function (postId) {
        $scope.displayComments = [];

        commentService.getPostComments(
            postId,
            function (data) {
                $scope.allComments = data;
                $scope.allCommentsShowed = false;
                $scope.textAfterComments = 'Show more comments..';

                data.forEach(function (comment) {
                    if ($scope.displayComments.length < 3) {
                        $scope.displayComments.push(comment);
                    }
                });

                $scope.comments = $scope.displayComments;
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
        
        $scope.showAllComments = function (postId) {
            $scope.comments = angular.copy($scope.allComments);
            //$scope.getPostComments(postId);
            $scope.allCommentsShowed = true;
            $scope.textAfterComments = 'Show less comments..';
        };

        $scope.showLessComments = function (postId) {
            $scope.comments = angular.copy($scope.displayComments);
            //$scope.getPostComments(postId);
            $scope.allCommentsShowed = false;
            $scope.textAfterComments = 'Show more comments..';
        };
    };
});