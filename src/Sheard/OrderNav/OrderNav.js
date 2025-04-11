import React from "react";
import { Link } from "react-router-dom";

const OrderNav = () => {
  return (
    <div className="pt-5">
      <div className="flex justify-start gap-4 py-10 text-sm">
        <Link to='/orders/orders-All'>
          <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
            All Order
          </p>
        </Link>
        <Link>
          <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
            COD Order
          </p>
        </Link>
        <Link>
          <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
            AVD Order
          </p>
        </Link>
        <Link>
          <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
            Confirm Order
          </p>
        </Link>
        <Link>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Pending Order
        </p>
        </Link>
        <Link>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Prosessing Order
        </p>
        </Link>
        <Link>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Onthe away
        </p>
        </Link>
        {/* <Link>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Success
        </p>
        </Link> */}
        <Link>
        <p className="border px-5 py-2 rounded-full shadow-md cursor-pointer">
          Return
        </p>
        </Link>
      </div>
    </div>
  );
};

export default OrderNav;
