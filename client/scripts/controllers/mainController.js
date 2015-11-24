/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "DataService", function($scope, $http, DataService){
    $scope.dataService = DataService;

    //BRINGS IN USER DATA
    $scope.updateUserData = function(){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        })
    };

    if($scope.dataService.peopleData() === undefined){
        $scope.updateUserData();
    }

    $scope.updateUserData();

    //function extracts items from list of users
    $scope.extractItems = function(){
        var items = [];
        for(var i = 0; i<$scope.all.length; i++){
            console.log('user', $scope.all[0]);
            items = items.concat($scope.all[i].items);
        }
        return items;
    };

    //BRING IN ALL DATA AND EXTRACT ITEMS TO NEW ARRAY
    $scope.updateAllData = function(){
        $scope.dataService.retrieveAll().then(function(){
            $scope.all = $scope.dataService.allData();
            $scope.items = $scope.extractItems();
        });
    };

    if($scope.dataService.allData() === undefined){
        $scope.updateAllData();
    }



    //MAINTAINS DATA ON RELOAD AND TAB CHANGE
    $scope.updateAllData();

}]);