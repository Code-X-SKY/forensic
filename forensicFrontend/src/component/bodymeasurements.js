import React from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import { Link } from 'react-router-dom';

const bodymeasurements = () => {
    return (
        <>
            <Header></Header>
            {/*-------------------------- Body Measurements Start --------------------------- */}

            <section className='bodymeasurements py-5'>
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
                        <Col md={9} className="mx-auto">
                            <Row>
                                <Col md={8} xs={12} className="mx-auto">
                                    <div className='welcomebox'>
                                        <div className='welimgbox mb-5'>
                                            <img src='assets/images/takephoto.png' alt='takephoto' className='' />
                                        </div>
                                        <div className='welbtnblock pt-5'>
                                            <Link to="#" className='welcomebtn' > Body Measurements</Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*-------------------------- Body Measurements Exit --------------------------- */}
        </>
    )
}

export default bodymeasurements;
