import React, { useState } from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { ResetPasswordAction } from '../Action/user.action';

const Changepassword = () => {
    let { token } = useParams();
    const [form, setForm] = useState({ password: '', confirm_password: '', token: token })
    const [validatioError, setvalidatioError] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

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
        let passwordError = "";
        let confirmPasswordError = "";

        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (form.confirm_password === '') {
            confirmPasswordError = "Confirm password is required."
        }
        if (form.password != form.confirm_password && (form.password && form.confirm_password)) {
            confirmPasswordError = "Password and confirm password does not match."
        }
        if (passwordError || confirmPasswordError) {
            setvalidatioError({
                passwordError, confirmPasswordError
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
            let res = await ResetPasswordAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}login`;
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
            {/*-------------------------- Change Password Start --------------------------- */}

            <section className='changepassword pt-5'>
                <div className='filterone'></div>
                <div className='filtertwo'></div>
                <div className='circlebox1'>
                    <img src='assets/images/circleshape.png' alt='circleshape' className='' />
                </div>
                <div className='circlebox2'>
                    <img src='assets/images/circleshape.png' alt='circleshape' className='' />
                </div>
                <Container>
                    <Row className='align-items-center'>
                        <Col md={6} xs={12} className="mx-auto">
                            <div className='logintextbox'>
                                <Form autoComplete='off' className='formblock p-5' onSubmit={SubmitForm}>
                                    <div className='forgethead mb-4'>
                                        <h4 className='text-center'>Change Password</h4>
                                    </div>
                                    <Form.Group className="mb-3">
                                        <div className='forgotpass'>
                                            <Form.Label>New Password</Form.Label>
                                        </div>
                                        <div className='passwordinner'>
                                            <Form.Control name="password" id='passwordError' onChange={inputHandler} type={passwordType} placeholder="***********" />
                                            {passwordType == 'password' ?
                                                <FiEyeOff onClick={togglePassword} className='eyeicon' />
                                                :
                                                <FiEye onClick={togglePassword} className='eyeicon' />
                                            }
                                        </div>
                                        <span className="validationErr">{validatioError.passwordError}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <div className='forgotpass'>
                                            <Form.Label>Confirm Password</Form.Label>
                                        </div>
                                        <div className='passwordinner'>
                                            <Form.Control name="confirm_password" id='confirmPasswordError' onChange={inputHandler} type={passwordType} placeholder="***********" autoComplete="off" />
                                        </div>
                                        <span className="validationErr">{validatioError.confirmPasswordError}</span>
                                    </Form.Group>
                                    <Button variant="" type="submit" className='submit'>
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Change Password Exit --------------------------- */}


        </>
    )
}

export default Changepassword;
