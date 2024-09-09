import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import $ from 'jquery';
import { getCategoryListAction, getsizeAction, addItemAction, getsubcategorybyidAction } from "../Action/action";

const ItemAdd = () => {
	const [form, setForm] = useState({
		category_id: "",
		name: "",
		image: "", previewImage: "./images/noimage.png",
		left_side: "", previewImageLeft: "./images/noimage.png",
		right_side: "", previewImageRight: "./images/noimage.png",
		description: "",
		size: [],
	});
	const [categoryList, setCategoryList] = useState([]);
	const [validatioError, setvalidatioError] = useState({});
	const [saving, setsaving] = useState(false);
	const [subcategoryList, setsubcategoryList] = useState([]);
	const [sizeList, setsizeList] = useState([]);

	useEffect(() => {
		getcategory();
	}, []);

	const getcategory = async () => {
		let res = await getCategoryListAction();
		if (res.success) {
			setCategoryList(res.data);
		}
	};

	const getsize = async (itemCateg) => {
		let res = await getsizeAction();
		if (res.success) {
			if (itemCateg == 1) {
				setsizeList(res.data.filter((item) => item.category_lable == 'bottom'));
			}
			else if (itemCateg == 5) {
				setsizeList(res.data.filter((item) => item.category_lable == 'foot'));
			}
			else {
				setsizeList(res.data.filter((item) => item.category_lable == 'top'));
			}
		}
	};

	const getsubcategorybyid = async (id) => {
		let res = await getsubcategorybyidAction({ 'category_id': id });
		if (res.success) {
			setsubcategoryList(res.data);

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
		else {
			setForm((old) => {
				return { ...old, [name]: value };
			});
		}
		if (e.target.name == 'category_id') {
			getsize(e.target.value)
			getsubcategorybyid(e.target.value)


		}

	};

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setForm((old) => {
				return { ...old, image: img, previewImage: URL.createObjectURL(img) };
			});
		}
	};

	const onImageChangeLeft = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setForm((old) => {
				return { ...old, left_side: img, previewImageLeft: URL.createObjectURL(img) };
			});
		}
	};


	const onImageChangeRight = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setForm((old) => {
				return { ...old, right_side: img, previewImageRight: URL.createObjectURL(img) };
			});
		}
	};

	function validate() {
		let category_nameError = "";
		let nameError = "";
		let imageError = "";
		let imageErrorLeft = "";
		let imageErrorRight = "";
		let descriptionError = "";
		if (form.category_id == "") {
			category_nameError = "Category is required.";
		}
		if (form.name == "") {
			nameError = "Name is required.";
		}
		if (form.image == "") {
			imageError = "Image is required.";
		}
		if (form.description == "") {
			descriptionError = "Description is required.";
		}
		if (category_nameError || nameError || imageError || descriptionError) {
			setvalidatioError({
				category_nameError,
				nameError,
				imageError,
				descriptionError,
			});
			return false;
		} else {
			return true;
		}
	}

	const submitForm = async (e) => {
		e.preventDefault();
		const isValid = validate();
		try {
			if (!isValid) {
			}
			else {
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
			}
		} catch (err) {
			toast.error(err.response.data.msg);
		}
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
																<option value="0" disabled selected>Select Subcategory</option>
																{subcategoryList.map((item) => (
																	<>
																		<option value={item.id}>
																			{item.sub_category_name}
																		</option>
																	</>
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
												<div className="col-md-3">
													<div className="form-group row mb-1">
														<label className="col-form-label col-md-12">
															Image
														</label>

														<div className="col-md-12">
															<input
																className="form-control"
																type="file" style={{ marginBottom: '15px' }}
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
												{form.category_id == 5 ?
													<>
														<div className="col-md-3">
															<div className="form-group row mb-1">
																<label className="col-form-label col-md-12">
																	Left Side Image
																</label>
																<div className="col-md-12">
																	<input
																		className="form-control"
																		type="file" style={{ marginBottom: '15px' }}
																		name="left_side"
																		onChange={onImageChangeLeft}
																	/>
																	<img src={form.previewImageLeft} width="100px" height="100px"></img>
																</div>
																<span className="validationErr">
																	{validatioError.imageErrorLeft}
																</span>
															</div>
														</div>

														<div className="col-md-2">
															<div className="form-group row mb-1">
																<label className="col-form-label col-md-12">
																	Right Side Image
																</label>
																<div className="col-md-12">
																	<input
																		className="form-control"
																		type="file" style={{ marginBottom: '15px' }}
																		name="right_side"
																		onChange={onImageChangeRight}
																	/>
																	<img src={form.previewImageRight} width="100px" height="100px"></img>
																</div>
																<span className="validationErr">
																	{validatioError.imageErrorRight}
																</span>
															</div>
														</div>
													</>
													: ''
												}
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


											{form.category_id == '' ?
												'' :

												<div className="row">
													<div className="col-md-2"></div>
													<div className="col-md-8 d-flex" style={{ marginTop: '6px' }}>
														<label className="mr-5">Select Size</label> <br />
														{sizeList.map((item, index) => (
															<>
																<div className="mb-3 form-check" style={{ marginLeft: '10px' }}>
																	<label class="form-check-label mx-2" for="exampleCheck1">
																		{item.size}
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


											}




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
