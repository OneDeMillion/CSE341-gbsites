const { check } = require('express-validator');

exports.museumValidation = [
    check('museumName', 'Name is Required')
        .not()
        .isEmpty()
        .trim(),
    check('streetAddr')
        .trim(),
    check('cityAddr', 'City Address is Required')
        .not()
        .isEmpty()
        .trim(),
    check('postcode')
        .trim(),
    check('phoneNum')
        .isNumeric()
        .trim()
]

exports.castleValidation = [
    check('castleName', 'Name is Required')
        .not()
        .isEmpty()
        .trim(),
    check('cityAddr', 'City Address is Required')
        .not()
        .isEmpty()
        .trim(),
    check('phoneNum')
        .isNumeric()
        .trim()
]


