angular.module('mean')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
/*
.constant('REST_API_DEVELOPMENT' , {
  url: 'http://localhost:3000/api/v1'
})
*/
.constant('REST_API_DEVELOPMENT' , {
  url: 'https://mahmoud-adel-restapi.herokuapp.com/api/v1'
});
