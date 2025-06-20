import React from "react";
import TotalOrder from "./TotalOrder";
import TotalProduct from "./TotalProduct";
import TodayOrder from "./TodayOrder";
import RgistarCustomers from "./RgistarCustomers";
import LatestOrderDash from "./LatestOrderDash";
import TotalRegistarCustomerList from "./TotalRegistarCustomerList";
import ChatDaywise from "./ChatDaywise";
// import ChatDaywise from "./ChatDaywise";


const DashboardHome = () => {
  return (
    <div className="w-full pt-10">
      <div className="grid grid-cols-4 gap-5 py-5">
        {/* total order */}
        <TotalOrder/>
        {/* today order */}
        <TodayOrder/>
        {/* total products */}
        <TotalProduct/>
        {/* total register client */}
        <RgistarCustomers/>
      </div>
       {/* list */}
       <section className="grid grid-cols-2 gap-5">
         <div>
          <LatestOrderDash/>
         </div>
         <div>
           <TotalRegistarCustomerList/>
         </div>
       </section>
       {/* <ChatDaywise/> */}
       <ChatDaywise/>
    </div>
  );
};

export default DashboardHome;