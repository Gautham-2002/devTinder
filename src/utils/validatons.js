var validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("first name and last name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough");
  }
};

module.exports = { validateSignUpData };
