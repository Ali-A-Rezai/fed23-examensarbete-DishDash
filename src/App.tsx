import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import FallbackPage from "./pages/FallBackPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div id="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<FallbackPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
