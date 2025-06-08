import React, { useEffect, useRef, useState } from "react";
import useIdWiseOrder from "../../hooks/useIdWiseOrder";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SingleOrder = () => {
  const { id } = useParams();
  const { idWiseOrder, loading } = useIdWiseOrder(id);
  const invoiceRef = useRef();

  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    if (idWiseOrder) {
      setOrderStatus(idWiseOrder.orderStatus);
    }
  }, [idWiseOrder]);

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${idWiseOrder?.invNo || "order"}.pdf`);
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/order-update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order status updated successfully!");
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (error) {
      alert("Server error while updating order status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      {/* Download button */}
      <div className="mb-4 text-right">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Invoice PDF
        </button>
      </div>

      {/* Admin Controls: Status Update */}
      <div className="flex justify-end items-center gap-4 mb-4">
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirm">Confirm</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={handleStatusUpdate}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Status
        </button>
      </div>

      {/* Invoice content */}
      <div
        ref={invoiceRef}
        className="bg-white p-6 shadow-lg rounded-lg text-gray-800"
      >
        {/* Header */}
        <div className="flex justify-between mb-6 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-700">Invoice</h1>
            <p className="text-sm text-gray-500">
              Invoice No: {idWiseOrder?.invNo}
            </p>
            <p className="text-sm text-gray-500">
              Order ID: {idWiseOrder?.orderId}
            </p>
            <p className="text-sm text-gray-500">
              Date: {new Date(idWiseOrder?.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Electronic</h2>
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
                  <td className="border p-2">
                    ৳ {item?.previousPrice ? item?.previousPrice : item?.price}
                  </td>
                  <td className="border p-2">{item?.discount} %</td>
                  <td className="border p-2">
                    ৳ {item?.price * item.quantity}
                  </td>
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
          <p>Shipping Area: {idWiseOrder?.productShippingArea} Dhaka</p>
          {idWiseOrder?.paymentNumber && (
            <div>
              <p>Payment Number: {idWiseOrder?.paymentNumber}</p>
              <p>Payment TRXID: {idWiseOrder?.paymentTrxId}</p>
            </div>
          )}

          <p>Thank you for shopping with us!</p>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
