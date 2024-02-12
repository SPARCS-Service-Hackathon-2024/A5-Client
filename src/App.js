
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <NavBar />
    </div>
  );
}

export default App;
