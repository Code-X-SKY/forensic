import React, { useState, useEffect } from 'react';
import config from '../coreFIles/config';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap/';
import Header from '../directories/header';
import { Link } from 'react-router-dom';
import uploadcare from 'uploadcare-widget'
import Cookies from 'js-cookie'
import { updateCustomersImageAction, getProfilePicAction } from '../Action/user.action';
import toast, { Toaster } from 'react-hot-toast';

const Takeyourphoto = () => {
	// const [form, setForm] = useState({});
	const params = useParams();
	// const [loading, setLoading] = useState(false);
	const [imageData, setimageData] = useState('')
	// const [profileData, setprofileData] = useState('')

	let customer_id = params.customer_id;

	useEffect(() => {
		getProfilePic()
		Cookies.remove('userFace');
		const widget = uploadcare.SingleWidget("[role=uploadcare-uploader]");
		widget.onUploadComplete(fileInfo => {
			document.getElementById('preview').src = 'assets/images/loading.gif';
			document.getElementById('preview').style.width = '200px';
			document.getElementById('preview').style.height = '200px';
			document.getElementById('preview').style.borderRadius = '100%';
			setimageData(fileInfo.cdnUrl)
			setTimeout(() => {
				document.getElementById('preview').src = fileInfo.cdnUrl;
			}, 3000);
		});
	}, []);


	const getProfilePic = async () => {

		let res = await getProfilePicAction({
			id: customer_id
		});
		if (res.status === true) {
			// console.log('ccccccccccc', res.data.profile_pic)
			if (res.data.profile_pic != null && res.data.profile_pic != "") {
				document.getElementById('preview').style.width = '200px';
				document.getElementById('preview').style.height = '200px';
				document.getElementById('preview').style.borderRadius = '100%';
				document.getElementById('preview').src = res.data.profile_pic;
				setimageData(res.data.profile_pic)
			}
		}
		else {
		}
	}


	const updateProfilePic = async (e) => {
		e.preventDefault() 
		if(imageData == ""){
			toast.error('Face image required!');
			return;
		}
		let res = await updateCustomersImageAction({
			id: customer_id,
			profile_pic: document.getElementById('preview').src
		});
		if (res.success) {
			Cookies.set('userFace', document.getElementById('preview').src);

			setTimeout(() => {
				window.location.href = config.baseUrl + `measurements/${customer_id}`
			}, 1000);
		}
	}






	return (
		<>
			<Header></Header>
			{/*-------------------------- Take Your Photo Start --------------------------- */}
			<Toaster />
			<section className='takephoto py-5'>
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
						<a href={`${config.baseUrl}existinguser`}> Go Back</a>
					</div>
					<Row className='align-items-center'>
						<Col md={9} className="mx-auto">
							<Row>
								<Col md={8} xs={12} className="mx-auto">
									<div className='welcomebox'>
										<div className='welimgbox mb-5'>
											<center>
												<img src='assets/images/takephoto.png' alt='takephoto' id="preview" />
											</center>
										</div>
										<div className='welbtnblock pt-5'>
											<input type="hidden" role="uploadcare-uploader" name="my_file" data-crop="1:1" />
											<Link className='welcomebtn' onClick={updateProfilePic} to=''>Body Measurement</Link>
										</div>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	)
}

export default Takeyourphoto;