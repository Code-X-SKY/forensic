const config = require("../config");
const mysql = require("mysql2");
const pool = mysql.createPool({
    host: config.mysqlHost,
    user: config.user,
    password: process.env.DB_PASS || config.password,
    database: config.database,
    port: config.mysqlPort,
});

const promisePool = pool.promise();

class UserModel {
    applyMeasurement = async (data) => {
        let sql = ``;
        if (
            data.heightUpdate &&
            data.chestUpdate &&
            data.waistUpdate &&
            data.hipUpdate
        ) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate && data.chestUpdate && data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND waist <= '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate && data.chestUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate && data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.chestUpdate && data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest <= '${data.chest}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate && data.chestUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}'AND chest <= '${data.chest}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate && data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}'AND waist <= '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}'AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.chestUpdate && data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest <= '${data.chest}' AND waist <= '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.chestUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest <= '${data.chest}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        } else if (data.heightUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height = '${data.height}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        } else if (data.chestUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest = '${data.chest}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        } else if (data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE waist = '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        } else if (data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE hip = '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        } else {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        }
        // let sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getsize = async (data) => {
        let sql = `SELECT * FROM size`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getcategoryusers = async (id) => {
        let sql = `SELECT id, category_name FROM category`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getSubcategoryByCategory = async (id) => {
        let sql = `SELECT id, sub_category_name FROM sub_category WHERE category_id = '${id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    applyMeasurement = async (data) => {
        let sql = ``;
        if (data.heightUpdate && data.chestUpdate && data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate && data.chestUpdate && data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND waist <= '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate && data.chestUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate && data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.chestUpdate && data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest <= '${data.chest}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate && data.chestUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height = '${data.height}' AND chest = '${data.chest}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate && data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height = '${data.height}'AND waist = '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height = '${data.height}'AND hip = '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.chestUpdate && data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest = '${data.chest}' AND waist = '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.chestUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest = '${data.chest}' AND hip = '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.waistUpdate && data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE waist = '${data.waist}' AND hip = '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        }
        else if (data.heightUpdate) {
            sql = `SELECT * FROM body_avatars WHERE height = '${data.height}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        }
        else if (data.chestUpdate) {
            sql = `SELECT * FROM body_avatars WHERE chest = '${data.chest}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        }
        else if (data.waistUpdate) {
            sql = `SELECT * FROM body_avatars WHERE waist = '${data.waist}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        }
        else if (data.hipUpdate) {
            sql = `SELECT * FROM body_avatars WHERE hip = '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        }
        else {
            sql = `SELECT * FROM body_avatars WHERE height = '${data.height}' AND skin_tone = '${data.skin_tone}' ORDER BY id ASC LIMIT 1`;
        }
        // console.log(sql);
        // let sql = `SELECT * FROM body_avatars WHERE height <= '${data.height}' AND chest <= '${data.chest}' AND waist <= '${data.waist}' AND hip <= '${data.hip}' AND skin_tone = '${data.skin_tone}' ORDER BY id DESC LIMIT 1`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    getItemsBySubcategory = async (data) => {
        let sql = `SELECT id, name, image, category_id, subcategory_id FROM items WHERE subcategory_id = '${data.sub_cat_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    

    //////////////  Not in Use ///////////////////
    loginCheck = async (data) => {
        let sql = `SELECT * FROM users where email = '${data.email}' AND user_role='2' `;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    verifyEmail = async (email) => {
        let sql = `UPDATE users SET is_email_verify = 1 WHERE email = '${email}' `;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    registerUser = async (data) => {
        let sql = `INSERT INTO users(user_name, email, password, signup_by, is_email_verify) VALUES('${data.user_name}','${data.email}','${data.password}','${data.signup_by}', '${data.is_email_verify}')`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    registerCustomer = async (data) => {
        let sql = `INSERT INTO customers(user_name, email, mobile_number, gender, dob, address) VALUES('${data.user_name}','${data.email}','${data.mobile_number}','${data.gender}', '${data.dob}', '${data.address}')`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };


    checkoutCustomer = async (data) => {
        let sql = `INSERT INTO orders(chest, height, hip, skin_tone, waist, userFace,userId,items) VALUES('${data.chest}','${data.height}','${data.hip}','${data.skin_tone}', '${data.waist}', '${data.userFace}', '${data.userId}','${data.items}')`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    registerUserBySocial = async (data) => {
        let sql = `INSERT INTO users(name, email, country_code, mobile_no, password, profile_pic, status, is_mobile_verify, is_email_verify, signup_by, notification, privacy_policy, terms_condition) VALUES('${data.name}','${data.email}','${data.country_code}','${data.mobile_no}','${data.password}', '${data.profile_pic}', '${data.status}', '${data.is_mobile_verify}', '${data.is_email_verify}', '${data.signup_by}', '${data.notification}', '${data.privacy_policy}', '${data.terms_condition}')`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    getUsersDetailByMobile = async (data) => {
        let sql = `SELECT * FROM users where mobile_no = '${data.mobile_no}' AND country_code = '${data.country_code}' AND user_role='2'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getUsersDetailByMobileSameUser = async (data) => {
        let sql = `SELECT * FROM users where mobile_no = '${data.mobile_no}' AND country_code = '${data.country_code}' AND user_role='2' AND id != ${data.user_id} `;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getUsersDetailByEmail = async (data) => {
        let sql = `SELECT * FROM users where email = '${data.email}' AND user_role='2'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getCustomerDetailByMobile = async (mobile_no) => {
        let sql = `SELECT * FROM customers where mobile_number = '${mobile_no}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getUsersDetailByAppleId = async (data) => {
        let sql = `SELECT * FROM users where apple_id = '${data.mobile_no}' AND user_role='2'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getUsersDetailByID = async (data) => {
        let sql = `SELECT * FROM users where id = '${data.user_id}' AND user_role='2'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getUsersDetailByMobile_Social = async (data) => {
        let sql = `SELECT * FROM users where mobile_no = '${data.mobile_no}' AND user_role='2'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    resetPassword = async (password, email) => {
        let sql = `UPDATE users SET password = '${password}' WHERE email = '${email}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    insertActivity = async (activityData) => {
        let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( '${activityData.activity_type}'  , '${activityData.user_id}', '${activityData.ip}' ) `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    getCategoryList = async () => {
        // let sql = `SELECT cat.id, cat.category_name, JSON_ARRAYAGG(
        //     JSON_OBJECT('name',item.name,'image',item.image, 'description',item.description, 'share_quantity',item.share_quantity, 'share_price',item.share_price, 'sell_end_date',item.sell_end_date)
        //   ) items
        //   FROM items as item
        //   JOIN category as cat on item.category_id = cat.id
        //   GROUP BY cat.id, cat.category_name
        //   ORDER BY cat.id`;
        let sql = `SELECT id, category_name, description FROM category where status=1 ORDER BY id ASC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemListByCategory = async (type, category_id, limit) => {
        let sql = "";
        let limitSql = "";
        if (limit > 0) {
            limitSql = `LIMIT ` + limit;
        }
        if (type == "Marketplace") {
            sql =
                `SELECT id, name, lable, image, description, share_quantity, sell_end_date, last_year_perf, market_value, last_month_per, status, is_sold, (SELECT sell_price FROM item_additions WHERE item_id=items.id AND on_sell = 1 AND user_id != 1 ORDER BY sell_price ASC LIMIT 1) as share_price, available_share FROM items where category_id='${category_id}' AND is_deleted=0 AND item_put_on=2 AND status=1 AND is_sold=0 ORDER BY id DESC ` +
                limitSql;
        } else if (type == "NewItem") {
            sql =
                `SELECT id, name, lable, image, description, share_quantity, share_price, sell_end_date,  last_year_perf, market_value, last_month_price, status, is_sold,  left_share as share_left, collected_share as collected FROM items where category_id='${category_id}' AND is_deleted=0 AND item_put_on=1 AND status=1 AND is_sold=0 ORDER BY id DESC ` +
                limitSql;
        } else if (type == "SoldItem") {
            sql =
                `SELECT id, name, lable, image, description, share_quantity, share_price, sell_end_date,  last_year_perf, last_month_price, market_value, status, is_sold FROM items where category_id='${category_id}' AND is_deleted=0 AND is_sold=1 ORDER BY id DESC ` +
                limitSql;
        }
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    calculateAvgPrice = async (data) => {
        let sql = `SELECT COALESCE(COUNT(t.id), 0) as trxcount, COALESCE(AVG(t.price), 0) as avgPrice, COALESCE(items.share_price, 0) as actualPrice FROM transactions as t LEFT JOIN items ON items.id=t.item_id where t.item_id='${data.item_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemDetail = async (item_id) => {
        let sql = `SELECT id, name, lable, image, description, item_put_on, (share_quantity - (SELECT COALESCE(SUM(share_qty), 0) FROM transactions WHERE item_id=items.id AND trx_type_id=2 AND user_id=1)) as share_quantity, share_price, last_year_perf, market_value, last_month_price, sell_end_date, status, is_sold, pre_order_target, available_share as available, sold_share as sold, left_share as share_left, collected_share as collected, COALESCE((SELECT price FROM transactions WHERE item_id=items.id ORDER BY id DESC LIMIT 1), 0) as last_share_value, (SELECT sell_price FROM item_additions WHERE item_id=items.id AND on_sell = 1 AND user_id != 1 ORDER BY sell_price ASC LIMIT 1) as buy_from, COALESCE(collected_share*share_price, 0) as collected_amount FROM items where id='${item_id}'`;
        //  let sql = `SELECT a.*,COALESCE(a.collected_share*a.buy_from, 0) as collected FROM (SELECT id, name, lable, image, description, item_put_on, (share_quantity - (SELECT COALESCE(SUM(share_qty), 0) FROM transactions WHERE item_id=items.id AND trx_type_id=2 AND user_id=1)) as share_quantity, share_price, last_year_perf, market_value, last_month_price, sell_end_date, status, is_sold, pre_order_target, available_share as available,collected_share, sold_share as sold, left_share as share_left,  ((SELECT price FROM COALESCEtransactions WHERE item_id=items.id ORDER BY id DESC LIMIT 1), 0) as last_share_value, (SELECT sell_price FROM item_additions WHERE item_id=items.id AND on_sell = 1 AND user_id != 1 ORDER BY sell_price ASC LIMIT 1) as buy_from FROM items where id='${item_id}') AS a`;
        // collected_share as collected,

        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemAttributeDetail = async (item_id) => {
        let sql = `SELECT attributes.attribute_name, iav.value FROM item_attribute_value as iav LEFT JOIN attributes ON attributes.id=iav.attributes_id where iav.item_id='${item_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    checkAlert = async (data) => {
        let sql = `SELECT * FROM alert_request where item_id='${data.item_id}' AND user_id='${data.user_id}' AND alert_sent=0`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    setAlert = async (data) => {
        let sql = `INSERT INTO alert_request(item_id, user_id) VALUES( '${data.item_id}'  , '${data.user_id}' ) `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    getItemSellers = async (data) => {
        let sql = `SELECT u.id as user_id,u.name,COUNT(ie.id) as availableShare,CONCAT(ie.sell_price,'') as sell_price FROM item_additions as ie LEFT JOIN users as u on u.id=ie.user_id WHERE ie.item_id='${data.item_id}' and ie.on_sell=1 GROUP BY u.id,u.email,u.name,ie.sell_price ORDER BY ie.sell_price`;
        // AND ie.user_id!='${data.user_id}'
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    updateProfile = async (data) => {
        let sql = `UPDATE users SET name = '${data.name}', date_of_birth = '${data.date_of_birth}', profile_pic = '${data.profile_pic}', profile_change_stt = 1 WHERE id = '${data.user_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    updatePersonalData = async (data) => {
        let sql = `UPDATE users SET name = '${data.name}', email = '${data.email}', country_code = '${data.country_code}', mobile_no = '${data.mobile_no}' WHERE id = '${data.user_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    updateUserKyc = async (data) => {
        let sql = `UPDATE users SET name = '${data.name}', cognome = '${data.cognome}', gender = '${data.gender}',  date_of_birth = '${data.date_of_birth}', country = '${data.country}', city = '${data.city}', fiscal_code = '${data.fiscal_code}', id_document_front = '${data.id_document_front}', id_document_back = '${data.id_document_back}', kyc_status=1 WHERE id = '${data.user_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    getUserCards = async (data) => {
        let sql = `SELECT * FROM user_cards where user_id = '${data.user_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    addNewCard = async (data) => {
        let sql = `INSERT INTO user_cards(user_id, card_holder_name, card_number, card_expiry, card_cvv) VALUES( '${data.user_id}'  , '${data.card_holder_name}', '${data.card_number}', '${data.card_expiry}', '${data.card_cvv}' ) `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    getSellerAvailableShare = async (data) => {
        let sql = `SELECT COUNT(id) as availableShare FROM item_additions WHERE user_id = '${data.seller_id}' AND item_id = '${data.item_id}' AND sell_price = '${data.price}' AND on_sell = 1`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    buyItemShare = async (data) => {
        let sql = `Insert INTO transactions(user_id, opponent_user_id, item_id, share_qty, price, amount, payment_method, payment_info, trx_type_id, stripe_trx_id, stripe_receit_url) VALUES('${data.user_id
            }', '${data.seller_id}', '${data.item_id}', '${data.buy_share_qty}', '${data.price
            }', '${data.amount}', '${data.payment_method}', '${JSON.stringify(
                data.payment_info
            )}', '1', '${data.stripe_trx_id}', '${data.stripe_receit_url}' )`;
        const [result, fields] = await promisePool.query(sql);
        let sql1, result1;
        if (data.seller_id == 1) {
            sql1 = `UPDATE items SET collected_share = collected_share + '${data.buy_share_qty}', left_share = left_share - '${data.buy_share_qty}' WHERE id = '${data.item_id}'`;
        } else {
            sql1 = `UPDATE items SET sold_share = sold_share + '${data.buy_share_qty}', available_share = available_share - '${data.buy_share_qty}' WHERE id = '${data.item_id}'`;
        }
        result1 = await promisePool.query(sql1);
        return result.insertId;
    };

    sellItemShare = async (data) => {
        let sql = `Insert INTO transactions(user_id, opponent_user_id, item_id, share_qty, price, amount, payment_method, payment_info, trx_type_id) VALUES('${data.seller_id
            }', '${data.user_id}', '${data.item_id}', '${data.buy_share_qty}', '${data.price
            }', '${data.amount}', '${data.payment_method}', '${JSON.stringify(
                data.payment_info
            )}', '2' )`;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    getItemAdditionOnSell = async (data) => {
        let sql = `SELECT id FROM item_additions WHERE user_id = '${data.seller_id}' AND item_id= '${data.item_id}' AND sell_price = '${data.price}' AND on_sell = 1 LIMIT ${data.buy_share_qty}`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    updateShareOwnership = async (data) => {
        let sql = `UPDATE item_additions SET user_id = '${data.user_id}', on_sell=0 WHERE id = '${data.addition_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    updateItemSoldStatus = async (data, type) => {
        if (type == "put_on_sell") {
            let sql0 = `UPDATE items SET available_share = available_share + '${data.sell_share_qty}' WHERE id = '${data.item_id}'`;
            await promisePool.query(sql0);
        }

        let sql = `SELECT share_quantity as total_share, collected_share, left_share, available_share, sold_share FROM items where id='${data.item_id}'`;
        // let sql = `SELECT  SUM(trx.share_qty) - (SELECT COALESCE(SUM(share_qty),0) FROM transactions WHERE item_id='${data.item_id}' AND trx_type_id=2 AND user_id!=1)  as total_share_buy, (SELECT COUNT(iad.id) FROM item_additions as iad WHERE iad.item_id=trx.item_id) as total_share, (SELECT COUNT(id) FROM item_additions WHERE item_id = trx.item_id AND on_sell=1 AND user_id!=1) as available_on_sell FROM transactions as trx WHERE trx.item_id='${data.item_id}' AND trx.trx_type_id=1`;
        // let sql = `SELECT SUM(trx.share_qty) as total_share_buy, (SELECT COUNT(iad.id) FROM item_additions as iad WHERE iad.item_id=trx.item_id) as total_share, (SELECT COUNT(id) FROM item_additions WHERE item_id = trx.item_id AND on_sell=1) as available_on_sell FROM transactions as trx WHERE trx.item_id='${data.item_id}' AND trx.trx_type_id=1`;

        const [result, fields] = await promisePool.query(sql);
        let result1, sql1;
        if (
            result[0].total_share == result[0].collected_share &&
            result[0].available_share == 0
        ) {
            sql1 = `UPDATE items SET is_sold = '1', pre_order_target = '1' WHERE id = '${data.item_id}'`;
        } else {
            if (result[0].available_share > 0) {
                sql1 = `UPDATE items SET is_sold = '0', item_put_on = 2 WHERE id = '${data.item_id}'`;
            } else {
                sql1 = `UPDATE items SET is_sold = '0' WHERE id = '${data.item_id}'`;
            }
        }

        if (type == "put_on_sell" && result[0].sold_share >= data.sell_share_qty) {
            let sql0 = `UPDATE items SET sold_share = sold_share - '${data.sell_share_qty}' WHERE id = '${data.item_id}'`;
            await promisePool.query(sql0);
        }
        result1 = await promisePool.query(sql1);
        return result1[0].affectedRows;
    };

    calculatePerformance = async (data) => {
        let sql = `SELECT COALESCE(AVG(t.price), 0) as avgPrice, COALESCE(items.share_price, 0) as actualPrice FROM transactions as t LEFT JOIN items ON items.id=t.item_id where t.item_id='${data.item_id}' AND t.user_id='${data.user_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getMyItems = async (data) => {
        let sql = `SELECT a.*, TRUNCATE(COALESCE(((a.avgMonthPrice-a.avgBuyPrice)*100)/a.avgBuyPrice, 0), 2) as perf FROM (SELECT DISTINCT(ita.item_id), COUNT(ita.id) as qty, COALESCE(ita.sell_price*COUNT(ita.id), 0) as current_value, items.name, items.image,
        (SELECT COALESCE(AVG(transactions.price), 0) FROM transactions WHERE trx_type_id = 1 AND item_id = items.id AND  transactions.datetime >= (NOW() - INTERVAL 1 MONTH)) as avgMonthPrice, 
        (SELECT COALESCE(AVG(transactions.price), 0) FROM transactions WHERE trx_type_id = 1 AND user_id='${data.user_id}' AND item_id = items.id) as avgBuyPrice
        FROM item_additions as ita LEFT JOIN items ON items.id=ita.item_id WHERE ita.user_id = '${data.user_id}' AND on_sell = 0 GROUP BY ita.item_id ORDER BY ita.update_date DESC) as a`;
        // let sql = `SELECT DISTINCT(ita.item_id), COUNT(ita.id) as qty, COALESCE(ita.sell_price*COUNT(ita.id), 0) as current_value, items.name, items.image, items.last_year_perf as perf  FROM item_additions as ita LEFT JOIN items ON items.id=ita.item_id WHERE ita.user_id = '${data.user_id}' AND on_sell = 0 GROUP BY ita.item_id ORDER BY ita.update_date DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getMySellingItems = async (data) => {
        let sql = `SELECT DISTINCT(ita.sell_price), COUNT(ita.id) as qty, COALESCE(ita.sell_price*COUNT(ita.id), 0) as current_value, items.name, items.image  FROM item_additions as ita LEFT JOIN items ON items.id=ita.item_id WHERE ita.user_id = '${data.user_id}' AND on_sell = 1 GROUP BY ita.sell_price ORDER BY ita.update_date DESC`;
        // let sql = `select t.item_id,t.name,t.qty,t.a*t.qty as current_value, t.image from (SELECT item_additions.item_id, COUNT(item_additions.id) as qty, items.name, items.image, (SELECT transactions.price from transactions WHERE transactions.item_id=item_additions.item_id ORDER BY transactions.id DESC LIMIT 1) as a FROM item_additions LEFT JOIN items ON items.id=item_additions.item_id WHERE user_id = '${data.user_id}' AND on_sell = 1 group by item_additions.item_id,items.name, items.image, a) as t`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getMySoldItems = async (data) => {
        // let sql = `SELECT trx.id, trx.user_id, trx.share_qty, trx.price, trx.amount, trx.payment_method, trx.datetime, items.name, items.image FROM transactions as trx LEFT JOIN items ON items.id=trx.item_id WHERE user_id='${data.user_id}' AND trx_type_id=2 ORDER BY trx.id DESC`;
        let sql = `SELECT DISTINCT(trx.item_id), COALESCE(SUM(trx.share_qty), 0) as share_qty, COALESCE(SUM(trx.amount), 0) as amount, items.name, items.image  FROM transactions as trx LEFT JOIN items ON items.id=trx.item_id WHERE trx.user_id = '${data.user_id}' AND trx_type_id = 2 GROUP BY trx.item_id ORDER BY trx.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemAdditionNotOnSell = async (data) => {
        let sql = `SELECT id FROM item_additions WHERE user_id = '${data.user_id}' AND item_id= '${data.item_id}' AND on_sell = 0 LIMIT ${data.sell_share_qty}`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getMyAvailableShare = async (data) => {
        let sql = `SELECT COUNT(id) as availableShare FROM item_additions WHERE user_id = '${data.user_id}' AND item_id = '${data.item_id}' AND on_sell = 0`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    putItemShareOnSell = async (data) => {
        let sql = `UPDATE item_additions SET on_sell = 1, sell_price='${data.sell_price}' WHERE id = '${data.addition_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    getGraphData = async (data) => {
        let sql = "";
        if (data.duration == "1Year") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' and trx_type_id=1 and datetime>=date_sub(now(),INTERVAL 1 YEAR) group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "5Year") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' and trx_type_id=1 and datetime>=date_sub(now(),INTERVAL 5 YEAR) group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "1Month") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' and trx_type_id=1 and datetime>now() - interval 1 month group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "3Month") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y FROM transactions where user_id='${data.user_id}' and trx_type_id=1 and datetime>now() - interval 3 month group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "1Week") {
            sql = `SELECT DAYNAME(datetime) as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' and trx_type_id=1 and datetime>now() - interval 7 day group by DAYNAME(datetime) order by date_format(datetime,'%Y%m')`;
        }
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getPortfolioData = async (data) => {
        let sql = `select COALESCE(sum(actualPrice*t.qty), 0) as portfolio_value, COALESCE((t.actualPrice-t.avgPrice)*100/t.avgPrice,0) as perf from (SELECT  COUNT(item_additions.id) as qty, (SELECT COALESCE(AVG(transactions.price), 0) FROM transactions WHERE user_id = '${data.user_id}' AND trx_type_id = 1 AND  transactions.datetime >= (NOW() - INTERVAL 1 MONTH)) as avgPrice, items.name, item_additions.sell_price as actualPrice FROM item_additions LEFT JOIN items ON items.id=item_additions.item_id WHERE user_id = '${data.user_id}' AND on_sell = 0) as t`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemGraphData = async (data) => {
        let sql = "";
        if (data.duration == "1Year") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' AND item_id='${data.item_id}' and trx_type_id=1 and datetime>=date_sub(now(),INTERVAL 1 YEAR) group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "5Year") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' AND item_id='${data.item_id}' and trx_type_id=1 and datetime>=date_sub(now(),INTERVAL 5 YEAR) group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "1Month") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' AND item_id='${data.item_id}' and trx_type_id=1 and datetime>now() - interval 1 month group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "3Month") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y FROM transactions where user_id='${data.user_id}' AND item_id='${data.item_id}' and trx_type_id=1 and datetime>now() - interval 3 month group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        } else if (data.duration == "1Week") {
            sql = `SELECT date_format(datetime,'%b-%Y') as x,sum(amount) as y  FROM transactions where user_id='${data.user_id}' AND item_id='${data.item_id}' and trx_type_id=1 and datetime>now() - interval 7 day group by date_format(datetime,'%Y%m') order by date_format(datetime,'%Y%m')`;
        }
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemPortfolioData = async (data) => {
        let sql = `SELECT COALESCE(AVG(trx.price), 0) as buy_price, COALESCE(SUM(trx.share_qty), 0) as share_qty, trx.datetime as purchase_date, (SELECT price FROM transactions WHERE item_id=trx.item_id ORDER BY id DESC LIMIT 1) as last_share_value, (SELECT COUNT(id) FROM item_additions WHERE item_id=trx.item_id AND user_id='${data.user_id}' AND on_sell=0) as available_for_sell FROM transactions as trx 
                    WHERE trx.item_id='${data.item_id}' AND trx.user_id='${data.user_id}' ORDER    BY trx.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getItemYearlyGraphData = async (data) => {
        let sql = "";
        sql = `SELECT YEAR(datetime) as x, COALESCE(SUM(amount), 0) as y FROM transactions WHERE  item_id='${data.item_id}' AND trx_type_id=1 GROUP BY YEAR(datetime)`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getCountryList = async (data) => {
        let sql = `SELECT * FROM countries order by name ASC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getCitiesByCountry = async (data) => {
        let sql = `SELECT * FROM cities WHERE country_code = '${data.country_code}' AND city_name NOT LIKE '%?%' order by city_name ASC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    // Third face
    getOrderHistory = async (data) => {
        let sql = `SELECT trx.id, items.name, items.image, trx.share_qty, trx.amount, trx.datetime, 
        CASE WHEN trx.trx_type_id=1 THEN 'Purchased' ELSE 'Selled' END AS trx_type FROM transactions as trx LEFT JOIN items ON items.id=trx.item_id WHERE trx.user_id = '${data.user_id}' AND trx.is_deleted=0 order by trx.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    deleteOrderHistory = async (data) => {
        let sql = `UPDATE transactions SET is_deleted = 1 WHERE id = '${data.trx_id}' AND user_id = '${data.user_id}' `;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    addAssistanceRequest = async (data) => {
        let sql = `INSERT INTO assistance_request(user_id, question) VALUES( '${data.user_id}'  , '${data.question}') `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    };

    getAssistanceRequest = async (data) => {
        let sql = `SELECT ar.*, users.name FROM assistance_request as ar LEFT JOIN users ON users.id = ar.user_id WHERE ar.user_id = '${data.user_id}' AND ar.status='${data.status}' order by ar.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    // getAssistanceRequestHistory = async (data) => {
    //     let sql = `SELECT ar.*, users.name FROM assistance_request as ar LEFT JOIN users ON users.id = ar.user_id WHERE ar.user_id = '${data.user_id}' order by ar.id DESC`;
    //     const [result, fields] = await promisePool.query(sql);
    //     return result;
    // }

    getNotifications = async (data) => {
        let sql = `SELECT notification.*, items.image, items.name FROM notification LEFT JOIN items on items.id=notification.item_id WHERE (notification.user_id = '${data.user_id}' OR notification.user_id = 0) AND notification.is_deleted = 0 order by notification.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    deleteNotification = async (data) => {
        let sql = `UPDATE notification SET is_deleted = 1 WHERE id = '${data.id}' AND user_id = '${data.user_id}' `;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    searchItem = async (data) => {
        let sql = `SELECT items.id, items.name, items.image, items.share_price FROM items WHERE name LIKE '%${data.keyword}%' AND is_deleted = 0`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    updatePaymentMethod = async (data) => {
        let sql = `UPDATE users SET default_payment_method = '${data.default_payment_method}' WHERE id = '${data.user_id}' `;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    saveWalletAddress = async (data) => {
        let sql = `UPDATE users SET wallet_address = '${data.address}', wallet_source = '${data.wallet_source}' WHERE id = '${data.user_id}' `;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    getUserGuide = async (data) => {
        let sql = `SELECT * FROM user_guide`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getAllItems = async () => {
        let sql = `SELECT * FROM sub_category ORDER BY category_id ASC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getAllItemByFilter = async () => {
        let sql = `SELECT size_value.*, items.name, items.subcategory_id, items.image,items.is_deleted, items.left_side, items.right_side, items.category_id FROM size_value LEFT JOIN items ON items.id = size_value.item_id WHERE items.is_deleted = 0`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getAllSizeByFilter = async (size_id) => {
        let sql = `SELECT * FROM size_value WHERE size_id = '${size_id}'`;
        console.log("dddddddddddd", sql);
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getAllCustomersList = async () => {
        let sql = `SELECT id,user_name,mobile_number,gender,dob, address FROM customers ORDER BY id desc`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

    getAllCustomerDetailsByFilter = async (mobile, name) => {
        let sql = `SELECT id,user_name,mobile_number,gender,dob, address FROM customers where user_name LIKE '%${name}%' AND mobile_number LIKE '%${mobile}%' ORDER BY id desc `;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };
    getAllCustomerDetailsByMobile = async (mobile) => {
        let sql = `SELECT id,user_name,mobile_number,gender,dob, address FROM customers where  mobile_number LIKE '%${mobile}%' ORDER BY id desc`;
        console.log(sql)
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    getAllCustomerDetailsByName = async (name) => {
        let sql = `SELECT id,user_name,mobile_number,gender,dob, address FROM customers where user_name  LIKE '%${name}%' ORDER BY id desc`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    updateCustomersImage = async (data) => {
        let sql = `UPDATE customers SET profile_pic = '${data.profile_pic}' WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    getCustomersDetail = async (data) => {
        let sql = `SELECT id,profile_pic FROM customers WHERE id=${data.id}`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };

}

module.exports = new UserModel();
