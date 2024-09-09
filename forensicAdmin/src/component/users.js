import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getUsersListAction, userdeletetAction, updatekycapprovalAction, rejectkycapprovalAction } from '../Action/action';
import moment from 'moment';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { queryAllByAttribute } from '@testing-library/react';

const Users = () => {
  const [form, setForm] = useState({ from_date: '', to_date: '' });
  // const [registerusersHistory, setRegisterUsersHistory] = useState({});
  const [usersList, setusersList] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getUsersList();

  }, [])

  const getUsersList = async () => {

    setLoader(false)
    let res = await getUsersListAction();

    if (res.status) {
      console.log(res.Data)
      setLoader(false)
      setusersList(res.Data)
    }
  }

  const columns = [
    {
      key: "sno.",
      text: "Sno.",
      cell: (row, index) => index + 1
    },
    {
      key: "user_name",
      text: "User name",
      cell: (item)=> item.user_name
    },

    {
      key: "address",
      text: "Address",
      cell: (item)=> item.address
    },

    {
      key: "dob",
      text: "Date of birth",
      cell: (item)=> item.dob
    },

    {
      key: "mobile_number",
      text: "Mobile no.",
      cell: (item)=> item.mobile_number
    },

    
    {
      key: "action",
      text: "Action",
      cell: (item) => {
        return (
          <>
            <button
              onClick={() => deleteusers(item)}
              type="button"
              className="btn btn-sm btn-primary"
            >
              Delete
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
  }


  const deleteusers = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this customer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await await userdeletetAction({ 'id': id.id });
        if (res.success) {
          getUsersList();
          // toast.success(res.msg);
          Swal.fire(
            'Deleted!',
            res.msg,
            'success'
          )
        } else {
          Swal.fire(
            'Failed!',
            res.msg,
            'error'
          )
          // toast.error(res.msg);
        }
      }
    })
  }

  const updatekycRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Approve this Kyc Request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await updatekycapprovalAction(id);
        if (res.success) {
          Swal.fire("Approved!", res.msg, "success");
          setTimeout(() => {
            const id = window.location.href.split("/").pop();

            window.location.href = `${config.baseUrl}users`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const rejectkycRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Reject this Kyc request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await rejectkycapprovalAction(id);
        if (res.success) {
          Swal.fire("Rejected!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}users`;
          }, 2000);
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
                      <h4 className="box-title">Customers </h4>
                      {/* <div className='btnblock'>
                                            <button className='mainbutton' onClick={getUsersListReset}>Reset</button>
                                            <button className='mainbutton' onClick={getUsersListToday}>Today</button>
                                            <button className='mainbutton' onClick={getUsersListLastWeek}>Last Week</button>
                                            <button className='mainbutton' onClick={getUsersListlastMonth}> Month</button>
                                        </div> */}
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

        <Footer />
      </div>
    </>


  )

}
export default Users;