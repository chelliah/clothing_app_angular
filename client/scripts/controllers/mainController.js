/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "$uibModal", "$window","$anchorScroll", "$location", "DataService", function($scope, $http, $uibModal, $window, $anchorScroll, $location, DataService){
    $scope.dataService = DataService;
    $scope.itemFilter = {};
    $scope.user = {};
    $scope.items = {};
    $scope.search = undefined;
    $scope.query = false;

    //INITIALIZE ITEM DISPLAY OPTIONS
    $scope.itemsPerPage = 12;
    $scope.displayPage = 1;
    $scope.order = 'price';

    //SET MODAL WINDOW SIZE
    var w = angular.element($window),
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x= w.innerWidth || e.clientWidth || g.clientWidth;


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


    //PAGE CHANGE FUNCTION
    $scope.pageChanged = function(){
        console.log('page changed to', $scope.displayPage);
        //SCROLL TO TOP
        $location.hash('boxContainer');

        // call $anchorScroll()
        $anchorScroll();
    };

    //MODAL RESIZE
    $scope.modalSize = function(){
        if(x>767){
            return 'md';
        }else{
            return 'sm'
        }
    };

    //TOGGLE FILTER FOR MOBILE/SMALL SCREENS
    $scope.toggle = true;

    w.bind('resize', function(){
        console.log($scope.toggle);
        console.log('resize');
        x= w.innerWidth || e.clientWidth || g.clientWidth;
        console.log('width', x);
        if(x>767){
            $scope.$apply(function(){
                $scope.toggle = true;
            })
        }

    });


    //MODAL FUNCTIONS
    $scope.open = function (item) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/viewItemModal.html',
            controller: 'ViewItemController',
            size: $scope.modalSize(),
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
        //console.log($scope.itemFilter);
        var query = {};
        for(var field in $scope.itemFilter){
            //console.log(field);
            query[field] = [];
            for (var term in $scope.itemFilter[field]){
                if($scope.itemFilter[field][term]){
                    query[field].push(term);
                }
            }
        }

        for(field in query){
            //console.log(field);
            $scope.query=false;
            for (var i = 0; i<query[field].length; i++){
                if(query[field][i]){
                    $scope.query=true;
                    //console.log('found one!');
                    break;
                }
            }
            //console.log('results', $scope.query);
        }

        if($scope.query){
            $scope.dataService.queryItems(query).then(function(){
                $scope.items = $scope.dataService.saleItems();
                //console.log($scope.items);
            });
        }else{
            $scope.updateSaleData();
        }

    };


    //SEARCH ITEMS USING SEARCH BAR
    $scope.searchItems = function(){
        console.log($scope.search);
        if($scope.search){
            $scope.dataService.searchItems($scope.search).then(function(){
                $scope.items = $scope.dataService.saleItems();
                console.log($scope.items);
            });
        }else{
            $scope.updateSaleData();
        }
        $scope.search = '';
    };


}]);


myApp.controller('ViewItemController', ["$scope", "$http", "$uibModalInstance", "DataService", "item", function ($scope, $http, $uibModalInstance, DataService, item) {

    $scope.item = item;
    $scope.user = {};
    $scope.dataService = DataService;

    //FINDS USER SELLING THE ITEM
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
