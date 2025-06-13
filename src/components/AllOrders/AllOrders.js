import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAllOrderList from "../../hooks/useAllOrderList";
import Pagination from "../Pagination/Pagination";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AllOrders = () => {
  const [allOrderList, loading] = useAllOrderList();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Order");

  const filteredOrders = allOrderList.filter((order) => {
    const matchesSearch = [order.customerNumber, order.invNo, order.orderId]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All Order" ||
      (filterStatus === "COD Order" && order.productOrderMethod === "cashon") ||
      (filterStatus === "AVD Order" && order.productOrderMethod === "onlinePay") ||
      (filterStatus === "Confirm Order" && order.orderStatus === "Confirm") ||
      (filterStatus === "Pending Order" && order.orderStatus === "Pending") ||
      (filterStatus === "Prosessing Order" && order.orderStatus === "Processing") ||
      (filterStatus === "Shipped" && order.orderStatus === "Shipped") ||
      (filterStatus === "Return" && order.orderStatus === "Return") ||
      (filterStatus === "Delivered" && order.orderStatus === "Delivered") ||
      (filterStatus === "Cancelled" && order.orderStatus === "Cancelled");

    return matchesSearch && matchesStatus;
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentOrders = filteredOrders.slice(firstPostIndex, lastPostIndex);

  const statusButtons = [
    "All Order",
    "COD Order",
    "AVD Order",
    "Confirm Order",
    "Pending Order",
    "Prosessing Order",
    "Shipped",
    "Delivered",
    "Return",
    "Cancelled"
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm]);

  const downloadPDF = () => {
    const input = document.getElementById("orderTableToPDF");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("order-list.pdf");
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold text-sm">loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-5 pt-5 flex justify-between items-center">
        <p className="text-xl font-semibold">
          <span>{filterStatus}</span> List <span>({filteredOrders?.length})</span>
        </p>
        <button
          onClick={downloadPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded shadow"
        >
          Download PDF
        </button>
      </div>

      <div className="card p-5 shadow-xl">
        <div className="grid grid-cols-8 gap-2 pb-5">
          {statusButtons.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-sm border px-3 py-1 rounded-full transition ${
                filterStatus === status
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 pb-5">
          <div>
            <label className="input input-bordered flex items-center">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="grow"
                placeholder="Search, orderid, invno, number"
              />
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
            </label>
          </div>
        </div>

        <div className="overflow-x-auto shadow" id="orderTableToPDF">
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Invoice</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders?.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderId}</td>
                  <td>{order.invNo}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerNumber}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <p
                      className={`text-center rounded-full ${
                        order.productOrderMethod === "cashon"
                          ? "border border-sky-300 bg-sky-50 text-sky-700"
                          : "border border-green-300 bg-green-50 text-green-700"
                      }`}
                    >
                      {order.productOrderMethod === "cashon" ? "Cash On" : "Online Pay"}
                    </p>
                  </td>
                  <td className="font-semibold">{order.inTotal}</td>
                  <td>
                    <p
                      className={`text-center rounded-full text-sm px-1 ${
                        order.orderStatus === "Pending"
                          ? "border border-amber-300 bg-amber-50 text-amber-700"
                          : order.orderStatus === "Processing"
                          ? "border border-blue-300 bg-blue-50 text-blue-700"
                          : order.orderStatus === "Confirm"
                          ? "border border-green-300 bg-blue-50 text-green-700"
                          : order.orderStatus === "Delivered"
                          ? "border border-purple-300 bg-green-50 text-purple-700"
                          : order.orderStatus === "Cancelled"
                          ? "border border-red-300 bg-red-50 text-red-700"
                          : order.orderStatus === "Shipped"
                          ? "border border-fuchsia-300 bg-red-50 text-fuchsia-700"
                          : order.orderStatus === "Return"
                          ? "border border-rose-300 bg-red-50 text-rose-700"
                          : ""
                      }`}
                    >
                      {order.orderStatus}
                    </p>
                  </td>
                  <td>
                    <Link to={`/orders/single/${order._id}`}>
                      <p className="text-sm text-center border border-dashed px-2 shadow rounded-full border-green-300 bg-green-50 text-green-700 cursor-pointer">
                        Details
                      </p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalPosts={filteredOrders.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AllOrders;