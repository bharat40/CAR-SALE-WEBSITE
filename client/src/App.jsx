import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CarPlatform } from "./pages/CarPlatform";
import AdminPage from "./pages/AdminPage";
import { Cart } from "./pages/Cart";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { token, user } = useContext(AuthContext);

  if (token && user === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            user?.email === "admin@user.com" ? (
              <Navigate to="/admin" replace />
            ) : (
              <CarPlatform />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" replace />}
      />

      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" replace />}
      />

      <Route
        path="/admin"
        element={
          token && user?.email === "admin@user.com" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/cart"
        element={token ? <Cart /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
