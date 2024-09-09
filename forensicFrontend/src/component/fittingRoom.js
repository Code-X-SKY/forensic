import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie'
import { getsizeAction, getAllSubcategoriesAction, getAllItemAction } from "../Action/user.action";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../coreFIles/config";
import { AiOutlineArrowRight } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import Card from 'react-bootstrap/Card';

const FittingRoom = () => {

	const mesurementDetail = (!Cookies.get('mesurementDetail')) ? [] : JSON.parse(Cookies.get('mesurementDetail'));
	mesurementDetail.sub_cat = ``;

	const [allItemList, setAllItemList] = useState([])

	const [sizesList, setSizesList] = useState([]);
	const [firstItem, setfirstItem] = useState([]);
	const [allData, setAllData] = useState([])
	const [secondItem, setsecondItem] = useState([]);
	const [thirdItem, setthirdItem] = useState([]);
	const params = useParams();
	let customer_id = params.customer_id;
	const [form, setForm] = useState({ sub_category_id: 4, size_id: 2 })
	const [filterItems, setfilterItems] = useState([]);
	const [topWearData, settopWearData] = useState({ image: 'kindpng_43097381_5.png' });
	const [bottomWearData, setbottomWearData] = useState({ image: 'kindpng_6722439_4.png' });
	const [footwear, setfootwear] = useState({ image: '', right_side: '', left_side: '' });
	const [newSeletItem, setNewSeletItem] = useState([]);

	const [allselectedItems, setselectedItems] = useState([]);

	const [newsub_cat, setnewsub_cat] = useState('');
	const [newsub_cat_bottom, setnewsub_cat_bottom] = useState('');


	const changeToWear = async (item) => {
		setNewSeletItem(item)

		if (parseInt(item.category_id) === 1) {
			setbottomWearData(item)
			setnewsub_cat_bottom(``);
			if (parseInt(item.subcategory_id) !== 9) {
				await setnewsub_cat_bottom('_' + item.subcategory_id);
			}
		}
		if (parseInt(item.category_id) === 2) {
			settopWearData(item)
			setnewsub_cat(``);
			if (parseInt(item.subcategory_id) !== 4) {
				await setnewsub_cat('_' + item.subcategory_id);
			}
		}
		if (parseInt(item.category_id) === 5) {
			setfootwear(item)
		}
	}

	useEffect(() => {
		const finalSelectedItems = (!Cookies.get('selectedItems')) ? [] : JSON.parse(Cookies.get('selectedItems'));
		setselectedItems(finalSelectedItems);
		getsize();
		getAllSubcategories();
		getAllItem();
		document.getElementById('userFace').style.borderRadius = '100%';
	}, []);

	//===============================================  Get Size================================

	const getsize = async (data) => {

		let res = await getsizeAction();
		if (res.success) 
		{
			if(parseInt(data?.category_id) === 1) {
				setSizesList(res.data.filter((item) => item.category_lable === 'bottom'));
			}
			else if (parseInt(data?.category_id) === 5) {
				setSizesList(res.data.filter((item) => item.category_lable === 'foot'));
			}
			else {
				setSizesList(res.data.filter((item) => item.category_lable === 'top'));
			}
		}
	}

	//===============================================  Get Subcategory  ================================

	const getAllSubcategories = async () => {
		let res = await getAllSubcategoriesAction();
		if (res.success) {
			setAllData(res.data)
			setfirstItem(res.data.filter((item) => parseInt(item.category_id) === 2));
			setsecondItem(res.data.filter((item) => parseInt(item.category_id) === 1));
			setthirdItem(res.data.filter((item) => parseInt(item.category_id) === 5));
		}
	}


	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: filterItems.length > 4 ? 5 : filterItems.length,
		slidesToScroll: 1,
		vertical: false,
		verticalSwiping: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			}
		],
		beforeChange: function (currentSlide, nextSlide) {

		},
		afterChange: function (currentSlide) {

		}
	};

	const getAllItem = async (value, name) => {

		let res = await getAllItemAction();
		if (res.success) {
			let itemsList = res.data.filter((item) => (item.subcategory_id == form.sub_category_id && item.size_id == form.size_id));
			await setAllItemList(res.data);
			await setfilterItems(itemsList);
		}
	}

	const inputHandlerSubCat = async (e) => {

		const { name, value } = e.target;

		await setForm((old) => {
			return { ...old, [name]: value }
		})

		let sizeData = allData.filter((item) => (item.id == e.target.value))
		let sizeDataArray = sizeData[0].category_id == 1 ? 12 :
			sizeData[0].category_id == 5 ? 7 : 1
		// console.log('item.subcategory_id',item.subcategory_id)
		console.log('e.target.value',typeof e.target.value)
		console.log('sizeDataArray',typeof sizeDataArray)
		
		
		let itemsList = allItemList.filter((item) => (item.subcategory_id == e.target.value && item.size_id == sizeDataArray));
		// console.log('item.size_id',item.size_id)

		await setfilterItems(itemsList);
		await getsize(itemsList[0])
	}

	const inputHandlerSize = async (e) => {
		const { name, value } = e.target;
		await setForm((old) => {
			return { ...old, [name]: value }
		})
		let itemsList = allItemList.filter((item) => (item.subcategory_id == form.sub_category_id && item.size_id == value));
		await setfilterItems(itemsList);
	}

	// =======================================  selected items

	const selectedItems = async () => {
		let Index = allselectedItems.findIndex(item => item.id == newSeletItem.id);

		if (!newSeletItem.id || Index > -1) {
			return
		}

		let Arr = allselectedItems || [];
		Arr.push(newSeletItem)
		setselectedItems([]);
		Cookies.set('selectedItems', JSON.stringify(Arr));
		setTimeout(() => {
			setselectedItems(Arr);
		});
		// setNewSeletItem([])
	}

	const removeItem = async (itemId) => {
		let Index = allselectedItems.findIndex(item => item.id == itemId);
		if (Index > -1) {
			allselectedItems.splice(Index, 1);
		}
		let arr = allselectedItems;
		setselectedItems([]);
		Cookies.set('selectedItems', JSON.stringify(allselectedItems));

		setTimeout(() => {
			setselectedItems(arr);
		}, 100);

	}



	const checkOut = async (e) => {
		e.preventDefault();
		if (allselectedItems.length > 10) {
			toast.error('Cart has touched the max limit of 10! To continue remove some items from the cart');
		}
		else{
			let bodyAvatars = [{
				'height': mesurementDetail.height,
				'chest': mesurementDetail.chest,
				'waist': mesurementDetail.waist,
				'hip': mesurementDetail.hip,
				'userFace': mesurementDetail.userFace,
				'skintonNo': mesurementDetail.skintonNo
			}]
	
			Cookies.set('checkoutSelectedItems', JSON.stringify(allselectedItems))
			Cookies.set('checkoutSelectedbodyAvatars', JSON.stringify(bodyAvatars))
			setTimeout(() => {
				window.location.href = config.baseUrl + 'Checkout/' + customer_id
			}, 500);
		}
	

	}


	return (
		<>
			<Header></Header>
			{/*-------------------------- Fitting T-Shirts Start --------------------------- */}
			<Toaster />

			<section className='fittingtshirts py-5'>
				<div className='filterone'></div>
				<div className='filtertwo'></div>
				<Container>
					<Row className=''>
						<Col md={12}>
							<Form className="">
								<div className="tophead">
									<h4 className="mb-4 text-center">Category</h4>
									<a href={`${config.baseUrl}measurements/${customer_id}`}> Go Back To Measurement</a>
								</div>

								<Row className="mb-3">
									<Form.Group as={Col} md="6" controlId="formGridState">
										<Form.Select aria-label="Default select example" value={form.sub_category_id} name="sub_category_id" onChange={(e) => inputHandlerSubCat(e)}>
											<optgroup label="Top wear">
												{firstItem.map((item) => (
													<option value={item.id}>{item.sub_category_name}</option>
												))}
											</optgroup>
											<optgroup label="Bottom wear">
												{secondItem.map((item) => (
													<option value={item.id}>{item.sub_category_name}</option>
												))}
											</optgroup>
											<optgroup label="Foot wear">
												{thirdItem.map((item) => (
													<option value={item.id}>{item.sub_category_name}</option>
												))}
											</optgroup>
										</Form.Select>

									</Form.Group>


									<Form.Group as={Col} md="6" controlId="formGridState">

										<Form.Select aria-label="Default select example" value={form.size_id} name="size_id" onChange={(e) => inputHandlerSize(e)}>
											{sizesList.map((item) => (
												<option value={item.id}>{item.size}</option>
											))}
										</Form.Select>
									</Form.Group>


								</Row>

							</Form>
						</Col>
					</Row>
					<Row>
						<Col md={12} className="mx-auto">
							<Container fluid>
								<Row>
									<Col lg={9} className="mx-auto pt-5">
										<div className="slider">
											<div className='mainslider'>
												<div>

													<Slider {...settings}>
														{filterItems.map((item) => (
															<div className="item-slide mb-2">
																<img src={config.imageUrl + item.image} onClick={(e) => changeToWear(item)} alt={`${item.name}`} />
															</div>
														))}
													</Slider>

												</div>
											</div>
										</div>
									</Col>
								</Row>
								<Row className='justify-content-between' style={{ marginTop: '60px' }}>
									<Col md={6} xs={12} className="px-lg-5 mx-auto">
										<div className='charector'>
											<div className='charactorbox mb-5'>

												<div className={`facebox facebox_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}`}>
													<img src={`${mesurementDetail.userFace}`} alt="menface" id="userFace" />
													<div class="bottom_blur" style={{background:mesurementDetail.skinColor}}></div>
												</div>

												<img src={`assets/avatarImg/${mesurementDetail.avatarImage}`} alt='charactor' className='' />
												<div className={`topwearDiv top_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}${newsub_cat}`}>
													<img src={config.imageUrl + topWearData.image} className='' id="ball" alt="top wear" />
												</div>

												<div className={`bottomwearDiv bottom_${mesurementDetail.height}_${mesurementDetail.chest}_${mesurementDetail.waist}_${mesurementDetail.hip}${newsub_cat_bottom}`}>
													<img src={config.imageUrl + bottomWearData.image} className='' alt="botton wear" />
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

												{/* <div className="formal_left">
													<img src="assets/shoes/shoes13.png" alt="shoes11" className="" />
												</div>

												<div className="formal_right">
													<img src="assets/shoes/shoes14.png" alt="shoes12" className="" />
												</div> */}

												{/* <div className="jeans_box">
													<img src="assets/slim_jeans/slimjeans9.png" alt="slimjeans9" className="" />
												</div> */}

											</div>

										</div>

										{allselectedItems.length > 0 ?
											< Col md={12} xs={12}>
												<div className='mt-5 text-center filterbtnbox'>
													<Card.Link href="javascript:void(0)" onClick={(e) => checkOut(e)} className='welcomebtn'>Checkout<span><AiOutlineArrowRight /></span></Card.Link>
												</div>

											</Col> : ''

										}
									</Col>
									<Col md={4} className="select_items">
										<div className="selectitem">
											<div className="lengthbox">
												<h4>Selected Items : ({allselectedItems.length})</h4>
												<div className="dresselect mt-3">
													<Row>

														<Col md={12} xs={12}>
															<div className="dressbox d-flex align-items-center justify-content-center" onClick={selectedItems}>
																<div className="addittem">
																	<a href="javascript:void(0)" >
																		<span>
																			<svg
																				stroke="currentColor"
																				fill="currentColor"
																				strokeWidth={0}
																				t={1551322312294}
																				viewBox="0 0 1024 1024"
																				version="1.1"
																				height="1em"
																				width="1em"
																				xmlns="http://www.w3.org/2000/svg"
																			>
																				<defs />
																				<path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
																				<path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
																			</svg>
																		</span>
																	</a>
																	<p>Add Item</p>
																</div>
															</div>
														</Col>

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

export default FittingRoom;