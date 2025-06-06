import React from "react";
import useIdWiseOrder from "../../hooks/useIdWiseOrder";
import { useParams } from "react-router-dom";

const SingleOrder = () => {
  const { id } = useParams();
  const { idWiseOrder, loading } = useIdWiseOrder(id);
  console.log(idWiseOrder._id);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>loading...</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg text-gray-800 my-10">
      {/* Header */}
      <div className="flex justify-between mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Invoice</h1>
          <p className="text-sm text-gray-500">Invoice No: {idWiseOrder?.invNo}</p>
          <p className="text-sm text-gray-500">Order ID: {idWiseOrder?.orderId}</p>
          <p className="text-sm text-gray-500">
            Date: {new Date(idWiseOrder?.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">Foodi Pazzo</h2>
          <p className="text-sm">123 Fast Lane, Foodville</p>
          <p className="text-sm">Email: info@foodipazzo.com</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">Customer Information</h3>
        <p>
          <strong>Name:</strong> {idWiseOrder?.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {idWiseOrder?.customerNumber}
        </p>
        <p>
          <strong>Address:</strong> {idWiseOrder?.customerAddress}
        </p>
        {idWiseOrder?.customerNote && (
          <p>
            <strong>Note:</strong> {idWiseOrder?.customerNote}
          </p>
        )}
      </div>

      {/* Product Details */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {idWiseOrder?.orderItemsDetails?.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2 flex items-center gap-2">
                  <img
                    src={item?.images}
                    alt={item?.name}
                    className="w-10 h-10 rounded"
                  />
                  {item?.name}
                </td>
                <td className="border p-2">{item?.category}</td>
                <td className="border p-2">{item?.quantity}</td>
                <td className="border p-2">৳ {item?.previousPrice ? item?.previousPrice : item?.price}</td>
                <td className="border p-2"> {item?.discount} %</td>
                <td className="border p-2">৳ {item?.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="text-right space-y-1">
        <p>
          <strong>Subtotal:</strong> ৳ {idWiseOrder?.subTolatalData}
        </p>
        <p>
          <strong>Shipping:</strong> ৳ {idWiseOrder?.shippingCostData}
        </p>
        <p className="text-lg font-bold">
          <strong>Total:</strong> ৳ {idWiseOrder?.inTotal}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-gray-500 text-center border-t pt-4">
        <p>
          Payment Method:{" "}
          {idWiseOrder?.productOrderMethod === "cashon"
            ? "Cash on Delivery"
            : idWiseOrder?.paymentMethodOrder}
        </p>
        <p>Status: {idWiseOrder?.orderStatus}</p>
        <p>Shipping Area: {idWiseOrder?.productShippingArea}</p>
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  );
};

export default SingleOrder;
