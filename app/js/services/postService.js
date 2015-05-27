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

    return {
        addPost : addPost
    }
});