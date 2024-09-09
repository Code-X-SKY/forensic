import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Form from 'react-bootstrap/Form';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import { ApplyMeasurementAction } from "../Action/user.action";
import Color from "color-thief-react";

const Loading = () => <div>Loading...</div>;

const Measurements = () => {
	const [form, setForm] = useState({ 'height': "70", 'chest': "39", 'waist': "33", 'hip': "41", 'skin_tone': 1, 'skintonNo': 'three', 'avatarImage': "avatar_img_70_40_35_41_one.png", 'heightUpdate': true, '	': true, 'waistUpdate': false, 'hipUpdate': false, 'userFace': 'assets/images/menface.png', 'image': 'https://ucarecdn.com/2152a35a-c2ab-4af6-a1aa-3cd6531b911e/-/crop/432x431/0,0/-/preview/', 'face': null, 'skinColor': '#D5A789' });

	const [currentMeasurement, setCurrentMeasurement] = useState({ 'height': "70", 'chest': "39", 'waist': "33", 'hip': "41", 'skin_tone': 1, 'skintonNo': 'three', 'avatarImage': "avatar_img_70_40_35_41_one.png", 'heightUpdate': true, 'chestUpdate': true, 'waistUpdate': false, 'hipUpdate': false, 'userFace': 'assets/images/menface.png' });

	// const [form, setForm] = useState({ 'height': "58", 'chest': "31", 'waist': "24", 'hip': "31", 'skin_tone': 1, 'skintonNo': 'three', 'avatarImage': "avatar_img_58_31_24_31_one.png", 'heightUpdate': true, '	': true, 'waistUpdate': false, 'hipUpdate': false, 'userFace': 'assets/images/menface.png', 'image':'https://ucarecdn.com/2152a35a-c2ab-4af6-a1aa-3cd6531b911e/-/crop/432x431/0,0/-/preview/', 'face':null, 'skinColor':'#D5A789' });

	// const [currentMeasurement, setCurrentMeasurement] = useState({ 'height': "58", 'chest': "31", 'waist': "24", 'hip': "31", 'skin_tone': 1, 'skintonNo': 'three', 'avatarImage': "avatar_img_58_31_24_31_one.png", 'heightUpdate': true, 'chestUpdate': true, 'waistUpdate': false, 'hipUpdate': false, 'userFace': 'assets/images/menface.png' });

	const imgSrc =
		form.userFace;
	const params = useParams();
	let customer_id = params.customer_id;
	const [chestUpdate, setChestUpdate] = useState(true);
	const [waistUpdate, setWaistUpdate] = useState(false);
	const [hipUpdate, setHipUpdate] = useState(false);
	const [topWearData] = useState({ image: 'kindpng_43097381_5.png' });
	const [bottomWearData] = useState({ image: 'kindpng_6722439_4.png' });
	const [loading, setLoading] = useState(true);
	const newUserFace = Cookies.get('userFace');	
	useEffect(() => {
		const setFormData = async () => {
			await setForm((old) => {
				return { ...old, 'userFace': newUserFace };
			});
		}
		setFormData();

		setTimeout(async () => {
			await applyMeasurement('three');
		}, 1000);

		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
	}, []);

	const changeBodyMesurement = async (e) => {
		setLoading(true);
		const { name, value } = e.target;
		await setForm((old) => {
			return { ...old, [name]: value };
		});

		if (name === 'chest') {
			setChestUpdate(true);
			setWaistUpdate(false);
			setHipUpdate(false);
		}
		if (name === 'waist') {
			setChestUpdate(false);
			setWaistUpdate(true);
			setHipUpdate(false);
		}
		if (name === 'hip') {
			setChestUpdate(false);
			setWaistUpdate(false);
			setHipUpdate(true);
		}
		setTimeout(async () => {
			document.getElementById("applyBtn").click();
		}, 400)
	}

	const changeSkinTone = async (skintonNo, skinColor) => {
		await applyMeasurement(skintonNo);
		form.skinColor = skinColor;
	}

	const applyMeasurement = async (skintonNo = '') => {
		if (currentMeasurement.height !== form.height) {
			form.heightUpdate = true;
		}
		form.chestUpdate = chestUpdate;
		form.waistUpdate = waistUpdate;
		form.hipUpdate = hipUpdate;
		form.skintonNo = skintonNo;

		let res = await ApplyMeasurementAction(form);
		if (res.success) {
			let data = res.data;
			let avatar = data.avatar_image;
			if (form.skintonNo !== "") {
				avatar = `avatar_img_${data.height}_${data.chest}_${data.waist}_${data.hip}_${skintonNo}.png`
			}
			await setForm((old) => {
				return { ...old, 'height': data.height, 'chest': data.chest, 'waist': data.waist, 'hip': data.hip, 'skin_tone': data.skin_tone, 'avatarImage': avatar, 'heightUpdate': form.heightUpdate, 'chestUpdate': form.chestUpdate, 'waistUpdate': form.waistUpdate, 'hipUpdate': form.hipUpdate, 'userFace': newUserFace };
			});
			await setCurrentMeasurement((old) => {
				return { ...old, 'height': data.height, 'chest': data.chest, 'waist': data.waist, 'hip': data.hip, 'skin_tone': data.skin_tone, 'avatarImage': avatar, 'heightUpdate': form.heightUpdate, 'chestUpdate': form.chestUpdate, 'waistUpdate': form.waistUpdate, 'hipUpdate': form.hipUpdate, 'userFace': newUserFace };
			});
			setLoading(false);
			console.log(form)
		}
	}

	const gotoFittingRoom = (e) => {
		Cookies.remove('selectedItems');
		Cookies.set('mesurementDetail', JSON.stringify(form));
		e.preventDefault()
		window.location.href = config.baseUrl + 'fittingRoom/' + customer_id
	}

	return (
		<>
			<Header></Header>
			<section className='measurements py-5'>
				<div className='filterone'></div>
				<div className='filtertwo'></div>
				<div className='circlebox1'>
					<img src='assets/images/circleshape.png' alt='circleshape' className='' />
				</div>
				<div className='circlebox2'>
					<img src='assets/images/circleshape.png' alt='circleshape' className='' />
				</div>
				<Container>
					<Row>
						<Col md={12} className="mx-auto">
							<Container fluid>
								<div className="tophead">
									<h4>&nbsp;</h4>
									<a href={`${config.baseUrl}takeyourphoto/${customer_id}`}> Go Back To Take Your Photo</a>
								</div>

								<Row className='justify-content-between' style={{ marginTop: '60px' }}>
									<Col md={6} xs={12} className="px-lg-5 mx-auto">
										<div className='charector'>
											<div className='charactorbox mb-5'>
												{!loading ?
													<>
														<div className={`facebox facebox_${form.height}_${form.chest}_${form.waist}_${form.hip}`} style={{ zIndex: 1 }}>
															<img src={`${form.userFace}`} alt="menface" id="userFace" style={{ borderRadius: '100%' }} />
															<div class="bottom_blur" style={{ background: form.skinColor }}></div>
														</div>
														<Color src={imgSrc} crossOrigin="anonymous" format="hex">
															{({ data, loading }) => {
																if (loading) return <Loading />;

																return (
																	<img src={`assets/avatarImg/${form.avatarImage}`} alt='charactor' className='colorRed' style={{ filter: `opacity(.5) drop-shadow(0 0 0 ${data})` }} />
																);
															}}
														</Color>

														<div className={`topwearDiv top_${form.height}_${form.chest}_${form.waist}_${form.hip}`}>
															<img src={config.imageUrl + topWearData.image} className='' alt="top wear" />
														</div>

														<div className={`bottomwearDiv bottom_${form.height}_${form.chest}_${form.waist}_${form.hip}`}>
															<img src={config.imageUrl + bottomWearData.image} className='' alt="bottom wear" />

														</div>
													</>
													:
													<>
														<div className="loader_box">
															<img src="assets/images/loading.gif" alt="loading" />
														</div>
													</>
												}

												{/* <div className="shirtbox">
													<img src="assets/images/shirtfour.png" alt="shirtfour"/>
												</div> */}



											</div>
										</div>
									</Col>

								</Row>
							</Container>
						</Col>
					</Row>


					<Row>
						<Col md={6} xs={12} className="pe-lg-5 mb-md-0 mb-5">
							<div className='bodyrange'>
								<Card className='rangecard'>
									<Card.Body>
										<Card.Title className='text-center'>Body Measurements</Card.Title>
										<Card.Text >
											Use the slider to select and Click Next
										</Card.Text>
										<p>Measurements is update according to BMI</p>
										{/* <Card.Subtitle className="mb-2 text-muted text-center">In | Cm</Card.Subtitle> */}
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Height</span>
												<span>{form.height} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="58" max="86" step="4" name="height" onChange={(e) => changeBodyMesurement(e)} value={form.height} />
											</div>
										</div>
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Chest</span>
												<span>{form.chest} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="31" max="59" step="4" name="chest" onChange={(e) => changeBodyMesurement(e)} value={form.chest} />
											</div>
										</div>
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Waist</span>
												<span>{form.waist} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="22" max="54" step="4" name="waist" onChange={(e) => changeBodyMesurement(e)} value={form.waist} />
											</div>
										</div>
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Hips</span>
												<span>{form.hip} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="31" max="55" step="4" name="hip" onChange={(e) => changeBodyMesurement(e)} value={form.hip} />
											</div>
										</div>
										<div className='mt-4 text-center'>
											<Card.Link href="javascript:void(0)" onClick={(e) => applyMeasurement(form.skintonNo)} className='clearbtn' id='applyBtn' style={{ display: 'none' }}>Apply</Card.Link>
											<Card.Link href={`${config.baseUrl}measurements/${customer_id}`} className='clearbtn'>Clear</Card.Link>
										</div>
									</Card.Body>
								</Card>
							</div>

						</Col>
						<Col md={6} xs={12} className="ps-lg-5">
							<div className='skinton'>
								<h4>Skin Tone</h4>
								<div className='colorton'>
									<div onClick={(e) => changeSkinTone('one', '#F6D2BC')} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone('two', '#F5C7AC')} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone('three', '#D5A789')} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone('four', '#E2A88C')} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone('five', '#D5A789')} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone('six', '#9A684A')} className='multicolor mb-3'></div>
								</div>
							</div>

						</Col>
					</Row>



					<Row>
						<Col>
							<div className='mt-5 text-center filterbtnbox'>
								<Card.Link href="javascript:void(0)" onClick={(e) => gotoFittingRoom(e)} className='welcomebtn'>Fitting Room <span><AiOutlineArrowRight /></span></Card.Link>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/*--------------------------  Measurements Exit --------------------------- */}


		</>
	)
}

export default Measurements;
