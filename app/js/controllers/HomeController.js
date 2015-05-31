'use strict';

app.controller('HomeController',
    function ($scope, $route, userService, defaultStartPostId, defaultPageSize, defaultProfileImageUrl) {

        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.defaultPageSize = defaultPageSize;
        $scope.newsFeed = [];
        $scope.feedsRecieved = 0;
        $scope.currentHomePageSize = defaultPageSize;

        function getNewsFeed(startPostId, startPage) {
            if ($scope.isLogged()) {
                userService.getNewsFeed(
                    startPostId || '',
                    startPage + 1,
                    function (data) {
                        data.forEach(function (feed) {
                            if ($scope.newsFeed.length < $scope.currentHomePageSize) {
                                $scope.newsFeed.push(feed);
                                $scope.lastHomePostId = $scope.newsFeed[$scope.newsFeed.length - 1].id;
                            }
                            $scope.feedsRecieved++;
                        });
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        };

        $scope.loadMoreNews = function () {
            $scope.currentHomePageSize += defaultPageSize;
            getNewsFeed($scope.lastHomePostId, defaultPageSize);
        };

        $scope.$on('PostAddedLikedUnliked', function () {
            $scope.newsFeed = [];
            $scope.feedsRecieved = 0;
            $scope.currentHomePageSize = defaultPageSize;
            getNewsFeed(defaultStartPostId, defaultPageSize);
        });

        getNewsFeed(defaultStartPostId, defaultPageSize);
});