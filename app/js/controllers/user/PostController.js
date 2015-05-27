'use strict';

app.controller('PostController', function ($scope, postService) {
    $scope.postData = {
        username : 'kiroPicha'
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

});