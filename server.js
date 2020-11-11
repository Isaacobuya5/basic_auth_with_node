const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");

require('dotenv').config();

const auth = require('./src/middleware/auth');
require("./src/db/mongoose");

// routes
const User = require("./src/router/User");

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api", User);

// app.post('/register', (req, res) => {
//     if (!req.body) {
//         res.satusCode = 401;
//         throw new Error("No data supplied")
//     }
//     res.statusCode = 201;
//     res.send({...req.body})
// })

// attach the middleware to any request before accessing the routes
// app.use(auth);
// secret code for members who are authenticated
// app.get('/secret', (req, res) => {
//     res.statusCode = 201;
//     res.send({username: 'Isaac', password: 'qwerty12345'});
// });

// app.post('/login', (req, res) => {

//     res.statusCode = 201;
//     res.send({username: 'Isaac', password: 'qwerty12345'});
// });



server.listen(port,() => console.log(`Server is running on port ${port}`));
