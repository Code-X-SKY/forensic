const UserModel = require("../models/user.model");
const emailActivity = require("./emailActivity.controller");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// const QRCode = require('qrcode');
const speakeasy = require("speakeasy");
const config = require("../config");
const CryptoJS = require("crypto-js");
const requestIp = require("request-ip");
var request = require("request");

var CodiceFiscale = require("codice-fiscale-js");
const userModel = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let usersDetail = await UserModel.getUsersDetailByEmail({
      email: req.body.email,
    });
    if (usersDetail.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Email already exist. Please use different email.",
      });
    } else {
      const hash = CryptoJS.SHA256(req.body.password).toString(
        CryptoJS.enc.Hex
      );
      let userData = {
        user_name: req.body.username,
        email: req.body.email,
        password: hash,
        signup_by: "NORMAL",
        is_email_verify: 0,
      };
      let saveUserDetails = await UserModel.registerUser(userData);
      if (saveUserDetails) {
        const Token = jwt.sign(
          {
            email: req.body.email,
          },
          config.JWT_SECRET_KEY
        );

        let mailmsg = `
                <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                    <h2>Please <a href='${config.email_verify_link}/verifyEmailAccount/${Token}'>click here </a> to activate your account</h2>
                </div>`;
        await emailActivity.Activity(
          req.body.email,
          "Account Activation Link",
          mailmsg
        );
        // Insert Activity
        await UserModel.insertActivity({
          user_id: saveUserDetails,
          activity_type: "Direct Register",
          ip: requestIp.getClientIp(req),
        });
        let getUsersDetail = await UserModel.getUsersDetailByID({
          user_id: saveUserDetails,
        });

        const jwtToken = jwt.sign(
          {
            email:
              getUsersDetail[0].email != "" ||
                getUsersDetail[0].email != "undefined"
                ? getUsersDetail[0].email
                : getUsersDetail[0].mobile_no,
            id: getUsersDetail[0].id,
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );
        getUsersDetail[0].authToken = jwtToken;
        return res.status(200).send({
          success: true,
          msg: "Registered successfully. Please check your email for verification!!",
          data: getUsersDetail[0],
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong. please try again!",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.customer_register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    // let usersDetail = await UserModel.getCustomerDetailByMobile(
    //   req.body.mobile_number
    // );

    // if (usersDetail.length > 0) {
    //   return res.status(200).send({
    //     success: false,
    //     msg: "User already exist. Please use different mobile number.",
    //   });
    // } else {
    let userData = {
      user_name: req.body.username,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
    };
    let saveUserDetails = await UserModel.registerCustomer(userData);

    if (saveUserDetails) {
      return res.status(200).send({
        success: true,
        msg: "Registered successfully!!",
        data: saveUserDetails
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong. please try again!",
      });
    }
    // }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getUsersDetail = await UserModel.loginCheck(req.body);
    if (getUsersDetail.length > 0) {
      if (getUsersDetail[0].status == 0) {
        return res.status(200).send({
          success: false,
          msg: "Your account is inactive!",
        });
      }
      if (getUsersDetail[0].is_email_verify == 0) {
        return res.status(200).send({
          success: false,
          msg: "Your email is not verified!",
        });
      } else {
        let hash = CryptoJS.SHA256(req.body.password).toString(
          CryptoJS.enc.Hex
        );
        if (getUsersDetail[0].password === hash) {
          const jwtToken = jwt.sign(
            {
              email: getUsersDetail[0].email,
              id: getUsersDetail[0].id,
            },
            config.JWT_SECRET_KEY,
            {
              expiresIn: config.SESSION_EXPIRES_IN,
            }
          );

          // Insert Activity
          await UserModel.insertActivity({
            user_id: getUsersDetail[0].id,
            activity_type: "Normal Login",
            ip: requestIp.getClientIp(req),
          });
          getUsersDetail[0].authToken = jwtToken;
          return res.status(200).send({
            success: true,
            msg: "Login Successfull",
            data: getUsersDetail[0],
          });
        } else {
          return res.status(200).send({
            success: false,
            msg: "Password does not match",
          });
        }
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "User not found!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.loginWithGoogle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getUsersDetail = await UserModel.loginCheck(req.body);

    if (getUsersDetail.length == 0) {
      let userData = {
        user_name: req.body.username,
        email: req.body.email,
        signup_by: "GOOGLE",
        password: "",
        is_email_verify: 1,
      };
      let saveUserDetails = await UserModel.registerUser(userData);
      if (saveUserDetails) {
        const jwtToken = jwt.sign(
          {
            email: req.body.email,
            id: saveUserDetails,
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );
        userData.authToken = jwtToken;
        userData.id = saveUserDetails;
        return res.status(200).send({
          success: true,
          msg: "Login Successfull",
          data: userData,
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again.",
        });
      }
    } else {
      const jwtToken = jwt.sign(
        {
          email: getUsersDetail[0].email,
          id: getUsersDetail[0].id,
        },
        config.JWT_SECRET_KEY,
        {
          expiresIn: config.SESSION_EXPIRES_IN,
        }
      );
      getUsersDetail[0].authToken = jwtToken;
      return res.status(200).send({
        success: true,
        msg: "Login Successfull",
        data: getUsersDetail[0],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  let token = req.body.token;
  if (token) {
    jwt.verify(
      token,
      config.JWT_SECRET_KEY,
      async function (err, decodedToken) {
        if (err) {
          return res.status(200).send({
            success: false,
            msg: "Incorrect or Expired Link",
          });
        }
        let updateStatus = await UserModel.verifyEmail(decodedToken.email);
        if (updateStatus) {
          return res.status(200).send({
            success: true,
            msg: "Account Successfully Verified!",
          });
        } else {
          return res.status(200).send({
            success: false,
            msg: "Email not registered. Please complete your registration!",
          });
        }
      }
    );
  } else {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    let getUsersEmail = await UserModel.loginCheck(req.body);
    if (getUsersEmail.length > 0) {
      if (getUsersEmail[0].status == 0) {
        return res.status(200).send({
          success: false,
          msg: "Your account is deactivated, Please contact with admin.",
        });
      }

      const Token = jwt.sign(
        {
          email: req.body.email,
        },
        config.JWT_SECRET_KEY
      );

      let mailmsg = `<tbody>
                <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1;text-align:left;color:#000"><b>Dear ${getUsersEmail[0].user_name},</b></div>
                </td>
                </tr>
                <tr>
                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                    <h4>Please <a href='${config.email_verify_link}/resetpassword/${Token}'>Click here </a> to Reset  your Password</h4>
                    </div>
                </td>
                </tr>
            </tbody>`;

      let mailMsg = emailActivity.Activity(
        req.body.email,
        "Reset Password Link",
        mailmsg
      );
      if (mailMsg) {
        return res.status(200).send({
          success: true,
          msg: "Please Check your email for a link to reset your password.",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong please try again.",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Email not registered!",
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};

exports.Resetpassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    jwt.verify(
      req.body.token,
      config.JWT_SECRET_KEY,
      async function (err, decodedToken) {
        if (err) {
          return res.status(200).send({
            success: false,
            msg: "Incorrect or Expired Link",
          });
        }
        const hash = CryptoJS.SHA256(req.body.password).toString(
          CryptoJS.enc.Hex
        );
        let updatePassword = await UserModel.resetPassword(
          hash,
          decodedToken.email
        );
        if (updatePassword) {
          return res.status(200).send({
            success: true,
            msg: "Your password changed successfully, You can login now.",
          });
        } else {
          return res.status(200).send({
            success: false,
            msg: "Something went wrong please try again.",
          });
        }
      }
    );
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};

exports.applyMeasurement = async (req, res) => {
  try {
    let results = await UserModel.applyMeasurement(req.body);
    return res.status(200).send({
      success: true,
      msg: "User measurement",
      data: results[0],
    });
  } catch (err) {
    console.log("applyMeasurement ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getsize = async (req, res) => {
  try {
    let result = await UserModel.getsize(req.body);
    return res.status(200).send({
      success: true,
      msg: "Size detail",
      data: result,
    });
  } catch (error) {
    console.log("getsize >>>>>>>>>>", error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getcategoryusers = async (req, res) => {
  try {
    let getCategoryList = await UserModel.getcategoryusers(req.body);
    let catData = [];
    for (let i = 0; i < getCategoryList.length; i++) {
      let subgetCategoryList = await UserModel.getSubcategoryByCategory(
        getCategoryList[i].id
      );
      let a = getCategoryList[i];
      a.subcategory = subgetCategoryList;
      catData.push(a);
    }
    return res.status(200).send({
      success: true,
      msg: "Category detail",
      data: catData,
    });
  } catch (error) {
    console.log("getcategoryusers >>>>>>", error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getItemsBySubcategory = async (req, res) => {
  try {
    let result = await UserModel.getItemsBySubcategory(req.body);
    return res.status(200).send({
      success: true,
      msg: "Size detail",
      data: result,
    });
  } catch (error) {
    console.log("getItemsBySubcategory >>>>>>>", error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    let result = await UserModel.getAllItems(req.body);
    return res.status(200).send({
      success: true,
      msg: "Size detail",
      data: result,
    });
  } catch (error) {
    console.log("getAllItems >>>>>>>", error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getAllItemByFilter = async (req, res) => {
  try {
    let result = await UserModel.getAllItemByFilter();
    return res.status(200).send({
      success: true,
      msg: "Item detail",
      data: result,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getFiscalCode = async (req, res) => {
  let date = new Date(req.body.date_of_birth);
  const year_is = date.getFullYear();
  // 👇️ getMonth returns integer from 0(January) to 11(December)
  const month_is = date.getMonth() + 1;
  const day_is = date.getDate();
  try {
    const cf = new CodiceFiscale({
      name: req.body.name,
      surname: req.body.cognome,
      gender: gender,
      day: day_is,
      month: month_is,
      year: year_is,
      birthplace: req.body.city,
      // birthplaceProvincia: "NA" // Optional
    });
    if (cf) {
      return res.status(200).send({
        success: true,
        msg: `Fiscal code generated`,
        fiscal_code: cf.code,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: `Invalid detail`,
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: `Invalid Province/City.`,
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getUsersDetail = await UserModel.loginCheck(req.body);
    if (getUsersDetail.length > 0) {
      if (getUsersDetail[0].is_mobile_verify == 0) {
        let otp = await sendMobileOTP(req.body);
        if (otp != undefined) {
          return res.status(200).send({
            success: true,
            msg: "Mobile number not verified.",
            goto: "otpScreen",
            otp_is: otp,
          });
        } else {
          return res.status(200).send({
            success: false,
            msg: "Otp sending failed. Please try again.",
          });
        }
      } else if (getUsersDetail[0].status == 0) {
        return res.status(200).send({
          success: true,
          msg: "Inactive account",
          goto: "",
        });
      } else {
        return res.status(200).send({
          success: true,
          msg: "Mobile number already registered.",
          goto: "passwordScreen",
        });
      }
    } else {
      let otp = await sendMobileOTP(req.body);

      if (otp != undefined) {
        return res.status(200).send({
          success: true,
          msg: "Registeration in progress...",
          goto: "otpScreen",
          otp_is: otp,
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Otp sending failed. Please try again.",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

async function sendMobileOTP(reqData) {
  let mobile_no = reqData.mobile_no;
  let otp = await generateOTP();
  let msg =
    "Your one time passcode(OTP) is : " +
    otp +
    ". Please do not share with anyone. From - Collecto";
  // Send OTP on mobile here (SMS Gateway intigration)

  var options = {
    method: "GET",
    url:
      config.smsApiUrl +
      "?from=" +
      config.smsSenderName +
      "&to=" +
      mobile_no +
      "&message=" +
      msg +
      "&format=json",
    headers: {
      Authorization: config.smsAuthToken,
    },
  };
  request(options, function (error, response) {
    if (error) {
      // throw new Error(error);
      return "err";
    } else {
      console.log(response.body);
      if (response.statusCode != 200) {
        console.log("SMS not send");
        return;
      }
    }
  });
  return otp;
}

async function sendEmailOTP(email, subject) {
  let otp = generateOTP();
  let mailmsg = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        <h2>Your one time password (OTP) is : ${otp}</h2>
    </div>`;
  await emailActivity.Activity(email, subject, mailmsg);
  return otp;
}

function generateOTP() {
  var digits = "0123456789";

  var otpLength = 4;

  var otp = "";

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);

    otp = otp + digits[index];
  }

  return otp;
}

exports.sendVerificationMail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let usersDetail = await UserModel.getUsersDetailByEmail({
      email: req.body.email,
    });
    if (usersDetail.length == 0) {
      // const Token = jwt.sign({
      // 	email: req.body.email
      // }, config.JWT_SECRET_KEY)

      // let mailmsg = `
      //     <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
      //         <h2>Please <a href='https://espsofttech.org/collecto-admin/verifyEmailAccount.html?token=${Token}'>click here </a> to activate your account</h2>
      //     </div>`
      // let mailMsg = await emailActivity.Activity(req.body.email, 'Account Activation Link', mailmsg);

      return res.status(200).send({
        success: true,
        msg: "Verification email sent to your mail. Please check your inbox.",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Email already exist. Please use different email.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.forgotPasswordWithMobile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getUsersDetail = await UserModel.getUsersDetailByMobile(req.body);
    if (getUsersDetail.length > 0) {
      let otp = await sendMobileOTP(req.body);
      if (otp != undefined) {
        return res.status(200).send({
          success: true,
          msg: "OTP sent to your mobile",
          goto: "otpScreen",
          otp_is: otp,
          user_id: getUsersDetail[0].id,
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Otp sending failed. Please try again.",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Mobile number does not exist",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.loginWithSocial = async (req, res) => {
  try {
    let getUsersDetail = [];
    let type = req.body.type;
    if (type == "APPLE") {
      if (req.body.mobile_no != "") {
        getUsersDetail = await UserModel.getUsersDetailByMobile_Social(
          req.body
        );
        account_id = req.body.email;
      }
    } else {
      if (req.body.email != "") {
        getUsersDetail = await UserModel.getUsersDetailByEmail(req.body);
        account_id = req.body.email;
      } else if (req.body.mobile_no != "") {
        getUsersDetail = await UserModel.getUsersDetailByMobile_Social(
          req.body
        );
        account_id = req.body.mobile_no;
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong. Please try again!",
        });
      }
    }
    console.log(req.body);

    if (getUsersDetail.length == 0) {
      let userData = {
        name: req.body.name,
        email: req.body.email,
        country_code: "",
        apple_id: req.body.mobile_no,
        mobile_no: req.body.mobile_no,
        password: "",
        profile_pic: req.body.profile_pic,
        status: 1,
        is_mobile_verify: 1,
        is_email_verify: 1,
        signup_by: type,
        notification: 1,
        privacy_policy: 1,
        terms_condition: 1,
      };
      console.log(userData);

      let saveUserDetails = await UserModel.registerUserBySocial(userData);
      if (saveUserDetails) {
        // Insert Activity
        await UserModel.insertActivity({
          user_id: saveUserDetails,
          activity_type: "Signup with " + type,
          ip: requestIp.getClientIp(req),
        });
        getUsersDetail = await UserModel.getUsersDetailByID({
          user_id: saveUserDetails,
        });
      }
    }
    // else {
    if (getUsersDetail[0].status == 0) {
      return res.status(200).send({
        success: true,
        msg: "Your account is inactive!",
      });
    } else {
      const jwtToken = jwt.sign(
        {
          email:
            getUsersDetail[0].email != "" ||
              getUsersDetail[0].email != "undefined"
              ? getUsersDetail[0].email
              : getUsersDetail[0].mobile_no,
          id: getUsersDetail[0].id,
        },
        config.JWT_SECRET_KEY,
        {
          expiresIn: config.SESSION_EXPIRES_IN,
        }
      );

      // Insert Activity
      await UserModel.insertActivity({
        user_id: getUsersDetail[0].id,
        activity_type: "Login With " + type,
        ip: requestIp.getClientIp(req),
      });
      getUsersDetail[0].authToken = jwtToken;
      return res.status(200).send({
        success: true,
        msg: "Login Successfull",
        data: getUsersDetail[0],
      });
    }
    // }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let profile_pic = !req.files["profile_pic"]
      ? null
      : req.files["profile_pic"][0].filename;
    let userData = {
      user_id: req.body.user_id,
      name: req.body.fullName,
      date_of_birth: req.body.date_of_birth,
      profile_pic: profile_pic,
    };
    let result = await UserModel.updateProfile(userData);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Profile updated successfully!",
      });
    } else {
      return res.status(200).send({
        success: true,
        msg: "Something went wrong. please try again!",
      });
    }
  } catch (err) {
    console.log("updateProfile ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.updatePersonalData = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let checkUser = await UserModel.getUsersDetailByMobileSameUser(req.body);
    if (checkUser == "" || !checkUser) {
      let userData = {
        user_id: req.body.user_id,
        name: req.body.fullName,
        email: req.body.email,
        date_of_birth: req.body.date_of_birth,
        country_code: req.body.country_code,
        mobile_no: req.body.mobile_no,
      };
      let result = await UserModel.updatePersonalData(userData);
      if (result) {
        const Token = jwt.sign(
          {
            email: req.body.email,
          },
          config.JWT_SECRET_KEY
        );

        let mailmsg = `
				<div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
					<h2>Please <a href='${config.email_verify_link}/verifyEmailAccount.html?token=${Token}'>click here </a> to activate your account</h2>
				</div>`;
        await emailActivity.Activity(
          req.body.email,
          "Email verification link",
          mailmsg
        );

        return res.status(200).send({
          success: true,
          msg: "We have sent verification link to your email inbox/span. Please verify your email.",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong. please try again!",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Mobile no. already exist!",
      });
    }
  } catch (err) {
    console.log("updatePersonalData", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getUserKyc = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    console.log(req.body);
    let getUsersDetail = await UserModel.getUsersDetailByID(req.body);
    if (getUsersDetail.length > 0) {
      if (getUsersDetail[0].default_payment_method == "CARD") {
        let cardDetail = await UserModel.getUserCards(req.body);
        getUsersDetail[0].cardDetail = cardDetail[0];
      }
      let kyc_status = "NOTAPPLY";
      if (getUsersDetail[0].kyc_status == 1) kyc_status = "PENDDING";
      else if (getUsersDetail[0].kyc_status == 2) kyc_status = "APPROVED";
      else if (getUsersDetail[0].kyc_status == 3) kyc_status = "REJECTED";
      return res.status(200).send({
        success: true,
        msg: "User kyc detail",
        data: {
          name: getUsersDetail[0].name,
          cognome: getUsersDetail[0].cognome,
          date_of_birth: getUsersDetail[0].date_of_birth,
          city: getUsersDetail[0].city,
          country: getUsersDetail[0].country,
          fiscal_code: getUsersDetail[0].fiscal_code,
          id_document_front: getUsersDetail[0].id_document_front,
          id_document_back: getUsersDetail[0].id_document_back,
          kyc_status: kyc_status,
          default_payment_method: getUsersDetail[0].default_payment_method,
          cardDetail: getUsersDetail[0].cardDetail,
        },
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Profile not found",
      });
    }
  } catch (err) {
    console.log("getUserKyc ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.updateUserKyc = async (req, res) => {
  try {
    let id_document_front = !req.files["id_document_front"]
      ? null
      : req.files["id_document_front"][0].filename;
    let id_document_back = !req.files["id_document_back"]
      ? null
      : req.files["id_document_back"][0].filename;

    if (!req.body.name || req.body.name == "") {
      return res.status(200).send({
        success: false,
        msg: "Name is required",
      });
    } else if (!req.body.cognome || req.body.cognome == "") {
      return res.status(200).send({
        success: false,
        msg: "Cognome is required",
      });
    } else if (!req.body.gender || req.body.gender == "") {
      return res.status(200).send({
        success: false,
        msg: "Cognome is required",
      });
    } else if (!req.body.date_of_birth || req.body.date_of_birth == "") {
      return res.status(200).send({
        success: false,
        msg: "Date of birth is required",
      });
    } else if (!req.body.city || req.body.city == "") {
      return res.status(200).send({
        success: false,
        msg: "City name is required",
      });
    } else if (!id_document_front || id_document_front == "") {
      return res.status(200).send({
        success: false,
        msg: "ID front is required",
      });
    } else if (!id_document_back || id_document_back == "") {
      return res.status(200).send({
        success: false,
        msg: "ID back is required",
      });
    }
    // else if(!req.body.fiscal_code || req.body.fiscal_code == "")
    // {
    // 	return res.status(200).send({
    // 		success: false,
    // 		msg: "Fiscal code is required",
    // 	});
    // }
    let userData = {
      user_id: req.body.user_id,
      name: req.body.name,
      cognome: req.body.cognome,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      country: req.body.country,
      city: req.body.city,
      fiscal_code: req.body.fiscal_code,
      id_document_front: id_document_front,
      id_document_back: id_document_back,
    };
    let result = await UserModel.updateUserKyc(userData);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Kyc detail updated successfully!",
      });
    } else {
      return res.status(200).send({
        success: true,
        msg: "Something went wrong. please try again!",
      });
    }
  } catch (err) {
    console.log("updateProfile ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    let getUsersDetail = await UserModel.getUsersDetailByID(req.body);
    if (getUsersDetail.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "User Profile detail",
        data: {
          user_id: getUsersDetail[0].id,
          name: getUsersDetail[0].name,
          email: getUsersDetail[0].email,
          date_of_birth: getUsersDetail[0].date_of_birth,
          country_code: getUsersDetail[0].country_code,
          mobile_no: getUsersDetail[0].mobile_no,
          is_mobile_verify: getUsersDetail[0].is_mobile_verify,
          is_email_verify: getUsersDetail[0].is_email_verify,
          cognome: getUsersDetail[0].cognome,
          fiscal_code: getUsersDetail[0].fiscal_code,
          signup_by: getUsersDetail[0].signup_by,
          profile_pic: getUsersDetail[0].profile_pic,
          profile_change_stt: getUsersDetail[0].profile_change_stt,
        },
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Profile not found",
      });
    }
  } catch (err) {
    console.log("getUserProfile ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getUserCards = async (req, res) => {
  try {
    let results = await UserModel.getUserCards(req.body);
    return res.status(200).send({
      success: true,
      msg: "User cards",
      data: results,
    });
  } catch (err) {
    console.log("getUserCards ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.addNewCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    await UserModel.addNewCard(req.body);
    return res.status(200).send({
      success: true,
      msg: "Card added successfully",
    });
  } catch (err) {
    console.log("addNewCard ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getUserPortfolio = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let prortfolioData = await UserModel.getPortfolioData(req.body);
    let graphData = await UserModel.getGraphData(req.body);
    return res.status(200).send({
      success: true,
      msg: "Portfolio",
      portfolio_value: prortfolioData[0].portfolio_value,
      last_month_perf: prortfolioData[0].perf,
      graphData: graphData,
    });
  } catch (err) {
    console.log("getUserPortfolio ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getItemPortfolio = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let prortfolioData = await UserModel.getItemPortfolioData(req.body);
    let graphData = await UserModel.getItemGraphData(req.body);
    let itemInfo = await UserModel.getItemDetail(req.body.item_id);
    let itemAttrDetail = await UserModel.getItemAttributeDetail(
      req.body.item_id
    );
    itemInfo = itemInfo[0];
    itemInfo.attributes = itemAttrDetail;
    let unitary_variation =
      prortfolioData[0].last_share_value - itemInfo.share_price;
    return res.status(200).send({
      success: true,
      msg: "Item Portfolio",
      last_share_value: prortfolioData[0].last_share_value,
      buy_price: itemInfo.share_price,
      unitary_variation: unitary_variation,
      share_qty: prortfolioData[0].share_qty,
      available_for_sell: prortfolioData[0].available_for_sell,
      total_variation: unitary_variation * prortfolioData[0].share_qty,
      purchase_date: prortfolioData[0].purchase_date,
      graphData: graphData,
      itemDetail: itemInfo,
    });
  } catch (err) {
    console.log("getUserPortfolio ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getItemYearlyGraph = async (req, res) => {
  try {
    let graphData = await UserModel.getItemYearlyGraphData(req.body);
    return res.status(200).send({
      success: true,
      msg: "Yearly Graph Data",
      graphData: graphData,
    });
  } catch (err) {
    console.log("getUserPortfolio ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getCountryList = async (req, res) => {
  try {
    let countryList = await UserModel.getCountryList(req.body);
    return res.status(200).send({
      success: true,
      msg: "Country List",
      flagBaseUrl: config.flagUrl,
      countryList: countryList,
    });
  } catch (err) {
    console.log("getCountryList ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getCitiesByCountry = async (req, res) => {
  try {
    let list = await UserModel.getCitiesByCountry(req.body);
    return res.status(200).send({
      success: true,
      msg: "Cities List",
      data: list,
    });
  } catch (err) {
    console.log("getCitiesByCountry ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

// Third

exports.addAssistanceRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    req.body.user_id = req.user_id;
    await UserModel.addAssistanceRequest(req.body);
    return res.status(200).send({
      success: true,
      msg: "Your question has been correctly submitted! Our team will reply as soon as possible. You will receive a notification on your profile once done. Thank you!",
    });
  } catch (err) {
    console.log("addAssistanceRequest ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getAssistanceRequest = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let results = await UserModel.getAssistanceRequest(req.body);
    return res.status(200).send({
      success: true,
      msg: "Assistance request!",
      data: results,
    });
  } catch (err) {
    console.log("getAssistanceRequest ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

// exports.getAssistanceRequestHistory = async (req, res) => {
// 	try {
// 		req.body.user_id = req.user_id;
// 		let results = await UserModel.getAssistanceRequestHistory(req.body);
// 		return res.status(200).send({
// 			success: true,
// 			msg: "Assistance request!",
// 			data: results
// 		});
// 	}
// 	catch (err) {
// 		console.log('getAssistanceRequestHistory ', err);
// 		return res.status(200).send({
// 			success: false,
// 			msg: "Internal server error",
// 			err
// 		});
// 	}
// }

exports.getNotifications = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let results = await UserModel.getNotifications(req.body);
    return res.status(200).send({
      success: true,
      msg: "Notifications!",
      data: results,
    });
  } catch (err) {
    console.log("getNotifications ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let results = await UserModel.deleteNotification(req.body);
    if (results) {
      return res.status(200).send({
        success: true,
        msg: "Notification deleted.",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Notification delete failed.",
      });
    }
  } catch (err) {
    console.log("deleteNotification ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let results = await UserModel.updatePaymentMethod(req.body);
    if (results) {
      return res.status(200).send({
        success: true,
        msg: "Default payment method updated.",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Update failed.",
      });
    }
  } catch (err) {
    console.log("updatePaymentMethod ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.saveWalletAddress = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let results = await UserModel.saveWalletAddress(req.body);
    if (results) {
      return res.status(200).send({
        success: true,
        msg: "Wallet address saved",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Update failed.",
      });
    }
  } catch (err) {
    console.log("saveWalletAddress ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

exports.getUserGuide = async (req, res) => {
  try {
    req.body.user_id = req.user_id;
    let results = await UserModel.getUserGuide(req.body);
    return res.status(200).send({
      success: true,
      msg: "User Guide!",
      data: results,
    });
  } catch (err) {
    console.log("getUserGuide ", err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

//======================= Disha work   ===================


exports.getAllCustomerDetailsByFilter = async (req, res) => {
  try {
    let mobile = req.body.mobile;
    let name = req.body.name;
    let gender = req.body.gender;
    if (mobile) {
      let getAllCustomerDetailsByMobile =
        await UserModel.getAllCustomerDetailsByMobile(mobile);
      if (getAllCustomerDetailsByMobile.length > 0) {
        return res.status(200).send({
          status: true,
          msg: "Successfull",
          Data: getAllCustomerDetailsByMobile,
        });
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "No Data Found By This Mobile" });
      }
    } else if (name) {
      let getAllCustomerDetailsByName =
        await UserModel.getAllCustomerDetailsByName(name);
      if (getAllCustomerDetailsByName.length > 0) {
        return res.status(200).send({
          status: true,
          msg: "Successfull",
          Data: getAllCustomerDetailsByName,
        });
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "No Data Found By This Name" });
      }
    }
    if (mobile && name) {
      let getAllCustomerDetailsByFilter =
        await UserModel.getAllCustomerDetailsByFilter(mobile, name);
      if (getAllCustomerDetailsByFilter.length > 0) {
        return res.status(200).send({
          status: true,
          msg: "Successfull",
          Data: getAllCustomerDetailsByFilter,
        });
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "Something Went Wrong" });
      }
    } else {
      let getAllCustomersList = await UserModel.getAllCustomersList();
      if (getAllCustomersList) {
        return res
          .status(200)
          .send({ status: true, msg: "Success", Data: getAllCustomersList });
      } else {
        return res
          .status(200)
          .send({ status: false, msg: "something goes wrong" });
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};


exports.updateCustomersImage = async (req, res) => {
  try {
    let result = await userModel.updateCustomersImage(req.body);
    if (result > 0) {
      return res.status(200).send({
        success: true,

      });
    }
    else {
      return res.status(200).send({
        success: false,
      });
    }
  }
  catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
}

exports.getCustomersDetail = async function (req, res) {
  try {
    const getCustomersDetail = await userModel.getCustomersDetail(req.body);

    if (getCustomersDetail) {
      return res
        .status(200)
        .send({ status: true, msg: "Successfull", data: getCustomersDetail[0] });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Something Went Wrong" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};


exports.checkout = async (req, res) => {
  try {

    let userData = {
      chest: req.body.chest,
      height: req.body.height,
      hip: req.body.hip,
      skin_tone: req.body.skintonNo,
      waist: req.body.waist,
      userFace: req.body.userFace,
      userId: req.body.customer_id,
      items: req.body.items
    };
    let saveUserDetails = await UserModel.checkoutCustomer(userData);

    if (saveUserDetails) {
      return res.status(200).send({
        success: true,
        msg: "Checkout successfully!!",
        data: saveUserDetails
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong. please try again!",
      });
    }
    // }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
      err,
    });
  }
};

