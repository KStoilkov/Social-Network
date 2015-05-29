'use strict';

app.controller('HomeController',
    function ($scope, userService, defaultStartPostId, defaultPageSize) {

        function getNewsFeed(startPostId, startPage) {
            userService.getNewsFeed(
                startPostId,
                startPage,
                function (data) {
                    $scope.newsFeed = data;
                    console.log(data);
                },
                function (err) {
                    console.log(err);
                }
            );
        };

        getNewsFeed(defaultStartPostId, defaultPageSize);
});