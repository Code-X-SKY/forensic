import React from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FiEyeOff } from 'react-icons/fi';


const checkmail = () => {
    return (
        <>
            <Header></Header>
            {/*-------------------------- Check Mail Start --------------------------- */}

            <section className='checkmail pt-5'>
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
                                <Form autoComplete='off' className='formblock p-5'>
                                    <div className='emailbox mb-4'>
                                        <img src='assets/icons/emailicon.png' alt='emailicon' className='emailicon' />
                                    </div>
                                    <div className='forgethead mb-4'>
                                        <h4 className='text-center'>Check Your Mail</h4>
                                        <p>We have sent a password recover
                                            Instruction to your mail</p>
                                    </div>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email address" autoComplete="off" />
                                    </Form.Group>
                                    <Button variant="" type="submit" className='submit'>
                                        Back to Sign In
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Check Mail Exit --------------------------- */}


        </>
    )
}

export default checkmail;
