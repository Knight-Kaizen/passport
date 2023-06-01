const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userDetailCollection = require('../models/userModel');


function initialize(passport) {
    const authenticateUser = async (email, password, done) => {

        console.log('In authenticate user', email, password);
        try {
            const user = await userDetailCollection.find({email});
            console.log('user found: ', user);
            
            if (user.length == 0) {
                return done(null, false, { message: 'No user with that email' });
            }
            else if (await bcrypt.compare(password, user[0].password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Password did not match' });
            }

        }
        catch (err) {
            console.log('error here', err);
            return done(err);
        }


    }
    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser))

    passport.serializeUser((user, done) => done(null, user[0]._id));
    passport.deserializeUser((id, done) => done(null, userDetailCollection.find({_id: id})));
}

module.exports = initialize;
