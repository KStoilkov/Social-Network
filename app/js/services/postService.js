'use strict';

app.factory('postService', function ($http, baseServiceUrl, authService) {
   function addPost(postData, success, error) {
       var request = {
           method: 'POST',
           url: baseServiceUrl + 'posts',
           headers: {
               'Authorization' : authService.getUserAuthorization()
           },
           data: postData
       };

       $http(request).success(success).error(error);
   };

    function getWallPosts(username, startPostId, pageSize, success, error) {
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'users/' + username + '/wall?StartPostId=' + (startPostId || '') + '&PageSize=' + pageSize,
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function likePost(postId, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'Posts/' + postId + '/likes',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function unlikePost(postId, success, error){
        var request = {
            method: 'DELETE',
            url: baseServiceUrl + 'Posts/' + postId + '/likes',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    return {
        addPost : addPost,
        getWallPosts : getWallPosts,
        likePost : likePost,
        unlikePost: unlikePost
    }
});