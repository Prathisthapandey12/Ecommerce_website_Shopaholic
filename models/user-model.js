const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "product"
        }
    ],
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "product"
        }
    ],
    contact : Number,
    picture : String
})

module.exports = mongoose.model("user",userSchema)