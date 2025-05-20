import React, { useContext } from "react";
import { CarList } from "../components/CarList";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const CarPlatform = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Car Sale Platform</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Welcome, {user.username}!</span>

          <button
            onClick={() => navigate("/cart")}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white transition"
          >
            Go to Cart
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      <CarList />
    </div>
  );
};
