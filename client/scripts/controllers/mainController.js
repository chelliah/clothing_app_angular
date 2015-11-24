/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "DataService", function($scope, $http, DataService){
    console.log('hi');

    $scope.dataService = DataService;

    //Brings IN USER DATa
    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        });
    }
    $scope.user = $scope.dataService.peopleData();

    //BRING IN ALL DATA AND EXTRACT ITEMS TO NEW ARRAY
    if($scope.dataService.allData() === undefined){
        $scope.dataService.retrieveAll().then(function(){
            $scope.all = $scope.dataService.allData();
            $scope.items = $scope.extractItems();
            console.log('items', $scope.items);
        });
    }
    $scope.all = $scope.dataService.allData();

    $scope.extractItems = function(){
        var items = [];
        for(var i = 0; i<$scope.all.length; i++){
            console.log('user', $scope.all[0]);
            items = items.concat($scope.all[i].items);
        }
        return items;
    };



}]);