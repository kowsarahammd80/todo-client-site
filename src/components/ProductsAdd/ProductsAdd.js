import React, { useState } from "react";
import "./ProductsAdd.css";
// import { useActionData } from "react-router-dom";

const ProductsAdd = () => {
  const [imageInputUps, setImageInputUp] = useState([{ value1: "" }]);
  const [addSizeInputs, setAddSizeInput] = useState([{ value2: "" }]);
  // console.log(imageInputUps)

  const handleInputValue = (index, event) => {
    const values = [...imageInputUps];
    values[index].value1 = event.target.value;
    setImageInputUp(values);
  };
  const handleImageInputPlus = () => {
    setImageInputUp([...imageInputUps, { value1: "" }]);
  };
  const handleImageInputRemove = (index) => {
    const removeImageUpdate = [...imageInputUps];
    removeImageUpdate.splice(index, 1);
    setImageInputUp(removeImageUpdate);
  };

  // input value set
  const handleAddSizeInputValue = (index, event) => {
    const values = [...addSizeInputs];
    values[index].value2 = event.target.value;
    setAddSizeInput(values);
  };
  const handleAddSizeInputPlus = () => {
    setAddSizeInput([...addSizeInputs, { value2: "" }]);
  };
  const handleAddSizeInputRemove = (index) => {
    const removeAddSizeUpdate = [...addSizeInputs];
    removeAddSizeUpdate.splice(index, 1);
    setAddSizeInput(removeAddSizeUpdate);
  };

  const handleProductUpForm = (event) => {
    event.preventDefault();
    const from = event.target;
    const productsName = from.productName.value;
    // const productImages = from.images.value;

    console.log(productsName, imageInputUps, addSizeInputs);
  };

  return (
    <div>
      <div className="pt-5">
        <h1 className="text-2xl font-semibold">Add Produts</h1>
      </div>

      <form className="py-8" onSubmit={handleProductUpForm}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          {/* details side */}
          <div className="card p-10 bg-base-100 shadow-xl">
            <div className="text-sm my-4">
              <p className="mb-3 font-semibold">
                Product Name <span className="text-orange-400">*</span>
              </p>
              <input
                type="text"
                name="productName"
                placeholder="Products Name"
                className="text-sm input input-bordered w-full"
              />
            </div>
            <div className="grid grid-cols-2 text-sm my-2 gap-4">
              <div>
                <p className="mb-2 font-semibold">
                  Category <span className="text-orange-400">*</span>
                </p>
                <select className="select select-bordered w-full ">
                  <option disabled selected>
                    Selete category ?
                  </option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                </select>
              </div>
              <div>
                <p className="mb-2 font-semibold">
                  Sub Category <span className="text-orange-400">*</span>
                </p>
                <select className="select select-bordered w-full ">
                  <option disabled selected className="opacity-50 font-thin">
                    Sub Category
                  </option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                </select>
              </div>
            </div>
            <div className="text-sm my-4">
              <p className="mb-3 font-semibold">
                Brand Name <span className="text-orange-400">*</span>
              </p>
              <input
                type="text"
                placeholder="Brand Name"
                className="text-sm input input-bordered w-full"
              />
            </div>
            <div>
              <p className="text-sm mb-3 font-semibold">
                Discription <span className="text-orange-400">*</span>
              </p>
              <textarea
                className="textarea textarea-bordered w-full h-80"
                placeholder="Product Discription"
              ></textarea>
            </div>
          </div>
          {/* image up side */}
          <div className="card p-10 bg-base-100 shadow-xl">
            <div>
              <p className="text-sm font-semibold">Upload Images</p>
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-0">
              {imageInputUps.map((imageInputUp, index) => (
                <div class="" key={index}>
                  <div class="upload-area">
                    <div class="drag-drop">
                      <p className="pb-3">Choos Product Photo</p>
                      <label for="file-upload" class="file-label">
                        Choose File
                      </label>

                      <input
                        type="file"
                        name="images"
                        id="file-upload"
                        className="file-input"
                        value={imageInputUp.value1}
                        onChange={(e) => handleInputValue(index, e)}
                      />
                    </div>
                    <p class="upload-info">
                      Accepted file types: JPG, PNG. Max <br /> file size: 10
                      MB.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex justify-center w-full mb-4"
                    onClick={handleImageInputRemove}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
              {/* <div class="">
                <div class="upload-area">
                  <div class="drag-drop">
                    <p className="pb-3">Choos Product Photo</p>

                    <label for="file-upload" class="file-label">
                      Choose File
                    </label>
                    <input type="file" id="file-upload" class="file-input" />
                  </div>
                  <p class="upload-info">
                    Accepted file types: JPG, PNG. Max <br /> file size: 10 MB.
                  </p>
                </div>
              </div>
              <div class="">
                <div class="upload-area">
                  <div class="drag-drop">
                    <p className="pb-3">Choos Product Photo</p>

                    <label for="file-upload" class="file-label">
                      Choose File
                    </label>
                    <input type="file" id="file-upload" class="file-input" />
                  </div>
                  <p class="upload-info">
                    Accepted file types: JPG, PNG. Max <br /> file size: 10 MB.
                  </p>
                </div>
              </div> */}
            </div>
            <div className="w-full flex justify-center">
              <button
                type="button"
                className=" cursor-pointer my-5 text-sm text-white addProductsAllButton px-3 font-thin py-1"
                onClick={handleImageInputPlus}
              >
                Add More Imge <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <p className="text-sm font-thin text-justify opacity-70">
              You need to add at least 3 images. Pay attention to the quality of
              the pictures you add, comply with the background color standards.
            </p>
            <div className="text-sm my-4">
              <p className="font-semibold">
                Add Size <span className="text-orange-400">*</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                {addSizeInputs.map((addSizeInput, index) => (
                  <div className="flex items-center my-2" key={index}>
                    <input
                      type="text"
                      value={addSizeInput.value2}
                      placeholder="Add Size"
                      className="text-sm input input-bordered w-full"
                      onChange={(e) => handleAddSizeInputValue(index, e)}
                    />
                    <span type="button" className="cursor-pointer" onClick={handleAddSizeInputRemove}>
                      <i class="fa-solid fa-xmark font-semibold text-lg ms-2"></i>
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center my-4">
                <button
                  type="button"
                  className=" text-sm text-white addProductsAllButton px-3 font-thin py-1"
                  onClick={handleAddSizeInputPlus}
                >
                  Add More Size <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold mb-3">Price Set <span className="text-orange-400">*</span> </p>
               <div className="grid grid-cols-3 gap-4">
                <input
                      type="text"
                      placeholder="Minimum pirce"
                      className="text-sm input input-bordered w-full"
                    />
                <input
                      type="text"
                      placeholder="Defalut Price Show"
                      className="text-sm input input-bordered w-full"
                    />
                <input
                      type="text"
                      placeholder="Discount % (optional)"
                      className="text-sm input input-bordered w-full"
                    />
               </div>
            </div>
            <button type="submit" className="addProductsAllButton text-white font-semibold mt-5 mx-16 py-1">Add Post</button>
          </div>
        </div>
      </form>
      {/* <div class="container">
        <h2>Upload Image</h2>
        <div class="upload-area">
            <div class="drag-drop">
                <p>Drag & Drop your files here</p>
                <p>or</p>
                <label for="file-upload" class="file-label">Choose File</label>
                <input
                type="file" id="file-upload" class="file-input"
              />
            </div>
            <p class="upload-info">Accepted file types: JPG, PNG. Max file size: 10 MB.</p>
        </div>
        <button class="upload-btn">Upload</button>
        <div class="progress">
            <div class="progress-bar" style="width: 0;"></div>
        </div>
        <div class="upload-status"></div>
    </div> */}
    </div>
  );
};

export default ProductsAdd;
