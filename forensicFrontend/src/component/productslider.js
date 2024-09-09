import React from 'react';
import config from '../coreFIles/config';
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FiEyeOff } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import Slider from 'react-slick';
import Slider1 from './slider1';
import Carousel from 'react-bootstrap/Carousel';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/FreeMode';



const productslider = () => {
    return (
        <>
            <Header></Header>
            {/*-------------------------- Fitting T-Shirts Start --------------------------- */}

            <section className='fittingtshirts py-5'>
                <div className='filterone'></div>
                <div className='filtertwo'></div>

                <Container>
                    <Row className=''>
                        <Col md={8} className="mx-auto">
                            <div className='proslide'>
                                <Swiper
                                    direction={"vertical"}
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    mousewheel={true}
                                    nextEl='swiper-button-next' 
                                    prevEl='swiper-button-prev' 
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[ Pagination]}
                                className="mySwiper"
                                >
                                <SwiperSlide>
                                    <img src="assets/images/slide1.jpg" alt="slide1" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="assets/images/slide2.jpg" alt="slide2" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="assets/images/slide3.jpg" alt="slide3" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="assets/images/slide4.jpg" alt="slide4" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="assets/images/slide5.jpg" alt="slide5" />
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

            {/*-------------------------- Fitting T-Shirts Exit --------------------------- */ }


        </>
    )
}

export default productslider;
