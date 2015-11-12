
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes

weatherApp.config(function($routeProvider){

    $routeProvider

        .when('/', {
            templateUrl: 'template/home.html',
            controller: 'homeCtrl'
        })

        .when('/forecast', {
            templateUrl: 'template/forecast.html',
            controller: 'forecastCtrl'
        })
        .when('/forecast/:days', {
            templateUrl: 'template/forecast.html',
            controller: 'forecastCtrl'
        })
});

//Service

    weatherApp.service('cityService', function() {

        this.city = 'Finland';

    });

//Controllers

weatherApp.controller('homeCtrl', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    //coz the value changes

    $scope.$watch('city', function() {

        cityService.city = $scope.city;


    });

}]);

weatherApp.controller('forecastCtrl', ['$scope', '$resource', '$routeParams', 'cityService',
    function($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days ||  '5';

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=b40d6da4b2cc658abd9ad1a13c737044',
        { callback : "JSON_CALLBACK"}, { get : { method : "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q : $scope.city, cnt : $scope.days });

        console.log($scope.weatherResult);

    $scope.convertToCelsius = function (kelvin) {

        return Math.round(kelvin - 273.15)  ;
    }

    $scope.convertToDate = function (dt) {

        return new Date(dt * 1000);
    }

}]);
