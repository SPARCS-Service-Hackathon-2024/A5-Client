import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle, muiTheme, theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import ToastMessage from "./components/common/ToastMessage";
import ModalRenderer from "./components/layout/ModalRenderer";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MyPage from "./pages/MyPage";
import EditMyPage from "./pages/EditMyPage";
import NavigationPage from "./pages/NavigationPage";
import VerifyPage from "./pages/VerifyPage";
import VerifyFailPage from "./pages/VerifyFailPage";
import VerifySuccessPage from "./pages/VerifySuccessPage";
import VerifyLayout from "./components/layout/VerifyLayout";
import Layout from "./components/layout/Layout";
import CheckPhotoLayout from "./components/layout/CheckPhoto";
import CheckPhotoPage from "./pages/CheckPhotoPage";
import CheckPhotoDonePage from "./pages/CheckPhotoDonePage";
import GuidePage from "./pages/GuidePage";
import WalkHistory from "./pages/WalkHistory";

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
              <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<MyPage />} />
                <Route path="/navigation" element={<NavigationPage />} />
              </Route>
              <Route element={<VerifyLayout />}>
                <Route path="/verification" element={<VerifyPage />} />
                <Route path="/verify-success" element={<VerifySuccessPage />} />
                <Route path="/verify-fail" element={<VerifyFailPage />} />
              </Route>
              <Route element={<CheckPhotoLayout />}>
                <Route path="/check-photo" element={<CheckPhotoPage />} />
                <Route
                  path="/check-photo-done"
                  element={<CheckPhotoDonePage />}
                />
              </Route>
              <Route
                path="/guide/walk-together"
                element={<GuidePage item="함께 걷기" />}
              />
              <Route
                path="/guide/tourism"
                element={<GuidePage item="관광해설" />}
              />
              <Route
                path="/guide/errand"
                element={<GuidePage item="심부름" />}
              />
              <Route
                path="/guide/plogging"
                element={<GuidePage item="플로깅" />}
              />
              <Route path="/edit" element={<EditMyPage />} />
              <Route path="/history" element={<WalkHistory />} />
            </Routes>
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
