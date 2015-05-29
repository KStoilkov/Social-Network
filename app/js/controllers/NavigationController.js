'use strict';

app.controller('NavigationController',
    function ($scope, $location, $routeParams, $rootScope, friendsService, authService, userService, defaultProfileImageUrl) {

        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.logout = function () {
            authService.logout();
            alertify.success('Logout successful');
            $location.path('/');
        };

        $scope.$on('LoginSuccessful', function () {
            getOwnFriends();
        });

        $scope.$on('FriendRequestApproved', function () {
            getOwnFriends();
        });

        function getOwnFriends() {
            if ($scope.isLogged()) {
                friendsService.getOwnFriends(
                    function (data) {
                        $scope.ownFriends = data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        };

        getOwnFriends();
});