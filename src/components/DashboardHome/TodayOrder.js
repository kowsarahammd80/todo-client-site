import React from "react";
import useTodayOrder from "../../hooks/useTodayOrder";

const TodayOrder = () => {
  const [todaysOrder] = useTodayOrder()
  return (
    <div className="bg-purple-200 px-5 py-6 rounded-md shadow-md">
      <div className="grid grid-cols-2">
        <div className="border-r border-gray-500 flex justify-center items-center">
          <i class="fa-solid fa-bag-shopping text-4xl text-gray-700"></i>
        </div>
        <div className="text-end">
          <p className="pb-2 text-2xl text-gray-700">{todaysOrder.length}</p>
          <p className="text-gray-500 text-sm">Today's Order</p>
        </div>
      </div>
    </div>
  );
};

export default TodayOrder;
