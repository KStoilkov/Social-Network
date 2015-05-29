'use strict';

app.controller('EditProfileController',
    function ($scope, $location, $rootScope, userService, defaultCoverImageUrl, defaultProfileImageUrl) {

        getUserDataForEditing();

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
                        $rootScope.$broadcast('ProfileEdited');
                        $location.path('/user/' + $scope.loggedUser.username);
                    })
                }
            });
        };

        function getUserDataForEditing () {
            $scope.editData = angular.copy($scope.loggedUser);
        };
});