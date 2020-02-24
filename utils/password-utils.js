const bcrypt = require("bcryptjs");

hashPassword = plainPassword => {
  return bcrypt
    .hash(plainPassword, 10)
    .then(hash => {
      return Promise.resolve(hash);
    })
    .catch(err => {
      console.error(err.message);
      return Promise.reject(err);
    });
};

checkPassword = (inputPassword, hashedPassword) => {
  return bcrypt
    .compare(inputPassword, hashedPassword)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      console.error("no match password", err.message);
      return Promise.reject("The password doesn't match. try again");
    });
};

module.exports = { hashPassword, checkPassword };
