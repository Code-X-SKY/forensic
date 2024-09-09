import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie'
import { getsizeAction, getAllSubcategoriesAction, getAllItemAction, getCheckOutAction } from "../Action/user.action";
import config from "../coreFIles/config";
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineArrowRight } from 'react-icons/ai';

import Card from 'react-bootstrap/Card';
const Checkout = () => {

    const mesurementDetail = (!Cookies.get('mesurementDetail')) ? [] : JSON.parse(Cookies.get('mesurementDetail'));
    const allMeasurementsData = (!Cookies.get('checkoutSelectedbodyAvatars')) ? [] : JSON.parse(Cookies.get('checkoutSelectedbodyAvatars'));


    mesurementDetail.sub_cat = ``;

    const [allItemList, setAllItemList] = useState([])

    const [sizesList, setSizesList] = useState([]);
    const [firstItem, setfirstItem] = useState([]);
    const [secondItem, setsecondItem] = useState([]);
    const [thirdItem, setthirdItem] = useState([]);
    const params = useParams();
    let customer_id = params.customer_id;
    const [filterItems, setfilterItems] = useState([]);
    const [topWearData, settopWearData] = useState({ image: 'kindpng_43097381_5.png' });
    const [bottomWearData, setbottomWearData] = useState({ image: 'kindpng_6722439_4.png' });
    const [footwear, setfootwear] = useState({ image: '', right_side: '', left_side: '' });
    const [newSeletItem, setNewSeletItem] = useState([]);
    const [form, setForm] = useState({ sub_category_id: 4, size_id: 2 })

    const [allselectedItems, setselectedItems] = useState([]);

    const [newsub_cat, setnewsub_cat] = useState('');
    const [newsub_cat_bottom, setnewsub_cat_bottom] = useState('');
    const [addToCart, setAddToCart] = useState(false)

    const changeToWear = async (item) => {
        setNewSeletItem(item)

        if (item.category_id == 1) {
            setbottomWearData(item)
            setnewsub_cat_bottom(``);
            if (item.subcategory_id != 9) {
                await setnewsub_cat_bottom('_' + item.subcategory_id);
            }
        }
        if (item.category_id == 2) {
            settopWearData(item)
            setnewsub_cat(``);
            if (item.subcategory_id != 4) {
                await setnewsub_cat('_' + item.subcategory_id);
            }
        }
        if (item.category_id == 5) {
            setfootwear(item)
        }
    }

    useEffect(() => {

        const finalSelectedItems = (!Cookies.get('checkoutSelectedItems')) ? [] : JSON.parse(Cookies.get('checkoutSelectedItems'));
        console.log('finalSelectedItems', finalSelectedItems)
        setselectedItems(finalSelectedItems);

        getsize();
        getAllSubcategories();
        getAllItem();
        document.getElementById('userFace').style.borderRadius = '100%';
    }, []);

    //===============================================  Get Size================================

    const getsize = async (data) => {

        let res = await getsizeAction();
        if (res.success) {

            if (data?.category_id == 1) {
                setSizesList(res.data.filter((item) => item.category_lable == 'bottom'));
            }
            else if (data?.category_id == 5) {
                setSizesList(res.data.filter((item) => item.category_lable == 'foot'));
            }
            else {
                setSizesList(res.data.filter((item) => item.category_lable == 'top'));
            }
        }
    }

    //===============================================  Get Subcategory  ================================

    const getAllSubcategories = async () => {
        let res = await getAllSubcategoriesAction();
        if (res.success) {
            setfirstItem(res.data.filter((item) => item.category_id == 2));
            setsecondItem(res.data.filter((item) => item.category_id == 1));
            setthirdItem(res.data.filter((item) => item.category_id == 5));

        }
    }

    const getAllItem = async (value, name) => {

        let res = await getAllItemAction();
        if (res.success) {

            let itemsList = res.data.filter((item) => (item.subcategory_id == form.sub_category_id && item.size_id == form.size_id));
            await setAllItemList(res.data);
            await setfilterItems(itemsList);
        }
    }


    const removeItem = async (itemId) => {
        let Index = allselectedItems.findIndex(item => item.id == itemId);
        if (Index > -1) {
            allselectedItems.splice(Index, 1);
        }
        let arr = allselectedItems;
        setselectedItems([]);
        Cookies.set('checkoutSelectedItems', JSON.stringify(allselectedItems));

        setTimeout(() => {
            setselectedItems(arr);
        }, 100);

    }


    const checkOutProceed = async (e) => {
        e.preventDefault();
        let data = {
            'chest': allMeasurementsData[0].chest,
            'height': allMeasurementsData[0].height,
            'hip': allMeasurementsData[0].hip,
            'skintonNo': allMeasurementsData[0].skintonNo,
            'userFace': allMeasurementsData[0].userFace,
            'waist': allMeasurementsData[0].waist,
            'customer_id': customer_id,
            'items': JSON.stringify(allselectedItems),

        }
        let res = await getCheckOutAction(data);
        if (res.success) {
            toast.success(res.msg);
            setAddToCart(true)
        }
    }

    const checkOutProceedWelcome = async () => {
        window.location.href = config.baseUrl + 'welcome'
    }


    return (
        <>
            <Header></Header>
            {/*-------------------------- Fitting T-Shirts Start --------------------------- */}

            <section className='fittingtshirts py-5'>

                <Toaster />

                <div className='filterone'></div>
                <div className='filtertwo'></div>
                <Container>
                    <Row className=''>
                        <Col md={12}>
                            <Form className="">
                                <div className="tophead">
                                    <h4 className="mb-4 text-center">Checkout Section</h4>
                                    <a href={`${config.baseUrl}fittingRoom/${customer_id}`}> Go Back To Fitting Room</a>
                                </div>



                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="mx-auto">
                            <Container fluid>

                                <Row className='justify-content-between' style={{ marginTop: '60px' }}>
                                    <Col md={6} xs={12} className="px-lg-5 mx-auto">
                                        <div className='charector'>
                                            <div className='charactorbox mb-5'>

                                                <div className={`facebox facebox_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}`}>
                                                    <img src={`${mesurementDetail.userFace}`} alt="menface" id="userFace" />
                                                </div>

                                                <img src={`assets/avatarImg/${mesurementDetail.avatarImage}`} alt='charactor' className='' />
                                                <div className={`topwearDiv top_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}${newsub_cat}`}>
                                                    <img src={config.imageUrl + topWearData.image} className='' />
                                                </div>

                                                <div className={`bottomwearDiv bottom_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}${newsub_cat_bottom}`}>
                                                    <img src={config.imageUrl + bottomWearData.image} className='' />
                                                </div>


                                                <div className={`shoes_box_left shoes_left_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}`}>
                                                    {footwear.right_side ?
                                                        <img src={config.imageUrl + footwear.right_side} alt="shoes1" /> : ''

                                                    }
                                                </div>
                                                <div className={`shoes_box_right shoes_right_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}`}>
                                                    {footwear.left_side
                                                        ?
                                                        <img src={config.imageUrl + footwear.left_side} alt="shoes2" /> : ''
                                                    }

                                                </div>


                                            </div>



                                        </div>
                                        {allselectedItems.length > 0 ?

                                            < Col md={12} xs={12}>
                                                <div className='mt-5 text-center filterbtnbox'>
                                                    {addToCart == false ?
                                                        <Card.Link href="javascript:;" onClick={(e) => checkOutProceed(e)} className='welcomebtn'>Proceed<span><AiOutlineArrowRight /></span></Card.Link>
                                                        :
                                                        <Card.Link href="javascript:;" onClick={(e) => checkOutProceedWelcome(e)} className='welcomebtn'>Go to Welcome Page<span><AiOutlineArrowRight /></span></Card.Link>

                                                    }

                                                </div>

                                            </Col> : ''}
                                    </Col>
                                    <Col md={4} className="select_items">
                                        <div className="selectitem">
                                            <div className="lengthbox">
                                                <h4>Selected Items :</h4>
                                                <div className="dresselect mt-3">
                                                    <Row>



                                                        {allselectedItems.length > 0 ?
                                                            allselectedItems.map((items) => (
                                                                <>
                                                                    < Col md={12} xs={12}>
                                                                        <div className="dressbox">
                                                                            <i onClick={() => removeItem(items.id)} class="fa fa-trash" aria-hidden="true" style={{ color: 'red' }}></i>
                                                                            <img src={config.imageUrl + `${items.image}`} alt="Selected Images" onClick={() => changeToWear(items)} />
                                                                        </div>
                                                                    </Col>
                                                                </>
                                                            ))
                                                            :
                                                            ""
                                                        }






                                                    </Row>



                                                </div>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                </Container>
            </section>

            {/*-------------------------- Fitting T-Shirts Exit --------------------------- */}


        </>
    )
}

export default Checkout;