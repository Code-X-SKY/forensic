import React, { useState, useEffect } from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { RegisterAction } from '../Action/user.action';

const Signup = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirm_password: '', referral_address: '', termscondition: false })
    const [validatioError, setvalidatioError] = useState({ usernameError: '', emailError: '' });
    const [isLoading, setisLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

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
        let passwordError = "";
        let confirmPasswordError = "";
        let termsconditionError = "";

        if (form.username === '') {
            usernameError = "Username is required."
        }
        if (form.email === '') {
            emailError = "Email is required."
        }
        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (form.confirm_password === '') {
            confirmPasswordError = "Confirm password is required."
        }
        if (form.password != form.confirm_password && (form.password && form.confirm_password)) {
            confirmPasswordError = "Password and confirm password does not match."
        }
        if (form.termscondition === false) {
            termsconditionError = "Terms and conditions checkbox required."
        }
        if (emailError || passwordError || confirmPasswordError || termsconditionError || usernameError) {
            setvalidatioError({
                emailError, passwordError, confirmPasswordError, termsconditionError, usernameError
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
            let res = await RegisterAction(form);
            if (res.success) {
                toast.success(res.msg);
                setisLoading(false);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}login`
                }, 2000);
            } else {
                setisLoading(false);
                toast.error(res.msg);
            }
        }
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <>
            <Toaster />
            <Header></Header>
            {/*-------------------------- Signup Start --------------------------- */}
            <section className='signup py-5'>
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
                        <Col md={6} xs={12} className="mx-auto">
                            <div className='logintextbox'>
                                <Form autoComplete='off' onSubmit={SubmitForm}>
                                    <h4>Sign Up</h4>
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

                                    <Form.Group className="mb-3">
                                        <div className='forgotpass'>
                                            <Form.Label>Password</Form.Label>
                                        </div>
                                        <div className='passwordinner'>
                                            <Form.Control type={passwordType} id='passwordError' name="password" placeholder="Create a password 6+ characters" autoComplete="off" onChange={inputHandler} />
                                            <span>
                                                {passwordType == 'password' ?
                                                    <FiEyeOff onClick={togglePassword} className='eyeicon' />
                                                    :
                                                    <FiEye onClick={togglePassword} className='eyeicon' />
                                                }
                                            </span>
                                        </div>
                                        <span className="validationErr">{validatioError.passwordError}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <div className='forgotpass'>
                                            <Form.Label>Confirm Password</Form.Label>
                                        </div>
                                        <div className='passwordinner'>
                                            <Form.Control type={passwordType} id='confirmPasswordError' name='confirm_password' placeholder="Conform your password " autoComplete="off" onChange={inputHandler} />
                                        </div>
                                        <span className="validationErr">{validatioError.confirmPasswordError}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3 checkblock">
                                        <Form.Check type="checkbox" name='termscondition' id='termsconditionError' onChange={inputHandler} label="" />
                                        <p>Creating an account means you’re okay with our <Link href="#"> Terms
                                            of  Service, Privacy Policy ,</Link> and our default <Link href="#">Notification
                                                Settings. </Link>
                                            <br />
                                            <span className="validationErr">{validatioError.termsconditionError}</span>
                                        </p>
                                    </Form.Group>

                                    {isLoading ?
                                        <Button variant="" className='submit'>
                                            Processing....
                                        </Button>
                                        :
                                        <Button variant="" type="submit" className='submit'>
                                            Create Account
                                        </Button>
                                    }
                                    <Form.Group className="mt-3">
                                        <Form.Label className='signaccount'>
                                            Already have an account? <Link to={`${config.baseUrl}login`}> Sign in here.</Link>
                                        </Form.Label>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Signup Exit --------------------------- */}


        </>
    )
}

export default Signup;
