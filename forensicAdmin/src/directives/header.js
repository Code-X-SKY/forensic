import React, { useEffect } from 'react'

import config from '../coreFIles/config'
import Cookies from 'js-cookie'

const Header = () => {

  const loginData = (!Cookies.get('loginSuccessForensicAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessForensicAdmin'));
  if (!loginData || loginData == '') {
    window.location.href = `${config.baseUrl}`;
  }

  useEffect(() => {

  })

  const logout = async () => {
    Cookies.remove('loginSuccessForensicAdmin');
    window.location.href = config.baseUrl;
  }

  return (

    <>
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">
          {/* Logo */}
          <a href="#" className="logo">
            {/* logo*/}
            <div className="logo-mini w-50">
              <span className="light-logo">
                <img src="forensic_fav.png" alt="logo" /> 
                {/* <h1>Forensic</h1> */}
              </span>
              <span className="dark-logo">
                {/* <img src="./images/favicon.png" alt="logo" /> */} <h1>Forensic</h1>
              </span>
            </div>
            <div className="logo-lg">
              <span className="light-logo">
                {/* <img src="./images/logo.png" alt="logo" /> */} <h1>Forensic</h1>
              </span>
              <span className="dark-logo">
                {/* <img src="./images/logo.png" alt="logo" /> */} <h1>Forensic</h1>
              </span>
            </div>
          </a>
        </div>
        {/* Header Navbar */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <div className="app-menu">
            
            {/* <ul className="header-megamenu nav">
              <li className="btn-group nav-item">
                <a
                  href="#"
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                >
                  <i data-feather="align-left" />
                </a>
              </li>

            </ul> */}
          </div>
          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">

              <li className="dropdown user user-menu">
                <a
                  href="#"
                  className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  data-bs-toggle="dropdown"
                  title="User"
                >
                  <div className="d-flex align-items-center">
                    <div className="text-end me-10">
                      <p className="pt-5 fs-14 mb-0 fw-700 text-primary">{loginData.username}</p>
                      <small className="fs-10 mb-0 text-uppercase text-mute">
                        Admin
                      </small>
                    </div>
                    <img
                      src="./images/avatar/avatar-1.png"
                      className="avatar rounded-10 bg-primary-light h-40 w-40"
                      alt=""
                    />
                  </div>
                </a>
                <ul className="dropdown-menu animated flipInX">
                  <li className="user-body">

                    <a className="dropdown-item" href="javascript:;" onClick={logout}>
                      <i className="ti-lock text-muted me-2" /> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>

    </>
  )
}
export default Header;