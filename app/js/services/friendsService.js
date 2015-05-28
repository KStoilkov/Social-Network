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

    function sendFriendRequest(username, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'me/requests/' + username,
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function getOwnFriends(success) {
        var request = {
            method : 'GET',
            url: baseServiceUrl + 'me/friends',
            headers : {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    return {
        getFriendsPosts : getFriendsPosts,
        sendFriendRequest : sendFriendRequest,
        getOwnFriends : getOwnFriends
    }
});