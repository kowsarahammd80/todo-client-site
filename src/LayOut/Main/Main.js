import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Sheard/Navbar/Navbar";
import './Manin.css'

const Main = () => {
  return (
    <div className="">  
      <div className="grid grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-0 ">
      <div className="bg-white">
          <Navbar/>
       </div>
        <div className="col-span-5">
         <div className="p-4">
         <Outlet />
         </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
      <div className="">
          <Navbar/>
       </div>
        <div className="col-span-4 lg:col-span-4 xl:col-span-4">
         <div className="mx-5">
         <Outlet />
         </div>
        </div>
      </div> */}
    </div>
  );
};

export default Main;
