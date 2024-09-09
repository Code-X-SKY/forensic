import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  getCategoryListAction,
  // deleteCategoryAction,
  addCategoryAction,
  editCategoryAction,
} from "../Action/action";
// import Swal from "sweetalert2";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

const Categories = () => {
  const [CategoryList, addCategoryList] = useState({});
  const [categoryDetails, setcategoryDetails] = useState({});
  const [addcategoryDetails, setaddcategoryDetails] = useState({});

  useEffect(() => {
    getCategoryList();
   

  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setcategoryDetails((old) => {
      return { ...old, [name]: value };
    });
  };


  const inputHandler1 = (e) => {
    const { name, value } = e.target;
    setaddcategoryDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const getCategoryList = async () => {
    let res = await getCategoryListAction();
    if (res.success) {
      addCategoryList(res.data);
    }
  };

  // function editCategory(item) {
  //   setcategoryDetails(item);
  //   $('.modal-backdrop').remove();
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
    let res = await editCategoryAction(categoryDetails);
    if (res.success) {
      toast.success(res.msg);
      document.getElementsByClassName("closeModal")[0].click();
      getCategoryList();
    } else {
      toast.error(res.msg);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    console.log("addcategoryDetails", addcategoryDetails);
    let res = await addCategoryAction(addcategoryDetails);
    if (res.success) {
      toast.success(res.msg);
      document.getElementsByClassName("closeModal1")[0].click();
      getCategoryList();
    } else {
      toast.error(res.msg);
    }
  };

  // const DeleteCategory = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete this category!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       console.log(id);
  //       let res = await deleteCategoryAction({ id: id });
  //       if (res.success) {
  //         getCategoryList();

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
                      <h4 className="box-title">Category List</h4>
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
                        records={CategoryList}
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
                        Edit Category Details
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
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter category name"
                              onChange={inputHandler}
                              name="category_name"
                              value={categoryDetails.category_name}
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
                              placeholder="Enter category description"
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
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add Category Details
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
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter category name"
                              onChange={inputHandler1}
                              name="category_name"
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
                              placeholder="Enter category description"
                              name="description"
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
export default Categories;
