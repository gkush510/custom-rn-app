const jwt = require("jsonwebtoken");
const constants = require('../utils/constants');

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, constants.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        console.log("token data value ", decoded.result)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}


const checkAdminToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, constants.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        let { role } = decoded.result;
        if (role != "admin") {
          return res.json({
            success: 0,
            message: "Access Denied! You are not allow to perform this action"
          });
        }
        console.log("token data value ", decoded.result)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}

const checkCustomerToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, constants.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        let { role } = decoded.result;
        if (role != "admin") {
          return res.json({
            success: 0,
            message: "Access Denied! You are not allow to perform this action"
          });
        }
        console.log("token data value ", decoded.result)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}

module.exports = {
  checkToken: checkToken,
  checkAdminToken: checkAdminToken,
  checkCustomerToken: checkCustomerToken,
};
