'use strict';

app.factory('userService', function ($http, authService, baseServiceUrl) {
    function getLoggedUserData(success) {
        var request = {
            method: 'GET',
            headers: {
                'Authorization': authService.getUserAuthorization()
            },
            url: baseServiceUrl + 'me'
        };

        $http(request).success(function (data) {
            success(data)
        }).error(function (err) {
            console.error(err);
        });
    };

    function editProfile(editData, success) {
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'me',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            },
            data: editData
        };

        $http(request).success(success).error(function (err) {
            console.log(err);
        });
    };

    function changePassword(newPasswordData, success) {
        var request = {
            method: 'PUT',
            url: baseServiceUrl + 'me/changepassword',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            },
            data: newPasswordData
        };

        $http(request).success(success).error(function (err) {
            alertify.error(err);
        });
    };

    function getUserFullData(username, success, error) {
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'users/' + username,
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function getUserPreview(username, success, error) {
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'users/' + username + '/preview',
            headers: {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    };

    function getNewsFeed (startPostId, pageSize, success, error){
        var request = {
            method: 'GET',
            url: baseServiceUrl + 'me/feed/?StartPostId=' + (startPostId || '') + '&PageSize=' + pageSize,
            headers : {
                'Authorization' : authService.getUserAuthorization()
            }
        };

        $http(request).success(success).error(error);
    }

    return {
        getLoggedUserData : getLoggedUserData,
        editProfile : editProfile,
        changePassword : changePassword,
        getUserFullData : getUserFullData,
        getUserPreview : getUserPreview,
        getNewsFeed : getNewsFeed
    }
});