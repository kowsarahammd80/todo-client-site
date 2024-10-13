import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-screen shadow sticky top-0 navbg">
      <div className="px-5">
        <p className="text-2xl font-semibold mt-10 mb-5">Company Name</p>
      </div>
      <div className="px-5 mt-10">
        <ul className="cursor-pointer text-lg">
          <li className="mt-2 py-3 px-2">
            <div className="dropdown w-full">
              <div className="">
                <div className="flex items-center justify-between w-full">
                  <span className="me-4">
                    <i class="fa-solid text-sm fa-table-columns"></i>
                  </span>
                  <Link to="/">
                    <p className="text-sm">Dashboard </p>
                  </Link>
                  <p className="opacity-0 text-sm">
                    <i class="fa-solid ms-10 fa-angle-down"></i>
                  </p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow"
              ></ul>
            </div>
          </li>
          <li className="my-4 py-3 px-2 w-full">
            {" "}
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="">
                {" "}
                <div className="flex items-center justify-between w-full">
                  <p className="me-4 text-sm">
                    <i class="fa-brands fa-dropbox"></i>
                  </p>
                  <p className="text-sm">Products</p>
                  <p className="text-sm">
                    <i class="fa-solid ms-10 fa-angle-down"></i>
                  </p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-slate-800 rounded-box z-[1] w-52 shadow"
              >
                <Link to="/productsAdd">
                  <li className="text-center">
                    <a className="text-sm">Add Product</a>
                  </li>
                </Link>
                <Link to="/productsList">
                  <li>
                    <a className="text-sm">Products Lists</a>
                  </li>
                </Link>
                <Link to="">
                  <li>
                    <a className="text-sm">test</a>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <li className="my-4 py-3 px-2 w-full">
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="">
                <div className="flex items-center justify-between text-sm w-full">
                  <span className="me-4">
                    <i class="fa-solid fa-layer-group"></i>
                  </span>
                  <p>Categoy </p>
                  <p className="">
                    <i class="fa-solid ms-10 fa-angle-down"></i>
                  </p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-slate-800 rounded-box z-[1] w-full text-sm shadow"
              >
                <Link to="/categoy">
                  <li>
                    <a> Add Catagoris </a>
                  </li>
                </Link>
                <Link to="/categoriesList">
                  <li>
                    <a>Catagories List </a>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <li className="my-4 py-3 px-2 w-full">
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="">
                <div className="flex items-center justify-between text-sm w-full">
                  <span className="me-4">
                    <i class="fa-solid fa-layer-group"></i>
                  </span>
                  <p>Sub Categoy </p>
                  <p className="">
                    <i class="fa-solid ms-10 fa-angle-down"></i>
                  </p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-slate-800 rounded-box z-[1] w-full text-sm shadow"
              >
                <Link to="/addSubCategory">
                  <li>
                    <a> Add Sub Catagoris </a>
                  </li>
                </Link>
                <Link to="/subCategoryList">
                  <li>
                    <a>Sub Catagories List </a>
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <li className="my-4 py-3 px-2 w-full">
            {" "}
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="">
                {" "}
                <div className="flex items-center justify-between text-sm w-full">
                  <p className="me-4">
                    <i class="fa-solid fa-rectangle-list"></i>
                  </p>
                  <p>Orders </p>
                  <p className="">
                    <i class="fa-solid ms-10 fa-angle-down"></i>
                  </p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-slate-800 rounded-box z-[1] text-sm w-52 shadow"
              >
                <li>
                  <a> All Order List</a>
                </li>
                <li>
                  <a>Order Take</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="my-4 py-3 px-2 w-full">
            {" "}
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="">
                {" "}
                <div className="flex items-center justify-between text-sm w-full">
                  <p className="me-4">
                    <i class="fa-solid fa-rectangle-list"></i>
                  </p>
                  <p>Home Hero</p>
                  
                  <p className="">
                    <i class="fa-solid ms-10 fa-angle-down"></i>
                  </p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-slate-800 rounded-box z-[1] text-sm w-52 shadow"
              >
                <Link to="/home-Herro-Add">
                  <li>
                    <a>Home Hero Add</a>
                  </li>
                </Link>
                <Link to="/home-Herro-list">
                  <li>
                    <a>Home Hero List</a>
                  </li>
                </Link>
                
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
