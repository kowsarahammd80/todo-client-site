import React, { useState } from "react";
import { Link } from "react-router-dom";
import useShippingCostList from "../../hooks/useShippingCostList";

const ShippingCostList = () => {
  const [shippingCost] = useShippingCostList();

  const deleteShippingCost = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/shippingDelete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        alert("Deleted successfully");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="pb-5 pt-5">
        <p className="text-xl font-semibold">Shipping Cost List</p>
      </div>

      <div className="card p-5 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 pb-5">
          <div>
            {/* <label className="input input-bordered flex items-center">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label> */}
          </div>

          <div className="flex justify-end">
            <Link to="/shipping-cost">
              <button className="addNewButton rounded px-10 py-2">
                <i className="fa-solid fa-plus"></i> Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Location</th>
                <th className="text-center">Shipping Cost</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {shippingCost?.map((shipping, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{shipping.location} Dhaka</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">{shipping.cost}</td>

                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <Link to={`/shipping-List/${shipping?._id}`}>
                        <button className="categoryPenButton px-4 py-1 rounded shadow text-lg">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </Link>

                      {/* Delete Trigger */}
                      <label
                        htmlFor={`delete-modal-${shipping._id}`}
                        className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer"
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </label>

                      {/* Delete Modal */}
                      <input
                        type="checkbox"
                        id={`delete-modal-${shipping._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          <p className="py-4 font-thin">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                              {shipping.location}
                            </span>{" "}
                            shipping cost?
                          </p>
                          <div className="modal-action">
                            <label
                              htmlFor={`delete-modal-${shipping._id}`}
                              className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer text-red-500 border"
                            >
                              No
                            </label>
                            <label
                              htmlFor={`delete-modal-${shipping._id}`}
                              onClick={() => deleteShippingCost(shipping._id)}
                              className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer text-green-500 border"
                            >
                              Yes
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShippingCostList;
