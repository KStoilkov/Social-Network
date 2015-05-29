'use strict';

app.factory('authService', function ($http, $location, baseServiceUrl) {
    function login(userData, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'users/login',
            data: userData
        };

        $http(request).success(function (data) {
            sessionStorage['Authorization'] = JSON.stringify(data);
            success(data);
        }).error(error);
    };

    function logout() {
        delete sessionStorage['Authorization'];
    };

    function register(registerData, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + 'users/register',
            data: registerData
        };

        $http(request).success(success).error(error);
    };

    function isLogged() {
        return sessionStorage['Authorization'] !== undefined;
    };

    function getUserAuthorization () {
        if(sessionStorage['Authorization']) {
            var obj = JSON.parse(sessionStorage['Authorization']),
                auth = obj.token_type + ' ' + obj.access_token;
            return auth;
        }
    };

    return {
        login : login,
        logout : logout,
        register : register,
        isLogged : isLogged,
        getUserAuthorization : getUserAuthorization
    }
});