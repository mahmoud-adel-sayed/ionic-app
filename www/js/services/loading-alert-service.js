angular.module('mean.services')

.factory('Loading' , ['$ionicLoading' , function($ionicLoading){

  var show = function(){
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner icon="ios-small"></ion-spinner>'
    });
  };

  var hide = function(){
    $ionicLoading.hide();
  };

  return{
    show: show,
    hide: hide
  };

}])

.factory('Alert' , ['$ionicPopup' , function($ionicPopup){

  var alert = function(title , template){
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template
    });
  };

  var confirm = function(title , template){
   var confirmPopup = $ionicPopup.confirm({
     title: title,
     template: template
   });

   return confirmPopup.then(function(res) {
     if(res){
       return true;
     }else{
       return false;
     }
   });
 };

  return{
    alert: alert,
    confirm: confirm
  };

}]);
