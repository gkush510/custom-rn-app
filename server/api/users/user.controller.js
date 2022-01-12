const {create,getUserByUserEmail,getUserByUserId,getUsers,updateUser,deleteUser} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign }  = require("jsonwebtoken");
const constants = require('../../utils/constants');
const helper    = require('../../utils/helper');

const createUser = (req, res) => {
  const body = req.body;
  // console.log(".req ",req );
  // return res.status(500).json({
  //   success: 0,
  //   message: "Database connection errror",
  //   data:body
  // });

  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  console.log("body.password ",body.password );
  create(body, (err, results) => {
    if (err) {
      console.log("err.sqlMessage",err.sqlMessage);
      //console.log(err);
      //let errors = helper.stringToObj(err);
      //console.log(errors);
      return res.status(500).json({
        success: 0,
        message: err.sqlMessage
      });
    }
    return res.status(200).json({
      success: 1,
      data: results
    });
  });
}
const login = (req, res) => {
  const body = req.body;
  getUserByUserEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, constants.JWT_KEY, {
        expiresIn: "1h"
      });
      return res.json({
        success: 1,
        message: "login successfully",
        token: jsontoken
      });
    } else {
      return res.json({
        success: 0,
        data: "Invalid email or password"
      });
    }
  });
}

const getUserByUserIdAction = (req, res) => {
  const id = req.params.id;
  getUserByUserId(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    results.password = undefined;
    return res.json({
      success: 1,
      data: results
    });
  });
}

const getUsersAction = (req, res) => {
  console.log("getUsersAction token value ",req.decoded.result);
  let {id} = req.decoded.result;
  getUsers(id,(err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      data: results
    });
  });
}

const updateUsersAction = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  updateUser(body, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      message: "updated successfully"
    });
  });
}

const deleteUserAction = (req, res) => {
  const data = req.body;
  deleteUser(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record Not Found"
      });
    }
    return res.json({
      success: 1,
      message: "user deleted successfully"
    });
  });
}


module.exports = {
  createUser:createUser,
  login:login,
  getUserByUserId:getUserByUserIdAction,
  getUsers:getUsersAction,
  updateUsers:updateUsersAction,
  deleteUser:deleteUserAction 
};
