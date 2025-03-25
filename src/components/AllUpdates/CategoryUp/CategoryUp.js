import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetByIdCatagory from "../../../hooks/useGetByIdCatagory";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryUp = () => {
  
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const {_id} = useParams()
  const {idByCategoryData, loading} = useGetByIdCatagory(_id)
  const [imageError, setImageError] = useState('')

  if (loading) {
    return <p>loading...</p>
  }

  const imageHostKey = process.env.REACT_APP_image_key;

  // Handle file change (image selection)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Handle category update (submit form)
  const handleCategoryUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;

    const formData = new FormData();
    
    // If there's a new image, append it to the form data, otherwise keep the old image
    if (image) {
      formData.append("image", image);
    } else {
      // If no image selected, send the old image URL
      formData.append("image", idByCategoryData.image);
    }

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((imageData) => {
      if (!imageData) {
        setImageError("Image upload failed");
        return;
      }

      const imageUrl = image ? imageData.data.display_url : idByCategoryData.image;
      catagoryUpdateData(name, imageUrl);
    })
    .catch((e) => {
      setImageError("Image upload failed. Please try again.");
      console.log(e);
    });
  }

  // Update category data in the backend
  const catagoryUpdateData = (name, imageUrl) => {
    const updateCategoryData = {
      name: name,
      image: imageUrl
    }

    fetch(`http://localhost:5000/api/category/${idByCategoryData?._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCategoryData),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        toast.success('Category updated successfully!');
      } else {
        toast.error('Failed to update category.');
      }
    })
    .catch((e) => {
      console.log(e);
      toast.error('Error updating category.');
    });
  }

  return (
    <div>
      <div>
        <p className="text-xl font-semibold pt-5">Update Category</p>
      </div>

      <form className="py-5 text-sm" onSubmit={handleCategoryUpdate}>
        {idByCategoryData ? (
          <div className="">
            <div className="card p-5 w-8/12">
              <div className="py-4">
                <div className="flex justify-between items-center">
                  <p className="pb-4 font-semibold">
                    Category Name <span className="text-orange-400">*</span>
                  </p>
                  <Link to="/categoriesList">
                    <button className="addNewButton rounded px-10 py-2 mb-4">
                      <i className="fa-solid me-2 fa-arrow-left"></i> Back to Category List
                    </button>
                  </Link>
                </div>
                <input
                  type="text"
                  name="name"
                  defaultValue={idByCategoryData.name}
                  placeholder="Category Name"
                  className="text-sm input input-bordered w-full"
                />
              </div>

              <div className="py-4">
                <p className="pb-4 font-semibold">
                  Category Image <span className="text-orange-400">*</span>
                </p>
                <div className="">
                  <div className="upload-area">
                    <div className="drag-drop">
                      {/* <p className="pb-3 text-red-500">Must Be You Have To Choose Category Photo Again</p> */}
                      <label htmlFor="file-upload" className="file-label">
                        Choose File
                      </label>

                      <input
                        type="file"
                        name="image"
                        id="file-upload"
                        className="file-input"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview selected image or use existing image */}
              <div>
                {image ? (
                  <img src={previewUrl} className="w-40 h-32 pb-4" alt="Preview" />
                ) : (
                  <img className="w-40 h-32 pb-4" src={idByCategoryData.image} alt="Existing" />
                )}
              </div>

              {/* Display error if image selection fails */}
              <div>
                {!image && imageError && <p className="text-center text-red-500 font-semibold pb-3">{imageError}</p>}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="addProductsAllButton rounded font-semibold text-white p-2 w-3/5"
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>

      <ToastContainer />
    </div>
  );
};

export default CategoryUp;
