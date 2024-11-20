// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Correct import path
import enGB from "date-fns/locale/en-GB";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </LocalizationProvider>
      </NotificationProvider>
    </Provider>
  </React.StrictMode>
);
