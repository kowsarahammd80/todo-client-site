import React from "react";
import useRegisterCusmotems from "../../hooks/useRegisterCusmotems";
import { Link } from "react-router-dom";

const TotalRegistarCustomerList = () => {
  const [registecustomers, loading] = useRegisterCusmotems();
  if(loading){
      return <div className="flex justify-center items-center h-screen">
        loading...
      </div>
    }
  return (
    <div>
      {/* <h1>{registecustomers?.length}</h1> */}
      <div>
        <div className="pb-5 pt-5 flex justify-between items-center">
          <p className="text-xl font-semibold"></p>
          {/* <button
                      onClick={downloadPDF}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded shadow"
                    >
                      Download PDF
                    </button> */}
        </div>

        <div className="card p-5 shadow-xl">
          <div className="grid grid-cols-8 gap-2 pb-5">
           
          </div>
          <p>Latest Register Customers</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 pb-5">
            <div>
             
            </div>
          </div>

          <div className="overflow-x-auto shadow" id="orderTableToPDF">
            <table className="table w-full text-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  
                </tr>
              </thead>
              <tbody>
                {[...registecustomers]?.slice(0, 10).map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.number}</td>
                    <td>{user.email}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default TotalRegistarCustomerList;
