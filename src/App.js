import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import ToastMessage from "./components/common/toastMessage";
import ModalRenderer from "./components/layout/modalRenderer";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import SearchPage from "./components/SearchPage";
import MyPage from "./components/MyPage";
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
              <Route path="/" element={<SplashScreen />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<MyPage />} />
            </Routes>
            <NavBar />
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
