'use strict';

app.controller('HomeController', function ($scope, authService) {
    $scope.isLogged = function () {
        return authService.isLogged();
    }
});