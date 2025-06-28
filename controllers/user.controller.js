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
    console.log(error);
  }
};
