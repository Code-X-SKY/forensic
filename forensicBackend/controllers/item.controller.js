const UserModel = require('../models/user.model');
const config = require('../config')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

exports.marketplaceCategory = async (req, res) => {
	try {
		let getCategoryList = await UserModel.getCategoryList();
		let catData = [];
		for (let i = 0; i < getCategoryList.length; i++) {
			let itemsList = await UserModel.getItemListByCategory('Marketplace', getCategoryList[i].id, 5);
			if(itemsList.length>0)
			{
				let a = getCategoryList[i];
				a.items = itemsList;
				catData.push(a);
			}
		}
		return res.status(200).send({
			success: true,
			msg: 'Marketplace Items by category',
			data: catData
		});
	}
	catch (err) {
		console.log('marketplaceCategory => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.newItemCategory = async (req, res) => {
	try {
		let getCategoryList = await UserModel.getCategoryList();
		let catData = [];
		for (let i = 0; i < getCategoryList.length; i++) {
			let itemsList = await UserModel.getItemListByCategory('NewItem', getCategoryList[i].id, 5);
			if(itemsList.length>0)
			{
				let a = getCategoryList[i];
				a.items = itemsList;
				catData.push(a);
			}
		}
		return res.status(200).send({
			success: true,
			msg: 'New Items by category',
			data: catData
		});
	}
	catch (err) {
		console.log('getCategoryList => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.soldItemCategory = async (req, res) => {
	try {
		let getCategoryList = await UserModel.getCategoryList();
		let catData = [];
		for (let i = 0; i < getCategoryList.length; i++) {
			let itemsList = await UserModel.getItemListByCategory('SoldItem', getCategoryList[i].id, 5);
			if(itemsList.length>0)
			{
				let a = getCategoryList[i];
				a.items = itemsList;
				catData.push(a);
			}
		}
		return res.status(200).send({
			success: true,
			msg: 'Sold Items by category',
			data: catData
		});
	}
	catch (err) {
		console.log('soldItemCategory => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.getItemsByCategory = async (req, res) => {
	try {
		let itemsList = await UserModel.getItemListByCategory(req.body.type, req.body.category_id, 0);

		return res.status(200).send({
			success: true,
			msg: 'All Items by category',
			data: itemsList
		});
	}
	catch (err) {
		console.log('getItemsByCategory => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

async function calculateAvgPrice(reqData){
	let result = await UserModel.calculateAvgPrice(reqData);
	let avgPrice = result[0].actualPrice;
	if (result[0].trxcount > 3) {
		avgPrice = result[0].avgPrice
	}
	return avgPrice;
}

exports.itemDetail = async (req, res) => {
	try {
		let itemDetails = await UserModel.getItemDetail(req.body.item_id);
		// itemDetails[0].share_quantity = itemDetails[0].totalshare - itemDetails[0].buy_share;
		let avgPrice = await calculateAvgPrice(req.body);
		let itemAttrDetail = await UserModel.getItemAttributeDetail(req.body.item_id);
		itemDetails[0].avgPrice = avgPrice;
		itemDetails[0].lastPrice = avgPrice;
		itemDetails[0].userName = 'Collecto';
		itemDetails[0].attributes = itemAttrDetail;
		return res.status(200).send({
			success: true,
			msg: 'Item Details',
			data: itemDetails[0]
		});
	}
	catch (err) {
		console.log('itemDetail => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.setAlert = async (req, res) => {
	try {
		let chkAlert = await UserModel.checkAlert(req.body);
		if (chkAlert.length == 0) {
			let result = await UserModel.setAlert(req.body);
			if (result) {
				return res.status(200).send({
					success: true,
					msg: 'We have set an alert. You will be notified as soon as the same product will be available on Collecto Platform'
				});
			}
			else {
				return res.status(200).send({
					success: false,
					msg: 'Set alert failed. Please try again!'
				});
			}
		}
		else {
			return res.status(200).send({
				success: false,
				msg: 'We have set an alert. You will be notified as soon as the same product will be available on Collecto Platform'
			});
		}
	}
	catch (err) {
		console.log('setAlert => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.getItemSellers = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		console.log(req.body);
		let result = await UserModel.getItemSellers(req.body);
		if (result.length > 0) {
			return res.status(200).send({
				success: true,
				msg: 'Sellers List',
				data: result
			});
		}
		else {
			return res.status(200).send({
				success: false,
				msg: 'No seller found!'
			});
		}
	}
	catch (err) {
		console.log('itemDetail => ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

async function getSellerAvailableShare(reqData) {
	let result = await UserModel.getSellerAvailableShare(reqData);
	if (result[0].availableShare >= reqData.buy_share_qty) {
		return true;
	}
	else {
		return false;
	}
}

exports.checkSellerAvailableShare = async (req, res) => {
	let result = await getSellerAvailableShare(req.body);
	if (result) {
		return res.status(200).send({
			success: true,
			msg: "Seller share available"
		});
	}
	else {
		return res.status(200).send({
			success: false,
			msg: "Insuficiant seller share quantity"
		});
	}
}

const createToken = async (cardData) => {
    let token = {};
    try {
			let cardExpiry = cardData.card_expiry;

        token = await stripe.tokens.create({
            card: {
                number: cardData.card_number,
                exp_month: parseInt(cardExpiry.slice(0,2)),
                exp_year: parseInt(20+cardExpiry.substr(cardExpiry.length-2)),
                cvc: cardData.card_cvv
            }
        });
    } catch (error) {
        switch (error.type) {
            case 'StripeCardError':
                token.error = error.message;
                break;
            default:
                token.error = error.message;
                break;
        }
    }
    return token;
}

const createCharge = async (tokenId, amount) => {
    let charge = {};
    try {
        charge = await stripe.charges.create({
            amount: amount,
            currency: 'eur',
            source: tokenId,
            description: 'Buy Item Share'
        });
    } catch (error) {
        charge.error = error.message;
    }
    return charge;
}

exports.buyItemShare = async (req, res) => {
	try {
		
		let result = await getSellerAvailableShare(req.body);
		if (result) {
			let stripe_trx_id = null;
			let stripe_receit_url = null;
			if(req.body.payment_method == "CARD")
			{
				const token = await createToken(req.body.payment_info);
				if (token.error) {
					return res.status(200).send({
						success: false,
						msg: "Internal error (101)",
						error:token.error
					});
				}
				if (!token.id) {
					return res.status(200).send({
						success: false,
						msg: "Internal error (102)"
					});
				}

				const charge = await createCharge(token.id, req.body.amount*100);
				if (charge && charge.status == 'succeeded') { 
					stripe_trx_id = charge.balance_transaction;
					stripe_receit_url = charge.receipt_url;
					
				} else {
					return res.status(200).send({
						success: false,
						msg: "Payment failed due to invalid card detail (103)"
					});
				}
			}
			req.body.stripe_trx_id = stripe_trx_id;
			req.body.stripe_receit_url = stripe_receit_url;
			let buy_trx = await UserModel.buyItemShare(req.body);
			let sell_trx = await UserModel.sellItemShare(req.body);
			if (buy_trx && sell_trx) {
				let item_additions = await UserModel.getItemAdditionOnSell(req.body);
				
				for (let i = 0; i < item_additions.length; i++) {
					let postData = {
						"addition_id":item_additions[i].id,
						"user_id":req.body.user_id
					}
					await UserModel.updateShareOwnership(postData);
				}
				await UserModel.updateItemSoldStatus(req.body, 'buy');
			}
			return res.status(200).send({
				success: true,
				msg: "Item purchased successfully"
			});
		}
		else{
			return res.status(200).send({
				success: false,
				msg: "Insuficiant share quantity."
				// msg: "Item share already purchased by another user. Your payment will refund within 2 to 3 days."
			});
		}
	}
	catch (err) {
		console.log('buyItemShare ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.getMyItems = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		let results = await UserModel.getMyItems(req.body);
		return res.status(200).send({
			success: true,
			msg: "My Items",
			data: results
		});
	}
	catch (err) {
		console.log('getMyItems ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.getMySellingItems = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		let results = await UserModel.getMySellingItems(req.body);
		return res.status(200).send({
			success: true,
			msg: "Items on Sell",
			data: results
		});
	}
	catch (err) {
		console.log('getMySellingItems ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.getMySoldItems = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		let results = await UserModel.getMySoldItems(req.body);
		return res.status(200).send({
			success: true,
			msg: "Sold Items",
			data: results
		});
	}
	catch (err) {
		console.log('getMySoldItems ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

async function getMyAvailableShare(reqData) {
	let result = await UserModel.getMyAvailableShare(reqData);
	if (result[0].availableShare >= reqData.sell_share_qty) {
		return true;
	}
	else {
		return false;
	}
}

exports.checkMyShareOnSell = async (req, res) => {
	req.body.user_id = req.user_id;
	let result = await getMyAvailableShare(req.body);
	if (result) {
		return res.status(200).send({
			success: true,
			msg: "Share available on sell"
		});
	}
	else {
		return res.status(200).send({
			success: false,
			msg: "Insuficiant share quantity on sell"
		});
	}
}

exports.putItemOnSell = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		// console.log(req.body);
		// return;
		let result = await getMyAvailableShare(req.body);
		if (result) {

				let item_additions = await UserModel.getItemAdditionNotOnSell(req.body);
			
				for (let i = 0; i < item_additions.length; i++) {
					let postData = {
						"addition_id":item_additions[i].id,
						"sell_price":req.body.price
					}
					await UserModel.putItemShareOnSell(postData);
				}
				await UserModel.updateItemSoldStatus(req.body, 'put_on_sell');
			return res.status(200).send({
				success: true,
				msg: `Thank you we have put your shares on our platform. We will let you know when they will be sold.`
			});
		}
		else{
			return res.status(200).send({
				success: false,
				msg: "Insuficiant share to put on sell"
			});
		}
	}
	catch (err) {
		console.log('putItemOnSell ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

///  Third Face
exports.getOrderHistory = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		let results = await UserModel.getOrderHistory(req.body);
		return res.status(200).send({
			success: true,
			msg: "Order history",
			data: results
		});
	}
	catch (err) {
		console.log('getOrderHistory ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.deleteOrderHistory = async (req, res) => {
	try {
		req.body.user_id = req.user_id;
		let results = await UserModel.deleteOrderHistory(req.body);
		return res.status(200).send({
			success: true,
			msg: "Order history deleted."
		});
	}
	catch (err) {
		console.log('deleteOrderHistory ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}

exports.searchItem = async (req, res) => {
	try {
		let results = await UserModel.searchItem(req.body);
		return res.status(200).send({
			success: true,
			msg: 'Search results',
			data: results
		});
	}
	catch (err) {
		console.log('searchItem ', err);
		return res.status(200).send({
			success: false,
			msg: "Internal server error",
			err
		});
	}
}
