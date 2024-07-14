/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/LoginCode";
import ForgetPass from "views/ForgetPass";
import PasswordChange from "views/PasswordChange";
import CyberComp from "views/CyberComp";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>

      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/admin/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/forgetpass" element={<ForgetPass/>} />
      <Route path="/forgetpasschange" element={<PasswordChange/>} />
      <Route path="/" element={<CyberComp/>} />

    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
