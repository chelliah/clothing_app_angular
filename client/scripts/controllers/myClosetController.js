/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MyClosetController', ["$scope", "$http","$uibModal", "$window", "DataService", function($scope, $http, $uibModal, $window, DataService){
    console.log('ur in the closet');

    //LOAD IN DATASERVICE DATA
    $scope.dataService = DataService;

    $scope.updateItemData = function(){
        console.log('updating');
        $scope.dataService.getUserItems().then(function(){
            $scope.items = $scope.dataService.userItems();
            console.log($scope.items);
        })
    };

    if($scope.dataService.userItems() === undefined){
        $scope.updateItemData();
    }

    $scope.items = $scope.dataService.userItems();
    console.log($scope.items);


    //SET MODAL WINDOW SIZE
    var w = angular.element($window),
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;


    $scope.modalSize = function(){
        if(x>767){
            return 'lg';
        }else{
            return 'sm';
        }
    };

    //SET MODAL FUNCTIONALITY
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/addItemModal.html',
            controller: 'AddItemController',
            size: $scope.modalSize()
            //resolve: {
            //    items: function(){
            //        return $scope.items;
            //    }
            //}
        });

        modalInstance.result.then(function(){
            console.log('closed');
            $scope.updateItemData();
            setTimeout($scope.updateItemData(), 5000);
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

}]);


myApp.controller('AddItemController', ["$scope", "$http", "$uibModalInstance", "DataService", "Upload", function ($scope, $http, $uibModalInstance, DataService, Upload) {

    $scope.item = {};
    $scope.addItemMessage = "Add Item";

    $scope.dataService = DataService;



    $scope.types = $scope.dataService.typeData();

    $scope.sizes = $scope.dataService.sizeData();

    //UPLOAD FUNCTION
    $scope.upload = function () {
        return Upload.upload({
            url: '../upload/url',
            data: {file: $scope.file}
        }).success(function(data){
            //console.log(data, 'uploaded');
            //console.log('item before insertion', $scope.item);
            $scope.item.url = data.secure_url;
            //console.log('item after insertion', $scope.item);
            $http.post('/item',$scope.item).then(function(response){
                $scope.dataService.getUserItems();
                console.log(response, 'posted');
                $scope.item = {};
                $uibModalInstance.close('submitted');
            });
        })
    };

    //OK FUNCTION
    $scope.ok = function () {
        console.log($scope.item);
        $scope.addItemMessage = "Adding...";
        $scope.upload();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

