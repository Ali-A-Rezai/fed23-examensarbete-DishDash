import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import FallbackPage from "./pages/FallBackPage";
import Profile from "./pages/ProfilePage";
import { store } from "./store/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Login from "./pages/AuthPages/LoginPage";
import Signup from "./pages/AuthPages/SignUpPage";
import RecipesPage from "./pages/RecipesPage";
import FavoritesPage from "./pages/FavoritesPage";

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
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

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
