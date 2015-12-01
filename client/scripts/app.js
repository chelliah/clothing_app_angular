var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngFileUpload']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/main', {
            templateUrl: "/views/routes/main.html",
            controller: "MainController"
        })
        .when('/userAccount', {
            templateUrl: "/views/routes/userAccount.html",
            controller: "MyAccountController"
        })
        .when('/myCloset', {
            templateUrl: "/views/routes/myCloset.html",
            controller: "MyClosetController"
        })
        .otherwise('/main');
}]);