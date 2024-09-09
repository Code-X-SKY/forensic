import React, { useEffect, useState } from "react";
// import config from '../coreFIles/config'
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  getSubCategoryListAction,
  addSubCategoryAction,
  editSubCategoryAction,
  // deletesubCategoryAction,
  getCategoryListAction,
  getcategoryusersAction
} from "../Action/action";
// import Swal from "sweetalert2";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

const SubCategory = () => {
  const [subCategoryList, addsubCategoryList] = useState({});
  const [categoryDetails, setcategoryDetails] = useState({
    category_id: '', sub_category_name: '', description: ''
  });
  const [addcategoryDetails, setaddcategoryDetails] = useState({
    category_id: '', sub_category_name: '', description: ''
  });

  const [categoryLists, setCategoryLists] = useState([]);
  const [userlist, setuserlist] = useState([]);
  useEffect(() => {
    getSubCategoryList();
    getcategory();
    getcategoryusers()
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setcategoryDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const getcategoryusers = async () => {
    let res = await getcategoryusersAction();
    if (res.success) {
      setuserlist(res.data);
      console.log("asdf", res.data);
    }
  };

  const getcategory = async () => {
    let res = await getCategoryListAction();
    if (res.success) {
      setCategoryLists(res.data);
    }
  };

  const inputHandler1 = (e) => {
    const { name, value } = e.target;
    setaddcategoryDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const getSubCategoryList = async () => {
    let res = await getSubCategoryListAction();
    if (res.success) {
      addsubCategoryList(res.data);
    }
  };

  // function editCategory(item) {
  //   setcategoryDetails(item);
  // }

  const columns = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },
    {
      key: "category_name",
      text: "Category Name",
      cell: (item) => {
        return `${item.category_name}`;
      },
    },
    {
      key: "sub_category_name",
      text: "Sub Category Name",
      cell: (item) => {
        return `${item.sub_category_name}`;
      },
    },
    {
      key: "description",
      text: "Description",
      cell: (item) => {
        return `${item.description == null ? "" : item.description}`;
      },
    },

    // {
    //   key: "action",
    //   text: "Action",
    //   cell: (item) => {
    //     return (
    //       <>
    //         <button
    //           type="button"
    //           onClick={() => editCategory(item)}
    //           className="btn btn-primary btn-sm me-2"
    //           data-bs-toggle="modal"
    //           data-bs-target="#exampleModal"
    //           name={item.id}
    //           value={item.id}
    //         >
    //           Edit
    //         </button>

    //         <button
    //           type="button"
    //           onClick={() => DeleteCategory(item)}
    //           className="btn btn-primary btn-sm"
    //           name={item.id}
    //           value={item.id}
    //         >
    //           Delete
    //         </button>
    //       </>
    //     );
    //   },
    // },
    {
      key: "date",
      text: "Date",
      cell: (item) => {
        return `${moment(item.datetime).format("YYYY-MM-DD")}`;
      },
    },
  ];

  const configForTable = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    button: {
      excel: false,
      print: false,
    },
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    console.log("categoryDetails", categoryDetails);
    if (categoryDetails.category_id == '') {
      toast.error('Category name is required');
    }
    else if (categoryDetails.sub_category_name == '') {
      toast.error('Subcategoryname Id is required');
    }
    else if (categoryDetails.description == '') {
      toast.error('Description is required');
    }
    else {
      let res = await editSubCategoryAction(categoryDetails);
      if (res.success) {
        toast.success(res.msg);
        document.getElementsByClassName("closeModal")[0].click();
        getSubCategoryList();
      } else {
        toast.error(res.msg);
      }
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    console.log("addcategoryDetails", addcategoryDetails);
    if (addcategoryDetails.category_id == '') {
      toast.error('Category name is required');
    }
    else if (addcategoryDetails.sub_category_name == '') {
      toast.error('Subcategoryname Id is required');
    }
    else if (addcategoryDetails.description == '') {
      toast.error('Description is required');
    }
    else {
      let res = await addSubCategoryAction(addcategoryDetails);
      if (res.success) {
        toast.success(res.msg);
        document.getElementsByClassName("closeModal1")[0].click();
        getSubCategoryList();
      } else {
        toast.error(res.msg);
      }
    }

  };

  // const DeleteCategory = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete this sub category!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       console.log(id);
  //       let res = await deletesubCategoryAction({ id: id });
  //       if (res.success) {
  //         getSubCategoryList();

  //         Swal.fire("Deleted!", res.msg, "success");
  //       } else {
  //         Swal.fire("Failed!", res.msg, "error");
  //       }
  //     }
  //   });
  // };

  return (
    <>
      <div class="wrapper">
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
                      <h4 className="box-title">Sub Category List</h4>
                      {/* <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                      >
                        Add
                      </button> */}
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={subCategoryList}
                        columns={columns}
                      />
                    </div>
                  </div>
                </div>
              </div>
            
              {/*Edit Modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Edit Sub Category Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <form onSubmit={updateCategory}>
                      <div className="modal-body">
                        <div className="container">
                          <div className="mb-3">
                            <label className="col-form-label col-md-12">
                              Category
                            </label>
                            <div className="col-md-12">
                              <select
                                className="form-control"
                                name="category_id"
                                value={categoryDetails.category_id}
                                onChange={inputHandler}
                              >
                                <option value="">-Select Category-</option>
                                {categoryLists.map((item) => (
                                  <option value={item.id}>
                                    {item.category_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Sub Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Sub Category Name"
                              onChange={inputHandler}
                              name="sub_category_name"
                              value={categoryDetails.sub_category_name}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              onChange={inputHandler}
                              name="description"
                              value={categoryDetails.description}
                            />
                          </div>

                          <div className="modal-footer mt-20">
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary closeModal"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*Edit Modal Ends */}
              {/*Add Modal */}
              <div
                className="modal fade"
                id="exampleModal1"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add Sub Category Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <form onSubmit={addCategory}>
                      <div className="modal-body">
                        <div className="container">
                          <div className="mb-3">
                            <label className="col-form-label col-md-12">
                              Category
                            </label>
                            <div className="col-md-12">
                              <select
                                className="form-control"
                                name="category_id"
                                value={subCategoryList.category_id}
                                onChange={inputHandler1}
                              >
                                <option value="">-Select Category-</option>
                                {categoryLists.map((item) => (
                                  <option value={item.id}>
                                    {item.category_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Sub Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter sub category name"
                              onChange={inputHandler1}
                              name="sub_category_name"
                            //   value={addcategoryDetails.sub_category_name}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              onChange={inputHandler1}
                              placeholder="Enter description"
                              name="description"
                            //   value={addcategoryDetails.description}
                            />
                          </div>

                          <div className="modal-footer mt-20">
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary closeModal1"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*Add Modal Ends */}
            </section>
            {/* /.content */}
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default SubCategory;
