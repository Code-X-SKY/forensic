import React, { useState, useEffect } from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import LoginHeader from '../directories/loginHeader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

import { LoginAction, verifyAccountAction } from '../Action/user.action';
const Login = () => {

    if (Cookies.get('loginSuccessVirtualTrial')) {
        window.location.href = `${config.baseUrl}welcome`;
      }

    const [form, setForm] = useState({ email: '', password: '' })
    const [validatioError, setvalidatioError] = useState({});
    const [isLoading, setisLoading] = useState(false);
    let { token } = useParams();
    const [passwordType, setPasswordType] = useState("password");

    useEffect(() => {
        if (token) {
            verifyAccountAPI()
        }
    }, []);

    const verifyAccountAPI = async () => {
        let res = await verifyAccountAction({ 'token': token });
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                window.location.href = `${config.baseUrl}login`;
            }, 1000);
        } else {
            toast.error(res.msg);
        }
    }

    const inputHandler = (e) => {
        const { name, value, id } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, [id]: '' }
            })
        }

    }

    function validate() {
        let emailError = "";
        let passwordError = "";

        if (form.email === '') {
            emailError = "Email is required."
        }
        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (emailError || passwordError) {
            setvalidatioError({
                emailError, passwordError
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

            setTimeout(async () => {
                let res = await LoginAction(form);
                if (res.success) {
                    toast.success(res.msg);
                    Cookies.set('loginSuccessVirtualTrial', JSON.stringify(res.data));
                    Cookies.set('token', JSON.stringify(res.Token));
                    setTimeout(() => {
                        window.location.href = `${config.baseUrl}welcome`;
                    }, 2000);
                } else {
                    setisLoading(false);
                    toast.error(res.msg);
                }
            }, 1000);
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
            <LoginHeader></LoginHeader>
            {/*-------------------------- Login Start --------------------------- */}

            <section className='login pt-5'>
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
                                <h4>Sign In</h4>
                                {/* <div className='googlebtn my-4'>
                                    <Link href="#">
                                                    <span><img src='assets/icons/google_icon.png' alt='google_icon' />Continue with Google</span>
                                                </Link>

                                    <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Sign in with Google"
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                    />

                                </div>
                                <div className='orline'>
                                    <p>Or</p>
                                </div> */}
                                <Form autoComplete="off" onSubmit={SubmitForm}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" name='email' id='emailError' placeholder="Enter your email address" autoComplete="off" onChange={inputHandler} />
                                        <span className="validationErr">{validatioError.emailError}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <div className='forgotpass'>
                                            <Form.Label>Password</Form.Label>
                                            {/* <Link to={`${config.baseUrl}forgetpassword`}>
                                                Forgot Password ?
                                            </Link> */}
                                        </div>
                                        <div className='passwordinner'>
                                            <Form.Control type={passwordType} id='passwordError' name="password" placeholder="Create a password 6+ characters" autoComplete="off" onChange={inputHandler} />
                                            {passwordType === 'password' ?
                                                <FiEyeOff onClick={togglePassword} className='eyeicon' />
                                                :
                                                <FiEye onClick={togglePassword} className='eyeicon' />
                                            }
                                        </div>
                                        <span className="validationErr">{validatioError.passwordError}</span>
                                    </Form.Group>
                                    {isLoading ?
                                        <Button className='submit'>
                                            Processing
                                        </Button>
                                        :
                                        <Button variant="" type="submit" className='submit'>
                                            Sign In
                                        </Button>
                                    }

                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Login Exit --------------------------- */}


        </>
    )
}

export default Login;
