import React, { useState } from "react";

const ShippingCost = () => {
  const [insideCost, setInsideCost] = useState("");
  const [outsideCost, setOutsideCost] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = [
      { location: "inside", cost: Number(insideCost) },
      { location: "outside", cost: Number(outsideCost) },
    ];

    try {
      const res = await fetch("http://localhost:5000/api/shippingCost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("Shipping costs added successfully.");
        setInsideCost("");
        setOutsideCost("");
      } else {
        setMessage("Error: " + result.message);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="py-10 px-10 shadow bg-white">
        <h2 className="pb-4 text-xl font-semibold">Set Shipping Costs</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-500 font-semibold mb-2">
              Inside Dhaka Cost (Tk):
            </label>
            <input
              type="number"
              className="input w-full border border-gray-200 rounded"
              value={insideCost}
              onChange={(e) => setInsideCost(e.target.value)}
              required
            />
          </div>
          <div className="py-4">
            <label className="text-gray-500 font-semibold mb-2">
              Outside Dhaka Cost (Tk):
            </label>
            <input
              type="number"
              className="input w-full border border-gray-200 rounded"
              value={outsideCost}
              onChange={(e) => setOutsideCost(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center py-5">
            <button type="submit" className="bg-green-400 rounded px-10 py-3">
              Save Shipping Costs
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ShippingCost;
