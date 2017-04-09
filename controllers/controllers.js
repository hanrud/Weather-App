angular.module('weatherApp').controller('homeController', ['$scope', 'cityService',
    function ($scope, cityService) {
        $scope.city = cityService.city;
        $scope.$watch('city', function () {
            cityService.city = $scope.city;
        })
    }]);

angular.module('weatherApp').controller('forecastController', ['$scope', '$resource', '$log', '$routeParams','cityService',
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
