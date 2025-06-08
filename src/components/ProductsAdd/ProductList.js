import React, { useState } from 'react';
import useProductAll from '../../hooks/useProductAll';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
// import ProductListShow from './ProductListShow';


const ProductList = () => {

    const [products, loading, refetch] = useProductAll()
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);

    const haldleDeleteProduct = (id) => {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
        refetch(true)
    };

    if(loading){
        return <p>loading...</p>
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const productsDatas = products.slice(firstPostIndex, lastPostIndex);

    return (

        <div>
        <div className="pb-5 pt-5">
          <p className="text-xl font-semibold">Products List</p>
        </div>
        <div className="card p-5 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 pb-5">
            <div>
              <label className="input input-bordered flex items-center">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div className="flex justify-end">
              <Link to="/productsAdd">
                <button className="addNewButton rounded px-10 py-2">
                  {" "}
                  <i class="fa-solid fa-plus"></i> Add New
                </button>
              </Link>
            </div>
          </div>
  
          <div className="overflow-x-auto shadow">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="">Product</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Create Date</th>
                  
                  <th className="text-center">Action</th>
                </tr>
              </thead>
  
              {productsDatas?.map((product, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product.images}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{product.categoryName}</td>
                    <td className="text-center">{product.date} <span className="font-semibold">&</span> {product.time}</td>
                    
                    <th>
                      <div className="text-center">
                        <button className="categoryEyeButton px-4 py-1 rounded shadow text-lg">
                          {" "}
                          <span>
                            <i class="fa-regular fa-eye"></i>
                          </span>{" "}
                        </button>
                       <Link to={`/productsList/${product._id}`}>
                       <button className="categoryPenButton px-4 py-1 rounded shadow text-lg ">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                       </Link>
                        {/* delete */}
                        <label htmlFor={`${product._id}`} className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer">
                          <i class="fa-regular fa-trash-can"></i>
                        </label>
                        {/* Put this part before </body> tag */}
                        <input
                          type="checkbox"
                          id={`${product._id}`}
                          className="modal-toggle"
                        />
                        <div className="modal" role="dialog">
                          <div className="modal-box">
                            {/* <h3 className="text-lg font-bold">{category._id}</h3> */}
                            <p className="py-4 font-thin">
                              Are you sure want to delete this Category <span className="font-semibold">{product.name}</span>?
                            </p>
                            <div className="modal-action">
                              <label htmlFor={`${product._id}`} className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer text-red-500 border">
                                No
                              </label>
                              <label htmlFor={`${product._id}`}
                          className="categoryDeleteButton px-4 py-1 rounded shadow text-lg cursor-pointer text-green-500 border"
                          onClick={(_id) => haldleDeleteProduct (product._id)}
                        >
                           <span className="text-green-500">YES</span>
                        </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </tbody>
                // <ProductListShow 
                //  product={product}
                //  key={index}
                // />
              ))}
            </table>
          </div>
            
          <Pagination totalPosts={products.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />

        </div>
      </div>
    );
};

export default ProductList;