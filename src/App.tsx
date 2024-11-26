import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <div id="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
