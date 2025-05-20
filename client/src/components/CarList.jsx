import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const CarList = () => {
  const [cars, setCars] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  const handleAddToCart = (car) => {
    addToCart(car);
    navigate("/cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-gray-800 rounded-xl shadow-lg p-5 text-gray-100 flex flex-col"
        >
          {car.image && (
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}
          <h2 className="text-2xl font-semibold mb-1">{car.name}</h2>
          <p className="mb-3 text-gray-300 flex-grow">{car.description}</p>
          <p className="text-green-400 font-bold mb-4 text-lg">₹{car.price}</p>
          <button
            onClick={() => handleAddToCart(car)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
