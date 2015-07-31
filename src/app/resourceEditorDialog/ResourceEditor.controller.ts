/// <reference path="../main/Resource.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

angular.module('vis').controller('ResourceEditorController', function ($scope, $modalInstance, resource:Resource) {
	$scope.resource = resource;
  $scope.resourceJson = JSON.stringify(resource, null, 2);
  
  $scope.validate = function() {
    try {
       JSON.parse($scope.resourceJson);
       $scope.validationResult = "Valid JSON!";
    } catch(err) {
      $scope.validationResult = "Invalid JSON: " + err.toString();
    }
  }
  
  $scope.save = function () {
    var newResource:Resource;
    
    try {
      newResource = JSON.parse($scope.resourceJson);
    } catch(err) {
      alert('Invalid JSON: ' + err.toString());
      
      return;
    }
    
    //Update the EXISTING resource without destroying it
    for(var key in resource) {
      if(resource.hasOwnProperty(key)) {
        delete resource[key];
      }
    }
    
    $.extend(resource, newResource);
      
	  $modalInstance.close(resource);
	};

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});