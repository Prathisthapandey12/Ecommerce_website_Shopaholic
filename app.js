const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv');
const expressSession = require('express-session')
const flash = require('connect-flash')

env.config();

const databaseconnection = require('./config/mongoose-connection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const Router = require('./routes/index')


const app = express();


app.use(
    expressSession({
        resave : false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    })
)
app.use(flash());
app.use( express.json() );
app.use( express.urlencoded({extended: true}) );
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use( cookieParser() );

app.use( "/owners" , ownersRouter );
app.use( "/users" , usersRouter );
app.use( "/products" , productsRouter );
app.use("/",Router);

app.listen(3000);

