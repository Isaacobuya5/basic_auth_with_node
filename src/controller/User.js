const User = require("../model/User");

const registerUser = async (req, res) => {
  // const user = new User(req.body);
  const { firstName, lastName, username, dob, password } = req.body;
  const user = new User({ firstName, lastName, username, dob, password });
  try {
    const newUser = await user.save();
    res.status(201).send({ newUser });
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
    res.status(200).send(req.user);
} catch (error) {
    res.status(500).send(error);
}
}

module.exports = {
  registerUser,
  loginUser
};
