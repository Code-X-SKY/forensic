const AdminModel = require("../../models/admin.model");
const { validationResult } = require("express-validator");
const config = require("../../config");

exports.getCategoryList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getCategoryList(req.body);
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

exports.addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.addCategory(req.body);
    return res.status(200).send({
      success: true,
      msg: "Category added successfully!"
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

exports.editCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.editCategory(req.body);
    if (result > 0) {
      return res.status(200).send({
        success: true,
        msg: "Category updated successfully!"
      });
    }
    else {
      return res.status(200).send({
        success: false,
        msg: "Category update failed!"
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

exports.deleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.deleteCategory(req.body.id);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Category deleted successfully!",
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

exports.getCategoryDetail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getCategoryDetail(req.body);
    if (result.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Category detail",
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

exports.getSubCategoryList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getSubCategoryList(req.body);
    return res.status(200).send({
      success: true,
      msg: "Sub-Category List",
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

exports.addSubCategory = async (req, res) => {
  try {
    console.log('2344444444444444',req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let result = await AdminModel.addSubCategory(req.body);
    return res.status(200).send({
      success: true,
      msg: "Sub-Category added successfully!"
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

exports.editSubCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    console.log(req.body);
    let result = await AdminModel.editSubCategory(req.body);
    if (result > 0) {
      return res.status(200).send({
        success: true,
        msg: "Sub-Category updated successfully!"
      });
    }
    else {
      return res.status(200).send({
        success: false,
        msg: "Sub-Category update failed!"
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

exports.deletesubCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    console.log(req.body.id);
    let result = await AdminModel.deletesubCategory(req.body.id);
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Sub-Category deleted successfully!",
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

exports.getsubcategorybyid = async (req, res) => {
  try {

    let result = await AdminModel.getsubcategorybyid(req.body);

    return res.status(200).send({
      success: true,
      msg: "Attribute detail",
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

exports.getsize = async (req, res) => {
  try {

    let result = await AdminModel.getsize(req.body);

    return res.status(200).send({
      success: true,
      msg: "Size detail",
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
exports.getcategoryusers = async (req, res) => {
  try {
    let getCategoryList = await AdminModel.getcategoryusers(req.body);
    // let subgetCategoryList = []
    // for (let i = 0; i < getCategoryList.length; i++) {
    //   subgetCategoryList = await AdminModel.getcategoryusers(getCategoryList[i].id);
    //   let a = subgetCategoryList[i]
    //   console.log(a);
    // }
console.log(getCategoryList);
    return res.status(200).send({
      success: true,
      msg: "Category detail",
      data: getCategoryList
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


exports.getAllCustomersList = async function (req, res) {
  try {
    const getAllCustomersList = await AdminModel.getAllCustomersList();

    if (getAllCustomersList) {
      return res
        .status(200)
        .send({ status: true, msg: "Successfull", Data: getAllCustomersList });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Something Went Wrong" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

