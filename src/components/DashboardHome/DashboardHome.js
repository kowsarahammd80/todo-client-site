import React, { useState } from "react";
import TotalOrder from "./TotalOrder";
import TotalProduct from "./TotalProduct";
import TodayOrder from "./TodayOrder";
import RgistarCustomers from "./RgistarCustomers";
import LatestOrderDash from "./LatestOrderDash";
import TotalRegistarCustomerList from "./TotalRegistarCustomerList";
import ChatDaywise from "./ChatDaywise";
import ChatMonthWise from "./ChatMonthWise";
// import ChatDaywise from "./ChatDaywise";

const DashboardHome = () => {
  const [chart, setChart] = useState("day");
  return (
    <div className="w-full pt-10">
      <div className="grid grid-cols-4 gap-5 py-5">
        {/* total order */}
        <TotalOrder />
        {/* today order */}
        <TodayOrder />
        {/* total products */}
        <TotalProduct />
        {/* total register client */}
        <RgistarCustomers />
      </div>
      {/* chart */}
      <div className="grid grid-cols-2 gap-5 py-5 ">
        <div className="w-full p-5 shadow-md bg-white rounded-lg">
          <div>
            <select
              defaultValue="day"
              className="select"
              onChange={(e) => setChart(e.target.value)} // 👈 add this line
            >
              <option disabled>Pick a chart</option>
              <option value="day">Day Wise</option>
              <option value="month">Month Wise</option>
            </select>
          </div>
          {chart === "day" ? <ChatDaywise /> : <ChatMonthWise />}
        </div>
      </div>
      {/* list */}
      <section className="grid grid-cols-2 gap-5">
        <div>
          <LatestOrderDash />
        </div>
        <div>
          <TotalRegistarCustomerList />
        </div>
      </section>
      {/* <ChatDaywise/> */}
      {/* <ChatDaywise/> */}
    </div>
  );
};

export default DashboardHome;
