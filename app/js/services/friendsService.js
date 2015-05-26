'use strict';

app.factory('friendsService', function ($http, authService, baseServiceUrl) {
    function getFriendsPosts(success, error) {
        var request = {
              method : 'GET',
              url : baseServiceUrl + 'me/feed?StartPostId=&PageSize=5',
              headers: {
                  'Authorization' : authService.getUserAuthorization()
              }
        };

        $http(request).success(success).error(error);
    };

    return {
        getFriendsPosts : getFriendsPosts
    }
});