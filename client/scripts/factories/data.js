myApp.factory('DataService', ['$http', function($http){
    //some var to store the data
    //method of actually retrieving th edata
    //PUBLIC DATA public api to interface with the factory
    // -- execute the method of actually getting the data
    // - create a getter to return the data that is being stored in the var

    var user = undefined;

    var types = [
        {
            name: 'Tops',
            list: ["Sweatshirts", "Jackets/Coats", 'Shirts', 'T-Shirts', 'Blouses', 'Sweaters/Cardigans']
        },
        {
            name: 'Bottoms',
            list: ['Jeans', 'Pants', 'Shorts', 'Skirts']
        },
        {
            name: 'Shoes',
            list: ['Boots', 'Sneakers/Athletic', 'Heels', 'Flats', 'Sandals', 'Dress Shoes']
        },
        {
            name: 'Other',
            list: ['Dresses', 'Suits', 'Accessories', 'Other']
        }
    ];

    var sizes = [
        {
            name: "General",
            list: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
        },
        {
            name: "Women's",
            list: ['00','0','2','4','6','8','10','12','14','16','18','20']
        },
        {
            name: "Men's Suits",
            list: ['34','36','38','40','42','44','46','48']
        },
        {
            name: "Men's Pants",
            list: ['28x30','30x30','32x30','34x30','36x30','38x30', '40x30', '28x32','30x32','32x32','34x32','36x32','38x32', '40x32', '28x34','30x34','32x34','34x34','36x34','38x34', '40x34']
        },
        {
            name: "Shoes",
            list: ['5','6','7','8','9','10','11','12','13','14']
        },
        {
            name: "Other",
            list: ['One Size', 'N/A', 'Other']
        }
    ];



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
        },
        typeData:  function(){
            return types;
        },
        sizeData: function(){
            return sizes;
        }
    };

    return publicApi;
}]);