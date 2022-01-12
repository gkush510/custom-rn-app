const pool = require('../../db-connection');
const constants = require('../../utils/constants');

const create = (data, callBack) => {
  pool.query(
    `insert into users(username, first_name, last_name, gender, email, password, phone_number,role,status) 
              values(?,?,?,?,?,?,?,?,?)`,
    [
      data.username,
      data.first_name,
      data.last_name,
      data.gender,
      data.email,
      data.password,
      data.phone_number,
      data.role,
      data.status
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

const getUserByUserId = (id, callBack) => {
  pool.query(
    `select id,firstName,lastName,gender,email,number from users where id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

const getUserByUserEmail = (email, callBack) => {
  pool.query(
    `select * from users where email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

const getUsers = (id,callBack) => {
  pool.query(
    `select * from users where id NOT IN (${id})`,
    [],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

const updateUser = (data, callBack) => {
  pool.query(
    `update users set first_name=?, last_name=?, gender=?, phone_number=? where id = ?`,
    [
      data.first_name,
      data.last_name,
      data.gender,
      data.phone_number,
      data.id
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

const deleteUser = (data, callBack) => {
  pool.query(
    `delete from users where id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

module.exports = {
  create: create,
  getUserByUserEmail: getUserByUserEmail,
  getUserByUserId: getUserByUserId,
  getUsers: getUsers,
  updateUser: updateUser,
  deleteUser: deleteUser 
};
