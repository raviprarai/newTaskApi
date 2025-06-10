
const Joi = require("joi");

const usertSignUp = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name must not exceed 50 characters',
        }),

    mobileNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must be 10 digits',
            'string.empty': 'Mobile number is required',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required',
        }),

    password: Joi.string()
        .min(4)
        .max(32)
        .required()
        .messages({
            'string.min': 'Password must be at least 4 characters',
            'string.max': 'Password must not exceed 32 characters',
            'string.empty': 'Password is required',
        }),

    age: Joi.number()
        .integer()
        .min(8)
        .max(100)
        .required()
        .messages({
            'number.base': 'Age must be a number',
            'number.min': 'Age must be at least 8',
            'number.max': 'Age must be less than 100',
            'any.required': 'Age is required',
        }),

    gender: Joi.string()
        .valid('Male', 'Female', 'Other')
        .required()
        .messages({
            'any.only': 'Gender must be Male, Female, or Other',
            'string.empty': 'Gender is required',
        }),

    country: Joi.string()
        .min(2)
        .max(56)
        .required()
        .messages({
            'string.empty': 'Country is required',
        }),

    state: Joi.string()
        .min(2)
        .max(56)
        .required()
        .messages({
            'string.empty': 'State is required',
        }),
});
const userLogin = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().required()
});

const productValidation = Joi.object({
    productName: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).required(),
    price: Joi.number().min(0).required(),
    imageUrl: Joi.string().uri(),  
});
module.exports = {
    usertSignUp, userLogin,productValidation
};