import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import $ from 'jquery';
import { getCategoryListAction, getsubcategorybyidAction, getsizeAction, getItemDetailAction, editItemAction } from "../Action/action";

const ItemUpdate = () => {
	const [form, setForm] = useState({
		category_id: "", name: "", size: [],
		description: "", subcategory_id: "", sizeArr: [],
		image: "", previewImage: "./images/noimage.png",
		left_side: "", previewImageLeft: "./images/noimage.png",
		right_side: "", previewImageRight: "./images/noimage.png",
	});
	const [categoryList, setCategoryList] = useState([]);
	const [validatioError, setvalidatioError] = useState({});
	const [subcategoryList, setsubcategoryList] = useState([]);
	const [sizeList, setsizeList] = useState([]);
	const [sizeStr, setsizeStr] = useState("");
	const [sizeArr2, setsizeArr2] = useState([]);
	
	useEffect(() => {
		getcategory();
		getItemDetail();
	}, []);

	const getsubcategorybyid = async (id) => {
		let res = await getsubcategorybyidAction({ 'category_id': id });
		if (res.success) {
			setsubcategoryList(res.data);
		}
	};

	const getsize = async (itemCateg) => {
		console.log('ffffffffffffffffffffff',itemCateg)
		let res = await getsizeAction();
		if (res.success) {
			if (itemCateg.category_id == 1) {
				setsizeList(res.data.filter((item) => item.category_lable == 'bottom'));
			}
			else if (itemCateg.category_id == 5) {
				setsizeList(res.data.filter((item) => item.category_lable == 'foot'));
			}
			else {
				setsizeList(res.data.filter((item) => item.category_lable == 'top'));
			}
		}
	};

	const getcategory = async () => {
		let res = await getCategoryListAction();
		if (res.success) {
			setCategoryList(res.data);
		}
	};

	const getItemDetail = async () => {
		const id = window.location.href.split("/").pop();
		let res = await getItemDetailAction({ 'item_id': id });
		if (res.success) {
			let data = res.data;
			let datasize = res.data.size_id.join(",")
			setsizeStr(datasize)
			setsizeArr2(res.data.size_id)
			if (data.attributes.length == 0) {
				getsubcategorybyid(data.category_id)
			} else {
				getsubcategorybyid(data.category_id)
			}
			setForm((old) => {
				return {
					...old,
					'item_id': id,
					'category_id': data.category_id,
					'name': data.name,
					'description': data.description,
					"subcategory_id": data.subcategory_id,
					'image': data.image,
					'left_side': data.left_side,
					'right_side': data.right_side,
				};
			});
			getsize(res.data)
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
	const inputHandler = async (e) => {
		const { name, value } = e.target;
		if (e.target.name == 'size') {
			setsizeStr("")
			
			var sizeArr = [];
			// console.log(e.target);
			$('input[type=checkbox]').each(function () {
				if (this.checked) {
					sizeArr.push($(this).val());
				}
			});
			await setForm((old) => {
				return { ...old, 'size': sizeArr };
			});

			let datasize = sizeArr.join(",")
			setsizeStr(datasize)

			form.size = sizeArr;
		}
		else {
			setForm((old) => {
				return { ...old, [name]: value };
			});
		}
		if (e.target.name == 'category_id') {
			const iid = window.location.href.split("/").pop();
			let res = await getItemDetailAction({ 'item_id': iid });
			let data = res.data;
			if (value == data.category_id) {
				getItemDetail();
				getsubcategorybyid(data.category_id)
			}
			else {
				getsubcategorybyid(e.target.value)
			}
		}
	};

	function validate() {
		let category_nameError = "";
		if (form.category === "") {
			category_nameError = "Category is required.";
		}
		if (category_nameError) {
			setvalidatioError({
				category_nameError,
			});
			return false;
		} else {
			return true;
		}
	}

	const submitForm = async (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) {

		} else {
			let atData = [];
			$(".attr").map(function () {
				let b = {
					'attribute_id': $(this).data('attr_id'),
					'value': $(this).val()
				}
				atData.push(b)
			});
			if (form.image.name == undefined) {
				form.image = form.image
			}
			if (form.left_side?.name == undefined) {
				form.left_side = form.left_side
			}
			if (form.right_side?.name == undefined) {
				form.right_side = form.right_side
			}
			if (form.size.length == 0) {
				form.size = sizeStr
			}
			form.attribute_data = JSON.stringify(atData);;
			let res = await editItemAction(form);
			if (res.success) {
				toast.success(res.msg);
				setTimeout(() => {
					window.location.href = `${config.baseUrl}itemList`;
				}, 1200);
			} else {
				toast.error(res.msg);
			}
		}
	};

	return (
		<>
			<div className="wrapper">
				<Header />
				<Toaster />
				<Sidebar />
				<div className="content-wrapper">
					<div className="container-full">
						<section className="content">
							<div className="row">
								<div className="col-lg-12 col-12">
									<div className="box">
										<div className="box-header with-border">
											<h4 className="box-title">Update Item</h4>
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
															<select className="form-control" name="subcategory_id" onChange={inputHandler} value={form.subcategory_id}>
																{subcategoryList?.map((item) => (
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

															<img src={form.previewImage == './images/noimage.png' ? config.imageUrl + form.image : form.previewImage} width="100px" height="100px"></img>
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
																{console.log('ssssssssssssss-------------',form.previewImageLeft)}
																<div className="col-md-12">
																	<input
																		className="form-control"
																		type="file" style={{ marginBottom: '15px' }}
																		name="left_side"
																		onChange={onImageChangeLeft}
																	/>
																	<img src={form.previewImageLeft == './images/noimage.png' ? config.imageUrl + form.left_side : form.previewImageLeft} width="100px" height="100px"></img>
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
																	<img src={form.previewImageRight == './images/noimage.png' ? config.imageUrl + form.right_side : form.previewImageRight} width="100px" height="100px"></img>
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

													</div>
												</div>
												<div className="col-md-2"></div>
											</div>

											{form.category_id == '' ?
												''
												:
												<div className="row">
													<div className="col-md-2"></div>
													<div className="col-md-8 d-flex" >
														<label className="mr-5">Select Size </label> <br />
														{sizeList.map((item, index) => (
															sizeStr.includes(item.id.toString()) ?
																<>
																	<div className="mb-3 form-check" style={{ marginLeft: '10px' }}>
																		<label class="form-check-label mx-2" for="exampleCheck1">
																			{item.size}

																		</label>
																		<input
																			name="size"
																			value={item.id}
																			type="checkbox"
																			checked={sizeStr.includes(item.id.toString()) ? sizeStr.includes(item.id.toString()) : ""}
																			className="form-check-input"
																			onChange={inputHandler}
																		/>
																	</div>
																</>
																: <div className="mb-3 form-check" style={{ marginLeft: '10px' }}>
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
														))}
														<div className="col-md-2"></div>
													</div>
												</div>
											}

											<div className="text-center">
												<br />
												<button disabled={!form.category_id || !form.subcategory_id || !form.name || !form.image || !form.description}
													type="submit"
													className="btn btn-primary"
													onClick={submitForm}
												>
													Update
												</button>
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
export default ItemUpdate;
