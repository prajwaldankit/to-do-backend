const bcrypt = require("bcryptjs");

hashPassword = plainPassword => {
  return bcrypt
    .hash(plainPassword, 10)
    .then(hash => {
      let result = {
        msg: "hashed Password",
        hash
      };
      return Promise.resolve(result);
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
      console.error(err.message);
      return Promise.reject(err);
    });
};

module.exports = { hashPassword, checkPassword };
