const joi = require('joi')
const mongoose = require('mongoose');


const User = mongoose.model("Users", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:5
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}));

function validate(user) {
    const schema = {
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).required().email(),
        password:joi.string().min(5).required()
    }
    return joi.validate(user, schema);
}


exports.User = User;
exports.validate = validate;