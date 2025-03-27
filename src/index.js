/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from 'react-redux'
// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import { store } from "store/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import Day.js adapter
import { LocalizationProvider } from "@mui/x-date-pickers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}> {/* ✅ Wrap App in LocalizationProvider */}
          <App />
        </LocalizationProvider>
      </Provider>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
