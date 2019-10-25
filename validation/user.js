const Validator = require("validator");
const validText = require("./valid-text");
const User = require("../models/User");


module.exports = function validateProfileEditInput(data) {
  let errors = {};

  data.handle = validText(data.handle) ? data.handle : "";;

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle cannot be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
