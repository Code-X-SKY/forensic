const AdminModel = require("../../models/admin.model");
const { validationResult } = require("express-validator");
const config = require("../../config");
const userModel = require("../../models/user.model");
const adminModel = require("../../models/admin.model");
const CryptoJS = require("crypto-js");

exports.getUsersList = async (req, res) => {
    try {
     
      let result = await adminModel.getUsersList(req.body);
      return res.status(200).send({
        success: true,
        msg: "Users List",
        data : result
      });
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


exports.checkoutList = async (req, res) => {
  try {
    let result = await adminModel.checkoutList();
    return res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("checkoutList >>>>>>>", error);
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error,
    });
  }
};

exports.getDashboardStatistics = async (req, res) => {
    try {
     
      let result = await adminModel.getDashboardStatistics(req.body);
      return res.status(200).send({
        success: true,
        msg: "Total Users",
        data : result
      });
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
exports.DeleteUsers = async (req, res) => {
  try {
    let result = await AdminModel.DeleteUsers(req.body.id);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "User Deleted!",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong. Please try again!",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(200).send({
      success: false,
      msg: "Server Error! Please try again.",
      error,
    });
  }
};

exports.updatekycapproval = async (req, res) => {    
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).send({
            success: false,
            msg: `${errors.errors[0].msg}`,
        });
    }
    let result = await AdminModel.updatekycapproval(req.body);
    if(result)
    {
      return res.status(200).send({
        success: true,
        msg: "Updated successfully!"
      });
    }
    else{
      return res.status(200).send({
        success: false,
        msg: "Something went wrong Please try again!"
      });
    }
  }
  catch(error)
  {
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error
    });
  }
}

exports.updateUser = async (req, res) => {    
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).send({
            success: false,
            msg: `${errors.errors[0].msg}`,
        });
    }
    let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
    let result = await AdminModel.updateUser(req.body,hash);
    if(result)
    {
      return res.status(200).send({
        success: true,
        msg: "Updated successfully!"
      });
    }
    else{
      return res.status(200).send({
        success: false,
        msg: "Something went wrong Please try again!"
      });
    }
  }
  catch(error)
  {
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error
    });
  }
}

exports.rejectkycapproval = async (req, res) => {    
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).send({
            success: false,
            msg: `${errors.errors[0].msg}`,
        });
    }
    let result = await AdminModel.rejectkycapproval(req.body);
    if(result)
    {
      return res.status(200).send({
        success: true,
        msg: "Updated successfully!"
      });
    }
    else{
      return res.status(200).send({
        success: false,
        msg: "Something went wrong Please try again!"
      });
    }
  }
  catch(error)
  {
    return res.status(200).send({
      success: false,
      msg: "Server Error",
      error
    });
  }
}





