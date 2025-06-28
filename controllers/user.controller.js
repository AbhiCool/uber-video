const blacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");

const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    console.log(req.body);
    const { fullname, email, password } = req.body;

    console.log(userModel);
    const hashedPassword = await userModel.hashPassword(password);

    const newUser = new userModel({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    console.log("user", user);
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await user.generateAuthToken();

    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      messsage: "logged in successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    res.clearCookie("token");

    await blacklistTokenModel.create({ token });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
