import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAllOrderList from "../../hooks/useAllOrderList";
import Pagination from "../Pagination/Pagination";

const AllOrders = () => {
  const [allOrderList, loading] = useAllOrderList();
  console.log(allOrderList);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders = allOrderList.filter((order) => {
    const matchesSearch = [order.customerNumber, order.invNo, order.orderId]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "COD Order" && order.productOrderMethod === "cashon") ||
      (filterStatus === "AVD Order" && order.productOrderMethod === "avd") ||
      (filterStatus === "Confirm Order" && order.orderStatus === "Confirm") ||
      (filterStatus === "Pending Order" && order.orderStatus === "Pending") ||
      (filterStatus === "Prosessing Order" && order.orderStatus === "Processing") ||
      (filterStatus === "Onthe away" && order.orderStatus === "Onthe away") ||
      (filterStatus === "Return" && order.orderStatus === "Return");

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentOrders = filteredOrders.slice(firstPostIndex, lastPostIndex);

  const statusButtons = [
    "All",
    "COD Order",
    "AVD Order",
    "Confirm Order",
    "Pending Order",
    "Prosessing Order",
    "Onthe away",
    "Return"
  ];
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="font-semibold text-sm">loading...</p>
        </div>
      
    );
  }

  return (
    <div>
      <div className="pb-5 pt-5">
        <p className="text-xl font-semibold">Order List <span>({allOrderList.length})</span></p>
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
          
          
          {/* order Filter */}
          <div>
            <label className="input input-bordered flex items-center">
              <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className="grow" placeholder="Search, orderid, invno, number" />
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
          
          <div className="flex justify-end">
            <Link to="/categoy">
              <button className="addNewButton rounded px-10 py-2">
                {" "}
                <i class="fa-solid fa-plus"></i> Add New
              </button>
            </Link>
          </div>

          
          
        </div>
        <div className="overflow-x-auto shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="">Order Id</th>
                <th className="">Invoice</th>
                <th className="">Name</th>
                <th className="">Phone Number</th>
                <th className="">Date</th>
                <th className="">Payment Status</th>
                <th className="">Total</th>
                
                <th className="">Status</th>
                <th className="">Details</th>
              </tr>
            </thead>
            {currentOrders?.map((order, index) => {
              return (
                <tbody key={index} className="text-sm">
                  <tr>
                    <td>{order.orderId}</td>
                    {/* <td className="text-center">Shuvo</td> */}
                    <td className="">{order.invNo}</td>
                    <td className="">{order.customerName}</td>
                    <td>{order.customerNumber}</td>
                    <td>{order.createdAt}</td>
                    <td><p className={`text-center rounded-full ${order.productOrderMethod === "cashon" ? "border border-sky-300 bg-transparent bg-sky-50 text-sky-700" : "border border-green-300 bg-transparent bg-green-50 text-green-700"}`}>{order.productOrderMethod === "cashon" ? "Cash On" : "Online Pay"}</p></td>
                    <td className="font-semibold">{order.inTotal}</td>
                    
                    <td > <p className={`text-center rounded-full text-sm px-1 ${order.orderStatus === "Pending" ? "border border-amber-300 bg-transparent bg-amber-50 text-amber-700" : ""}`}> {order.orderStatus} </p> </td>
                    <td><p className="text-sm text-center border border-dashed px-2 shadow rounded-full border-green-300 bg-transparent bg-green-50 text-green-700 cursor-pointer">Details</p></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <Pagination
          totalPosts={filteredOrders.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <div></div>
    </div>
  );
};

export default AllOrders;
