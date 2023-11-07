const bcrypt = require('bcrypt');

// generate hashed password when sign up
function generateHashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

module.exports = {
    generateHashPassword
};
  