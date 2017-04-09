'use strict';
// http://api.openweathermap.org/data/2.5/forecast/daily?q=Gdansk&cnt=2&appid=585222553e6b3dc14840755cff27db02
var weatherApp = angular.module('weatherApp', [
    'ngRoute',
    'ngResource'
]);


//Config
weatherApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: '/views/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: '/views/forecast.html',
            controller: 'forecastController'
        })
}]);


//service
weatherApp.service('cityService', function () {
    this.city = 'Gdansk';
});

//controllers
weatherApp.controller('homeController', ['$scope', 'cityService',
    function ($scope, cityService) {
        $scope.city = cityService.city;
        $scope.$watch('city', function () {
            cityService.city = $scope.city;
        })
    }]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$log', '$routeParams','cityService',
    function ($scope, $resource, $log, $routeParams, cityService) {
        $scope.city = cityService.city;
        $scope.days =  $routeParams.days || 2;

        var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
        $scope.weatherResult = weatherApi.get({
            q: 'Gdansk',
            cnt: $scope.days,
            appid: '585222553e6b3dc14840755cff27db02'
        }, function (res) {
            return res;
        });

        $scope.convertDate = function (data) {
            return new Date(data * 1000);
        };

        $scope.convertToCelsius = function (data) {
            return (data - 273.15).toFixed(1);
        };

    }]);

//directives
weatherApp.directive('weatherReport', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/weather-report.html',
        replace: true,
        scope: {
            // '<' one-way lub {{ ::przed }} w html
            // '=' two-way data binding
            // '&' function/expression
            //'@'  one-way w angularze < 1.5
            weatherDay: '<',
            convertDate: '&',
            convertToCelsius: '&',
            dateFormat: '<'
        }
    }
});


