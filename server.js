const http = require('http');
const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const auth = require('./src/middleware/auth');

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));

const server = http.createServer(app);

app.get('/', (req, res) => res.send({ message: 'Server running succesfully'}));

// attach the middleware to any request before accessing the routes
app.use(auth);
// secret code for members who are authenticated
app.get('/secret', (req, res) => {
    res.statusCode = 200;
    res.end("******")
});

server.listen(port,() => console.log(`Server is running on port ${port}`));
