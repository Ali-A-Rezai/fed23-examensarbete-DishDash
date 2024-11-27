import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import FallbackPage from "./pages/FallBackPage";

function App() {
  return (
    <div id="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<FallbackPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
