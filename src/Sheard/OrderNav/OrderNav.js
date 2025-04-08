import React from "react";

const OrderNav = () => {
  return (
    <div className="pt-5">
      <div className="flex justify-start gap-4 py-10">
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          All Order
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          COD Order
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          AVP Order
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Confirm Order
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Pending Order
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Prosessing Order
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Onthe away 
        </p>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Return
        </p>
      </div>
    </div>
  );
};

export default OrderNav;
