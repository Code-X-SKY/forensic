const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    //   cb(null, file.originalname)
    let filetype = file.originalname.split('.').pop();
    if (file.mimetype === 'image/png') {
        filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
    }
    if (file.mimetype === 'image/jpg') {
        filetype = 'jpg';
    }
    if (file.mimetype === 'video/mp4') {
        filetype = 'mp4';
    }
    if (file.mimetype === 'application/pdf') {
        filetype = 'pdf';
    }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
})
var upload = multer({ storage: storage })
var expert_image = upload.fields([{ name: 'expert_image', maxCount: 1 }])
var new_expert_image = upload.fields([{ name: 'new_expert_image', maxCount: 1 }])
let itemimages=upload.fields([{ name: 'image', maxCount: 8 }, {name:'left_side', maxCount: 8 }, {name:'right_side', maxCount: 8 }])

const getFile = require('../controllers/getFile');
router.get("/uploads/:image", getFile.getImage);
router.get("/:image", getFile.getLogo);

//////////////////////////  Middlewares ///////////////////////////
const {
    loginSchema,
    changePasswordSchema,
    addCategorySchema,
    addAttributesSchema,
  } = require("../middleware/admin.middleware");

  
//////////////////////////  Controllers //////////////////////////
const loginController = require('../controllers/admin/login.controller');
const categoryController=require('../controllers/admin/category.controller')
const settingController = require('../controllers/admin/setting.controller');
const itemController = require('../controllers/admin/item.controller');



////////////////////////// Satendra Controllers //////////////////////////
const userController = require('../controllers/admin/user.controller');
const attributeController=require('../controllers/admin/attributes.controller')
//////////////////////////  satendra  /////////////////////////////

router.post('/login', loginSchema,loginController.login.bind());
router.post('/changePassword', changePasswordSchema, ensureWebTokenForAdmin, settingController.changePassword.bind());
router.post('/getUsersList',  userController.getUsersList.bind());
router.post('/getCategoryList', categoryController.getCategoryList.bind());
router.post('/deleteCategory', ensureWebTokenForAdmin, categoryController.deleteCategory.bind());
router.post('/addCategory', ensureWebTokenForAdmin, addCategorySchema, categoryController.addCategory.bind());
router.post('/editCategory', ensureWebTokenForAdmin, addCategorySchema, categoryController.editCategory.bind());
router.post('/getCategoryDetail', ensureWebTokenForAdmin, categoryController.getCategoryDetail.bind());
router.post('/getItemList', ensureWebTokenForAdmin, itemController.getItemList.bind());
router.post('/addItem', ensureWebTokenForAdmin, itemimages, itemController.addItem.bind());
router.post('/editItem', ensureWebTokenForAdmin,itemimages, itemController.editItem.bind());
router.post('/getItemDetail', ensureWebTokenForAdmin, itemController.getItemDetail.bind());
router.post('/deleteItem', ensureWebTokenForAdmin, itemController.deleteItem.bind());
router.post('/getDashboardStatistics', userController.getDashboardStatistics.bind());
router.post('/DeleteUsers', userController.DeleteUsers.bind());
router.post('/updatekycapproval',userController.updatekycapproval.bind());
router.post('/updateUser',userController.updateUser.bind());

router.post('/rejectkycapproval',userController.rejectkycapproval.bind());
router.post('/getAttributesList',  attributeController.getAttributesList.bind());
router.post('/addAttribute',  addAttributesSchema, attributeController.addAttribute.bind());
router.post('/deleteAttribute', attributeController.deleteAttribute.bind());
router.post('/editAttribute', attributeController.editAttribute.bind());
router.post('/getAttributeDetail', attributeController.getAttributeDetail.bind());
router.post('/getAttributeByid', attributeController.getAttributeByid.bind());
router.post('/getSubCategoryList', categoryController.getSubCategoryList.bind());
router.post('/addSubCategory',  categoryController.addSubCategory.bind());
router.post('/editSubCategory',  categoryController.editSubCategory.bind());
router.post('/deletesubCategory',  categoryController.deletesubCategory.bind());
router.post('/getsubcategorybyid', categoryController.getsubcategorybyid.bind());
router.post('/getsize', categoryController.getsize.bind());

//user
router.post('/getsize', categoryController.getsize.bind());
router.post('/getcategoryusers', categoryController.getcategoryusers.bind());
router.post("/getAllCustomersList",categoryController.getAllCustomersList.bind());
router.post('/checkoutList',ensureWebTokenForAdmin, userController.checkoutList.bind());




//// Ensure webtoken ////
router.get("/", function (request, response) {
    response.contentType("routerlication/json");
    response.end(JSON.stringify("Node is running"));
});

router.get("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});

router.post("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});


function ensureWebToken(req, res, next) {
    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWT(req, res, next);
    } else {
        res.sendStatus(403);
    }
}

async function verifyJWT(req, res, next) {
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            req.user_id = req.user.id;
            req.email = req.user.email;
            req.bnb_address = req.user.bnb_address;
            // check if user is active or not 
            let userDetails = await UserModel.getUsersDetails(req.user.email);
            if (userDetails[0].is_active == 0) {
                return res.sendStatus(403);
            } else {
                next();
            }
        }
    })
}

function ensureWebTokenForAdmin(req, res, next) {

    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWTForAdmin(req, res, next);
    } else {
        res.sendStatus(403);
    }
}


async function verifyJWTForAdmin(req, res, next) {
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            if (req.user.role != 'cpadmin') {
                return res.sendStatus(403);
            }
            next();
        }
    })
}


module.exports.adminRoutes = router;