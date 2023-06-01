const express = require('express');
const session = require('express-session'); 

// Import passport && local strategy
const passport = require('passport');

const connectDB = require('./config/connectDB');
const userController = require('./controllers/user');

// requiring passport from config > passport
const initializePassport = require('./config/passport');

const app = express();
initializePassport(passport);

app.use(express.json());
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false 
}))

// Initialize passport middleware 
app.use(passport.initialize());
app.use(passport.session());



const port = 8001;
connectDB();


app.get('/', (req, res)=>{
    res.send('welcome to home page');
})

app.get('/users', userController.getUsers);

app.post('/register', userController.createUser);

app.post('/login', passport.authenticate('local', {failureFlash: true}),  userController.loginUser);

app.delete('/logout', (req, res)=>{
    req.logOut();  // This is a passport function 
    res.send('user Logged Out');
})

app.listen(port, ()=>{
    console.log('listening to port: ', port);
})