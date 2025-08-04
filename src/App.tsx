import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
// @mui
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { ThemeProvider } from '@mui/material';
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import { AuthProvider } from "./context/AuthContext";
import store from "./redux/store";
// theme
// import { cacheRtl, MuiTheme } from './theme/MuiTheme';
import Router from "./routes/path";
import ThemeCustomization from "./theme";
import { AlertProvider } from "./context/AlertProvider";

// --------------------------------------------------------------------
const App: React.FC = () => {
  return (
    <AuthProvider>
      {/* <CacheProvider value={cacheRtl}> */}
      {/* <ThemeProvider theme={MuiTheme}> */}
      <ThemeCustomization>
        <AlertProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </Provider>
          </LocalizationProvider>
        </AlertProvider>
      </ThemeCustomization>
      {/* </ThemeProvider> */}
      {/* </CacheProvider> */}
    </AuthProvider>
  );
};

export default App;
