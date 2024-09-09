import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import { getAllItemAction } from "../Action/user.action";
const Slider1 = () => {
	const [allItemList, setAllItemList] = useState([])

	useEffect(() => {
		getAllItem()
	}, []);


	//===============================================  Get All Item   ================================

	const getAllItem = async () => {
		let res = await getAllItemAction();
		if (res.success) {
			setAllItemList(res.data.filter((item) => (parseInt(item.subcategory_id) === 4 && parseInt(item.size_id) === 2)));
		}
	}

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		vertical: false,
		verticalSwiping: true,
		beforeChange: function (currentSlide, nextSlide) {
			console.log("before change", currentSlide, nextSlide);
		},
		afterChange: function (currentSlide) {
			console.log("after change", currentSlide);
		}
	};

	const changeTopWear = (image) => {
		$("#topImg").attr("src", './assets/img/' + image);
		$("#topItem").attr("src", './assets/img/' + image);
	}
	const changeBottomWear = (image) => {
		$("#bottomImg").attr("src", './assets/img/' + image);
		$("#bottomItem").attr("src", './assets/img/' + image);
	}

	return (
		<>
			<Container fluid>
				{console.log('allItemList', allItemList)}
				<Row>
					<Col lg={9} className="mx-auto pt-5">
						<div className="slider">
							<div className='mainslider'>
								<div>
									{/* <Slider {...settings}>
										{allItemList.map((item) => (
											<div className="item-slide mb-2">
												<img src={config.imageUrl + item.image} onClick={(e) => changeTopWear('t_shirt3.png')} alt="t_shirt3" />
											</div>
										))}

									</Slider> */}

									<Slider {...settings}>
										<div className="item-slide mb-2">
											<img src="assets/img/t_shirt3.png" onClick={(e) => changeTopWear('t_shirt3.png')} alt="t_shirt3" />
										</div>
										<div className="item-slide mb-2">
											<img src="assets/img/img1.png" onClick={(e) => changeTopWear('img1.png')} alt="img1" />
										</div>
										{/* <div className="item-slide mb-2">
											<img src="assets/img/shirt1.png" onClick={(e) => changeTopWear('shirt1.png')} alt="shirt1" />
										</div>
                                        <div className="item-slide mb-2">
											<img src="assets/img/shirt2.png" onClick={(e) => changeTopWear('shirt2.png')} alt="shirt2" />
										</div> */}
										<div className="item-slide mb-2">
											<img src="assets/img/img6.png" onClick={(e) => changeTopWear('img6.png')} alt="img6" />
										</div>
										<div className="item-slide mb-2">
											<img src="assets/img/img9.png" onClick={(e) => changeTopWear('img9.png')} alt="img9" />
										</div>
										<div className="item-slide mb-2">
											<img src="assets/img/img7.png" onClick={(e) => changeTopWear('img7.png')} alt="img7" />
										</div>
										{/* <div className="item-slide mb-2">
											<img src="assets/img/pents4.png" onClick={(e) => changeBottomWear('pents4.png')} alt="pents2" />
										</div> */}
										<div className="item-slide mb-2">
											<img src="assets/img/pents3.png" onClick={(e) => changeBottomWear('pents3.png')} alt="pents3" />
										</div>
										<div className="item-slide mb-2">
											<img src="assets/img/pents2.png" onClick={(e) => changeBottomWear('pents2.png')} alt="pents2" />
										</div>
									</Slider>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Slider1
