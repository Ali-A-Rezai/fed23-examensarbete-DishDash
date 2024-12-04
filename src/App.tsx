import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import FallbackPage from "./pages/FallBackPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";

function App() {
  return (
    <div id="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<FallbackPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
