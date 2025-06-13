import React from 'react';
import useProductAll from '../../hooks/useProductAll';

const TotalProduct = () => {
    const [products] = useProductAll()
    return (
        <div className="bg-sky-200 px-5 py-6 rounded-md shadow-md">
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-500 flex justify-center items-center">
              <i class="fa-solid fa-database text-4xl text-gray-700"></i>
            </div>
            <div className="text-end">
              <p className="pb-2 text-2xl text-gray-700">{products.length}</p>
              <p className="text-gray-500 text-sm">Total Product</p>
            </div>
          </div>
        </div>
    );
};

export default TotalProduct;