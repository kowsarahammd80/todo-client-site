import React, { useState, useEffect } from "react";

const ShippingUpdate = () => {
  const [insideCost, setInsideCost] = useState("");
  const [outsideCost, setOutsideCost] = useState("");
  const [insideId, setInsideId] = useState("");
  const [outsideId, setOutsideId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch shipping cost data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/shipping-getAll");
        const data = await res.json();

        const inside = data.find((item) => item.location === "inside");
        const outside = data.find((item) => item.location === "outside");

        if (inside) {
          setInsideCost(inside.cost);
          setInsideId(inside._id);
        }

        if (outside) {
          setOutsideCost(outside.cost);
          setOutsideId(outside._id);
        }
      } catch (error) {
        setMessage("Failed to fetch shipping cost data: " + error.message);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = [
      { id: insideId, data: { location: "inside", cost: Number(insideCost) } },
      { id: outsideId, data: { location: "outside", cost: Number(outsideCost) } },
    ];

    try {
      const results = await Promise.all(
        updates.map(({ id, data }) =>
          fetch(`http://localhost:5000/api/shippingUpdate/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => res.json())
        )
      );

      setMessage("Shipping costs updated successfully.");
    } catch (error) {
      setMessage("Error updating shipping costs: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="py-10 px-10 shadow bg-white rounded w-full max-w-md">
        <h2 className="pb-4 text-xl font-semibold text-center">Update Shipping Costs</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold block mb-2">
              Inside Dhaka Cost (Tk):
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
              value={insideCost}
              onChange={(e) => setInsideCost(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-700 font-semibold block mb-2">
              Outside Dhaka Cost (Tk):
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
              value={outsideCost}
              onChange={(e) => setOutsideCost(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white rounded px-6 py-2 hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
      </div>
    </div>
  );
};

export default ShippingUpdate;
