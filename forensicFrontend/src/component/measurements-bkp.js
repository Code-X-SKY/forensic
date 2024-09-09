import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FiEyeOff } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie'
import { ApplyMeasurementAction } from "../Action/user.action";

const Measurements = () => {
	const [form, setForm] = useState({ 'height': "4", 'waist': "28", 'shoulder': "14", 'chest': "36", 'abdominal': "26", 'skinTone': 1, 'avatarImage': "avatar2.png", 'avatar': 2 });
	// const [part1, setpart1] = useState({
	// 	'position': 'absolute',
	// 	'top': '-50px',
	// 	'left': '180px',
	// 	'width': '115px',
	// 	'height': '350px',
	// });
	// const [part2, setpart2] = useState({
	// 	'position': 'absolute',
	// 	'top': '100px',
	// 	'left': '207px',
	// 	'width': '60px',
	// 	'height': '130px',
	// });
	// const [part3, setpart3] = useState({
	// 	'position': 'absolute',
	// 	'top': '118px',
	// 	'left': '205px',
	// 	'width': '65px',
	// 	'height': '180px',
	// });
	// const [part4, setpart4] = useState({
	// 	'position': 'absolute',
	// 	'top': '232px',
	// 	'left': '160px',
	// 	'width': '156px',
	// 	'height': '148px',
	// });
	const params = useParams();

	let customer_id = params.customer_id;

	const applyMeasurement = async () => {

		// if (form.height >= 4 && form.height <= 5 && form.shoulder >= 12 && form.shoulder <= 14 && form.waist >= 25 && form.waist <= 30 && form.abdominal >= 24 && form.abdominal <= 28 ) {
		if (form.height == 4) {
			await setpart1((old) => {
				return { ...old, 'top': '-50px', 'left': '131px', 'width': '115px', 'height': '350px' };
			});
			await setpart2((old) => {
				return { ...old, 'top': '100px', 'left': '160px', 'width': '60px', 'height': '130px' };
			});
			await setpart3((old) => {
				return { ...old, 'top': '118px', 'left': '158px', 'width': '65px', 'height': '180px' };
			});
			await setpart4((old) => {
				return { ...old, 'top': '232px', 'left': '112px', 'width': '156px', 'height': '145px' };
			});
		}
		else if (form.height == 5) {
			// else if (form.height > 5 && form.height <= 6 && form.shoulder >= 15 && form.shoulder <= 16 && form.waist >= 31 && form.waist <= 34 && form.abdominal >= 29 && form.abdominal <= 31 ) {
			await setpart1((old) => {
				return { ...old, 'top': '-57px', 'left': '131px', 'width': '120px', 'height': '351px' };
			});
			await setpart2((old) => {
				return { ...old, 'top': '97px', 'left': '160px', 'width': '64px', 'height': '132px' };
			});
			await setpart3((old) => {
				return { ...old, 'top': '118px', 'left': '156px', 'width': '70px', 'height': '180px' };
			});
			await setpart4((old) => {
				return { ...old, 'top': '236px', 'left': '111px', 'width': '159px', 'height': '160px' };
			});
		}
		else if (form.height == 6) {
			// else if (form.height > 5 && form.height <= 6 && form.shoulder >= 15 && form.shoulder <= 16 && form.waist >= 31 && form.waist <= 34 && form.abdominal >= 29 && form.abdominal <= 31 ) {
			await setpart1((old) => {
				return { ...old, 'top': '-57px', 'left': '130px', 'width': '130px', 'height': '351px' };
			});
			await setpart2((old) => {
				return { ...old, 'top': '97px', 'left': '160px', 'width': '73px', 'height': '132px' };
			});
			await setpart3((old) => {
				return { ...old, 'top': '118px', 'left': '158px', 'width': '77px', 'height': '185px' };
			});
			await setpart4((old) => {
				return { ...old, 'top': '236px', 'left': '110px', 'width': '173px', 'height': '173px' };
			});
		}
		else if (form.height == 7) {
			// else if (form.height > 5 && form.height <= 6 && form.shoulder >= 15 && form.shoulder <= 16 && form.waist >= 31 && form.waist <= 34 && form.abdominal >= 29 && form.abdominal <= 31 ) {
			await setpart1((old) => {
				return { ...old, 'top': '-57px', 'left': '130px', 'width': '134px', 'height': '351px' };
			});
			await setpart2((old) => {
				return { ...old, 'top': '103px', 'left': '161px', 'width': '75px', 'height': '132px' };
			});
			await setpart3((old) => {
				return { ...old, 'top': '129px', 'left': '158px', 'width': '81px', 'height': '185px' };
			});
			await setpart4((old) => {
				return { ...old, 'top': '253px', 'left': '111px', 'width': '175px', 'height': '185px' };
			});
		}
		else if (form.height == 8) {
			// else if (form.height > 5 && form.height <= 6 && form.shoulder >= 15 && form.shoulder <= 16 && form.waist >= 31 && form.waist <= 34 && form.abdominal >= 29 && form.abdominal <= 31 ) {
			await setpart1((old) => {
				return { ...old, 'top': '-57px', 'left': '128px', 'width': '138px', 'height': '351px' };
			});
			await setpart2((old) => {
				return { ...old, 'top': '104px', 'left': '161px', 'width': '76px', 'height': '132px' };
			});
			await setpart3((old) => {
				return { ...old, 'top': '133px', 'left': '157px', 'width': '84px', 'height': '187px' };
			});
			await setpart4((old) => {
				return { ...old, 'top': '259px', 'left': '112px', 'width': '175px', 'height': '190px' };
			});
		}

		// form.avatar = avatar;
		// form.skinTone = skinton;
		// let res = await ApplyMeasurementAction(form);
		// if (res.success) {
		// 	console.log(res);
		// 	let data = res.data;
		// 	await setForm((old) => {
		// 		return { ...old, 'avatarImage': data.avatar_image, 'avatar': data.avatarNo };
		// 	});
		// } else {

		// }
	}

	const changeWaistMesurement = async (e) => {
		const { name, value } = e.target;
		await setpart2((old) => {
			return { ...old, 'top': '104px', 'left': '161px', 'width': '76px', 'height': '132px' };
		});
	}

	const changeAvatar = async (e) => {
		setForm((old) => {
			return { ...old, 'avatar': e };
		});
		await applyMeasurement(e, form.skinTone);
	}

	const changeSkinTone = async (e) => {
		setForm((old) => {
			return { ...old, 'skinTone': e };
		});
		await applyMeasurement(form.avatar, e);
	}

	const changeBodyMesurement = async (e) => {
		const { name, value } = e.target;
		await setForm((old) => {
			return { ...old, [name]: value };
		});
	}



	const gotoFittingRoom = (e) => {
		Cookies.set('mesurementDetail', JSON.stringify(form));
		e.preventDefault()
		window.location.href = config.baseUrl + 'fittingRoom/' + customer_id
	}



	return (

		<>
			<Header></Header>
			{/*--------------------------  Measurements Start --------------------------- */}

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
					<Row className='justify-content-between'>
						<Col md={6} xs={12} className="px-lg-5 mx-auto">
							<div className='charector'>
								<div className='charactorbox mb-5'>
									{/* <img src={`assets/avatarImg/${form.avatarImage}`} alt='charactor' className='' /> */}

									{/* <iframe width="100%" height="800" src="https://sketchfab.com/models/1c587dd0c424419ebb76284b7ef7d975/embed?autostart=1&amp;preload=1" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe> */}

									<img src={`assets/bodyParts/1.png`} style={{ position: part1.position, top: part1.top, left: part1.left, width: part1.width, height: part1.height }} />
									<img src={`assets/bodyParts/2.png`} style={{ position: part2.position, top: part2.top, left: part2.left, width: part2.width, height: part2.height }} />
									<img src={`assets/bodyParts/3.png`} style={{ position: part3.position, top: part3.top, left: part3.left, width: part3.width, height: part3.height }} />
									<img src={`assets/bodyParts/4.png`} style={{ position: part4.position, top: part4.top, left: part4.left, width: part4.width, height: part4.height }} />
								</div>

								<div className='zoomicons'>
									<span><AiOutlinePlus /></span>
									<div className='zoomrange'>
										<Form.Range className='rangeslide' />
									</div>
									<span><AiOutlineMinus /></span>
								</div>
							</div>
						</Col>
					</Row>

					<Row>
						<Col md={6} xs={12} className="pe-lg-5">
							<div className='bodyrange'>
								<Card className='rangecard'>
									<Card.Body>
										<Card.Title className='text-center'>Body Measurements</Card.Title>
										<Card.Text >
											Use the slider to select and Click Next
										</Card.Text>
										{/* <Card.Subtitle className="mb-2 text-muted text-center">In | Cm</Card.Subtitle> */}
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Height</span>
												<span>{form.height} Feet</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="4" max="8" name="height" onChange={(e) => changeBodyMesurement(e)} value={form.height} />
											</div>
										</div>
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Waist</span>
												<span>{form.waist} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="24" max="40" name="waist" onChange={(e) => changeWaistMesurement(e)} value={form.waist} />
											</div>
										</div>
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Shoulder</span>
												<span>{form.shoulder} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="12" max="18" name="shoulder" onChange={(e) => changeBodyMesurement(e)} value={form.shoulder} />
											</div>
										</div>
										{/* <div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Chest</span>
												<span>{form.chest} Inch</span>
											</div>
											<div>
												<Form.Range className='rangeslide' min="30" max="50" name="chest" onChange={(e) => changeBodyMesurement(e)} value={form.chest} />
											</div>
										</div> */}
										<div className='rangeblock'>
											<div className='rangehead mb-3'>
												<span>Abdominal</span>
												<span>{form.abdominal} Inch</span>
											</div>
											<div>
												{/* <input type='range' class="form-range" /> */}
												<Form.Range className='rangeslide' min="24" max="50" name="abdominal" onChange={(e) => changeBodyMesurement(e)} value={form.abdominal} />
											</div>
										</div>
										<div className='mt-4 text-center'>
											<Card.Link href="javascript:;" onClick={applyMeasurement} className='clearbtn'>Apply</Card.Link>
											<Card.Link href="/measurements" className='clearbtn'>Clear</Card.Link>
										</div>
									</Card.Body>
								</Card>
							</div>
						</Col>
						<Col md={6} xs={12} className="ps-lg-5">
							<div className='skinton'>
								<h4>Skin Tone</h4>
								<div className='colorton'>
									<div onClick={(e) => changeSkinTone(1)} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone(2)} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone(3)} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone(4)} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone(5)} className='multicolor mb-3'></div>
									<div onClick={(e) => changeSkinTone(6)} className='multicolor mb-3'></div>
									{/* <div className='multicolor'></div> */}
								</div>
							</div>
							<Row>
								<Col md={3}>
									<div className="dummy-character">
										<a href="javascript:;" onClick={(e) => changeAvatar(1)}><img src={`assets/dummy/avatar1.png`} alt='charactor' className='' /></a>
									</div>
								</Col>
								<Col md={3}>
									<div className="dummy-character">
										<a href="javascript:;" onClick={(e) => changeAvatar(2)}><img src={`assets/dummy/avatar2.png`} alt='charactor' className='' /></a>
									</div>
								</Col>
								<Col md={3}>
									<div className="dummy-character">
										<a href="javascript:;" onClick={(e) => changeAvatar(3)}><img src={`assets/dummy/avatar3.png`} alt='charactor' className='' /></a>
									</div>
								</Col>
								<Col md={3}>
									<div className="dummy-character">
										<a href="javascript:;" onClick={(e) => changeAvatar(4)}><img src={`assets/dummy/avatar4.png`} alt='charactor' className='' /></a>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>



					<Row>
						<Col>
							<div className='mt-5 text-center filterbtnbox'>
								<Card.Link href="javascript:;" onClick={(e) => gotoFittingRoom(e)} className='welcomebtn'>Fitting Room <span><AiOutlineArrowRight /></span></Card.Link>
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
