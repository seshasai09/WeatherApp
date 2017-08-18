/**
 * Created by seshasai on 22/07/2017.
 */

var mongoose = require('mongoose');
module.exports = function(){
    var UserSchema= mongoose.Schema({
        _id : String,
        username: String,
        password: String,
        email:String,
    },{collection:'Users'});
    return UserSchema;
}
