/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "DataService", function($scope, $http, DataService){
    console.log('hi');

    $scope.dataService = DataService;

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }

    $scope.user = $scope.dataService.peopleData();

    console.log('on the controlla', $scope.user)

}]);