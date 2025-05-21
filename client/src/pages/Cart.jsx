import React, { useState, useContext, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useContext(AuthContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const baseTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = baseTotal * 0.18;
  const transport = baseTotal > 1000000 ? 0 : 2000;

  useEffect(() => {
    const total = baseTotal + gst + transport;
    setFinalTotal(total - discount);
  }, [baseTotal, gst, transport, discount]);

  const promoClick = () => {
    if (promo === "AXBD002") {
      const discountValue = (baseTotal + gst + transport) * (10/100);
      setDiscount(discountValue);
      setMessage("Promo applied! 10% discount.");
    } else {
      setDiscount(0);
      setMessage("Invalid promo code.");
    }
  };

  const handlePurchase = async () => {
    if (!user?.email) {
      alert("You must be logged in to make a purchase.");
      return;
    }
    setIsProcessing(true);
    setMessage("Processing payment...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await axios.post("http://localhost:5000/api/payment/send-purchase-email", {
        email: user.email,
        items: cartItems,
        total: finalTotal,
      });
      setMessage("Payment successful! Confirmation email sent.");
    } catch (error) {
      console.error(error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg flex flex-col">
      <h2 className="text-3xl font-bold mb-6 self-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 flex-grow flex items-center justify-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6 flex-grow overflow-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800"
            >
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline disabled:text-red-300"
                disabled={isProcessing}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t border-gray-700 pt-6 mt-6 text-right space-y-3">
            <p>Base Total: ₹{baseTotal.toFixed(2)}</p>
            <p>GST (18%): ₹{gst.toFixed(2)}</p>
            <p>Transportation: ₹{transport.toFixed(2)}</p>
            <p>Discount: ₹{discount.toFixed(2)}</p>
            <hr className="border-gray-700" />
            <p className="text-2xl font-bold">Final Total: ₹{finalTotal.toFixed(2)}</p>

            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded mt-4 transition disabled:opacity-50"
            >
              {isProcessing ? "Processing payment..." : "Purchase"}
            </button>

            {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
          </div>

          <div className="mt-4 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Promo Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white outline-none"
            />
            <button
              onClick={promoClick}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
