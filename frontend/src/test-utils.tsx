// src/test-utils.tsx

import React, { ReactElement, FC } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Correct import path
import enGB from "date-fns/locale/en-GB";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme(); // Use your custom theme if you have one

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <NotificationProvider>{children}</NotificationProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
