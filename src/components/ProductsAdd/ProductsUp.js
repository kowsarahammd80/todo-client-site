import React, { useState } from "react";
import axios from "axios";
import "./ProductsAdd.css";
import useCatagory from "../../hooks/useCatagory";
// import useSubCategoryAll from "../../hooks/useSubCategoryAll";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import parse from "html-react-parser"

const ProductsUp = () => {
  // const [subCategories] = useSubCategoryAll();
  const [categories, loading] = useCatagory();
  const [selectedImages, setSelectedImages] = useState([]);
  // const [sizes, setSizes] = useState([{ size: "", price: "", discount: "" }]);
  const [sizes, setSizes] = useState([""]);
  const [colors, setColors] = useState([{ colorName: "", colorCode: "" }]);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    price: "",
    discountNumber: "",
    sizes: [""],
    categoryName: "",
    categoryId: "",
    description: "",
    youtubeLink: "",
    facebookLink: "",
    offers: "",
    offerNames: "",
    // subCategoryName: "",
    // subCategoryIdNum: "",
    productShowStatus: "",
    stockStatus: "",
  });

  const [text, setText] = useState("");
  // console.log(formData)
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  if (loading) {
    return (
      <p className="flex justify-center items-center h-screen font-semibold">
        loading...
      </p>
    );
  }

  const imageHostKey = process.env.REACT_APP_image_key;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeChange = (index, newValue) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = newValue;
    setSizes(updatedSizes);
  };

  // Step 3: Add a new size field
  const addSizeField = () => {
    setSizes([...sizes, ""]);
  };

  const removeSizeField = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  // Function to handle input changes
  const handleColorInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedColors = [...colors];
    updatedColors[index][name] = value;
    setColors(updatedColors);
  };

  // Function to add a new color input row
  const addColorField = () => {
    setColors([...colors, { name: "", code: "" }]);
  };

  // Function to remove a color input row
  const removeColorField = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const form = event.target;
    setUploadStatus("Uploading...");
    const imageUrls = [];

    try {
      // Upload each image to ImageBB
      const imageUploadPromises = selectedImages.map((image) => {
        const imageData = new FormData();
        imageData.append("image", image);
        return axios.post(
          `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
          imageData
        );
      });

      const imageResponses = await Promise.all(imageUploadPromises);
      imageResponses.forEach((response) => {
        imageUrls.push(response.data.data.url);
      });

      const dataToSend = {
        name: formData.name,
        brandName: formData.brandName,
        price: formData.price,
        discountNumber: formData.discount,
        sizes: sizes, // Array of sizes
        images: imageUrls,
        categoryName: formData.selectedOption,
        categoryId: formData.selectedOptionId,
        description: text,
        youtubeLink: formData.youtubeLink,
        facebookLink: formData.facebookLink,
        offers: formData.offer,
        offerNames: formData.offerName,
        // subCategoryName: formData.subCategoriesName,
        // subCategoryIdNum: formData.subCategoriesId,
        productShowStatus: formData.productStatus,
        stockStatus: formData.productStockStatus,
        colorsData: colors,
      };

      // console.log(dataToSend)
      // Post data to your backend
      await axios.post(`http://localhost:5000/api/products`, dataToSend);
      // console.log(dataToSend);
      setUploadStatus("Upload successful !");
      if (setUploadStatus) {
        // Show success toast
        toast.success("Product posted successfully!");
      } else {
        // Handle error response
        toast.error("Failed to post product data.");
      }
      setFormData({
        name: "",
        brandName: "",
        price: "",
        discountNumber: "",
        sizes: [""],
        categoryName: "",
        categoryId: "",
        description: "",
        youtubeLink: "",
        facebookLink: "",
        offers: "",
        offerNames: "",
        productShowStatus: "",
        stockStatus: "",
      });

      setSizes([""]);
      setText("");
      setSelectedImages([]);
      setColors([]);
      form.reset();
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error(error);
    }
  };

  const getColor = () => {
    if (uploadStatus === "Upload successful !") {
      return "green";
    } else if (uploadStatus === "Upload failed. Please try again.") {
      return "red";
    } else {
      return "blue";
    }
  };

  return (
    <div>
      <div>
        <div className="pt-5 ">
          <h1 className="text-2xl font-semibold">Add Produts </h1>
        </div>

        <form className="py-8" onSubmit={handleUpload}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
            {/* details side */}
            <div className="card p-10 shadow-xl">
              <div className="text-sm my-4">
                <p className="mb-3 font-semibold">
                  Product Name <span className="text-orange-400">*</span>
                </p>
                <input
                  type="text"
                  name="name"
                  placeholder="Products Name"
                  className="text-sm input input-bordered w-full"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 text-sm my-2 gap-4">
                <div>
                  <p className="mb-2 font-semibold">
                    Category <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="selectedOption"
                    className="select select-bordered w-full "
                    value={formData.selectedOption}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    {categories.map((category, _id) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-2 font-semibold">
                    Again Category <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="selectedOptionId"
                    className="select select-bordered w-full "
                    // value={formData.selectedOptionId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    {categories.map((category, _id) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div>
                  <p className="mb-2 font-semibold">
                    Sub Category <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="subCategoriesName"
                    className="select select-bordered w-full "
                    // value={formData.subCategoriesName}
                    onChange={handleInputChange}
                    
                  >
                    <option value="">Select Option</option>
                    {subCategories.map((subCategory, _id) => (
                      <option key={subCategory._id} value={subCategory.name}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>

              <div className="grid grid-cols-2 text-sm my-2 gap-4">
                {/* <div>
                  <p className="mb-2 font-semibold">
                    Again Category <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="selectedOptionId"
                    className="select select-bordered w-full "
                    // value={formData.selectedOptionId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    {categories.map((category, _id) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* <div>
                  <p className="mb-2 font-semibold">
                    Again Sub Category{" "}
                    <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="subCategoriesId"
                    className="select select-bordered w-full "
                    // value={formData.subCategoriesId}
                    onChange={handleInputChange}
                    
                  >
                    <option value="">Select Option</option>
                    {subCategories.map((subCategory, _id) => (
                      <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>

              <div className="text-sm my-4">
                <p className="mb-3 font-semibold">
                  Brand Name <span className="text-orange-400">*</span>
                </p>
                <input
                  type="text"
                  name="brandName"
                  placeholder="Brand Name"
                  className="text-sm input input-bordered w-full"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <p className="text-sm mb-3 font-semibold">
                  Description <span className="text-orange-400">*</span>
                </p>

                <div>
                  <CKEditor
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "min-height",
                          "380px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "blockQuote",
                        "insertTable",
                        "undo",
                        "redo",
                        "fontSize",
                        "fontColor",
                        "fontBackgroundColor",
                        "alignment",
                        "imageUpload",
                        "mediaEmbed",
                      ],
                      // Other configuration options if needed
                    }}
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setText(data);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* image up side */}
            <div className="card p-10 shadow-xl">
              <div>
                <p className="text-sm font-semibold">
                  Upload Images <span className="text-orange-400">*</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-x-5 gap-y-0">
                <div class="">
                  <div class="upload-area">
                    <div class="drag-drop">
                      <p className="pb-3">Choos Product Photo</p>
                      <label for="file-upload" class="file-label">
                        Choose File
                      </label>

                      <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        multiple
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>

                {previewUrls.map((url, index) => (
                  <div key={index} className="my-5">
                    <img
                      src={url}
                      alt={`preview ${index}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center"></div>
              <p className="text-sm font-thin text-justify opacity-70">
                You need to add at least 3 images. Pay attention to the quality
                of the pictures you add, comply with the background color
                standards.
              </p>
              <div className="text-sm my-5">
                <p className="font-semibold">
                  Add Size <span className="text-orange-400">*</span>
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {sizes.map((size, index) => (
                    <div className="flex items-center my-2" key={index}>
                      <input
                        type="text"
                        value={size}
                        onChange={(e) =>
                          handleSizeChange(index, e.target.value)
                        }
                        placeholder="Add Size"
                        className="text-sm input input-bordered w-full"
                      />
                      <span
                        className="cursor-pointer"
                        onClick={() => removeSizeField(index)}
                      >
                        <i className="fa-solid fa-xmark font-semibold text-lg ms-2"></i>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center my-4">
                  <button
                    type="button"
                    className=" text-sm rounded text-white addProductsAllButton px-3 font-thin py-1"
                    onClick={addSizeField}
                  >
                    Add More Size <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="py-4">
                <h3 className="text-sm font-semibold mb-2">
                  Dynamic Color Inputs
                </h3>
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-4">
                    <input
                      type="text"
                      name="colorName"
                      placeholder="Color Name"
                      value={color.name}
                      onChange={(event) => handleColorInputChange(index, event)}
                      className="text-sm input input-bordered w-full my-1"
                    />
                    <input
                      type="text"
                      name="colorCode"
                      placeholder="Color Code"
                      value={color.code}
                      onChange={(event) => handleColorInputChange(index, event)}
                      className="text-sm input input-bordered w-full my-1"
                    />
                    <button
                      type="button"
                      className=""
                      onClick={() => removeColorField(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <div className="flex justify-center py-4">
                  <button
                    type="button"
                    className=" text-sm rounded text-white addProductsAllButton px-3 font-thin py-1"
                    onClick={addColorField}
                  >
                    Add More Color +
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-3">
                  Price Set <span className="text-orange-400">*</span>{" "}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* <input
                    type="text"
                    placeholder="Minimum pirce"
                    className="text-sm input input-bordered w-full"
                  /> */}
                  <input
                    type="number"
                    name="price"
                    placeholder="Price Show"
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="number"
                    name="discount"
                    placeholder="Discount % (optional)"
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-3">
                  Hot Deal Set <span className="text-orange-400">*</span>{" "}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* <input
                    type="text"
                    placeholder="Minimum pirce"
                    className="text-sm input input-bordered w-full"
                  /> */}
                  <select
                    name="offer"
                    className="select select-bordered w-full "
                    // value={formData.subCategoriesName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Deals</option>

                    <option value="hot">Hot Deals</option>
                    <option value="treanding">Trending deals</option>
                  </select>

                  <input
                    type="text"
                    name="offerName"
                    placeholder="Offer Name (Commbo Offer)"
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-3">
                  Additional Information{" "}
                  <span className="text-orange-400">*</span>{" "}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* <input
                    type="text"
                    placeholder="Minimum pirce"
                    className="text-sm input input-bordered w-full"
                  /> */}
                  <input
                    type="text"
                    name="youtubeLink"
                    placeholder="Youtube Link"
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="facebookLink"
                    placeholder="Meta Link"
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 text-sm my-2 gap-4">
                <div>
                  <p className="mb-2 font-semibold">
                    Product Status <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="productStatus"
                    className="select select-bordered w-full "
                    value={formData.productsStatus}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="publish">Publish</option>
                    <option value="unPublish">Un Publish</option>
                  </select>
                </div>
                <div>
                  <p className="mb-2 font-semibold">
                    Stock Status <span className="text-orange-400">*</span>
                  </p>
                  <select
                    name="productStockStatus"
                    className="select select-bordered w-full "
                    // value={formData.subCategoriesName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="inStock">Stock In</option>
                    <option value="stockOut">Stock Out</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="addProductsAllButton rounded text-white font-semibold mt-5 mx-16 py-1"
              >
                Add Post
              </button>
              <p className="text-center font-semibold mt-4">
                {" "}
                <span style={{ color: getColor() }}> {uploadStatus} </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductsUp;
