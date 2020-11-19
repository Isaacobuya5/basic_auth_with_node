const User = require("../model/User");
const { sendMailOtp } = require("../utils/helper");

const registerUser = async (req, res) => {
  // const user = new User(req.body);
  const { username, password } = req.newUser;
  const { email } = req.body;
  const user = new User({ email, username, password });
  try {
    const { _id,username, email, account_status } = await user.save();

    // send verfication code to email
      // send email to the new user
      sendMailOtp(email);
    res.status(201).send({ id: _id, email, account_status });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const loginUser =  (req, res) => {
    // generate the token for login
    try {
    if (!req.user) {
        throw new Error("An error just occured");
    }

    if (req.session && req.session.user) {
        console.log(req.session.user);
    }
    res.status(200).send(req.user);
} catch (error) {
    res.status(500).send(error);
    console.log(error);
}
}

module.exports = {
  registerUser,
  loginUser
};
