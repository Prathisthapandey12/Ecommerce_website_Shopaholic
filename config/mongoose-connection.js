const mongoose = require('mongoose');
const config = require('config')
const dbgr = require('debug')("development:mongoose")

const URI = `${config.get("MONGODB_URI")}`

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("MongoDB connection error:", error));


module.exports = mongoose.connection;