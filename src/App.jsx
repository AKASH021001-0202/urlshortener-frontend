import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Route,  BrowserRouter as Router,  Routes,  Navigate} from "react-router-dom";
import { refreshToken } from "./apis/auth";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import { setUser } from "./redux/slices/userSlice";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import ActivateAccount from "./Pages/ActivateAccount";
import RedirectHandler from "./components/RedirectHandler";
import ViewUrlsPage from "./components/ViewUrlsPage";
import ChartPage from "./components/ChartPage";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleTokenExpiration = async () => {
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        try {
          const newToken = await refreshToken(); // Example function to refresh token
          localStorage.setItem("token", newToken);
          dispatch(setUser(jwtDecode(newToken))); // Update user state with new token
        } catch (error) {
          console.error("Error refreshing token:", error);
          // Handle token refresh error (e.g., redirect to login)
          Navigate("/login");
        }
      } else {
        dispatch(setUser(decodedToken)); // Update user state if token is valid
      }
    };

    handleTokenExpiration();
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/url" element={<ViewUrlsPage />} />
        </Route>
        <Route path="/:shortId" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
