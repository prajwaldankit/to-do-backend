const bcrypt = require("bcryptjs");

const hashPassword = plainPassword => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(plainPassword, 10)
      .then(hash => {
        let result = {
          msg: "hashed Password",
          hash
        };
        return resolve(result);
      })
      .catch(err => {
        console.error(err.message);
        reject(err);
      });
  });
};

hashingFunction = async inputPassword => {
  // let hashPasswordResponse = await
  return hashPassword(inputPassword).hash;
  // console.log(hashPasswordResponse.hash);
  // return hashPasswordResponse.hash;
};

const checkPassword = (inputPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(inputPassword, hashedPassword)
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        console.error(err.message);
        return reject(err);
      });
  });
};

checkingFunction = async (inputPassword, hashedPassword) => {
  let isMatched = await checkPassword(inputPassword, hashedPassword);
  return isMatched;
};

module.exports = {
  hashingFunction,
  checkingFunction
};
