import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import { editCategoryAction, getCategoryDetailAction } from "../Action/action";
import toast, { Toaster } from "react-hot-toast";

const Categoryupdate = () => {
  // const [getcategorylist, setCategoryList] = useState({});
  const [form, setForm] = useState({ id: "", category_name: "", description:"" });
  useEffect(() => {
    getCategoryid();
  }, []);

  const getCategoryid = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getCategoryDetailAction({ id: id });
    if (res.success) {
      // setCategoryList(res.data);
      let data = res.data;
      setForm((old) => {
        return { ...old, id: id, category_name: data.category_name, description:data.description };
      });
    }
  };
  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let res = await editCategoryAction(form);
    if (res.success) {
      toast.success(res.msg);
      // setTimeout(() => {
      //   window.location.href = `${config.baseUrl}Category`;
      // }, 1200);
    } else {
      toast.error(res.msg);
    }
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
                      <h4 className="box-title">Edit Category</h4>
                    </div>
                    <div className="row mt-20 mb-50">
                      <div className="row">
                        <div className="col-md-2"></div>

                        <div className="col-md-8">
                          <div class="form-group row mb-1">
                            <label class="col-form-label col-md-12">
                              Category Name
                            </label>
                            <div class="col-md-12">
                              <input
                                class="form-control"
                                type="text"
                                name="category_name"
                                value={form.category_name}
                                onChange={inputHandler}
                                placeholder=""
                              />
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
                              Short Description
                            </label>
                            <div className="col-md-12">
                              <textarea value={form.description} className="form-control" name="description" onChange={inputHandler} placeholder="Description"></textarea>
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
                              Save Change
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
export default Categoryupdate;
