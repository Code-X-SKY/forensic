import React, { useState } from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ForgotPasswordAction } from '../Action/user.action';

const Forgetpassword = () => {
    const [form, setForm] = useState({ email: '' })
    const [validatioError, setvalidatioError] = useState({});

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

        if (form.email === '') {
            emailError = "Email is required."
        }
        if (emailError) {
            setvalidatioError({
                emailError
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
            let res = await ForgotPasswordAction(form);
            if (res.success) {
                setForm((old) => {
                    return { ...old, ['email']: '' }
                })
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}login`;
                }, 3000);
            } else {
                toast.error(res.msg);
            }
        }
    }

    return (
        <>
            <Toaster />
            <Header></Header>
            {/*-------------------------- Forget Password Start --------------------------- */}

            <section className='forgetpassword pt-5'>
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
                                        <h4 className='text-center'>Forgot your Password?</h4>
                                        <p>Enter your registered email address below, we will send the instructions.</p>
                                    </div>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control name="email" id='emailError' onChange={inputHandler} type="email" placeholder="Enter Email Address" autoComplete="off" />
                                        <span className="validationErr">{validatioError.emailError}</span>
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Label className='forgetback'>
                                            <Link to={`${config.baseUrl}login`}> Back to the Login
                                            </Link>
                                        </Form.Label>
                                    </Form.Group>
                                    <Button variant="" type="submit" className='submit'>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Forget Password Exit --------------------------- */}


        </>
    )
}

export default Forgetpassword;
