angular.module('mean.services')

.factory('Request', ['$http' , 'REST_API_DEVELOPMENT' , function($http , REST_API_DEVELOPMENT) {
  var get = function(url){
    return $http.get(REST_API_DEVELOPMENT.url + url).then(function(res){
      return res.data;
    });
  };

  var post = function(url , data){
    return $http.post(REST_API_DEVELOPMENT.url + url , data).then(function(res){
      return res.data;
    });
  };

  var put = function(url , data){
    return $http.put(REST_API_DEVELOPMENT.url + url , data).then(function(res){
      return res.data;
    });
  };

  var remove = function(url){
    return $http.delete(REST_API_DEVELOPMENT.url + url).then(function(res){
      return res.data;
    });
  };

  return{
    get: get,
    post: post,
    put: put,
    remove: remove
  };

}]);
