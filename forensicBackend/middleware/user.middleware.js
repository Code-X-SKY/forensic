const { body, check } = require("express-validator");

exports.loginSchema = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
];

exports.loginWithGoogleSchema = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
];

exports.sendOTPSchema = [
    check("mobile_no")
        .not()
        .isEmpty()
        .withMessage("Mobile no. is required"),
];

exports.registerSchema = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email ID"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be atleast six character!"),
    check("confirm_password")
        .not()
        .isEmpty()
        .withMessage("Confirm password is required")
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password and confirm password does not match')
];

exports.customerRegisterSchema = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email ID"),
    check("username")
        .not()
        .isEmpty()
        .withMessage("Username is required"),
    check("mobile_number")
        .not()
        .isEmpty()
        .withMessage("Mobile number is required")
];

exports.ForgotPasswordSchema = [
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email')
];

exports.ResetPasswordSchema = [
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters'),
    check('confirm_password')
        .not().isEmpty()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password and confirm password does not match')
];

exports.changePasswordSchema = [
    check("currentPassword")
        .not()
        .isEmpty()
        .withMessage("Current password is required"),
    check("newPassword")
        .not()
        .isEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be atleast six character!"),
    check("confirmPassword")
        .not()
        .isEmpty()
        .withMessage("Confirm password is required"),
];

exports.addCardSchema = [
    check("card_holder_name")
        .not()
        .isEmpty()
        .withMessage("Card holder name is required"),
    check("card_number")
        .not()
        .isEmpty()
        .withMessage("Card no. is required"),
    check("card_expiry")
        .not()
        .isEmpty()
        .withMessage("Card expiry is required"),
];
