// const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require("../config");
// const bodyParser = require("body-parser");

let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
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
});
let upload = multer({ storage: storage });
var profileUplaod = upload.fields([{ name: 'profile_pic', maxCount: 1 }])
var id_documents = upload.fields([{ name: 'id_document_front', maxCount: 1 }, { name: 'id_document_back', maxCount: 1 }])


const getFile = require('../controllers/getFile');
router.get("/uploads/:image", getFile.getImage);
// router.get("/logo/:image", getFile.getLogo);
// router.get("/flags/:image", getFile.getFlag);




const {
    loginSchema,
    sendOTPSchema,
    registerSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    addCardSchema,
    customerRegisterSchema,
    loginWithGoogleSchema
} = require("../middleware/user.middleware");

const userController = require('../controllers/user.controller');
// const itemController = require('../controllers/item.controller');


router.post('/login', loginSchema, userController.login.bind());
router.post('/loginWithGoogle', loginWithGoogleSchema, userController.loginWithGoogle.bind());
router.post('/verifyEmail', userController.verifyEmail.bind());
router.post('/register', registerSchema, userController.register.bind());
router.post('/customer_register', customerRegisterSchema, userController.customer_register.bind());
router.post('/forgotPassword', ForgotPasswordSchema, userController.ForgotPassword.bind());
router.post('/resetpassword', ResetPasswordSchema, userController.Resetpassword.bind());

router.post('/applyMeasurement', userController.applyMeasurement.bind());
router.post('/getsize', userController.getsize.bind());
router.post('/getcategoryusers', userController.getcategoryusers.bind());
router.post('/getItemsBySubcategory', userController.getItemsBySubcategory.bind());


//========================= Aman Routes   ==============================

router.get('/getAllSubcategories', userController.getAllItems.bind());
router.get('/getAllItemByFilter', userController.getAllItemByFilter.bind());
router.post('/updateCustomersImage', userController.updateCustomersImage.bind());
router.post("/getCustomersDetail",userController.getCustomersDetail.bind());
router.post('/checkout', userController.checkout.bind());





//========================   Disha Routes   ================================



router.post ("/getAllCustomerDetailsByFilter",userController.getAllCustomerDetailsByFilter.bind());


/// Not in use

// router.post('/sendOTP', sendOTPSchema, userController.sendOTP.bind());
// router.post('/loginWithSocial', userController.loginWithSocial.bind());
// router.post('/sendVerificationMail', userController.sendVerificationMail.bind());
// router.post('/forgotPasswordWithMobile', sendOTPSchema, userController.forgotPasswordWithMobile.bind());
// router.get('/marketplaceCategory', itemController.marketplaceCategory.bind());
// router.get('/newItemCategory', itemController.newItemCategory.bind());
// router.get('/soldItemCategory', itemController.soldItemCategory.bind());
// router.post('/getItemsByCategory', itemController.getItemsByCategory.bind());
// router.post('/itemDetail', itemController.itemDetail.bind());
// router.post('/getCountryList', userController.getCountryList.bind());
// router.post('/getCitiesByCountry', userController.getCitiesByCountry.bind());

// // Second Phase
// router.post('/setAlert', ensureWebToken, itemController.setAlert.bind());
// router.post('/getItemSellers', ensureWebToken,itemController.getItemSellers.bind());
// router.post('/updateProfile', ensureWebToken, profileUplaod, userController.updateProfile.bind());
// router.post('/updatePersonalData', ensureWebToken, userController.updatePersonalData.bind());
// router.post('/getUserKyc', ensureWebToken, id_documents, userController.getUserKyc.bind());
// router.post('/getFiscalCode', ensureWebToken, userController.getFiscalCode.bind());
// router.post('/updateUserKyc', ensureWebToken, id_documents, userController.updateUserKyc.bind());
// router.post('/getUserProfile', ensureWebToken, userController.getUserProfile.bind());
// router.post('/getUserCards', ensureWebToken, userController.getUserCards.bind());
// router.post('/addNewCard', ensureWebToken, addCardSchema, userController.addNewCard.bind());
// router.post('/buyItemShare', ensureWebToken, itemController.buyItemShare.bind());
// router.post('/checkSellerAvailableShare', ensureWebToken, itemController.checkSellerAvailableShare.bind());
// router.post('/getMyItems', ensureWebToken, itemController.getMyItems.bind());
// router.post('/getMySellingItems', ensureWebToken, itemController.getMySellingItems.bind());
// router.post('/getMySoldItems', ensureWebToken, itemController.getMySoldItems.bind());
// router.post('/checkMyShareOnSell', ensureWebToken, itemController.checkMyShareOnSell.bind());
// router.post('/putItemOnSell', ensureWebToken, itemController.putItemOnSell.bind());
// router.post('/getUserPortfolio', ensureWebToken, userController.getUserPortfolio.bind());
// router.post('/getItemPortfolio', ensureWebToken, userController.getItemPortfolio.bind());
// router.post('/getItemYearlyGraph', userController.getItemYearlyGraph.bind());

// // Third Face
// router.post('/getOrderHistory', ensureWebToken, itemController.getOrderHistory.bind());
// router.post('/deleteOrderHistory', ensureWebToken, itemController.deleteOrderHistory.bind());
// router.post('/addAssistanceRequest', ensureWebToken, userController.addAssistanceRequest.bind());
// router.post('/getAssistanceRequest', ensureWebToken, userController.getAssistanceRequest.bind());

// // router.post('/getAssistanceRequestHistory', ensureWebToken, userController.getAssistanceRequestHistory.bind());
// router.post('/getNotifications', ensureWebToken, userController.getNotifications.bind());
// router.post('/deleteNotification', ensureWebToken, userController.deleteNotification.bind());
// router.post('/searchItem', itemController.searchItem.bind());
// router.post('/updatePaymentMethod',ensureWebToken, userController.updatePaymentMethod.bind());
// router.post('/saveWalletAddress',ensureWebToken, userController.saveWalletAddress.bind());
// router.post('/getUserGuide',ensureWebToken, userController.getUserGuide.bind());

// End of not in use




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
            // let userDetails = await UserModel.getUsersDetails(req.user.email);
            // if (userDetails[0].is_active == 0) {
            //     return res.sendStatus(403);
            // } else {
            //     next();
            // }
            next();
        }
    })
}



module.exports.routes = router;