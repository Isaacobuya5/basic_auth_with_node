const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        trim: true,
        type: String
    },
    lastName: {
        required: true,
        trim: true,
        type: String
    },
    username: {
        required: true,
        trim: true,
        unique: true,
        type: String
    },
    dob: {
        required: true,
        trim: true,
        type: String
    },
    password: {
        required: true,
        trim: true,
        type: String
    }
});

// hash password before storing it to db
userSchema.pre("save", async function(next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


// searching for user by username and password
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    // if email does not exist means invalid user
    if (!user) {
      throw new Error({ error: "Invalid login credentials" });
    }
    // checking password agains encrypted password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error({ error: "Invalid login credentials" });
    }
    // return user if valid
    return user;
  };


const User = mongoose.model('User', userSchema);
module.exports = User;