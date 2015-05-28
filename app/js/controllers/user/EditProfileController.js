'use strict';

app.controller('EditProfileController',
    function ($scope, $location, userService, defaultCoverImageUrl, defaultProfileImageUrl) {

        getUserData();

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
            alertify.confirm('Are you sure?', function (responce) {
                if (responce) {
                    if($scope.coverImage) {
                        editData.coverImageData = $scope.coverImage;
                    }

                    if($scope.profileImage) {
                        editData.profileImageData = $scope.profileImage;
                    }

                    userService.editProfile(editData, function () {
                        alertify.success('Profile edited successfully');
                        $location.path('/user/' + $scope.user.username);
                    })
                }
            });
        };

        function getUserData () {
            userService.getLoggedUserData(function (data) {
                $scope.user = data;
                $scope.editData = data;
            });
        };

        $scope.defaultCoverImage = defaultCoverImageUrl;
        $scope.defaultProfileImage = defaultProfileImageUrl;

});