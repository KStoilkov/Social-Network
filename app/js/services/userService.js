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
            console.log(err);
        });
    };

    return {
        getLoggedUserData : getLoggedUserData
    }
});