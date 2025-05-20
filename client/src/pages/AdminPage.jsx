import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const { token, logout, user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return; // wait for user to load

    if (!user || user.email !== "admin@user.com") {
      navigate("/"); // redirect if not admin
      return;
    }

    getCars();
    getUsers();
  }, [user, navigate]);

  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/cars", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Car added successfully");
      setForm({ name: "", price: "", image: "", description: "" });
      getCars();
    } catch (err) {
      alert("Error adding car");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.username || user?.email}</span>

          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Go to Home
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add New Car Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Add New Car</h2>
        <form onSubmit={handleAddCar} className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-700 bg-gray-800 p-2 rounded w-48 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-gray-700 bg-gray-800 p-2 rounded w-48 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border border-gray-700 bg-gray-800 p-2 rounded w-64 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-700 bg-gray-800 p-2 rounded w-full md:w-96 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition self-center"
            type="submit"
          >
            Add Car
          </button>
        </form>
      </section>

      {/* All Cars Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">All Cars</h2>
        <ul className="list-disc ml-6">
          {cars.map((car) => (
            <li
              key={car.id}
              className="mb-6 border border-gray-700 rounded p-4 bg-gray-800 shadow-md"
            >
              <strong className="text-lg">{car.name}</strong> - ₹{car.price} <br />
              <em className="text-gray-400">{car.description}</em> <br />
              <img
                src={car.image}
                alt={car.name}
                className="w-48 mt-3 rounded border border-gray-700"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* All Users Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Registered Users</h2>
        <ul className="list-disc ml-6">
          {users.map((u) => (
            <li key={u.id} className="mb-2">
              {u.username} - {u.email}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
