/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MyClosetController', ["$scope", "$http","$uibModal", "DataService", function($scope, $http, $uibModal,DataService){
    console.log('ur in the closet');

    //LOAD IN DATASERVICE DATA
    $scope.dataService = DataService;

    $scope.updateUserData = function(){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
        })
    };


    if($scope.dataService.peopleData() === undefined){
        $scope.updateUserData();
    }

    $scope.user = $scope.dataService.peopleData();
    console.log($scope.user);



    //SET MODAL FUNCTIONALITY
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

        modalInstance.result.then(function(){
            console.log('closed');
            $scope.updateUserData();
        })
    };

    $scope.toggleAnimation = function(){
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };


    //REMOVE ITEM FUNCTION

    $scope.remove = function(item){
        console.log(item);
        $http.delete('/user/entry', {params: {id: item._id}}).then(function(response){
            console.log(response);
            $scope.updateUserData();
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
        $http.put('/user/entry',$scope.item).then(function(response){
            console.log(response);
        });
        $scope.item = {};

        $uibModalInstance.close('submitted');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

