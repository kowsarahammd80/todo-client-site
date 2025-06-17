import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRegisterCusmotems from "../../hooks/useRegisterCusmotems";
import Pagination from "../Pagination/Pagination";

const CustomerList = () => {
  const [registecustomers, loading] = useRegisterCusmotems();
  const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCustomerData = registecustomers.filter((items) =>
    items.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const customersDatas = filteredCustomerData.slice(firstPostIndex, lastPostIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        loading...
      </div>
    );
  }
  return (
    <div>
      <div className="pb-5 pt-5">
        <p className="text-xl font-semibold">Categoris List</p>
      </div>
      <div className="card p-5 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 pb-5">
          <div>
            <label className="input input-bordered flex items-center">
                      <input type="text" className="grow" placeholder="Search"   value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}/>
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
          </div>
        </div>

        <div className="overflow-x-auto shadow" id="orderTableToPDF">
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {[...customersDatas]?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.number}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
                  totalPosts={registecustomers.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
      </div>

      <div></div>
    </div>
  );
};

export default CustomerList;
