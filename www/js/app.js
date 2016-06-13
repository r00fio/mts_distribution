/**
 * Created by r00fi0 on 6/10/16.
 */
var app = angular.module('app', ['ionic', 'ionic.contrib.frost']);
app.controller('Main', ['$scope', '$http', function ($scope, $http) {
    var apkFilter = function (artifact) {
        return artifact.type === 'apk'
    }

    $http({
        method: 'GET',
        url: 'http://localhost:8080/restServices/archivaServices/browseService/artifacts/demo'
    }).then(function successCallback(response) {
        console.log(response);

        $scope.artifacts = response.data.filter(apkFilter).sort(function (a, b) {
            return b.version > a.version
        });
    }, function errorCallback(response) {
        console.log(response);
    });
    
    $scope.downloadFile = function(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response);

        }, function errorCallback(response) {
            console.log(response);
        });
    }
}]);
