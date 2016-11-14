/**
 * Created by Adam on 14/11/2016.
 */

var app = angular.module('mainApp', []);

app.controller('mainCtrl', function($scope, $location, $rootScope, $http) {
    var x = $location.host();
    $scope.firstName = x;
    $rootScope.appUrl = "";
    if (typeof x !== 'undefined' && x !== 'localhost') {
        $rootScope.appUrl = "http://132.75.252.120/~tazcam/TazCams";
    }
    $scope.lastName = "Doe";


    $scope.fullName = function () {
        return $location.host() + " " + $scope.lastName;
    };

    var load = function () {
        console.log('call load()...');
        $http.get($rootScope.appUrl + '/pictures.json')
            .success(function (data, status, headers, config) {
                $scope.pictures = data.pictures;
                angular.copy($scope.pictures, $scope.copy);
            });
    }

    load();


});

app.directive("myDirective", function() {
    return {
        template : "I was made in a directive constructor!"
    };
});