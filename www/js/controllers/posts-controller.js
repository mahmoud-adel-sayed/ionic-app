angular.module('mean.controllers')

.controller('CreatePostCtrl', function($scope , Alert , Request , Loading , $state , UploadImage , $ionicActionSheet) {
  $scope.data = {};
  var hideSheet , image;

  $scope.$on('$ionicView.enter', function() {
    $scope.image = false;
    image = document.getElementById('postImage');
    image.style.display = 'none';
  });

  $scope.create = function(data){
    if(!data.title || !data.content){
      Alert.alert('Faild!' , 'Title & Content are required');
    }else{
      Loading.show();
      Request.post('/posts' , data).then(function(res){
        if($scope.image){
          UploadImage.uploadImage("https://mahmoud-adel-restapi.herokuapp.com/api/v1/posts/" + res._id + "/upload/image" , $scope.image).then(function(res){
            Loading.hide(); $state.go('tab.posts'); $scope.data = {};
          },function(err){
            Loading.hide(); Alert.alert("Failed!" , err.data.message);
          });
        }else{
          Loading.hide(); $state.go('tab.posts'); $scope.data = {};
        }
      },function(err){
        Loading.hide(); Alert.alert('Faild!' , err.data.message);
      });
    }
  };

  $scope.openAction = function(){
    hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-image"></i>Choose Image' },
        { text: '<i class="icon ion-camera"></i>Take Image' }
      ],
      titleText: 'upload Image',
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
        image.style.display = 'block';
        image.src = fileEntry.nativeURL;
      });
    },function(err){
      Alert.alert('Failed!' , err);
    });
  };

  function cameraButton(){
    hideSheet();
    UploadImage.takeCamera().then(function(imageData){
      $scope.image = imageData;
      image.style.display = 'block';
      image.src = imageData;
    },function(err){
      Alert.alert('Failed!' , err);
    });
  };

})

.controller('PostsCtrl' , function($scope , Request) {
  $scope.$on('$ionicView.enter', function() {
    Request.get('/posts').then(function(data){ $scope.posts = data });
  });

  $scope.refresh = function(){
    Request.get('/posts').then(function(data){ $scope.posts = data })
      .finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
      });
  };
})

.controller('PostDetailsCtrl', function($scope , $stateParams , Request , Loading , Alert , $state , $ionicModal) {
    var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    var userId = userInfo._id;

    $scope.comment = {};
    $scope.discom = false;

    Request.get('/posts/'+ $stateParams.postId).then(function(data){
      $scope.post = data;
      if(userId == data.creator._id){
        $scope.owner = true;
      }else{
        $scope.owner = false;
      }
    });
    $scope.loading = false;

    $ionicModal.fromTemplateUrl('templates/tab-post-edit.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.editPost = function(post){
      $scope.modal.show();
      $scope.post = post;
    };

    $scope.cancel = function(){
      $scope.modal.hide();
    };

    $scope.saveItem = function (data) {
      if(!data.title || !data.content){
        Alert.alert('Failed' , 'Title & Content are required');
      }else{
        Loading.show();
        Request.put('/posts/'+ $stateParams.postId , data).then(function(data){
          Loading.hide();
          Alert.alert('success' , 'Post has updated successfully.');
          $scope.modal.hide();
        },function(err){
          Loading.hide();
          Alert.alert('Faild!' , err);
        });
      }
    };

    $scope.deletePost = function(postId){
      Alert.confirm('Confirm Delete!' , 'Do you want to delete this post?').then(function(confirm){
        if(confirm){
          Loading.show();
          Request.remove('/posts/'+ postId).then(function(data){
            Loading.hide();
            Alert.alert('success' , 'Post has deleted successfully.');
            $state.go('tab.posts');
          },function(err){
            Loading.hide();
            Alert.alert('Faild!' , err);
          });
        }
      });
    };

    $scope.sendComment = function(){
      $scope.discom = true;
      Request.post('/posts/'+ $stateParams.postId + '/comments' , $scope.comment).then(function(comment){
        $scope.comment = {};
        $scope.discom = false;
        $scope.showComments($stateParams.postId);
      },function(err){
        $scope.discom = false;
        Alert.alert('Failed!' , err.data.message);
      });
    };

    $scope.showComments = function(postId){
      $scope.loading = true;
      Request.get('/posts/'+ postId + '/comments').then(function(comments){
        $scope.loading = false;
        $scope.comments = comments;
      },function(err){
        $scope.loading = false;
      });
    };
});
