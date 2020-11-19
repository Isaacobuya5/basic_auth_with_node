const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        trim: true,
        type: String
    },
    lastName: {
        trim: true,
        type: String
    },
    username: {
        trim: true,
        type: String
    },
    email: {
        trim: true,
        unique: true,
        type: String
    },
    dob: {
        trim: true,
        type: String
    },
    password: {
        trim: true,
        type: String
    },
    account_status: {
        type: Boolean,
        default: false
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
        return null;
    }
    // checking password agains encrypted password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error({ error: "Invalid login credentials" });
    }
    // return user if valid
    console.log(user);
    return user;
  };


const User = mongoose.model('User', userSchema);
module.exports = User;