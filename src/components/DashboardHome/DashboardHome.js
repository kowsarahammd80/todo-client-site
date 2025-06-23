import React, { useState } from "react";
import TotalOrder from "./TotalOrder";
import TotalProduct from "./TotalProduct";
import TodayOrder from "./TodayOrder";
import RgistarCustomers from "./RgistarCustomers";
import LatestOrderDash from "./LatestOrderDash";
import TotalRegistarCustomerList from "./TotalRegistarCustomerList";
import ChatDaywise from "./ChatDaywise";
import ChatMonthWise from "./ChatMonthWise";
import ChatWeeklyWiseData from "./ChatWeeklyWiseData";
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
              onChange={(e) => setChart(e.target.value)} 
            >
              <option disabled>Pick a chart</option>
              <option value="day">Day Wise</option>
              <option value="week">Weekly Wise</option>
              <option value="month">Monthly Wise</option>
            </select>
          </div>
          {chart === "day" && <ChatDaywise />} 
          {
            chart === "month" && <ChatMonthWise />
          }
          {
            chart === "week" && <ChatWeeklyWiseData />
          }
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
     
    </div>
  );
};

export default DashboardHome;
