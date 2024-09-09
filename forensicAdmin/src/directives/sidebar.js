import React, { useEffect, useState } from "react";
import config from "../coreFIles/config";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [pageUrl, setPageUrl] = useState(window.location.href);

  const logout = async () => {
    Cookies.remove("loginSuccessForensicAdmin");
    window.location.href = config.baseUrl;
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <aside className="main-sidebar">
        {/* sidebar*/}
        <section className="sidebar position-relative">
          <div className="multinav">
            <div className="multinav-scroll pt-5" style={{ height: "100%" }}>
              {/* sidebar menu*/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className={pageUrl.match("/dashboard") ? "active" : ""}>
                  <a href={`${config.baseUrl}dashboard`}>
                    <i data-feather="home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li
                  className={
                    pageUrl.match("/customers") || pageUrl.match("/customers")
                      ? "active"
                      : ""
                  }
                >
                  <a href={`${config.baseUrl}customers`}>
                    <i data-feather="user" />
                    <span>Customers</span>
                  </a>
                </li>
                <li
                  className={
                    pageUrl.match("/UsersList") || pageUrl.match("/UsersList")
                      ? "active"
                      : ""
                  }
                >
                  <a href={`${config.baseUrl}UsersList`}>
                    <i data-feather="user" />
                    <span>Operator</span>
                  </a>
                </li>

                <li
                  className={
                    pageUrl.match("/categories") ||
                      pageUrl.match("/subcategory")
                      ? "treeview active"
                      : "treeview"
                  }
                >
                  <a href="#">
                    <div>
                      <i data-feather="list" />
                      <span className="ps-5 ms-5">Category</span>
                    </div>
                    <div>
                      <span><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                    </div>
                  </a>
                  <ul className="treeview-menu">
                    <li>

                      <a href={`${config.baseUrl}categories`}>
                        <i className="ti-more" />
                        <span>Categories</span>
                      </a>
                      <a href={`${config.baseUrl}subcategory`}>
                        <i className="ti-more" />
                        <span>Sub Category</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li
                  className={
                    pageUrl.match("/itemList") ||
                      pageUrl.match("/itemAdd") ||
                      pageUrl.match("/itemUpdate")
                      ? "active"
                      : ""
                  }
                >
                  <a href={`${config.baseUrl}itemList`}>
                    <i data-feather="list" />
                    <span>Items</span>
                  </a>
                </li>
                <li
                  className={
                    pageUrl.match("/OrdersList") || pageUrl.match("/OrdersList")
                      ? "active"
                      : ""
                  }
                >
                  <a href={`${config.baseUrl}OrdersList`}>
                    <i data-feather="user" />
                    <span>Orders</span>
                  </a>
                </li>
                <li
                  className={pageUrl.match("/changepassword") ? "active" : ""}
                >
                  <a href={`${config.baseUrl}changepassword`}>
                    <i data-feather="lock" />
                    <span>Change Password</span>
                  </a>
                </li>

                <li className="">
                  <a href="javascript:;" onClick={logout}>
                    <i data-feather="log-out" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};
export default Sidebar;
