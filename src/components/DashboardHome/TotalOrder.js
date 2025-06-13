import React from 'react';
import useAllOrderList from '../../hooks/useAllOrderList';

const TotalOrder = () => {
    const [allOrderList] = useAllOrderList()
    return (
        <div className="bg-green-200 px-5 py-6 rounded-md shadow-md">
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-500 flex justify-center items-center">
              <i class="fa-solid fa-cart-shopping text-4xl text-gray-700"></i>
            </div>
            <div className="text-end">
              <p className="pb-2 text-2xl text-gray-700">{allOrderList?.length ? allOrderList?.length : 0}</p>
              <p className="text-gray-500 text-sm">Total Order</p>
            </div>
          </div>
        </div>
    );
};

export default TotalOrder;