import React, { Component, useEffect, useState } from 'react'
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getordersListDataAction, editUserAction } from '../Action/action';
import config from '../coreFIles/config';

const OrdersList = () => {
    const [form, setForm] = useState({ from_date: '', to_date: '' });
    // const [registerusersHistory, setRegisterUsersHistory] = useState({});
    const [ordersList, setordersList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [userDetails, setuserDetails] = useState([]);

    useEffect(() => {
        getordersList();

    }, [])

    const getordersList = async () => {

        setLoader(false)
        let res = await getordersListDataAction();

        if (res.success) {
            console.log(res.data)
            setLoader(false)
            setordersList(res.data)
        }
    }

    function editUser(item) {
        // console.log();
        setuserDetails(JSON.parse(item.items));
    }

    const columns = [
        {
            text: "Sno.",
            cell: (row, index) => index + 1
        },
        {
            key:'user_name',
            text: "Customer Name",
            cell: (item) => item.user_name
        },

        {
            key:'email',
            text: "Email",
            cell: (item) => item.email
        },
        {
            key:"mobile_number",
            text: "Mobile Number",
            cell: (item) => item.mobile_number
        },
        {
            text: "Profile Picture",
            cell: (item) =>
                <>
                    <a target="_blank" href={item.userFace == 'assets/images/menface.png' ? './images/avatar/avatar-1.png' : item.userFace}>
                        <img src={item.userFace == 'assets/images/menface.png' ? './images/avatar/avatar-1.png' : item.userFace} className="img-responsive" style={{ width: '50px', height: '50px' }} />
                    </a>
                </>
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
                            View
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



    return (

        <>
            <div class="wrapper">
                {/* <div id="loader"></div> */}
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">


                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">

                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Order List</h4>

                                        </div>
                                        <div className="box-body">

                                            {!loader ?
                                                <ReactDatatable
                                                    config={configForTable}
                                                    records={ordersList}
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
                                    View Order Details
                                </h5>
                                <button style={{backgroundColor:'fff'}}
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="mb-3 view_order">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {console.log('dddddddddddd',JSON.parse(userDetails[0]?.items))} */}
                                                    {(userDetails).map((item, index) => (
                                                        <tr>
                                                            <>
                                                                <td>{index + 1}</td>
                                                                <td>{item.name}</td>
                                                                <td>
                                                                    <a href={config.imageUrl + item.image} target="_blank">
                                                                        <img style={{ height: '50px', width: '50px' }} src={config.imageUrl + item.image} /></a></td>

                                                            </>
                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </table>
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
export default OrdersList;