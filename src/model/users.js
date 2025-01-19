const Pool = require("../config/db");

//POST USERS
const createUsers = (data) => {
  const { user_id, user_email, user_password, user_name, user_phone } = data;
  return Pool.query(`INSERT INTO users(user_id, user_email, user_password, user_name, user_phone) 
    VALUES ('${user_id}','${user_email}','${user_password}','${user_name}','${user_phone}')`);
};

//DELETE USERS
const deleteUsers = (user_id) => {
  return Pool.query(`DELETE FROM users WHERE user_id = '${user_id}'`);
};

//PATCH UPDATE USERS
const updateUsers = (data) => {
  const { user_id, user_name, user_phone, user_photo } = data;
  const updates = [];

  if (user_name) updates.push(`user_name = '${user_name}'`);
  if (user_phone) updates.push(`user_phone = '${user_phone}'`);
  if (user_photo) updates.push(`user_photo = '${user_photo}'`);

  const setClause = updates.join(", ");

  return Pool.query(
    `UPDATE users SET ${setClause} WHERE user_id = '${user_id}'`
  );
};

//PUT UPDATE PASSWORD
const updatePasswordUsers = (data) => {
  const { user_id, user_password } = data;
  return Pool.query(
    `UPDATE users SET user_password = '${user_password}' WHERE user_id = '${user_id}'`
  );
};

//FIND ID
const findID = (user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE user_id= '${user_id}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

//FIND EMAIL
const findEmail = (user_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE user_email= '${user_email}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  deleteUsers,
  createUsers,
  updateUsers,
  updatePasswordUsers,
  findID,
  findEmail,
};
