import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getUsersListDataAction, editUserAction } from '../Action/action';
import moment from 'moment';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { queryAllByAttribute } from '@testing-library/react';

const UsersList = () => {
  const [form, setForm] = useState({ from_date: '', to_date: '' });
  // const [registerusersHistory, setRegisterUsersHistory] = useState({});
  const [usersList, setusersList] = useState({});
  const [loader, setLoader] = useState(true);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    getUsersList();

  }, [])

  const getUsersList = async () => {

    setLoader(false)
    let res = await getUsersListDataAction();

    if (res.success) {
      console.log(res.data)
      setLoader(false)
      setusersList(res.data)
    }
  }

  function editUser(item) {
    setuserDetails(item);
  }

  const columns = [
    {
      key: "sno.",
      text: "Sno.",
      cell: (row, index) => index + 1
    },
    {
      key: "username",
      text: "Operator name",
      cell: (item)=> item.user_name
    },

    {
      key: "email",
      text: "Email",
      cell: (item)=> item.email
    },
    
    {
      key: "action",
      text: "Action",
      cell: (item) => {
        return (
          <>
          <button
              type="button"
              onClick={() => editUser(item)}
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              name={item.id}
              value={item.id}
            >
              Edit
            </button> &nbsp;

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
    pagination: 'advance',
    button: {
      excel: false,
      print: false

    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setuserDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let res = await editUserAction({'id':userDetails.id,'email':userDetails.email,'user_name':userDetails.user_name,'password':userDetails.password});
    if (res.success) {
      toast.success(res.msg);
      document.getElementsByClassName("closeModal")[0].click();
    } else {
      toast.error(res.msg);
    }
  };

  return (

    <>
      <div class="wrapper">
        {/* <div id="loader"></div> */}
        <Toaster />
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">


            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">

                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Operator</h4>
                  
                    </div>
                    <div className="box-body">

                      {!loader ?
                        <ReactDatatable
                          config={configForTable}
                          records={usersList}
                          columns={columns}
                        />
                        :
                        <>
                          <br />
                          <br />
                          <center><h4><i className='fa fa-spinner fa-spin'></i> &nbsp; Please wait</h4></center>
                          <br />
                          <br />
                        </>
                      }

                    </div>
                  </div>
                </div>

              </div>
            </section>
            {/* /.content */}
            {/* /.content */}
          </div>
        </div>



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
                        Edit Operator Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <form onSubmit={updateUser}>
                      <div className="modal-body">
                        <div className="container">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Operator Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Operator Name"
                              onChange={inputHandler}
                              name="user_name"
                              value={userDetails.user_name}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Operator Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Operator Email"
                              onChange={inputHandler}
                              name="email"
                              value={userDetails.email}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter password"
                              onChange={inputHandler}
                              name="password"
                              value={userDetails.password}
                            />
                          </div>

                          <div className="modal-footer mt-20">
                            <button type="submit" disabled={!userDetails.user_name || !userDetails.email || !userDetails.password} class="btn btn-primary">
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

        <Footer />
      </div>
    </>


  )

}
export default UsersList;