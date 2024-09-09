const AdminModel = require("../../models/admin.model");
const { validationResult } = require("express-validator");
const config = require("../../config");

exports.getItemList = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).send({
          success: false,
          msg: `${errors.errors[0].msg}`,
        });
      }
      let result = await AdminModel.getItemList(req.body);
      return res.status(200).send({
        success: true,
        msg: "Items List",
        data : result
      });
    }
    catch (error) {
        
        return res.status(200).send({
          success: false,
          msg: "Server Error",
          error,
        });
    }
}

exports.addItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let image = (!req.files['image']) ? null : req.files['image'][0].filename;
    let left_side = (!req.files['left_side']) ? null : req.files['left_side'][0].filename;
    let right_side = (!req.files['right_side']) ? null : req.files['right_side'][0].filename;
   
   
    let result = await AdminModel.addItem(req.body, image,left_side,right_side);
    return res.status(200).send({
      success: true,
      msg: "Item added successfully!"
    });
  }
  catch (error) {
      
      return res.status(200).send({
        success: false,
        msg: "Server Error",
        error,
      });
  }
}

exports.editItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let image = (!req.files['image']) ? null : req.files['image'][0].filename;
    let left_side = (!req.files['left_side']) ? null : req.files['left_side'][0].filename;
    let right_side = (!req.files['right_side']) ? null : req.files['right_side'][0].filename;
    // let image = req.file.filename;
    
    let size = req.body.size
    // let sizea = size.toString()
    // let  sizeb = sizea.replace(/,/g,'');
    // let sizec = sizeb.split('');
    let result = await AdminModel.editItem(req.body,image,left_side,right_side);
    if(result)
    {
      return res.status(200).send({
        success: true,
        msg: "Item updated successfully!"
      });
    }
    else{
      return res.status(200).send({
        success: false,
        msg: "Item update failed!"
      });
    }
  }
  catch (error) {
      
      return res.status(200).send({
        success: false,
        msg: "Server Error",
        error,
      });
  }
}

exports.getItemDetail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.getItemDetail(req.body);
    let itemAttrDetail = await AdminModel.getItemAttributeDetail(req.body.item_id);
		result[0].attributes = itemAttrDetail;
    let itemsubcDetail = await AdminModel.getItemsubcategoryDetail(req.body.item_id);
		result[0].subcategory = itemsubcDetail;
    
    return res.status(200).send({
      success: true,
      msg: "Items Detail",
      data : result[0]
    });
  }
  catch (error) {
      
      return res.status(200).send({
        success: false,
        msg: "Server Error",
        error,
      });
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let result = await AdminModel.deleteItem(req.body);
    if(result)
    {
      return res.status(200).send({
        success: true,
        msg: "Items deleted successfully!"
      });
    }
    else{
      return res.status(200).send({
        success: false,
        msg: "Item delete failed!"
      });
    }
  }
  catch (error) {
      
      return res.status(200).send({
        success: false,
        msg: "Server Error",
        error,
      });
  }
}

