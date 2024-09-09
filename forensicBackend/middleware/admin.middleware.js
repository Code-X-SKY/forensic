const { body, check } = require("express-validator");

exports.loginSchema = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
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
    .withMessage("Confirm password is required")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Password and confirm password does not match')
];

exports.addCategorySchema = [
  check("category_name")
    .not()
    .isEmpty()
    .withMessage("Category name is required")
];
exports.addAttributesSchema = [
  check("attribute_name")
    .not()
    .isEmpty()
    .withMessage("Attribute name is required")
];
// exports.addItemSchema = [
//   check("category_id")
//     .not()
//     .isEmpty()
//     .withMessage("Category is required"),
//   check("name")
//     .not()
//     .isEmpty()
//     .withMessage("Item name is required"),
//   check("image")
//     .not()
//     .isEmpty()
//     .withMessage("Image is required"),
//   check("description")
//     .not()
//     .isEmpty()
//     .withMessage("Image is required"),
//   check("share_quantity")
//     .not()
//     .isEmpty()
//     .withMessage("Quantity is required"),
//   check("share_price")
//     .not()
//     .isEmpty()
//     .withMessage("Price is required"),
//   check("sell_end_date")
//     .not()
//     .isEmpty()
//     .withMessage("Sell end date is required"),
// ];
