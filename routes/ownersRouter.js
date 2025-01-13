const express = require('express');
const router = express.Router();
const env = require('dotenv');

const ownerModel = require('../models/owner-model')
const productModel = require('../models/product-model')
const upload = require('../config/multerconfig')

env.config();

router.get("/", (req,res)=>{
    res.send("HI owners");
})


if( process.env.NODE_ENV === "development" ){
    router.post("/create", async (req,res) => {
        let owners = await ownerModel.find();
        if( owners.length > 0 ){
            res.status(504).send("You don't have permission to create new owner")
        }
        else{
            let createdowner = await ownerModel.create({
                fullname: req.body.fullname,
                email : req.body.email ,
                password : req.body.password,
            })
            res.send(createdowner)
        }
    })
}

router.get('/admin', (req,res)=>{
    res.render("create")
})

router.post('/admin', upload.single("image"), async (req,res)=>{

    try{
        let product = await productModel.create({

            image: req.file.buffer,
            name: req.body.name,
            price: req.body.price,
            discount : req.body.discount,
            gender : req.body.gender,
            category : req.body.category,
            bgcolor: req.body.bgcolor,
            panelcolor: req.body.panelcolor,
            textcolor: req.body.textcolor,
        })
        res.redirect("/owners/admin");
    }
    catch(err){
        res.send(err.message);
    }
})

router.post('/delete', async (req,res)=>{

    try{
        let product = await productModel.findOneAndDelete({_id : req.body.id })
        res.redirect("/owners/admin");
    }
    catch(err){
        res.send(err.message);
    }
})


module.exports = router;

