angular.module('mean', ['ionic' , 'ngCordova' , 'mean.controllers', 'mean.services'])

.run(function($ionicPlatform , $http , $state , REST_API_DEVELOPMENT , $rootScope, $cordovaNetwork , $ionicPopup) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    var authdata = window.localStorage.getItem('authdata');
    if(authdata){
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
      $http.post(REST_API_DEVELOPMENT.url + '/users/authenticate').then(function(res){
        $state.go('tab.posts');
      },function(err){
        $state.go('login');
      });
    }else{
      $state.go('login');
    }

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var alertPopup = $ionicPopup.alert({
        title: 'Internet Connection Failed!',
        template: 'Please , check for internet connection & try again.'
      });
      alertPopup.then(function(res) {
       ionic.Platform.exitApp();
      });
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.create', {
    url: '/create',
    views: {
      'tab-create': {
        templateUrl: 'templates/tab-create.html',
        controller: 'CreatePostCtrl'
      }
    }
  })

  .state('tab.posts', {
      url: '/posts',
      views: {
        'tab-posts': {
          templateUrl: 'templates/tab-posts.html',
          controller: 'PostsCtrl'
        }
      }
    })

  .state('tab.post-detail', {
      url: '/posts/:postId',
      views: {
        'tab-posts': {
          templateUrl: 'templates/tab-post-details.html',
          controller: 'PostDetailsCtrl'
        }
      }
    })

  .state('tab.users', {
    url: '/users',
    views: {
      'tab-users': {
        templateUrl: 'templates/tab-users.html',
        controller: 'UsersCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.editProfile', {
    url: '/profile/edit',
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile-edit.html',
        controller: 'EditProfileCtrl'
      }
    }
  })

  .state('tab.changePassword', {
    url: '/profile/edit/password',
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile-changePassword.html',
        controller: 'ChangePassCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  });

  //$urlRouterProvider.otherwise('/login');

});
