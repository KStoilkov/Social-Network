'use strict';

app.controller('EditProfileController',
    function ($scope, $location, userService, defaultCoverImageUrl, defaultProfileImageUrl) {

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

        $scope.fileSelected = function(fileInput, imgType) {
            var file = fileInput.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    if (imgType === 'cover') {
                        $scope.$apply(function () {
                            $scope.coverImage = reader.result;
                        });
                    } else if (imgType === 'profile') {
                        $scope.$apply(function () {
                            $scope.profileImage = reader.result;
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        $scope.editProfile = function (editData) {
            userService.editProfile(editData, function () {
                $location.path('/user/profile');
            })
        };

        function getUserData () {
            userService.getLoggedUserData(function (data) {
                $scope.user = data;
                $scope.editData = data;
            });
        };

        getUserData();
});