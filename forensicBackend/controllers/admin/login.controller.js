const AdminModel = require("../../models/admin.model");
const requestIp = require("request-ip");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getAdminInfo(req.body);
    
    if (result.length > 0) {
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);

      if (result[0].password === hash) {
        const jwtToken = jwt.sign(
          {
            email: req.body.username,
            id: result[0].id,
            role: "cpadmin",
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );

        // Insert Activity
        await AdminModel.insertActivity({
          user_id: result[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });

        return res.status(200).send({
          success: true,
          msg: "Login Successfully",
          data: {
            id: result[0].id,
            username: result[0].user_name,
            authToken: jwtToken,
            role: result[0].role,
          },
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Password does not match",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {
    console.log("err",error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};