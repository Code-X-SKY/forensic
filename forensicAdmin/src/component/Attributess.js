import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  getAttributesListAction,
  deleteAttributeAction,
  addAttributeAction,
  editAttributeAction,
  getCategoryListAction,
} from "../Action/action";
import Swal from "sweetalert2";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

const Attributess = () => {
  const [attributes, addattributes] = useState({});
  const [attributeDetails, setattributeDetails] = useState({});
  const [addattributeDetails, setaddattributeDetails] = useState({});
  const [categoryLists, setCategoryLists] = useState([]);

  useEffect(() => {
    getattributes();
    getcategory();
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setattributeDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const getcategory = async () => {
    let res = await getCategoryListAction();
    if (res.success) {
      setCategoryLists(res.data);
    }
  };

  const inputHandler1 = (e) => {
    const { name, value } = e.target;
    setaddattributeDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const getattributes = async () => {
    let res = await getAttributesListAction();
    if (res.success) {
      addattributes(res.data);
    }
  };

  function editAttribute(item) {
    setattributeDetails(item);
  }

  const columns = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },
    {
      key: "category_name",
      text: "Category",
      cell: (item) => {
        return `${item.category_name == null ? "" : item.category_name}`;
      },
    },
    {
      key: "attribute_name",
      text: "Attribute Name",
      cell: (item) => {
        return `${item.attribute_name}`;
      },
    },

    {
      key: "date",
      text: "Date",
      cell: (item) => {
        return `${moment(item.datetime).format("DD/MM/YYYY")}`;
      },
    },

    {
      key: "action",
      text: "Action",
      cell: (item) => {
        return (
          <>
            <button
              type="button"
              onClick={() => editAttribute(item)}
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              name={item.id}
              value={item.id}
            >
              Edit
            </button>
            <br />
            <br />
            <button
              type="button"
              onClick={() => DeleteAttribute(item)}
              className="btn btn-primary btn-sm"
              name={item.id}
              value={item.id}
            >
              Delete
            </button>
          </>
        );
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
    console.log("attributeDetails", attributeDetails);
    let res = await editAttributeAction(attributeDetails);
    if (res.success) {
      toast.success(res.msg);
      document.getElementsByClassName("closeModal")[0].click();
      getattributes();
    } else {
      toast.error(res.msg);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    console.log("addattributeDetails", addattributeDetails);
    let res = await addAttributeAction(addattributeDetails);
    if (res.success) {
      toast.success(res.msg);
      document.getElementsByClassName("closeModal1")[0].click();
      getattributes();
    } else {
      toast.error(res.msg);
    }
  };

  const DeleteAttribute = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this attribute!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(id);
        let res = await deleteAttributeAction({ id: id });
        if (res.success) {
          getattributes();

          Swal.fire("Deleted!", res.msg, "success");
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

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
                      <h4 className="box-title">User Guide List</h4>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                      >
                        Add
                      </button>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={attributes}
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
                <div className="modal-dialog">
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
                            <label className="col-form-label col-md-12">
                              Category
                            </label>
                            <div className="col-md-12">
                              <select
                                className="form-control"
                                name="category_id"
                                value={attributeDetails.category_id}
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
                              Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Title"
                              onChange={inputHandler}
                              name="attribute_name"
                              value={attributeDetails.attribute_name}
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
                            <label className="col-form-label col-md-12">
                              Category
                            </label>
                            <div className="col-md-12">
                              <select
                                className="form-control"
                                name="category_id"
                                value={addattributeDetails.category_id}
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
                              Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter attribute_name"
                              onChange={inputHandler1}
                              name="attribute_name"
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
export default Attributess;
