/**
 * Created by seshasai on 21/07/2017.
 */

module.exports = function(app,userModel){

    app.post("/api/skycast/signup",register);
    app.post("/api/skycast/login",login);
    app.get("/api/skycast/loggedin",loggedin);
    app.get("/api/skycast/user/previoussearches/:username",userPreviousSearchs)
    app.get("/api/skycast/logout",logout);
    app.post("/api/skycast/usersearchquery",saveUserSearchQuery);


    function register(req,res){
        var new_user = req.body;
        userModel.findUserByUserName(new_user.username)
            .then(function(user){
                if(user) {
                    return res.status(400).send(null);
                }else{

                    userModel.register(new_user)
                        .then(function(user){
                            if(user!=null || user!=undefined) {
                                return res.status(200).send(user);
                            }else{
                                return res.status(500).send(null);
                            }
                        });
                }
            },function(err){
               return  res.status(500).send(err);
            })

    }
    function login(req,res){
        authenticateUser =req.body
        userModel.findUserByUserName(authenticateUser.username)
            .then(function(user){
                if(user!=null || user!=undefined) {
                    if (user.password == authenticateUser.password) {
                         req.session.currentUser=user;
                       //  res.json(user);
                         res.status(200).send(user);
                    } else {
                         res.status(400).send(null);
                    }
                }else{
                     res.status(400).send(null);
                }
            },function(error){
                res.status(400).send();
            });

    }
    function loggedin(req,res){
        if(req.session.currentUser !=null ||req.session.currentUser !=undefined ){
        return res.status(200).send(req.session.currentUser);
        }else{
            return res.status(200).send(null);
        }

    }
    function logout(req,res){
        req.session.destroy();
        return res.status(200);
    }

    function userPreviousSearchs(req,res){
        userName = req.params["username"];
        userModel.userPreviousSearchs(userName)
            .then(function(response){
                res.status(200).send(response);
            },function(err){
                res.status(400).send();
            });
    }

    function saveUserSearchQuery(req,res){
        userModel.saveUserSearchQuery(req.body)
            .then(function(response){
                return res.status(200);
            },function(err){
                return res.status(400);
            });

    }
}
