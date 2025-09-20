const { body, validationResult } = require('express-validator');

// Validation rules for user data
const userValidationRules = [
    body('firstName').custom(value => {
        if(!value) {
            return Promise.reject('First name cannot be empty.')
        
        } else if(!/^[A-Za-z]{2,}$/.test(value)) {
            return Promise.reject('First name must contain 2 letters, no spaces or special characters.')
        }
    }).notEmpty(),

    body('lastName').custom(value => {
        if(!value) {
            return Promise.reject('Last name cannot be empty.')
        
        } else if(!/^[A-Za-z]{2,}$/.test(value)) {
            return Promise.reject('Last name must contain 2 letters, no spaces or special characters.')
        }
    }).notEmpty(),

    body('email').isEmail().withMessage('Invalid email format.').notEmpty(),

    body('age').isInt({ min: 0, max: 120}).withMessage('Age must be a whole number between 0 and 120').notEmpty(),

    body('city').custom(value => {
        if(!value) {
            return Promise.reject('City cannot be empty.')
        
        } else if(!/^[A-Za-z]{2,}$/.test(value)) {
            return Promise.reject('City must contain 2 letters, no spaces or special characters.')
        }
    }).notEmpty()
]

async function validateUser(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

// Validation rules for image data
const imageValidationRule = [
    body('base64img').custom(value => {
        if(!value) {
            return Promise.reject('Image data cannot be empty.')

        } else if(!/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/=]+$/.test(value)) {
            return Promise.reject('Invalid image format. Please upload a PNG, JPG, JPEG, or GIF image.')
        }
    }).notEmpty(),

    body('title').custom(value => {
        if(!value) {
            return Promise.reject('Title cannot be empty.')
        
        } else if(!/^[A-Za-z0-9\s.,:;'"!?@#&()\-]{2,}$/.test(value)) {
            return Promise.reject('Title must contain 2 characters')
        }
    }).notEmpty(),

    body('description').custom(value => {
        if(!value) {
            return Promise.reject('Description cannot be empty.')
        
        } else if(!/^[A-Za-z0-9\s.,:;'"!?@#&()\-]{2,}$/.test(value)) {
            return Promise.reject('Description must contain 2 characters')
        }
    }).notEmpty(),

    body('owner').custom(value => {
        if(!value) {
            return Promise.reject('Owner cannot be empty.')
        
        } else if(!/^[A-Za-z\s]{2,}$/.test(value)) {
            return Promise.reject('Owner must contain 2 letters, no spaces or special characters.')
        }
    }).notEmpty(),

    body('ownerContact').isEmail().withMessage('Owner contact must be a valid email address.').notEmpty(),

    body('dateCreated').custom(value => {
        if(!value) {
            return Promise.reject('Birthday cannot be empty.')
        
        } else if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return Promise.reject('The date of the picture must be in the format YYYY-MM-DD.')
        }
    }).notEmpty(),

    body('location').custom(value => {
        if(!value) {
            return Promise.reject('Location cannot be empty.')
        
        } else if(!/^[A-Za-z]{2,}$/.test(value)) {
            return Promise.reject('Location must contain 2 letters, no spaces or special characters.')
        }
    }).notEmpty()
]

async function validateImage(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = { userValidationRules, imageValidationRule, validateUser, validateImage };