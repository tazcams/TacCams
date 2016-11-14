/**
 * Created by Adam on 14/11/2016.
 */

var app = angular.module('mainApp', []).run(function($location, $rootScope) {
    var x = $location.host();
    $rootScope.appUrl = "";
    if (typeof x !== 'undefined' && x !== 'localhost') {
        $rootScope.appUrl = "http://132.75.252.120/~tazcam/TazCams";
    }
});

app.controller('mainCtrl', function($scope, $location, $rootScope, $http) {

    $scope.firstName = "Adam";
    $scope.lastName = "Doe";
    $scope.fullName = function () {
        return $scope.firstName + " " + $scope.lastName;
    };

    var load = function () {
        console.log('call load()...');
        $http.get($rootScope.appUrl + '/pictures.json')
            .success(function (data, status, headers, config) {
                $scope.pictures = data.pictures;
                angular.copy($scope.pictures, $scope.copy);
                $scope.filteredPictures = $scope.pictures;
                angular.copy($scope.filteredPictures, $scope.copy);
            });

    }

    load();

    $scope.filterPictures = function(locationID)
    {
        if (typeof locationID !== 'undefined')
        {

        }
        else {

        }
    }


});

app.directive("myDirective", function() {
    return {
        template : "I was made in a directive constructor!"
    };
});