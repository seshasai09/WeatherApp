/**
 * Created by seshasai on 21/07/2017.
 */

module.exports = function(app,db){
    var userModel = require('./model/user.model.js')(db);
    var userService = require('./service/user.service.server.js')(app,userModel);
}
