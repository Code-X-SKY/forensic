import React, { useEffect, useState } from "react";
// import config from '../coreFIles/config'
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import { deleteItemAction, getItemListAction } from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import Web3 from 'web3';

const Items = () => {
  const [getItemlist, setItemList] = useState({});
  //   const [form, setForm] = useState({});

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    let res = await getItemListAction();
    if (res.success) {
      setItemList(res.data);
    }
  };


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
        return `${item.category_name}`;
      },
    },
    {
      key: "sub_category_name",
      text: "Sub Category",
      cell: (item) => {
        return `${item.sub_category_name}`;
      },
    },

    {
      key: "Image",
      text: "Image",
      cell: (item) => {
        return (
          <>
            <a target="__blank" href={`${config.imageUrl}` + item.image}><img src={`${config.imageUrl}` + item.image} width="70px" height="70px"></img></a>
            <br />
            {item.name}
          </>
        );
      },
    },
    {
      key: "Share",
      text: "Details",
      cell: (item) => {
        return (
          <>
            <b>Name : </b>{item.name}<br />
            <b>Description : </b>{item.description}<br />        </>
        );
      },
    },
    {
      key: "date",
      text: "Date",
      cell: (item) => {
        return `${moment(item.datetime).format("YYYY-MM-DD")}`;
      },
    },
    {
      key: "action",
      text: "Action",
      cell: (item) => {
        return (
          <>
            <a
              href={`${config.baseUrl}itemUpdate/${item.id}`}
              className="btn btn-sm btn-primary"
              id="editbtnid"
            >
              Edit
            </a>{" "}

            &nbsp;
            <button
              type="button"
              className="btn btn-sm btn-default"
              id="editbtnid"
              onClick={() => deleteItem(item.id)}
            >
              {" "}
              Delete
            </button>{" "}
            &nbsp;
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

  const deleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deleteItemAction({ item_id: id });
        if (res.success) {
          getItems();
          // toast.success(res.msg);
          Swal.fire("Deleted!", res.msg, "success");
        } else {
          Swal.fire("Failed!", res.msg, "error");
          // toast.error(res.msg);
        }
      }
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


            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Items List</h4>
                      <a
                        href={`${config.baseUrl}itemAdd `}
                        className="btn btn-sm btn-primary add_btn"
                      >
                        Add New
                      </a>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={getItemlist}
                        columns={columns}
                      />
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
  );
};
export default Items;
