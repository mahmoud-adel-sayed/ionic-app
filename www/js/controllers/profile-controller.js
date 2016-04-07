angular.module('mean.controllers')

.controller('ProfileCtrl', function($scope , Authentication , $state , UploadImage , Alert , Loading , $ionicActionSheet) {
  $scope.$on('$ionicView.enter', function(){
    var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    $scope.firstName = userInfo.firstName;
    $scope.lastName = userInfo.lastName;
    $scope.email = userInfo.email;
    $scope.username = userInfo.username;
    $scope.image = userInfo.aws;

    $scope.showSave = false;
  });

  $scope.logout = function(){
    Authentication.logout();
    $state.go('login');
  };

  var image = document.getElementById('myImage');
  var hideSheet;

  $scope.openAction = function(){
    hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-image"></i>Choose Image' },
        { text: '<i class="icon ion-camera"></i>Take Image' }
      ],
      titleText: 'Modify your Image',
      cancelText: 'Cancel',
      buttonClicked: function(index){
        if(index ==0){
          galleryButton();
        }else if(index ==1){
          cameraButton();
        }
      }
    });
  };

  function galleryButton(){
    hideSheet();
    UploadImage.chooseGallery().then(function(imageURI){
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        $scope.image = fileEntry.nativeURL;
        image.src = fileEntry.nativeURL;
      });
      $scope.showSave = true;
    },function(err){
      $scope.showSave = false;
      Alert.alert('Failed!' , err);
    });
  };

  function cameraButton(){
    hideSheet();
    UploadImage.takeCamera().then(function(imageData){
      $scope.showSave = true;
      $scope.image = imageData;
    },function(err){
      $scope.showSave = false;
      Alert.alert('Failed!' , err);
    });
  };

  $scope.uploadImage = function(){
     Loading.show();

     UploadImage.uploadImage("https://mahmoud-adel-restapi.herokuapp.com/api/v1/users/profile/avatar" , $scope.image).then(function(res){
       Loading.hide();
       $scope.showSave = false;
       Alert.alert("Succeeded" , "Image has uploaded successfully.");

       var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
       userInfo.aws = result.data.aws;
       window.localStorage.setItem('userInfo' , JSON.stringify(userInfo));
     },function(err){
       Loading.hide();
       Alert.alert("Failed!" , err.data.message);
     });
  };

})

.controller('EditProfileCtrl', ['$scope' , 'Request' , 'Alert' , 'Loading' , '$state' , 'Authentication' , function($scope , Request , Alert , Loading , $state , Authentication) {
  var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  $scope.data = {
    username: userInfo.username,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email
  };

  $scope.edit = function(data){
    if(!data.username || !data.firstName || !data.lastName || !data.email){
      Alert.alert('Failed!' , 'Please , fill out all the fields.');
    }else{
      Loading.show();
      Request.put('/users/profile/edit' , data).
        then(function(res){
          Loading.hide();
          Alert.alert('Succeeded' , 'Profile has updated successfully , please Login.');
          Authentication.logout();
          $state.go('login');
        },function(err){
          Loading.hide();
          Alert.alert('Failed!' , err.data.message);
        });
    }
  };
}])

.controller('ChangePassCtrl', ['$scope' , '$state' , 'Request' , 'Loading' , 'Alert' , 'Authentication' , function($scope , $state , Request , Loading , Alert , Authentication) {
  $scope.data = {};

  $scope.changePassword = function(data){
    if(!data.oldPass || !data.newPass || !data.confirmPass){
      Alert.alert('Failed!' , 'Please , fill out all the fields.');
    }else if(data.newPass !== data.confirmPass){
      Alert.alert('Failed!' , 'New password & Confirm password don\'t match.');
    }else{
      Loading.show();
      Request.put('/users/profile/changePassword' , data).
        then(function(res){
          Loading.hide();
          Alert.alert('Succeeded' , 'Password has changed successfully , please Login.');
          Authentication.logout();
          $state.go('login');
          $scope.data = {};
        },function(err){
          Loading.hide();
          Alert.alert('Failed!' , err.data.message);
        });
    }
  };
}]);
