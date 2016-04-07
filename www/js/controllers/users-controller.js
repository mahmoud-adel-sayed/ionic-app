angular.module('mean.controllers')

.controller('UsersCtrl', ['$scope' , 'Request' , function($scope , Request) {
    Request.get('/users/list').then(function(data){ $scope.users = data });
}])

.controller('LoginCtrl', ['$scope' , 'Authentication' , '$state' , 'Alert' , 'Loading' , function($scope, Authentication , $state , Alert , Loading) {
  $scope.data = {};

  $scope.login = function(data){
    if(!data.username || !data.password){
      Alert.alert('Login Failed!' , 'username and password are required!');
    }else{
      Loading.show();
      Authentication.login(data.username , data.password)
      .then(function(authenticated){
        Loading.hide();
        $state.go('tab.posts' , {}, {reload: true});
      },function(err){
        Loading.hide();
        Alert.alert('Login Failed!' , 'Your username or password is wrong , please try again.');
      });
    }
  };
}])

.controller('RegisterCtrl', ['$scope' , '$state' , 'Alert' , 'Loading' , 'Request' , function($scope , $state , Alert , Loading , Request) {
  $scope.data = {};

  $scope.register = function(data){
    if(!data.firstName || !data.lastName || !data.email || !data.username || !data.password || !data.passwordConfirm){
      Alert.alert('Registration Failed!' , 'Please , fill out all the fields.');
    }else if(data.password !== data.passwordConfirm){
      Alert.alert('Registration Failed!' , 'Password & Confirm password don\'t match.');
    }else{
      Loading.show();
      Request.post('/users/create' , data)
        .then(function(authenticated){
          Loading.hide();
          $state.go('login');
          Alert.alert('Registration Succeeded' , 'Account has created successfully , please Login.');
        },function(err){
          Loading.hide();
          Alert.alert('Registration Failed!' , err.data.message);
        });
    }
  };
}]);
