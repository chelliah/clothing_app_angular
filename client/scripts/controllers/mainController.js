/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "$uibModal", "DataService", function($scope, $http, $uibModal, DataService){
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




    //MODAL FUNCTIONS
    $scope.animationsEnabled = true;

    $scope.open = function (item) {
        var modalInstance = $uibModal.open({
            animation: $uibModal.animationsEnabled,
            templateUrl: 'templates/viewItemModal.html',
            controller: 'ViewItemController',
            resolve: {
                item: function(){
                    return item;
                },
                user: function(){
                    for(var i = 0; i<$scope.all.length; i++){
                        console.log('hi user', $scope.all[i]);
                        if(_.contains($scope.all[i].items,item)){
                            console.log('found it!');
                            return $scope.all[i];
                        }
                    }
                }
            }
        });

        modalInstance.result.then(function(){
            console.log('closed');
        })
    };

    $scope.toggleAnimation = function(){
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);


myApp.controller('ViewItemController', ["$scope", "$http", "$uibModalInstance", "DataService", "item", "user", function ($scope, $http, $uibModalInstance, DataService, item, user) {

    $scope.item = item;
    $scope.user = user;
    $scope.dataService = DataService;


    $scope.ok = function () {
        console.log($scope.user);
        $uibModalInstance.close('submitted');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
