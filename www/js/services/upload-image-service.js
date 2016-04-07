angular.module('mean.services')

.factory('UploadImage' , function($cordovaCamera , $cordovaFileTransfer){

  var takeCamera  = function(){
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URL,
      sourceType: Camera.PictureSourceType.CAMERA
    };
    return $cordovaCamera.getPicture(options).then(function(imageData){
      return imageData;
    });
  };

  var chooseGallery = function(){
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };
    return $cordovaCamera.getPicture(options).then(function(imageURI){
      return imageURI;
    });
  };

  var uploadImage = function(url , image){
     var server = url;
     var fileURL = image;
     var filename = fileURL.substr(fileURL.lastIndexOf('/') + 1);

     var options = {
          fileKey: "image",
          fileName: filename,
          chunkedMode: true,
          mimeType: "image/jpeg",
          headers: {
            "Authorization": "Basic " + window.localStorage.getItem('authdata')
          }
      };

      return $cordovaFileTransfer.upload(server, fileURL, options).then(function(res){
        return res.data;
      });
  };

  return {
    takeCamera: takeCamera,
    chooseGallery: chooseGallery,
    uploadImage: uploadImage
  }

});
