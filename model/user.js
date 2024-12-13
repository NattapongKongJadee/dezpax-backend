const bcrypt = require("bcryptjs");

let users = [];

const addUser = async (email, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashPassword };
  users.push(user);
  return user;
};

const findUserByEmail = (email) => users.find((user) => user.email === email);

module.exports = { addUser, findUserByEmail, users };
