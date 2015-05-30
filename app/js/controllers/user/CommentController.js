'use strict';

app.controller('CommentController', function ($scope, postService) {

    $scope.getPostComments = function (postId) {
        postService.getPostComments(
            postId,
            function (data) {
                $scope.comments = data;
                console.log(data);
            },
            function (err) {
                console.log(err);
            }
        );
    }
});