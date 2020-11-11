const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("Connected succesfully to the database"))
.catch((error) => console.log("An error just occurred"));