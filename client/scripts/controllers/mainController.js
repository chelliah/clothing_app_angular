/**
 * Created by aronthomas on 11/22/15.
 */
myApp.controller('MainController', ["$scope", "$http", "$uibModal", "$window","$anchorScroll", "$location", "DataService", function($scope, $http, $uibModal, $window, $anchorScroll, $location, DataService){
    $scope.dataService = DataService;
    $scope.itemFilter = {};
    $scope.user = undefined;
    $scope.items = undefined;
    //$scope.viewItems = undefined;
    $scope.search = undefined;
    $scope.query = false;


    //INITIALIZE ITEM DISPLAY OPTIONS
    $scope.itemsPerPage = 6;
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



    //BRING IN SALE DATA
    $scope.updateSaleData = function(){
        $scope.dataService.getSaleItems().then(function(){
            $scope.items = $scope.dataService.saleItems();
            //$scope.viewItems = $filter('limitTo')($scope.items, $scope.itemsPerPage, $scope.itemsPerPage*$scope.displayPage-1);
        });
    };

    //PAGE CHANGE FUNCTION
    $scope.$watch('displayPage', function(){
        console.log('page changed to', $scope.displayPage);

        //Scroll to top
        $location.hash('boxContainer');

        // call $anchorScroll()
        $anchorScroll();

        $scope.$digest()
    });

    $scope.$watch('itemsPerPage', function(){
        console.log('items per page changed to', $scope.itemsPerPage);

        //$scope.$apply();
    });

    $scope.itemDisplayChange = function(){
        console.log('displaying items per page', $scope.itemsPerPage);
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
        x= w.innerWidth || e.clientWidth || g.clientWidth;

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

        //IF STATEMENT CHECKS IF QUERY
        if($scope.query){
            $scope.dataService.queryItems(query).then(function(){
                $scope.items = $scope.dataService.saleItems();
            });
        }else{
            $scope.updateSaleData();
        }

    };

    //SEARCH ITEMS USING SEARCH BAR
    $scope.searchItems = function(){
        //console.log($scope.search);
        if($scope.search){
            $scope.dataService.searchItems($scope.search).then(function(){
                $scope.items = $scope.dataService.saleItems();
                //console.log($scope.items);
            });
        }else{
            $scope.updateSaleData();
        }
        $scope.search = '';
    };

    //$scope.$watch('displayPage', function(){
    //    console.log('hey the display page changed');
    //    $scope.viewItems = $filter('limitTo')($scope.items, $scope.itemsPerPage, $scope.itemsPerPage*$scope.displayPage-1);
    //    //$scope.$apply();
    //});

    //CHECKS SALE ITEMS
    if($scope.dataService.saleItems() === undefined){
        console.log('sale items undefined');
        $scope.updateSaleData();
    }else{
        console.log('items defined retrieving now');
        $scope.items = $scope.dataService.saleItems();
    }

    //CHECKS USER DATA
    if($scope.dataService.peopleData() === undefined){
        $scope.updateUserData();
    }else{
        $scope.user = $scope.dataService.peopleData();
    }


}]);


myApp.controller('ViewItemController', ["$scope", "$http", "$uibModalInstance", "DataService", "item", function ($scope, $http, $uibModalInstance, DataService, item) {

    $scope.item = item;
    $scope.user = {};
    $scope.dataService = DataService;
    $scope.showEmail = false;

    $scope.composeEmail = {};


    //FINDS USER SELLING THE ITEM
    $scope.findUser = function(){
        return $http.get('/user/seller', {params: {id: item.user_id}}).then(function(response){
            console.log("the seller", response);
            $scope.user = response.data[0];
            $scope.generateEmail();

        })
    };

    $scope.generateEmail = function(){
        $scope.composeEmail.to = $scope.user.email;
        $scope.composeEmail.subject = "Interest in purchasing " + item.name + " on clothing website Fuschia";
        $scope.composeEmail.body = "Hi! I am interested in purchasing the "  + item.name + " you listed on the clothing website Fuschia";
    };

    $scope.toggleEmail = function () {
        console.log($scope.user);
        $scope.showEmail = !$scope.showEmail;
        //$uibModalInstance.close('submitted');
    };

    $scope.sendEmail = function(){
        $http.post('/email', $scope.composeEmail).then(function(response){
            console.log(response);
            $uibModalInstance.close('submitted');
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.findUser();
}]);
