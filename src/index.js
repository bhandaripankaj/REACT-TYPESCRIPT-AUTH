import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, } from "react-router-dom";

const root = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
    <div className="foo">
    <App />
    </div>
</BrowserRouter>,
root);

