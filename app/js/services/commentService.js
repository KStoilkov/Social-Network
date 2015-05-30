'use strict';

app.factory('commentService', function ($http, baseServiceUrl, authService) {

    function getPostComments (postId, success, error) {
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'posts/' + postId + '/comments',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function getCommentLikes(postId, commentId, success, error) {
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function likeComment(postId, commentId, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function unlikeComment(postId, commentId, success, error) {
        var request = {
            method: 'DELETE',
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    return {
        getPostComments : getPostComments,
        getCommentLikes : getCommentLikes,
        likeComment : likeComment,
        unlikeComment : unlikeComment
    }
});