'use strict';

app.controller('NavigationController',
    function ($scope, $location, $routeParams, authService, userService, defaultProfileImageUrl) {

        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.isLogged = function () {
            return authService.isLogged();
        };

        checkIfUserIsLogged();

        $scope.$on('LoginSuccessfully', function () {
            getUserData();
        });

        $scope.$on('RegisterSuccessfully', function () {
            getUserData();
        });

        $scope.logout = function () {
            authService.logout();
            alertify.success('Logout successful');
            $location.path('/');
        };

        function getUserData() {
            userService.getLoggedUserData(function (data) {
                $scope.user = data;
            })
        };

        function checkIfUserIsLogged() {
            if ($scope.isLogged()){
                getUserData();
            }
        };
});