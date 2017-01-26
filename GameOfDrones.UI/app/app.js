var GameOfDronesApp = angular.module('GameOfDronesApp', ['ngRoute', 'ui.bootstrap', 'ngResource', 'ngDragDrop']);
GameOfDronesApp.constant("Global", {
    "webApi": "http://localhost/GameOfDrones.WebApi/api"
})
GameOfDronesApp.run(['$location', function ($location) {
    $location.path('/');
    //$location.path('/customGame');
}])
GameOfDronesApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'homeCtrl'
    }).when('/Game/:param', {
        templateUrl: 'app/views/game.html',
        controller: 'GameCtrl'
    }).when('/customGame', {
        templateUrl: 'app/views/setCustomGame.html',
        controller: 'SetCustomGameCtrl'
    })
}])