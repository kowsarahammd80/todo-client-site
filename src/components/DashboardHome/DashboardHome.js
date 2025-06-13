import React from "react";
import TotalOrder from "./TotalOrder";
import TotalProduct from "./TotalProduct";
import TodayOrder from "./TodayOrder";
import RgistarCustomers from "./RgistarCustomers";

const DashboardHome = () => {
  return (
    <div className="w-full pt-10">
      <div className="grid grid-cols-4 gap-5">
        {/* total order */}
        <TotalOrder/>
        {/* today order */}
        <TodayOrder/>
        {/* total products */}
        <TotalProduct/>
        {/* total register client */}
        <RgistarCustomers/>
      </div>
    </div>
  );
};

export default DashboardHome;
