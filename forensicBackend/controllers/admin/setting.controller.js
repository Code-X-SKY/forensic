const AdminModel = require("../../models/admin.model");
const requestIp = require("request-ip");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const jwt = require("jsonwebtoken");

exports.changePassword = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).send({
          success: false,
          msg: `${errors.errors[0].msg}`,
        });
      }
      let result = await AdminModel.getAdminInfoById(req.body);
      if (result.length > 0) {
        let currentPassword = CryptoJS.SHA256(req.body.currentPassword).toString(
          CryptoJS.enc.Hex
        );
  
        if (currentPassword === result[0].password) {
          let newPassword = CryptoJS.SHA256(req.body.newPassword).toString(
            CryptoJS.enc.Hex
          );
   
            let response = await AdminModel.changePassword(
              newPassword,
              result[0].id
            );
            if (response) {
              return res.status(200).send({
                success: true,
                msg: "Password updated successfully!",
              });
            } 
            else {
              return res.status(200).send({
                success: false,
                msg: "Password update failed!",
              });
            }
          
        } else {
          return res.status(200).send({
            success: false,
            msg: "Current password dose not match!",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: "Invalid user!",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).send({
        success: false,
        msg: "Server Error",
        error,
      });
    }
  };