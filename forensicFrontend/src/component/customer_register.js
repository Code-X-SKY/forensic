import React, { useState, useEffect } from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toast, { Toaster } from 'react-hot-toast';
import { CustomerRegisterAction } from '../Action/user.action';


const CustomerRegister = () => {
	const [form, setForm] = useState({ username: '', email: '', mobile_number: '', gender: '1', dob: '', address: false })
	const [validatioError, setvalidatioError] = useState({ usernameError: '', emailError: '' });
	const [isLoading, setisLoading] = useState(false);
	var d = new Date();
	var pastYear = d.getFullYear() - 10;
	d.setFullYear(pastYear);
	const [currentDate, setcurrentDate] = useState(d);
	const [dateValid, setdateValid] = useState('')

	useEffect(() => {
		convertDate(currentDate)
	}, [])


	function convertDate(currentDate) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = new Date(currentDate)

		//2013-01-02
		console.log('ssssssssssssss', [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-'))
		setdateValid([d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-'))
	}

	const inputHandler = (e) => {
		const { name, value, id } = e.target
		if (value != '') {
			setvalidatioError((old) => {
				return { ...old, [id]: '' }
			})
		}

		setForm((old) => {
			return { ...old, [name]: value }
		})
	}

	function validate() {
		let usernameError = "";
		let emailError = "";
		let mobileNumberError = "";
		let DOBError = "";
		let addressError = "";

		if (form.username === '') {
			usernameError = "Username is required."
		}
		if (form.email === '') {
			emailError = "Email is required."
		}
		if (form.mobile_number === '') {
			mobileNumberError = "Mobile number is required."
		}
		if (form.mobile_number.length > 10) {
			mobileNumberError = "Mobile number should not be more than 10 digits."
		}
		if (form.mobile_number.length < 10) {
			mobileNumberError = "Mobile number should not be less than 10 digits."
		}
		if (form.dob === '') {
			DOBError = "DOB is required."
		}
		if (form.address === '') {
			addressError = "Address is required."
		}
		if (emailError || mobileNumberError || DOBError || addressError || usernameError) {
			setvalidatioError({
				emailError, mobileNumberError, DOBError, addressError, usernameError
			})
			return false
		} else {
			return true
		}
	}

	const SubmitForm = async (e) => {
		e.preventDefault()
		const isValid = validate();
		if (!isValid) {

		}
		else {
			setisLoading(true);
			let res = await CustomerRegisterAction(form);
			if (res.success) {
				toast.success(res.msg);
				setisLoading(false);
				setTimeout(() => {
					window.location.href = config.baseUrl + `takeyourphoto/${res.data}`
				}, 1000);
			} else {
				setisLoading(false);
				toast.error(res.msg);
			}
		}
	}

	return (
		<>
			<Toaster />
			<Header></Header>
			{/*-------------------------- Customer Register Start --------------------------- */}

			<section className='customerregister pt-5'>
				<div className='filterone'></div>
				<div className='filtertwo'></div>
				<div className='circlebox1'>
					<img src='assets/images/circleshape.png' alt='circleshape' className='' />
				</div>
				<div className='circlebox2'>
					<img src='assets/images/circleshape.png' alt='circleshape' className='' />
				</div>
				<Container>
					<div className="tophead">
						<h4 className="mb-4 text-center">&nbsp;</h4>
						<a href={`${config.baseUrl}welcome`}> Go Back</a>
					</div>
					<Row className='align-items-center'>
						<Col md={7} xs={12} className="mx-auto">
							<div className='exitform'>
								<Form autoComplete='off' className='formblock' onSubmit={SubmitForm}>
									<div className='forgethead mb-4'>
										<h4 className='text-center'>Register User for Forensic </h4>
									</div>

									<Form.Group className="mb-3">
										<Form.Label>User Name</Form.Label>
										<Form.Control type="text" id="usernameError" name='username' placeholder="Enter your username" autoComplete="off" onChange={inputHandler} />
										<span className="validationErr">{validatioError.usernameError}</span>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Email Address</Form.Label>
										<Form.Control type="email" name='email' id='emailError' placeholder="Enter your email address" autoComplete="off" onChange={inputHandler} />
										<span className="validationErr">{validatioError.emailError}</span>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Mobile Number<span className='text-danger'>*</span></Form.Label>
										<Form.Control type="text" onChange={inputHandler} name="mobile_number" id="mobileNumberError" onKeyPress={(event) => { if (!/^\d*[]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} placeholder="Enter your Mobile No..." autoComplete="off" />
										<span className="validationErr">{validatioError.mobileNumberError}</span>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Date of Birth</Form.Label>
										<Form.Control type="date" name="dob" max={dateValid} onChange={inputHandler} id="DOBError" placeholder="Enter your D.O.B...." autoComplete="off" />
										<span className="validationErr">{validatioError.DOBError}</span>
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Address</Form.Label>
										<Form.Control as="textarea" onChange={inputHandler} id="addressError" placeholder="Enter your address..." name="address" />
										<span className="validationErr">{validatioError.addressError}</span>
									</Form.Group>
			
									<div className='mt-4'>
										<Button variant="" type="submit" className='submit'>
											Submit
										</Button>
									</div>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/*-------------------------- Customer Register Exit --------------------------- */}


		</>
	)
}

export default CustomerRegister;
