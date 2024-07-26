import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-screen shadow sticky top-0 border">
      <div className="px-5">
        <p className="text-2xl font-semibold mt-10 mb-5">Company Logo</p>
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
                <p className="opacity-0 text-sm"><i class="fa-solid ms-10 fa-angle-down"></i></p>
              </div>{" "}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow"
            >
             
            </ul>
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
                  <p className="text-sm">Products </p>
                  <p className="text-sm"><i class="fa-solid ms-10 fa-angle-down"></i></p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow"
              >
               <Link to="/productsAdd">
               <li>
                  <a className="text-sm"> Add Products 1</a>
                </li>
               </Link>
                <li>
                  <a className="text-sm"> Products Lists 2</a>
                </li>
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
                  <p>Catagoris </p>
                  <p className=""><i class="fa-solid ms-10 fa-angle-down"></i></p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 text-sm shadow"
              >
                <li>
                  <a> Add Catagoris </a>
                </li>
                <li>
                  <a> Catagoris Lists </a>
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
                  <p>Orders </p>
                  <p className=""><i class="fa-solid ms-10 fa-angle-down"></i></p>
                </div>{" "}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] text-sm w-52 shadow"
              >
                <li>
                  <a> All Order List 1</a>
                </li>
                <li>
                  <a> Order 2</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
