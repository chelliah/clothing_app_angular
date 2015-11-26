/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "$uibModal", "DataService", function($scope, $http, $uibModal, DataService){
    $scope.dataService = DataService;
    $scope.itemFilter = {};
    $scope.user = {};
    $scope.items = {};

    //PULL IN ITEM DATA CONSTANTS
    $scope.sizes = $scope.dataService.sizeData();
    $scope.types = $scope.dataService.typeData();

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


    //BRING IN SALE DATA
    $scope.updateSaleData = function(){
        $scope.dataService.getSaleItems().then(function(){
            $scope.items = $scope.dataService.saleItems();

        });
    };
    if($scope.dataService.saleItems() === undefined){
        $scope.updateSaleData();
    }
    $scope.updateSaleData();


    //MODAL FUNCTIONS
    $scope.open = function (item) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/viewItemModal.html',
            controller: 'ViewItemController',
            resolve: {
                item: function(){
                    return item;
                }
            }
        });

        modalInstance.result.then(function(){
            console.log('closed');
        })
    };

    //RETURNS QUERY OBJECT CREATED BY SIDEBAR FILTER
    $scope.logFilter = function(){
        console.log($scope.itemFilter);
        var query = {};
        for(var field in $scope.itemFilter){
            console.log(field);
            query[field] = [];
            for (var term in $scope.itemFilter[field]){
                if($scope.itemFilter[field][term]){
                    query[field].push(term);
                }
            }
        }
        console.log(query);
        $scope.dataService.queryItems(query);
    };

}]);


myApp.controller('ViewItemController', ["$scope", "$http", "$uibModalInstance", "DataService", "item", function ($scope, $http, $uibModalInstance, DataService, item) {

    $scope.item = item;
    $scope.user = {};
    $scope.dataService = DataService;

    $scope.findUser = function(){
        return $http.get('/user/seller', {params: {id: item.user_id}}).then(function(response){
            console.log("the seller", response);
            $scope.user = response.data[0];
        })
    };

    $scope.ok = function () {
        console.log($scope.user);
        $uibModalInstance.close('submitted');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.findUser();
}]);
