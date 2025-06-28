const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers?.authorization?.split(" ")[1] || null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const isBlacklistedToken = await blacklistTokenModel.findOne({ token });

    if (isBlacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decoded._id);

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = isAuthenticated;
