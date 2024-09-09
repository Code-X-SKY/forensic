const AdminModel = require("../../models/admin.model");
const { validationResult } = require("express-validator");
const config = require("../../config");

exports.getAttributesList = async (req, res) => {
  try {

    let result = await AdminModel.getAttributesList(req.body);
    return res.status(200).send({
      success: true,
      msg: "Category List",
      data: result
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



exports.addAttribute = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.addAttribute(req.body);
    return res.status(200).send({
      success: true,
      msg: "Attribute added successfully!"
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






exports.deleteAttribute = async (req, res) => {
  try {

    let result = await AdminModel.deleteAttribute(req.body.id);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Attribute deleted successfully!",
      });
    }
    else {
      return res.status(200).send({
        success: false,
        msg: "Failed!",
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

exports.editAttribute = async (req, res) => {
  try {

    console.log("editAttribute", req.body);
    let result = await AdminModel.editAttribute(req.body);

    if (result > 0) {
      return res.status(200).send({
        success: true,
        msg: "Attribute updated successfully!"
      });
    }
    else {
      return res.status(200).send({
        success: false,
        msg: "Attribute update failed!"
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

exports.getAttributeDetail = async (req, res) => {
  try {

    let result = await AdminModel.getAttributeDetail(req.body);
    if (result.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Attribute detail",
        data: result[0]
      });
    }
    else {
      return res.status(200).send({
        success: false,
        msg: "Invalid ID",
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

exports.getAttributeByid = async (req, res) => {
  try {

    let result = await AdminModel.getAttributeByid(req.body);
    // if(result.length>0)
    // {
    return res.status(200).send({
      success: true,
      msg: "Attribute detail",
      data: result
    });
    // }
    // else{
    //   return res.status(200).send({
    //     success: false,
    //     msg: "Invalid ID",
    //   });
    // }
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

