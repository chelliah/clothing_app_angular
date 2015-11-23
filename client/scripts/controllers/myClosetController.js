/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MyClosetController', ["$scope", "$http","$uibModal", "DataService", function($scope, $http, $uibModal,DataService){
    console.log('ur in the closet');

    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $uibModal.animationsEnabled,
            templateUrl: 'templates/addItemModal.html',
            controller: 'AddItemController',
            size: size,
            resolve: {
                items: function(){
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
        }, function(){
            $log.info('modal dismissed at: ' + new Date());
        })
    };

    $scope.toggleAnimation = function(){
        $scope.animationsEnabled = !$scope.animationsEnabled;
    }



}]);


myApp.controller('AddItemController', ["$scope", "$http", "$uibModalInstance", "DataService", function ($scope, $http, $uibModalInstance, DataService) {

    $scope.item = {};

    $scope.dataService = DataService;

    $scope.types = $scope.dataService.typeData();

    $scope.sizes = $scope.dataService.sizeData();



    $scope.ok = function () {
        console.log($scope.item);
        $http.put('/user/entry',$scope.item).then(function(response){
            console.log(response);
        });
        $scope.item = {};
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    };
}]);

