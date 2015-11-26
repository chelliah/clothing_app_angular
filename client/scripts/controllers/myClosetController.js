/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MyClosetController', ["$scope", "$http","$uibModal", "DataService", function($scope, $http, $uibModal,DataService){
    console.log('ur in the closet');

    //LOAD IN DATASERVICE DATA
    $scope.dataService = DataService;

    $scope.updateItemData = function(){
        $scope.dataService.getUserItems().then(function(){
            $scope.items = $scope.dataService.userItems();
        })
    };


    if($scope.dataService.userItems() === undefined){
        $scope.updateItemData();
    }

    $scope.items = $scope.dataService.userItems();
    console.log($scope.items);



    //SET MODAL FUNCTIONALITY
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/addItemModal.html',
            controller: 'AddItemController',
            size: size,
            resolve: {
                items: function(){
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(){
            console.log('closed');
            $scope.updateItemData();
        })
    };




    //REMOVE ITEM FUNCTION

    $scope.remove = function(item){
        console.log(item);
        $http.delete('/item', {params: {id: item._id}}).then(function(response){
            console.log(response);
            $scope.updateItemData();
        })

    };

    //$scope.on('update', function(){
    //    $scope.updateUserData();
    //})



}]);


myApp.controller('AddItemController', ["$scope", "$http", "$uibModalInstance", "DataService", function ($scope, $http, $uibModalInstance, DataService) {

    $scope.item = {};

    $scope.dataService = DataService;

    $scope.types = $scope.dataService.typeData();

    $scope.sizes = $scope.dataService.sizeData();



    $scope.ok = function () {
        console.log($scope.item);
        $http.post('/item',$scope.item).then(function(response){
            console.log(response);
        });
        $scope.item = {};

        $uibModalInstance.close('submitted');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

