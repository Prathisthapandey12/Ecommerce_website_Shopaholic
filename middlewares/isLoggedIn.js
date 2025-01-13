const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')
const expressSession = require('express-session')

module.exports =  async function isLoggedIn(req,res,next){

    if( req.cookies.token === "" ){
       req.flash("error","You need to login first")
       res.redirect("/")
    }
    else{
        try{
            let data = jwt.verify(req.cookies.token,process.env.SECRET_TOKEN)
            let user = await userModel.findOne({email : data.email}).select("-password")
            req.user = user;
            next();
        }
        catch(err){
            req.flash("error","You need to login first")
            res.redirect("/")
        }
    }
}

