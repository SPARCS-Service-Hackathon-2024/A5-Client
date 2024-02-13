import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import Layout from "./components/layout/layout";
import ToastMessage from "./components/common/toastMessage";
import ModalRenderer from "./components/layout/modalRenderer";
import "./App.css";
import MapPage from "./pages/mapPage";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <ToastMessage />
            <ModalRenderer />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<MapPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
