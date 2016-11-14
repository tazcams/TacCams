/**
 * Created by Adam on 14/11/2016.
 */
var app = angular.module('tazCamApp', []);

app.controller('mainCtrl', function($scope, $rootScope, $http, $location) {

    var x = $location.href;
    $scope.firstName= x;
    $rootScope.appUrl = "";
    if (typeof x !== 'undefined') {
        $rootScope.appUrl = x;
    }
    $scope.lastName= "Doe";


    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };

    var load = function() {
        console.log('call load()...');
        $http.get($rootScope.appUrl + '/pictures.json')
            .success(function(data, status, headers, config) {
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
