import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import config from '../coreFIles/config';
import Login from '../component/login';
import VerifyEmailAccount from '../component/login';
import Signup from '../component/signup';
import Forgetpassword from '../component/forgetpassword';
import Changepassword from '../component/changepassword';
import Checkmail from '../component/checkmail';
import Welcome from '../component/welcome';
import Existinguser from '../component/existinguser';
import Customerregister from '../component/customer_register';
import Takeyourphoto from '../component/takeyourphoto';
import Bodymeasurements from '../component/bodymeasurements';
import Measurements from '../component/measurements';
import FittingRoom from '../component/fittingRoom';
import Checkout from '../component/checkout';
const RouterComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`${config.baseUrl}`} element={<Login />} />
          <Route path={`${config.baseUrl}login`} element={<Login />} />
          <Route path={`${config.baseUrl}signup`} element={<Signup />} />
          <Route path={`${config.baseUrl}verifyEmailAccount/:token`} element={<VerifyEmailAccount />} />
          <Route path={`${config.baseUrl}forgetpassword`} element={<Forgetpassword />} />
          <Route path={`${config.baseUrl}resetpassword/:token`} element={<Changepassword />} />
          <Route path={`${config.baseUrl}checkmail`} element={<Checkmail />} />
          <Route path={`${config.baseUrl}welcome`} element={<Welcome />} />
          <Route path={`${config.baseUrl}existinguser`} element={<Existinguser />} />
          <Route path={`${config.baseUrl}customer-register`} element={<Customerregister />} />
          <Route path={`${config.baseUrl}takeyourphoto/:customer_id`} element={<Takeyourphoto />} />
          <Route path={`${config.baseUrl}bodymeasurements`} element={<Bodymeasurements />} />
          <Route path={`${config.baseUrl}measurements/:customer_id`} element={<Measurements />} />
          <Route path={`${config.baseUrl}fittingRoom/:customer_id`} element={<FittingRoom />} />
          <Route path={`${config.baseUrl}Checkout/:customer_id`} element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouterComponent;
