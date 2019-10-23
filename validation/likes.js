const Validator = require('validator');

module.exports = function validateArticleInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.user)) {
    errors.body = 'User is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};