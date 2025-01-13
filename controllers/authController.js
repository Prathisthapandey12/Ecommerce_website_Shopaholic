const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('../models/user-model')
const {generateToken} = require('../utils/generateToken')


module.exports.registerUser = async function (req,res){
    try{
        let user = await userModel.findOne({email : req.body.email})
        if(user){
            res.redirect("/login");
        }
        else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    let user = await userModel.create({
                        fullname: req.body.fullname,
                        password: hash,
                        email: req.body.email,
                    })
                    let token =  generateToken(user)
                    res.cookie("token",token);
                    res.redirect("/");
                });
            });
        }
    }
    catch(err){
       res.send(err.message)
    }
}

module.exports.loginUser = async function (req,res){
    try{
         
        let user = await userModel.findOne({email : req.body.email})
        if( !user ){
           res.send("Email or password is incorrect")
        }
        else{
            bcrypt.compare(req.body.password,user.password, function(err,result){
                if(result)
                { 
                    let token = generateToken(user)
                    res.cookie("token",token);  
                    res.redirect('/shop')
                }
                else
                    res.redirect("/login");
            });
        }
    }
    catch(err){
        res.send(err.message)
    }
}

module.exports.logoutUser = function(req,res){
    
    res.cookie("token","");
    res.redirect("/");
}