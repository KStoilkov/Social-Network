'use strict';

app.controller('HomeController',
    function ($scope, userService, defaultStartPostId, defaultPageSize, defaultProfileImageUrl) {

        $scope.defaultProfileImage = defaultProfileImageUrl;

        function getNewsFeed(startPostId, startPage) {
            if ($scope.isLogged()) {
                userService.getNewsFeed(
                    startPostId,
                    startPage,
                    function (data) {
                        $scope.newsFeed = data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        };

        getNewsFeed(defaultStartPostId, defaultPageSize);
});