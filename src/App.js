import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import ToastMessage from "./components/common/ToastMessage";
import ModalRenderer from "./components/layout/ModalRenderer";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SearchPage from "./pages/SearchPage";
import MyPage from "./pages/MyPage";
import EditMyPage from "./pages/EditMyPage";
import NavigationPage from "./pages/NavigationPage";
import VerifyPage from "./pages/VerifyPage";
import VerifyFailPage from "./pages/VerifyFailPage";
import VerifySuccessPage from "./pages/VerifySuccessPage";
import Layout from "./components/layout/VerifyLayout";

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
              <Route element={<Layout />}>
                <Route path="/verification" element={<VerifyPage />} />
                <Route path="/verify-success" element={<VerifySuccessPage />} />
                <Route path="/verify-fail" element={<VerifyFailPage />} />
              </Route>
              <Route path="/navigation" element={<NavigationPage />} />
              <Route path="/edit" element={<EditMyPage />} />
            </Routes>
            <NavBar />
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
