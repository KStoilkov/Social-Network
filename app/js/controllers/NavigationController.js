'use strict';

app.controller('NavigationController',
    function ($scope, $location, $routeParams, $rootScope, friendsService, authService, userService, defaultProfileImageUrl) {

        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.searchTearm = '';

        $scope.searchUser = function (searchTerm) {
            if (searchTerm !== '') {
                userService.searchUser(
                    searchTerm,
                    function (data) {
                        $scope.foundedUsers = data;
                        console.log(data);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        };

        $scope.clearSearchBox = function () {
            $scope.searchTearm = '';
            $('.searchInput').val('');
            $scope.searchUser();
        };

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

        $scope.$on('RegisterSuccessful', function () {
            getOwnFriends();
        });

        function getOwnFriends() {
            if ($scope.isLogged()) {
                friendsService.getOwnFriends(
                    function (data) {
                        $scope.ownFriends = data;
                        $scope.friendsToDisplay = data.slice(0, 6);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        };

        getOwnFriends();
});