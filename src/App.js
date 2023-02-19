import './App.css';
import { Box } from "@mui/material";
import React, { useState } from "react";
import {Route,Routes, useLocation, useNavigate, } from "react-router-dom";
import Auth from './component/auth';
import Home from './component/home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './component/forgot.password';

const  App= ()=> {
  return (
    <>
     <ToastContainer
    position="top-right"
    autoClose={3000}
    limit={1}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
     />
    <Routes>
    <Route exact path="/" element={<Auth/>}/>
    <Route exact path="/home" element={<Home/>}/>
    <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  </>
   )
}

export default App;
