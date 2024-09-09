import "./App.css";
import React, { components } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import config from "./coreFIles/config";

import Login from "./component/login";
import Dashboard from "./component/dashboard";
import Users from "./component/users";
import Changepassword from "./component/changepassword";
import Category from "./component/category";
import Addcategory from "./component/addcategory";
import Categoryupdate from "./component/updatecategory";
import ItemList from "./component/itemList";
import ItemAdd from "./component/itemAdd";
import ItemUpdate from "./component/itemUpdate";
import Attributes from "./component/attributes";
import SubCategory from "./component/SubCategory";
import Categories from "./component/Categories";
import Attributess from "./component/Attributess";
import UsersList from "./component/userList";
import OrdersList from "./component/orders";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={`${config.baseUrl}`} element={<Login />} />
          <Route path={`${config.baseUrl}dashboard`} element={<Dashboard />} />
          <Route path={`${config.baseUrl}customers`} element={<Users />} />
          <Route path={`${config.baseUrl}changepassword`} element={<Changepassword />} />
          <Route path={`${config.baseUrl}Category`} element={<Category />} />
          <Route path={`${config.baseUrl}Addcategory`} element={<Addcategory />}/>
          <Route path={`${config.baseUrl}Categoryupdate/:id`} element={<Categoryupdate />}/>
          <Route path={`${config.baseUrl}itemList`} element={<ItemList />} />
          <Route path={`${config.baseUrl}itemAdd`} element={<ItemAdd />} />
          <Route path={`${config.baseUrl}itemUpdate/:id`} element={<ItemUpdate />} />
          <Route path={`${config.baseUrl}attributes`} element={<Attributes />} />
          <Route path={`${config.baseUrl}subcategory`} element={<SubCategory />} />
          <Route path={`${config.baseUrl}categories`} element={<Categories />} />
          <Route path={`${config.baseUrl}attributess`} element={<Attributess />} />
          <Route path={`${config.baseUrl}UsersList`} element={<UsersList />} />
          <Route path={`${config.baseUrl}OrdersList`} element={<OrdersList />} />

          


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
