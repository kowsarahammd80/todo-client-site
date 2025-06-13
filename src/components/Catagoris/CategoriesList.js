import React, { useState } from "react";
import "./Catagoris.css";
import { Link } from "react-router-dom";
import useCatagory from "../../hooks/useCatagory";
import Pagination from "../Pagination/Pagination";


const CategoriesList = () => {
  const [categories, loading, refetchData] = useCatagory();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

  const filteredProduct = categories.filter((items) =>
    items.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const imageHostKey = process.env.REACT_APP_image_key;

  const haldleDeleteCategory = (id) => {
    fetch(`http://localhost:5000/api/category/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => data);
    refetchData(true);
  };

  if (loading) {
    return (
      <p className="flex justify-center items-center h-screen font-semibold">
        loading...
      </p>
    );
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const categoryDatas = filteredProduct.slice(firstPostIndex, lastPostIndex);

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
                <th className="">Category</th>
                <th className="text-center">Create By</th>
                <th className="text-center">Activity</th>
                <th className="text-center">Create Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {categoryDatas?.map((category, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={category.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{category.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">Shuvo</td>
                    <td className="cursor-pointer">
                      <div
                        className={
                          category.activeStatus === "Active"
                            ? "bg-green-500"
                            : "bg-red-700"
                        }
                      >
                        <p className="text-center text-white">
                          {category.activeStatus}
                        </p>
                      </div>
                    </td>
                    <td className="text-center">
                      {category.date} <span className="font-semibold">&</span>{" "}
                      {category.time}
                    </td>
                    <th>
                      <div className="text-center">
                        <button className="categoryEyeButton px-4 py-1 rounded shadow text-lg">
                          {" "}
                          <span>
                            <i class="fa-regular fa-eye"></i>
                          </span>{" "}
                        </button>
                        <Link to={`/category/${category._id}`}>
                          <button className="categoryPenButton px-4 py-1 rounded shadow text-lg ">
                            <i class="fa-solid fa-pen"></i>
                          </button>
                        </Link>
                        {/* delete */}
                        <label
                          htmlFor={`${category._id}`}
                          className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer"
                        >
                          <i class="fa-regular fa-trash-can"></i>
                        </label>
                        {/* Put this part before </body> tag */}
                        <input
                          type="checkbox"
                          id={`${category._id}`}
                          className="modal-toggle"
                        />
                        <div className="modal" role="dialog">
                          <div className="modal-box">
                            {/* <h3 className="text-lg font-bold">{category._id}</h3> */}
                            <p className="py-4 font-thin">
                              Are you sure want to delete this Category{" "}
                              <span className="font-semibold">
                                {category.name}
                              </span>
                              ?
                            </p>
                            <div className="modal-action">
                              <label
                                htmlFor={`${category._id}`}
                                className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer text-red-500 border"
                              >
                                No
                              </label>
                              <label
                                htmlFor={`${category._id}`}
                                className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer text-green-500 border"
                                onClick={(_id) =>
                                  haldleDeleteCategory(category._id)
                                }
                              >
                                <span className="text-green-500">YES</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <Pagination
          totalPosts={categories.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <div></div>
    </div>
  );
};

export default CategoriesList;
