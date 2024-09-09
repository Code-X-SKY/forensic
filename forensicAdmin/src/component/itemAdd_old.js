import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import $ from 'jquery';
import Web3 from 'web3';

import { getCategoryListAction, getsizeAction, addItemAction, getAttributebyidListAction, getexpertlistAction, getsubcategorybyidAction } from "../Action/action";
import { type } from "@testing-library/user-event/dist/type";

const ItemAdd = () => {
	const [form, setForm] = useState({
		category_id: "",
		// expert_id: "",
		name: "",
		lable: "",
		// item_put_on: "1",
		image: "", previewImage: "./images/noimage.png",
		description: "",

		tag: "",
		size: [],

	});
	const [categoryList, setCategoryList] = useState([]);
	const [attributesList, setAttributesList] = useState([]);
	const [validatioError, setvalidatioError] = useState({});
	const [saving, setsaving] = useState(false);
	const [subcategoryList, setsubcategoryList] = useState([]);
	const [sizeList, setsizeList] = useState([]);

	useEffect(() => {
		getcategory();
		getsize()
	}, []);

	const getcategory = async () => {
		let res = await getCategoryListAction();
		if (res.success) {
			setCategoryList(res.data);
		}
	};

	const getsize = async () => {
		let res = await getsizeAction();
		if (res.success) {
			setsizeList(res.data);
			console.log("seze", res.data);
		}
	};


	const getattributesByid = async (id) => {
		let res = await getAttributebyidListAction({ 'category_id': id });
		if (res.success) {
			setAttributesList(res.data);
		}
	};

	const getsubcategorybyid = async (id) => {
		console.log("getsubcategorybyid", id);
		let res = await getsubcategorybyidAction({ 'category_id': id });
		if (res.success) {
			setsubcategoryList(res.data);
			console.log("setsubcategoryList", res.data);
		}
	};

	const inputHandler = async (e) => {
		const { name, value } = e.target;
		if (name == "size") {
			var sizeArr = [];
				$('input[type=checkbox]').each(function () {
					if (this.checked) {
						sizeArr.push($(this).val());
					}
				});
			await setForm((old) => {
				return { ...old, 'size': sizeArr };
			});
		}
		else{
			setForm((old) => {
				return { ...old, [name]: value };
			});
		}
		if (e.target.name == 'category_id') {
			getattributesByid(e.target.value)
			getsubcategorybyid(e.target.value)
		}
		
	};

	const inputHandler1 = (e) => {
		const { name, value } = e.target;
		setForm((old) => {
			return { ...old, [name]: value };
		});
	};

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			console.log(img);
			setForm((old) => {
				return { ...old, image: img, previewImage: URL.createObjectURL(img) };
			});
		}
	};

	function validate() {
		let category_nameError = "";
		let nameError = "";
		let lableError = "";
		let imageError = "";
		let descriptionError = "";
		let tagError = "";
		if (form.category_id == "") {
			category_nameError = "Category is required.";
		}
		if (form.name == "") {
			nameError = "Name is required.";
		}
		if (form.lable == "") {
			lableError = "Lable is required.";
		}
		if (form.image == "") {
			imageError = "Image is required.";
		}
		if (form.description == "") {
			descriptionError = "Description is required.";
		}
		if (form.tag == "") {
			tagError = "Tag is required.";
		}
		if (category_nameError || nameError || lableError || imageError || descriptionError || tagError) {
			setvalidatioError({
				category_nameError,
				nameError,
				lableError,
				imageError,
				descriptionError,
				tagError
			});
			return false;
		} else {

			return true;
		}
	}
	const submitForm = async (e) => {
		
		e.preventDefault();
		const isValid = validate();
		// if (!isValid) {
		// } else {
		// setsaving(true);
		// if (window.ethereum) {

		// 	let web3 = new Web3(window.ethereum);
		// 	let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

		// 	let currentNetwork = await web3.currentProvider.chainId;
		// 	// console.log(">>", currentNetwork)
		// 	web3.eth.defaultAccount = accounts[0];

		// 	if (currentNetwork != config.chainId) {
		// 		 toast.error('Please select Polygon smartchain!! ');
		// 		 // this.closeProcessingAlert()
		// 		 return false;
		// 	}
		// 	try {
		// 		const contract = await new web3.eth.Contract(config.AbiItemProposal, config.ContractItemProposal);

		// 		let owner = await contract.methods.totalOnboardings().call();
		// 		console.log(owner);
		// 		let trx_data = {
		// 			uri : 'https://espsofttech.org/',
		// 			maxShares : parseInt(form.share_quantity),
		// 			preSaleStart : Date.now(),
		// 			preSaleEnd : new Date(form.sell_end_date).valueOf(),
		// 			minimumTarget : parseInt(form.share_quantity),
		// 			sharePrice : parseInt(form.share_price),
		// 			paymentToken : config.paymentToken.toString(),
		// 		}
		// 		// console.log('trx_data', trx_data);
		// 		let tx_builder = await contract.methods.createOnboarding(trx_data.uri, trx_data.maxShares, trx_data.preSaleStart, trx_data.preSaleEnd, trx_data.minimumTarget, trx_data.sharePrice, trx_data.paymentToken);
		// 		// console.log('trx_response', tx_builder)

		// 		let encoded_tx = tx_builder.encodeABI();

		// 		let gasPrice = await web3.eth.getGasPrice();
		// 		gasPrice = parseInt(gasPrice) + parseInt(10000000000);

		// 		let gasLimit = await web3.eth.estimateGas({
		// 			 gasPrice: web3.utils.toHex(gasPrice),
		// 			 to: config.ContractItemProposal,
		// 			 from: accounts[0],
		// 			 chainId: config.chainId,
		// 			 data: encoded_tx
		// 		});

		// 		const txData = await web3.eth.sendTransaction({
		// 			 gasPrice: web3.utils.toHex(gasPrice),
		// 			 gas: web3.utils.toHex(gasLimit),
		// 			 to: config.ContractItemProposal,
		// 			 from: accounts[0],
		// 			 chainId: config.chainId,
		// 			 data: encoded_tx
		// 		});

		// 		if (txData.transactionHash) {

		let atData = [];
		$(".attr").map(function () {
			let b = {
				'attribute_id': $(this).data('attr_id'),
				'value': $(this).val()
			}
			atData.push(b)
		});
		form.attribute_data = JSON.stringify(atData);
		form.size = form.size;



		console.log("form", form);
		let res = await addItemAction(form);
		if (res.success) {
			toast.success(res.msg);
			setTimeout(() => {
				window.location.href = `${config.baseUrl}itemList`;
			}, 1200);
		} else {
			setsaving(false)
			toast.error(res.msg);
		}
		// 		}else{

		// 		}

		// 	}
		// 	catch (err) {
		// 		 console.log(err);
		// 		}
		//  }
		//  else{
		// 	setsaving(false);
		// 	toast.error('Please connect your Metamask wallet!');
		// 	return;
		//  }

		// }
	};

	return (
		<>

			<div className="wrapper">
				{/* <div id="loader"></div> */}
				<Header />
				<Toaster />
				<Sidebar />
				<div className="content-wrapper">
					<div className="container-full">


						{/* Main content */}
						<section className="content">
							<div className="row">
								<div className="col-lg-12 col-12">
									<div className="box">
										<div className="box-header with-border">
											<h4 className="box-title">Add New Item</h4>
											<a className="text-primary"
												href={`${config.baseUrl}itemList`}
											>
												<i className="fa fa-arrow-left"></i> Back
											</a>
										</div>
										<div className="row mt-20 mb-50">
											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-8">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Category
														</label>
														<div className="col-md-12">
															<select className="form-control" name="category_id" value={form.category_id} onChange={inputHandler}>
																<option value="">-Select Category-</option>
																{categoryList.map((item) => (
																	<option value={item.id}>
																		{item.category_name}
																	</option>
																))}
															</select>
														</div>
														<span className="validationErr">
															{validatioError.category_nameError}
														</span>
													</div>
												</div>
												<div className="col-md-2"></div>
											</div>

											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-8">
													<div className="form-group row mb-1">

														<label className="col-form-label col-md-12">
															Select Sub Category
														</label>
														<div className="col-md-12">
															<select className="form-control" name="subcategory_id" onChange={inputHandler}>
																{subcategoryList.map((item) => (
																	<option value={item.id}>
																		{item.sub_category_name}
																	</option>
																))}
															</select>
														</div>

													</div>


												</div>
												<div className="col-md-2"></div>

											</div>

											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-8">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Name
														</label>
														<div className="col-md-12">
															<input
																className="form-control"
																type="text" autoComplete="off"
																name="name"
																value={form.name}
																onChange={inputHandler}
																placeholder="Item Name"
															/>
														</div>
														<span className="text-danger">
															{validatioError.nameError}
														</span>
													</div>
												</div>
												<div className="col-md-2"></div>
											</div>

											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-4">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Lable
														</label>
														<div className="col-md-12">
															<input
																className="form-control"
																type="text" autoComplete="off"
																name="lable"
																value={form.lable}
																onChange={inputHandler}
																placeholder="Lable"
															/>
														</div>

													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Tags
														</label>
														<div className="col-md-12">
															<select className="form-control" name="tag" value={form.tag} onChange={inputHandler}>
																<option value="" selected>Select Below</option>

																<option value={1}>Best Seller</option>
																<option value={2}>New Item</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-md-2"></div>
											</div>


											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-8">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Image
														</label>
														<div className="col-md-12">
															<input
																className="form-control"
																type="file"
																name="image"
																onChange={onImageChange}
															/>
															<img src={form.previewImage} width="100px" height="100px"></img>
														</div>
														<span className="validationErr">
															{validatioError.imageError}
														</span>
													</div>
												</div>
												<div className="col-md-2"></div>
											</div>

											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-8">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Short Description
														</label>
														<div className="col-md-12">
															<textarea className="form-control" value={form.description} name="description" onChange={inputHandler} placeholder="Description"></textarea>
														</div>
														<span className="validationErr">
															{validatioError.descriptionError}
														</span>
													</div>
												</div>
												<div className="col-md-2"></div>
											</div>

											<div className="row">
												<div className="col-md-2"></div>
												{/* <label>Select Size </label> */}
												<div className="col-md-8 d-flex" >
													<label className="mr-5">Select Size:</label> <br />
													{sizeList.map((item, index) => (
														<>
															<div className="mb-3 form-check">
																<label class="form-check-label mx-2" for="exampleCheck1">
																	{item.size_name}
																</label>
																<input
																	name="size"
																	value={item.id}
																	type="checkbox"
																	className="form-check-input"
																	onChange={inputHandler}
																/>
															</div>
														</>
													))}



													<div className="col-md-2"></div>
												</div>
											</div>

											<div className="row">
												<div className="col-md-2"></div>
												<div className="col-md-8">
													<div className="form-group row mb-1">
														{attributesList.map((item, index) => (
															<>

																<label className="col-form-label col-md-12">
																	Attributes	{item.attribute_name}
																</label>
																<div className="col-md-12">
																	<input
																		className="form-control attr"
																		key={index}
																		type="text" autoComplete="off"
																		data-attr_id={item.id}
																		// onChange={(e)=>inputHandlerAttr(item.id, e.target.value)}
																		placeholder={`Enter ${item.attribute_name}`}
																	// value = {form.}
																	/>
																</div>
																<span className="validationErr">
																	{/* {validatioError.brandError} */}
																</span>
															</>
														))}
													</div>
												</div>

											</div>

											<div className="text-center">
												<br />
												{!saving ?
													<button
														type="submit"
														className="btn btn-primary"
														onClick={submitForm}
													>
														Save
													</button>
													:
													<button
														type="submit"
														className="btn btn-primary"
														disabled
													>
														Please wait <i className="fa fa-spinner fa-spin"></i>
													</button>
												}
											</div>
										</div>

									</div>
								</div>
							</div>
						</section>
						{/* /.content */}
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
};
export default ItemAdd;
