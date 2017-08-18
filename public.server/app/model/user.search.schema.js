/**
 * Created by seshasai on 23/07/2017.
 */

var mongoose = require('mongoose');
module.exports = function(){
    var UserSearchSchema= mongoose.Schema({
        username: String,
        latitude: String,
        longitude: String,
        pincode:String,
        date: Date
    },{collection:'UserSearchQuery'});
    return UserSearchSchema;
}

