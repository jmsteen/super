const Validator = require('validator');
const validText= require('./valid-text');

module.exports = function validateArticleInput(data) {
    let errors = {};

    data.body = validText(data.body) ? data.body : '';

    if (!Validator.isLength(data.body, { min: 5, max: 100000 })) {
        errors.body = 'Article must be at least 5 characters';
    }

    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body is required';
    }
   
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};