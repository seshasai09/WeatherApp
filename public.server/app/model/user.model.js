/**
 * Created by seshasai on 22/07/2017.
 */

var mongoose = require('mongoose');
module.exports=function(db){

    var UserSchema = require('./user.schema.js')();
    var UserSearchSchema = require('./user.search.schema.js')();
    var User =  mongoose.model('User',UserSchema)
    var UserSearch = mongoose.model('UserSearch',UserSearchSchema);

    var api = {
        register : register,
        findUserByUserName : findUserByUserName,
        userPreviousSearchs : userPreviousSearchs,
        saveUserSearchQuery : saveUserSearchQuery

    }
    return api;

    function register(newUser){
        u = {
            _id: newUser.username,
            username: newUser.username,
            password : newUser.password,
            email : newUser.email

        }
       return  User.create(u,function(err,user){
            if(!err){
                return user;
            }else{
                return null;
            }
        });

    }

    function findUserByUserName(userName){
        return User.findOne({_id:userName});
    }

    function saveUserSearchQuery(query){
        searchQuery = {
            username: query.username,
            latitude: query.latitude,
            longitude: query.longitude,
            pincode: query.pincode,
            date: new Date()
        }
        return UserSearch.create(searchQuery,function(err,obj){
            if(!err){
                console.log("data inserted");
                return obj;
            }else{
                console.log(err);
                return null;
            }
        });
    }

    function userPreviousSearchs(userName){
        return UserSearch.find({username:userName});
    }


}
