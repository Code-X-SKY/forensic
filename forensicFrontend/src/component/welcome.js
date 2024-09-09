import React from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import { Link } from 'react-router-dom';



const welcome = () => {
    return (
        <>
            <Header></Header>
            {/*-------------------------- Welcome Start --------------------------- */}

            <section className='welcome pt-5' style={{marginTop:'-40px'}}>
                <div className='filterone'></div>
                <div className='filtertwo'></div>
                <div className='cartoonone'>
                    <img src='assets/images/cartoonone.png' alt='cartoonone' className='' />
                </div>
                <div className='cartoontwo'>
                    <img src='assets/images/cartoontwo.png' alt='cartoontwo' className='' />
                </div>
                <Container>
                    <Row className='align-items-center'>
                        <Col md={9} className="mx-auto">
                            <Row>
                                <Col md={8} xs={12} className="mx-auto">
                                    <div className='welcomebox'>
                                        <div className='welimgbox'>
                                            <img src='assets/images/welcomeimg.png' alt='welcomeimg' className='' />
                                        </div>
                                        <div className='welbtnblock pt-5'>
                                            <Link to={`${config.baseUrl}existinguser`} className='welcomebtn' >Existing Customer</Link>
                                            <Link to={`${config.baseUrl}customer-register`} className='welcomebtn' >Add New Customer</Link>
                                        </div>
                    {/* <br/> */}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Welcome Exit --------------------------- */}


        </>
    )
}

export default welcome;
