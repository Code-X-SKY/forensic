
const config = require('../config');
const mysql = require('mysql2');
const { database } = require('../config');
const pool = mysql.createPool(
    {
        host: config.mysqlHost,
        user: config.user,
        password: process.env.DB_PASS || config.password,
        database: config.database,
        port: config.mysqlPort
    });

const promisePool = pool.promise();

class AdminModel {
    /// Basic Queries
    getAdminInfo = async (data) => {
        let sql = `SELECT * FROM users where email = '${data.username}' AND user_role='1'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    getAdminInfoById = async (data) => {
        let sql = `SELECT * FROM users where id = '${data.id}' AND user_role='1'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    changePassword = async (newPassword, admin_id) => {
        let sql = `UPDATE users SET password = '${newPassword}' WHERE id = '${admin_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    insertActivity = async (activityData) => {
        let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( '${activityData.activity_type}'  , '${activityData.user_id}', '${activityData.ip}' ) `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    /// Category
    getCategoryList = async (data) => {
        let sql = `SELECT * FROM category order by id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    addCategory = async (data) => {
        let sql = `INSERT INTO category(category_name, description) VALUES( '${data.category_name ? data.category_name.replace(/'/g, "''") : ''}', '${data.description ? data.description.replace(/'/g, "''") : ''}') `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    editCategory = async (data) => {
        let sql = `UPDATE category SET category_name = '${data.category_name}', description='${data.description}' WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    deleteCategory = async (data) => {
        let sql = `DELETE FROM category WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };

    getCategoryDetail = async (data) => {
        let sql = `SELECT * FROM category WHERE id='${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    //subcategory

    getSubCategoryList = async (data) => {
        let sql = `SELECT s.* , c.category_name , c.id as cid from sub_category as s left join category as c on c.id=s.category_id order by s.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    addSubCategory = async (data) => {
        let sql = `INSERT INTO sub_category(category_id,sub_category_name, description) VALUES( '${data.category_id}','${data.sub_category_name ? data.sub_category_name.replace(/'/g, "''") : ''}', '${data.description ? data.description.replace(/'/g, "''") : ''}') `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    editSubCategory = async (data) => {
        let sql = `UPDATE sub_category SET category_id = '${data.category_id}',sub_category_name = '${data.sub_category_name}', description='${data.description}' WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        
        return result.affectedRows;
    };

    deletesubCategory = async (data) => {
        let sql = `DELETE FROM sub_category WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };


    /// Item

    // SELECT items.*, ct.category_name , iav.value , isv.value , a.attribute_name , s.sub_category FROM items LEFT JOIN category as ct ON ct.id=items.category_id LEFT JOIN item_attribute_value as iav ON iav.item_id=items.id LEFT JOIN item_subcategory_value as isv ON isv.item_id=items.id LEFT JOIN attributes as a ON a.id=iav.attributes_id LEFT JOIN sub_category as s ON s.id=isv.subcategory_id WHERE is_deleted=0 order by items.id DESC

    getItemList = async (data) => {
        let sql = `SELECT items.*, ct.category_name ,sc.sub_category_name  FROM items LEFT JOIN category as ct ON ct.id=items.category_id LEFT JOIN sub_category as sc ON sc.id=items.subcategory_id  WHERE is_deleted=0 order by items.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    addItem = async (data, image, left_side, right_side) => {
        let sql = `INSERT INTO items(category_id,subcategory_id , name, lable, image,left_side,right_side, description) VALUES( 
                '${data.category_id}', 
                '${data.subcategory_id}',
                '${data.name ? data.name.replace(/'/g, "''") : ''}', 
                '${data.lable ? data.lable.replace(/'/g, "''") : ''}', 
                '${image}',
                '${left_side}',
                '${right_side}',
                '${data.description ? data.description.replace(/'/g, "''") : ''}' ) `;
        const [result, fields] = await promisePool.query(sql);
        let insertId = result.insertId;
        if (insertId) {

            let sizedata = data.size;
            sizedata = sizedata.split(",");
            for (let k = 0; k < sizedata.length; k++) {
                if (sizedata[k] != ",") {
                    let sql3 = `INSERT INTO size_value (size_id, item_id) VALUES( '${sizedata[k]}', '${insertId}') `;
                    await promisePool.query(sql3);
                }
                const element = sizedata[k];


            }
        }
        return insertId;
    }

    editItem = async (data, image, left_side, right_side) => {

        let sql = `UPDATE items SET category_id = '${data.category_id}', subcategory_id = '${data.subcategory_id}', name = '${data.name ? data.name.replace(/'/g, "''") : ''}',image='${image == null ? data.image : image}',left_side='${left_side == null ? data.left_side : left_side}',right_side='${right_side == null ? data.right_side : right_side}',description='${data.description ? data.description.replace(/'/g, "''") : ''}' WHERE id = '${data.item_id}'`;
        const [result, fields] = await promisePool.query(sql);

        let affectedRows = result.affectedRows;
        if (affectedRows) {
            let sql1 = `DELETE FROM item_attribute_value WHERE item_id='${data.item_id}' `;
            const [result1, fields1] = await promisePool.query(sql1);
            if (result1) {
                let attr_data = JSON.parse(data.attribute_data);
                for (let j = 0; j < attr_data.length; j++) {
                    let sql2 = `INSERT INTO item_attribute_value(attributes_id, item_id, value) VALUES( '${attr_data[j].attribute_id}', '${data.item_id}', '${attr_data[j].value}') `;
                    await promisePool.query(sql2);
                }
                let sql4 = `DELETE FROM size_value WHERE item_id='${data.item_id}' `;
                const [result1, fields1] = await promisePool.query(sql4);
                let sizedata = data.size;
                sizedata = sizedata.split(",");
                for (let k = 0; k < sizedata.length; k++) {
                    if (sizedata[k] != ",") {
                        let sql3 = `INSERT INTO size_value (size_id, item_id) VALUES( '${sizedata[k]}',  '${data.item_id}') `;
                        await promisePool.query(sql3);
                    }
                    const element = sizedata[k];


                }
            }
        }
        return affectedRows;
    }

    getItemDetail = async (data) => {
        let sql = `SELECT i.id , i.category_id , i.subcategory_id, i.name , i.lable , i.description ,  i.image,i.left_side,i.right_side , i.tag , i.status, i.created_at, i.is_deleted, sc.sub_category_name, JSON_ARRAYAGG(sv.size_id) as size_id FROM items as i LEFT JOIN sub_category as sc ON sc.id=i.subcategory_id LEFT JOIN size_value as sv ON sv.item_id=i.id   WHERE i.id='${data.item_id}' `;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    getItemAttributeDetail = async (item_id) => {
        let sql = `SELECT iav.attributes_id as id, attributes.attribute_name, iav.value FROM item_attribute_value as iav LEFT JOIN attributes ON attributes.id=iav.attributes_id where iav.item_id='${item_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    getItemsubcategoryDetail = async (item_id) => {
        let sql = `SELECT isv.subcategory_id as id, sub_category.sub_category_name, isv.value FROM item_subcategory_value as isv LEFT JOIN sub_category ON sub_category.id=isv.subcategory_id where isv.item_id='${item_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    deleteItem = async (data) => {
        // let sql = `DELETE FROM items WHERE id='${data.item_id}' `;
        // const [result, fields] = await promisePool.query(sql);
        // return result;

        let sql = `UPDATE items SET is_deleted=1 WHERE id='${data.item_id}' `;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    }

    getUsersList = async () => {
        let sql = `SELECT id, user_name, signup_by , email,mobile_no, profile_pic,is_email_verify,is_mobile_verify FROM users where status=1  and is_deleted=0  and user_role<>1 ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    getDashboardStatistics = async () => {
        let sql = `SELECT COUNT(id)as totalUsers, (select COUNT(id) from category ) as totalcategory, (select COUNT(id) from attributes ) as totalattributes, (select COUNT(id) from items WHERE is_deleted=0 ) as totalitems  FROM users WHERE  user_role<>1 `;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    DeleteUsers = async (data) => {
        let sql = `DELETE FROM customers WHERE id ='${data}'`;

        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    }

    getAttributesList = async () => {
        let sql = `SELECT  attributes.id, attributes.attribute_name,attributes.category_id,category.category_name FROM attributes
        LEFT JOIN category ON attributes.category_id = category.id ORDER BY attributes.id DESC;`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }






    addAttribute = async (data) => {
        let sql = `INSERT INTO attributes (attribute_name, category_id) VALUES( '${data.attribute_name}'  , '${data.category_id}' ) `;
        const [result, fields] = await promisePool.query(sql);
        return result.insertId;
    }

    deleteAttribute = async (data) => {
        let sql = `DELETE FROM attributes WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };
    editAttribute = async (data) => {
        let sql = `UPDATE attributes SET attribute_name = '${data.attribute_name}', category_id = '${data.category_id}' WHERE id = '${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result.affectedRows;
    };
    getAttributeDetail = async (data) => {
        let sql = `SELECT * FROM attributes WHERE id='${data.id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;

    }
    getAttributeByid = async (data) => {
        let sql = `SELECT * FROM attributes WHERE category_id='${data.category_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    getsubcategorybyid = async (data) => {
        let sql = `SELECT * FROM sub_category WHERE category_id='${data.category_id}'`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }
    getsize = async (data) => {
        let sql = `SELECT * FROM size `;
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    getcategoryusers = async (id) => {
        let sql = `SELECT c.category_name , s.sub_category_name , c.id as cid , s.id as sid FROM category as c LEFT JOIN sub_category as s on c.id = s.category_id
        `;
        // SELECT  c.category_name , c.id as cid ,JSON_ARRAYAGG(s.sub_category_name) as subname FROM category as c left join sub_category as s on c.id = s.category_id group by c.id
        // SELECT  * from sub_category where category_id = '${id}' 
        const [result, fields] = await promisePool.query(sql);
        return result;
    }

    updatekycapproval = async (data) => {

        let sql = `UPDATE users SET  kyc_status = '2' WHERE id = ${data.id}`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    updateUser = async (data, hash) => {

        let sql = `UPDATE users SET  user_name = '${data.user_name}',email='${data.email}',password = '${hash}' WHERE id = ${data.id}`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }



    rejectkycapproval = async (data) => {
        let sql = `UPDATE users SET  kyc_status = '3' WHERE id = ${data.id}`;
        const [result, fields] = await promisePool.query(sql);

        return result;
    }

    getAllCustomersList = async () => {
        let sql = `SELECT id,user_name,mobile_number,gender,dob, address FROM customers ORDER BY id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };
    checkoutList = async (data) => {
        let sql = `SELECT ord.id,customers.user_name,customers.email,customers.mobile_number,customers.profile_pic, ord.userId, ord.height, ord.chest, ord.waist,ord.hip,ord.skin_tone,ord.userFace,ord.items,ord.createdAt FROM orders as ord LEFT JOIN customers ON customers.id = ord.userId ORDER BY ord.id DESC`;
        const [result, fields] = await promisePool.query(sql);
        return result;
    };


}


module.exports = new AdminModel;