import React, { useEffect, useState } from "react";
// import config from '../coreFIles/config'
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import { deleteAttributeAction, getAttributesListAction } from "../Action/action";
import Swal from "sweetalert2";
import moment from "moment";

const Attributes = () => {
  const [getattributeslist, setAttributesList] = useState({});
  //   const [form, setForm] = useState({});

  useEffect(() => {
    getattributes();
  }, []);

  const getattributes = async () => {
    let res = await getAttributesListAction();
    if (res.success) {
        setAttributesList(res.data);
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
        key: "attribute_name",
        text: "Attributes",
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
            <a
              href={`${config.baseUrl}attributeupdate/${item.id}`}
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
              onClick={() => deleteAttribute(item.id)}
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

  const deleteAttribute = async (id) => {
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
        let res = await deleteAttributeAction({ id: id });
        if (res.success) {
          getattributes();
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
                      <h4 className="box-title">Attribute List</h4>
                      <a
                        href={`${config.baseUrl}Addattributes`}
                        className="btn btn-sm btn-primary add_btn"
                      >
                        Add New
                      </a>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={getattributeslist}
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
export default Attributes;
