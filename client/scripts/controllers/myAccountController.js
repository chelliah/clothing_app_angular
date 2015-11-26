/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MyAccountController', ["$scope", "$http", "DataService", function($scope, $http, DataService){
    console.log('ur in the account now');

    $scope.dataService = DataService;

    $scope.updateUserData = function(){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        })
    };


    if($scope.dataService.peopleData() === undefined){
        $scope.updateUserData();
    }else{
        $scope.user = $scope.dataService.peopleData();
    }

    //$scope.user = $scope.dataService.peopleData();



}]);