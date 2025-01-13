const express = require('express')

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn')
const productModel = require('../models/product-model')
const userModel = require('../models/user-model')


router.get('/',(req,res)=>{
    res.render("index");
})

router.get('/shop', isLoggedIn , async function(req,res){
    
    let products = []
    if( req.query.category && req.query.category != "All"){
        products = await productModel.find({category : req.query.category})
        res.render("shop", {products : products})
    }
    else if( req.query.price && req.query.price != "None" ){
        products = await productModel.find({price : { $lt: Number(req.query.price) } }).sort({price: 1})
        res.render("shop", {products : products})
    }
    else if( req.query.discount  && req.query.discount != "None"  ){
        const d = Number(req.query.discount)
        products = await productModel.find({ discount : { $gt: d } }).sort({ discount: 1 })
        res.render("shop", {products : products})
    }
    else if( req.query.gender  && req.query.gender != "None"  ){
        products = await productModel.find({ gender : req.query.gender }).sort({name : 1})
        res.render("shop", {products : products})
    }
    else{
        products = await productModel.find().sort({name : 1})
        res.render("shop", {products : products})
    }
})


router.get('/cart', isLoggedIn , async function(req,res){
    
    let user = await userModel.findOne({email: req.user.email}).populate("cart")
    res.render("cart", {user : user})
})


router.get('/addtocart/:productid', isLoggedIn, async function(req,res){

    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productid)
    await user.save();
    res.redirect('/shop')
})

router.get('/placeorderbycart/:productid' , isLoggedIn , async function(req,res){

    let user = await userModel.findOne({email: req.user.email})
    let index = user.cart.indexOf(req.params.productid);
    user.cart.splice(index, 1);
    user.orders.push(req.params.productid)
    await user.save();
    res.redirect('/cart')
})
router.get('/placeorder/:productid' , isLoggedIn , async function(req,res){

    let user = await userModel.findOne({email: req.user.email})
    user.orders.push(req.params.productid)
    await user.save();
    res.redirect('/vieworders')
})

router.get('/removefromcart/:productid' , isLoggedIn , async function(req,res){

    let user = await userModel.findOne({email: req.user.email})
    let index = user.cart.indexOf(req.params.productid)
    user.cart.splice(index,1)
    await user.save();
    res.redirect('/cart')

})



router.get('/vieworders', isLoggedIn, async function(req,res){
    let user = await userModel.findOne({email: req.user.email}).populate("orders")
    res.render("order",{user:user})

})

router.get('/removeorder/:productid' , isLoggedIn , async function(req,res){

    let user = await userModel.findOne({email: req.user.email})
    let index = user.orders.indexOf(req.params.productid)
    user.orders.splice(index,1)
    await user.save();
    res.redirect('/vieworders')

})

router.get( '/show/:productid' , isLoggedIn , async function(req,res){
   
    var product = await productModel.findOne({ _id : req.params.productid })
    res.render("product",{product : product})
})

router.post( '/search' , isLoggedIn , async function(req,res){

    var input = req.body.textgiven
    const words = input.split(/\s+/).filter(word => word.length > 0);
    console.log(words);
    var products = await productModel.find({ category : words[0] , gender : words[2] })
    res.render("shop",{products : products})
} )

module.exports = router;