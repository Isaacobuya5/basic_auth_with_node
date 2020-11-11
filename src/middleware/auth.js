const User = require("../model/User");

async function auth (req, res, next) {
    // get the Authorization header
    let authHeader = req.headers.authorization;

    // respond with 401 status code and WWW-Authenticate Basic header when request from client has no Authorization header
    if (!authHeader) {

        let err = new Error('You are not authenticated');

        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err)
    }

    // continue to check Authorization header to see if it has a username and password
    // and check the usernames and passwords against the expected ones
   let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
   let username = auth[0];
   let password = auth[1];


   // database checking logic
   const user = await User.findByCredentials(username, password);
   if(user) {
       req.user = user;
       next();
   } else {
       let err = new Error('You are not authenticated');

       res.setHeader('WWW-Authenticate', 'Basic');
       err.status = 401
       next(err);
   }
}

module.exports = auth;