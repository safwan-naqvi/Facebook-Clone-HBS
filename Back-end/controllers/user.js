const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      user_name,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid Email Format" });

    //check if already exist or not
    const checkDB = await User.findOne({ email });
    if (checkDB) {
      return res
        .status(400)
        .json({ message: "Email Already Exists, Try Another Email" });
    }

    //check length of
    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "First name must be between 3 to 30 characters" });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 3 to 30 characters" });
    }

    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "Password must be between 3 to 30 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    console.log(cryptedPassword);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      user_name: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    ); //passsing user id that is recently saved to verify

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.user_name,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "Registerated Successfully! Please Activate your email to start using Talentify",
    });

    // res.json(user);
  } catch (error) {
    res.status(500).json({
      //Error 500 Means Server Internal Error
      message: error.message,
    });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Your entered email not connected with Talentify, do register",
      });
    }

    const checkPassord = await bcrypt.compare(password, user.password);
    if (!checkPassord) {
      return res.status(400).json({
        message: "Invalid Credentials, try again",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.user_name,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Logged In Successfully!",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.auth = (req, res) => {
  res.json("Authentication Successfull!");
};
