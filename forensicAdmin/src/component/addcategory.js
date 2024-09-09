import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import { addCategoryAction } from "../Action/action";

const Addcategory = () => {
  const [form, setForm] = useState({ category_name: "" });
  const [validatioError, setvalidatioError] = useState({});

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  function validate() {
    let category_nameError = "";
    if (form.category_name === "") {
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
      let res = await addCategoryAction(form);
      if (res.success) {
        toast.success(res.msg);
        setTimeout(() => {
          window.location.href = `${config.baseUrl}Category`;
        }, 1200);
      } else {
        toast.error(res.msg);
      }
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
                      <h4 className="box-title">Add Category</h4>
                    </div>
                    <div className="row mt-20 mb-50">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <div className="form-group row mb-1">
                            <label className="col-form-label col-md-12">
                              Category Name
                            </label>
                            <div className="col-md-12">
                              <input
                                className="form-control"
                                type="text"
                                name="category_name"
                                value={form.category_name}
                                onChange={inputHandler}
                                placeholder="Category Name"
                              />
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
                              Short Description
                            </label>
                            <div className="col-md-12">
                              <textarea className="form-control" name="description" onChange={inputHandler} placeholder="Description">
                              {form.description}
                              </textarea>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2"></div>
                        
                      </div>

                      <div className="text-center">
                      <br />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={submitForm}
                            >
                              Save
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
export default Addcategory;
