myApp.factory('DataService', ['$http', function($http){
    //some var to store the data
    //method of actually retrieving th edata
    //PUBLIC DATA public api to interface with the factory
    // -- execute the method of actually getting the data
    // - create a getter to return the data that is being stored in the var

    var user = undefined;

    //PRIVATE
    var getUserData = function(){
        return $http.get('/user').then(function(response){
            user = response.data;
            console.log("Async Data Response: ", user);
            return response.data;
            //return response.data.people;
        });
    };

    //PUBLIC
    var publicApi = {
        retrieveData: function(){
            return getUserData();
        },
        peopleData: function(){
            return user;
        }
    };

    return publicApi;
}]);