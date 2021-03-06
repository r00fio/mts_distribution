/**
 * Created by r00fi0 on 6/10/16.
 */
var app = angular.module('app', ['ionic', 'ionic.contrib.frost']);


app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('intro', {
            url: '/',
            templateUrl: 'index.html',
            controller: 'Main'
        })

    $urlRouterProvider.otherwise("/");

});
app.controller('Main', ['$scope','$rootScope', '$http', function ($scope, $rootScope, $http) {

    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
    $rootScope.handleResponse = function (response) {
        return response.filter(function (artifact) {
            
            return artifact.type === 'apk'
        }).sort(function (a, b) {
            return b.version > a.version
        });
    }

    $http({
        method: 'GET',
        url: 'http://172.17.1.9:8080/restServices/archivaServices/browseService/artifacts/ft_android'
    }).then(function successCallback(response) {
        console.log(response);

        $scope.artifacts =  $rootScope.handleResponse(response.data);
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
app.controller('OPEAndroid', ['$scope','$rootScope', '$http', function ($scope, $rootScope, $http) {

        $http({
            method: 'GET',
            url: 'http://172.17.1.9:8080/restServices/archivaServices/browseService/artifacts/ope_android'
        }).then(function successCallback(response) {
            console.log(response);

            $scope.artifacts = $rootScope.handleResponse(response.date)
        }, function errorCallback(response) {
            console.log(response);
        });
}]);
app.controller('DemoAndroid', ['$scope','$rootScope', '$http', function ($scope, $rootScope, $http) {

    $http({
        method: 'GET',
        url: 'http://172.17.1.9:8080/restServices/archivaServices/browseService/artifacts/demo_android'
    }).then(function successCallback(response) {
        console.log(response);

        $scope.artifacts = $rootScope.handleResponse(response.date)
    }, function errorCallback(response) {
        console.log(response);
    });
}]);
app.controller('FTIos', ['$scope','$rootScope', '$http', function ($scope, $rootScope, $http) {

    $http({
        method: 'GET',
        url: 'http://172.17.1.9:8080/restServices/archivaServices/browseService/artifacts/ft_ios'
    }).then(function successCallback(response) {
        console.log(response);

        $scope.artifacts = $rootScope.handleResponse(response.date)
    }, function errorCallback(response) {
        console.log(response);
    });
}]);