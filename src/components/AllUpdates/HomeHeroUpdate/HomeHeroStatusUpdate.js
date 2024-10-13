import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './HomeHeroStatus.css'
import useHomeHeroById from '../../../hooks/useHomeHeroById';
import { useParams } from 'react-router-dom';

const HomeHeroStatusUpdate = () => {
    const {_id} = useParams()
    const {idByHomeHeroData, loading} = useHomeHeroById(_id)
    // console.log(idByHomeHeroData)

    const handleHomeHeroActivty = (event) => {
        event.preventDefault()
        const form = event.target;

        const homeHeroActityUpdate = {
            headline: idByHomeHeroData.headline,
            tagline: idByHomeHeroData.tagline,
            image: idByHomeHeroData.image,
            activeStatus: form.status.value
        }
       
        fetch(`http://localhost:5000/api/home-hero/${idByHomeHeroData?._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(homeHeroActityUpdate),
          })
          .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                if (data.status === 'success') {
                  // Show success toast
                  toast.success('Hero activty update successfully!');
                } else {
                  // Handle error response
                  toast.error('Failed to update Hero data.');
                }
              })
              .catch((e) => console.log(e));

    }

    if(loading){
        return <p>loading</p>
    }

    return (
        <div>
          <div>
            <p className="text-xl font-semibold pt-5">Home Hero Status </p>
          </div>
          <form className="py-5 text-sm" onSubmit={handleHomeHeroActivty} >
            {
                idByHomeHeroData && (<div className="">
                    <div className="card p-5 w-8/12">
                      <div className='p-5'>
                          <div className='my-5'>
                              <p className='text-lg font-semibold my-4'> Headline : <span className='opacity-75'>{idByHomeHeroData.headline}</span></p>
                              <p className='text-lg font-semibold'> Tagline : <span className='opacity-75'>{idByHomeHeroData.tagline}</span> </p>
                          </div>
                          <div>
                        <p className="mb-2 font-semibold">
                          Activity <span className="text-orange-400">*</span>
                        </p>
                        <select
                          name="status"
                          className="select select-bordered w-full"  
                        //   defaultValue={idByHomeHeroData.activeStatus}
                        >
                          <option defaultValue={idByHomeHeroData.activeStatus} value={idByHomeHeroData.activeStatus}>{idByHomeHeroData.activeStatus}</option>
                          {
                            idByHomeHeroData.activeStatus === "Active" ? <><option value="Inactive">Inactive</option></> : <><option value="Active">Active</option></>
                          }
                        </select>
                      </div>
                          <div className='homeHeroImageDiv my-5 p-2'>
                              <img src={idByHomeHeroData.image} alt="" className='homeHeroImage' />
                          </div>
                      </div>
                      <div className="flex justify-center my-5">
                        <button
                          type="submit"
                          className="addProductsAllButton rounded font-semibold text-white p-2 w-3/5"
                        >
                          Save Change
                        </button>
                      </div>
                    </div>
                  </div>)
            }
          </form>
          <ToastContainer />
        </div>
    );
};

export default HomeHeroStatusUpdate;