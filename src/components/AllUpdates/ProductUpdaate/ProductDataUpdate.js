import React, { useEffect, useState } from "react";
import useSubCategoryAll from "../../../hooks/useSubCategoryAll";
import useCatagory from "../../../hooks/useCatagory";
import { useParams } from "react-router-dom";
import useProductById from "../../../hooks/useProductById";
// import { ToastContainer } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const ProductDataUpdate = () => {
  const { _id } = useParams();
  // console.log(_id)
  const { idByProductData, refetch, loadings } = useProductById(_id);

  // const [subCategories] = useSubCategoryAll();
  const [categories, loading] = useCatagory();
  const [selectedImages, setSelectedImages] = useState([]);
  const [text, setText] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([{ colorName: "", colorCode: "" }]);
  const imageHostKey = process.env.REACT_APP_image_key;

  const descriptions = text || idByProductData.description;

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    price: "",
    discountNumber: "",
    categoryName: "",
    categoryId: "",
    description: "",
    youtubeLink: "",
    facebookLink: "",
    offers: "",
    offerNames: "",
    subCategoryName: "",
    subCategoryIdNum: "",
    productShowStatus: "",
    stockStatus: "",
    colorsData: [],
    images: [], // Store product images
  });
  useEffect(() => {
    if (idByProductData) {
      setFormData((prev) => ({
        ...prev,
        name: idByProductData.name || "",
        brandName: idByProductData.brandName || "",
        price: idByProductData.price || "",
        discountNumber: idByProductData.discountNumber || "",
        categoryName: idByProductData.categoryName || "",
        categoryId: idByProductData.categoryId || "",
        description: idByProductData.description || "",
        youtubeLink: idByProductData.youtubeLink || "",
        facebookLink: idByProductData.facebookLink || "",
        offers: idByProductData.offers || "",
        offerNames: idByProductData.offerNames || "",
        // subCategoryName: idByProductData.subCategoryName || "",
        // subCategoryIdNum: idByProductData.subCategoryIdNum || "",
        productShowStatus: idByProductData.productShowStatus || "",
        stockStatus: idByProductData.stockStatus || "",
        colorsData: idByProductData.colorsData || [],
        images: idByProductData.images || [], // Existing images
      }));
    }
  }, [idByProductData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  ///size all function here
  // Initialize sizes as an empty array

  // Load sizes from the fetched product data when it is available
  useEffect(() => {
    if (idByProductData && idByProductData.sizes) {
      setSizes(idByProductData.sizes); // Set sizes from the product data
    }
  }, [idByProductData]);

  // Function to add a new empty size field
  const addSizeField = () => {
    setSizes([...sizes, ""]); // Add an empty string to sizes array for the new input
  };

  // Function to handle changes in the size input field
  const handleSizeChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = value; // Update size at the specified index
    setSizes(updatedSizes);
  };

  // Function to remove a size input field
  const removeSizeField = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index); // Filter out the size to remove
    setSizes(updatedSizes);
  };

  // Load colors from fetched product data when available
  useEffect(() => {
    if (idByProductData && idByProductData.colorsData) {
      setColors(idByProductData.colorsData); // Set colors from product data
    }
  }, [idByProductData]);

  // Function to handle changes in color input fields
  const handleColorInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedColors = [...colors];
    updatedColors[index][name] = value; // Update the specific color field
    setColors(updatedColors);
  };

  // Function to add a new color input row
  const addColorField = () => {
    setColors([...colors, { colorName: "", colorCode: "" }]); // Add a new empty color object
  };

  // Function to remove a color input row
  const removeColorField = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index); // Filter out the specific color
    setColors(updatedColors);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setUploadStatus("Uploading...");

    let imageUrls = [...formData.images]; // Use existing images if no new images are uploaded

    try {
      if (selectedImages.length > 0) {
        // Upload new images to ImageBB
        const imageUploadPromises = selectedImages.map((image) => {
          const imageData = new FormData();
          imageData.append("image", image);
          return axios.post(
            `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
            imageData
          );
        });

        const imageResponses = await Promise.all(imageUploadPromises);
        imageUrls = imageResponses.map((response) => response.data.data.url);
      }

      // Prepare data to send to backend
      const dataToSend = { ...formData, images: imageUrls };

      // Send update request
      await axios.patch(
        `http://localhost:5000/api/products/${idByProductData._id}`,
        dataToSend
      );

      setUploadStatus("Upload successful!");
      toast.success("Product updated successfully!");

      refetch();
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      toast.error("Failed to update product.");
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

  if (loadings) {
    return <p>loading..</p>;
  }
  return (
    <div>
      <div>
        <div className="pt-5 ">
          <h1 className="text-2xl font-semibold">Update Produts Data ok</h1>
        </div>

        <form className="py-8" onSubmit={handleUpload}>
          {idByProductData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
              {/* details side */}
              <div className="card p-10 shadow-xl">
                <div className="text-sm my-4">
                  <p className="mb-3 font-semibold">
                    Product Name <span className="text-orange-400">*</span>
                  </p>
                  <input
                    type="text"
                    name="names"
                    placeholder="Products Name"
                    defaultValue={idByProductData.name}
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
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
                    >
                      <option value={idByProductData.categoryName}>
                        {idByProductData.categoryName}
                      </option>
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
                      <option value={idByProductData.categoryId}>
                        {idByProductData.categoryName}
                      </option>
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
                      <option value={idByProductData.subCategoryName}>
                        {idByProductData.subCategoryName}
                      </option>
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
                      <option value={idByProductData.categoryId}>
                        {idByProductData.categoryName}
                      </option>
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
                      <option value={idByProductData.subCategoryIdNum}>
                        {idByProductData.subCategoryName}
                      </option>
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
                    defaultValue={idByProductData.brandName}
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
                            "200px",
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
                  {/* <p>ck text</p>
                     <p>{parse(text)}</p> */}
                  <div
                    dangerouslySetInnerHTML={{ __html: formData.description }}
                  />
                  {descriptions}
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
                  {/* Upload area */}
                  {/* <div>
                    <div className="upload-area grid grid-cols-3 gap-x-5 gap-y-0">
                      <div className="drag-drop">
                        <p className="pb-3">Choose Product Photo</p>
                        <label htmlFor="file-upload" className="file-label">
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
                  </div> */}

                  {/* Display current or new images */}
                  {/* <div className="">
                    {previewUrls.length > 0
                      ? previewUrls.map((url, index) => (
                          <div key={index} className="my-5 w-full h-full">
                            <img
                              src={url}
                              alt={`preview ${index}`}
                              className="w-full h-full"
                              
                            />
                          </div>
                        ))
                      : formData.images.length > 0 &&
                        formData.images.map((image, index) => (
                          <div key={index} className="my-5">
                            <img
                              src={image}
                              alt={`product ${index}`}
                              
                            />
                          </div>
                        ))}
                  </div> */}
                  {/*  */}
                </div>
                {/* new */}
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

                {previewUrls.length > 0
                      ? previewUrls.map((url, index) => (
                          <div key={index} className="">
                            <img
                              src={url}
                              alt={`preview ${index}`}
                              // className="w-full h-full"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                        ))
                      : formData.images.length > 0 &&
                        formData.images.map((image, index) => (
                          <div key={index} className="my-5">
                            <img
                              src={image}
                              alt={`product ${index}`}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                        ))}
              </div>

                <div className="w-full flex justify-center"></div>
                <p className="text-sm font-thin text-justify opacity-70">
                  You need to add at least 3 images. Pay attention to the
                  quality of the pictures you add, comply with the background
                  color standards.
                </p>

                <div>
                  <p className="text-sm font-semibold my-4">Product Sizes</p>
                  <div className="grid grid-cols-2 gap-4">
                    {sizes.map((size, index) => (
                      <div className="flex items-center my-2" key={index}>
                        <input
                          type="text"
                          value={size} // Bind input value to the current size
                          onChange={(e) =>
                            handleSizeChange(index, e.target.value)
                          } // Update size on change
                          placeholder="Add Size"
                          className="text-sm input input-bordered w-full"
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() => removeSizeField(index)} // Remove size field on click
                        >
                          <i className="fa-solid fa-xmark font-semibold text-lg ms-2"></i>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center my-4">
                    <button
                      type="button"
                      className="text-sm rounded text-white addProductsAllButton px-3 font-thin py-1"
                      onClick={addSizeField} // Add new size field on button click
                    >
                      Add More Size <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="py-4">
                  <h3 className="text-sm font-semibold mb-2">
                    Dynamic Color Inputs
                  </h3>
                  {colors.map((color, index) => (
                    <div key={index} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        name="colorName"
                        placeholder="Color Name"
                        value={color.colorName}
                        onChange={(event) =>
                          handleColorInputChange(index, event)
                        }
                        className="text-sm input input-bordered w-full"
                      />
                      <input
                        type="text"
                        name="colorCode"
                        placeholder="Color Code"
                        value={color.colorCode}
                        onChange={(event) =>
                          handleColorInputChange(index, event)
                        }
                        className="text-sm input input-bordered w-full"
                      />
                      <button
                        type="button"
                        className="text-red-500 font-semibold"
                        onClick={() => removeColorField(index)} // Remove color input
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="text-sm rounded text-white addProductsAllButton px-3 font-thin py-1"
                      onClick={addColorField} // Add new color input on button click
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
                      name="prices"
                      placeholder="Price Show"
                      className="text-sm input input-bordered w-full"
                      onChange={handleInputChange}
                      defaultValue={idByProductData.price}
                    />
                    <input
                      type="number"
                      name="discount"
                      placeholder="Discount % (optional)"
                      className="text-sm input input-bordered w-full"
                      onChange={handleInputChange}
                      defaultValue={idByProductData.discountNumber}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-3">
                    Offer Set <span className="text-orange-400">*</span>{" "}
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
                      defaultValue={idByProductData.offerNames}
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
                      name="youtubeLinkok"
                      placeholder="Youtube Link"
                      className="text-sm input input-bordered w-full"
                      onChange={handleInputChange}
                      defaultValue={idByProductData.youtubeLink}
                    />
                    <input
                      type="text"
                      name="facebookLinke"
                      placeholder="Meta Link"
                      className="text-sm input input-bordered w-full"
                      onChange={handleInputChange}
                      defaultValue={idByProductData.facebookLink}
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
                      <option value={idByProductData.productShowStatus}>
                        {idByProductData.productShowStatus}
                      </option>
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
                      <option value={idByProductData.stockStatus}>
                        {idByProductData.stockStatus}
                      </option>
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
          ) : (
            <> </>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDataUpdate;
