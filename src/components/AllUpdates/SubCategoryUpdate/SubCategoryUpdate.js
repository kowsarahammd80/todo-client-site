import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSubCategorybyId from "../../../hooks/useSubCategorybyId";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubCategoryUpdate = () => {
  const {_id} = useParams()
  console.log(_id)
  const {idBySubCategoryData, loading} = useSubCategorybyId(_id)
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageError, setImageError] = useState('')
   
  const imageHostKey = process.env.REACT_APP_image_key;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    }
  };


  const handleCategoryUpdate = (event) => {
    event.preventDefault()
    const form = event.target;
    

   const name = form.name.value;
   // const image = form.image.files[0];
   
   const formData = new FormData();
   formData.append("image", image);
     
   

   fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
     method: "POST",
     body: formData,
   })
     .then((res) => res.json())
     .then((imageData) => {
       if(!imageData){
         setImageError("image not up")
       }
       const image = imageData.data.display_url;
       // console.log(image);
       catagoryUpdateData(name, image)
       // form.reset("");
     }).catch((e) => console.log(e), setImageError("Must Be You Have To Choos Category Photo Agein"));
 }

 const catagoryUpdateData = (name, image, _id) => {
    
  const updateCatagoryData = {
      name: name,
      image: image
  }
   
 //  console.log(name, image)

  fetch(`http://localhost:5000/api/subCategory/${idBySubCategoryData?._id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(updateCatagoryData),
     })
     .then((res) => res.json())
         .then((data) => {
           // console.log(data);
           if (data.status === 'success') {
             // Show success toast
             toast.success('Category update successfully!');
           } else {
             // Handle error response
             toast.error('Failed to update Category data.');
           }
         })
         .catch((e) => console.log(e));

}


    return (
        <div>

      <div>
        <p className="text-xl font-semibold pt-5">Update Sub Category</p>
      </div>

      <form className="py-5 text-sm" onSubmit={handleCategoryUpdate} >
          {
            idBySubCategoryData ? (
              <div className="">
              <div className="card p-5 w-8/12">
    
               <div className="py-4">
                 <div className="flex justify-between items-center">
                 <p className="pb-4 font-semibold">
                   Category Name <span className="text-orange-400">*</span>
                 </p>
                 <Link to="/subCategoryList">
                 <button className="addNewButton rounded px-10 py-2 mb-4">
                 <i class="fa-solid me-2 fa-arrow-left"></i> Back to Sub Category List
                 </button>
               </Link>
                 </div>
                 <input
                   type="text"
                   name="name"
                   defaultValue={idBySubCategoryData.name}
                   placeholder="Category Name"
                   className="text-sm input input-bordered w-full"
                 />
               </div>
               <div className="py-4">
                 <p className="pb-4 font-semibold">
                   Category Image <span className="text-orange-400">*</span>
                 </p>
                 <div class="">
                   <div class="upload-area">
                     <div class="drag-drop">
                       <p className="pb-3 text-red-500">Must Be You Have To <br /> Choos Category Photo Agein</p>
                       <label for="file-upload" class="file-label">
                         Choose File
                       </label>
    
                       <input
                         type="file"
                         name="image"
                         id="file-upload"
                         defaultValue={idBySubCategoryData.image}
                         className="file-input"
                         multiple
                         onChange={handleFileChange}
                       />
                     </div>
                   </div>
                 </div>
               </div>
                 
               <div>
              {
                image? (
                  <img src={previewUrl} className="w-40 h-32 pb-4" alt="" />
                ):
                <><img className="w-40 h-32 pb-4" src={idBySubCategoryData.image} alt="" /></>
              }
            </div>
              <div>
                {
                  image? <></>: (<p className="text-center text-red-500 font-semibold pb-3">{imageError}</p> )
                }
              </div>
               
               <div className="flex justify-center">
                 <button
                   type="submit"
                   className="addProductsAllButton rounded font-semibold text-white p-2 w-3/5"
                 >
                   Update Sub Category
                 </button>
               </div>
              
             </div>
           </div>
            )
            :
            <></>
          }
          
          
          
      </form>
      <ToastContainer />
    </div>
    );

};

export default SubCategoryUpdate;