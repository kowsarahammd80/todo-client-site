import React, { useEffect, useState } from 'react';
import useSubCategoryAll from '../../hooks/useSubCategoryAll';
import useCatagory from '../../hooks/useCatagory';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import useProductById from '../../hooks/useProductById';


const ProductListShow = () => {
  const {_id} = useParams()
  const { idByProductData, refetch } = useProductById(_id);
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    price: "",
    sizes: [],
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
    images: [],
  });
  const imageHostKey = process.env.REACT_APP_image_key;
  const [text, setText] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [categories] = useSubCategoryAll([]); // Assuming you're fetching categories
  const [subCategories] = useCatagory([]);
  const descriptions = text || idByProductData.description;
  const [selectedImages, setSelectedImages] = useState([]);

  // Fetch existing product data by ID
  useEffect(() => {
    setFormData({
      name: idByProductData.name,
      brandName: idByProductData.brandName,
      price: idByProductData.price,
      discountNumber: idByProductData.discountNumber,
      sizes: idByProductData.sizes, // Array of sizes
      images: idByProductData.images,
      categoryName: idByProductData.categoryName,
      categoryId: idByProductData.categoryId,
      description: descriptions,
      youtubeLink: idByProductData.youtubeLink,
      facebookLink: idByProductData.facebookLink,
      offers: idByProductData.offers,
      offerNames: idByProductData.offerNames,
      subCategoryName: idByProductData.subCategoryName,
      subCategoryIdNum: idByProductData.subCategoryIdNum,
      productShowStatus: idByProductData.productShowStatus,
      stockStatus: idByProductData.stockStatus,
    });

    refetch(true);
  }, [text, idByProductData]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = [...formData.sizes];
    newSizes[index][name] = value;
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  const handleRemoveSize = (index) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "", price: "", discount: "" }],
    });
  };

  const handleUpload = async (event, _id) => {
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

      // Prepare data to send to your backend
      const dataToSend = {
        ...formData,
        images: imageUrls,
      };
      // const dataToSend = {
      //   name: formData.name,
      //   brandName: formData.brandName,
      //   price: formData.price,
      //   discountNumber: formData.discount,
      //   sizes: formData.sizes, // Array of sizes
      //   images: imageUrls,
      //   categoryName: formData.selectedOption,
      //   categoryId: formData.selectedOptionId,
      //   description: text,
      //   youtubeLink: formData.youtubeLink,
      //   facebookLink: formData.facebookLink,
      //   offers: formData.offer,
      //   offerNames: formData.offerName,
      //   subCategoryName: formData.subCategoriesName,
      //   subCategoryIdNum: formData.subCategoriesId,
      //   productShowStatus: formData.productStatus,
      //   stockStatus: formData.productStockStatus,
      // };

      // console.log(dataToSend)
      // Post data to your backend
      await axios.patch(
        `http://localhost:5000/api/products/${idByProductData._id}`,
        dataToSend
      );
      // console.log(dataToSend);
      setUploadStatus("Upload successful !");
      if (setUploadStatus) {
        // Show success toast
        toast.success("Product update successfully!");
      } else {
        // Handle error response
        toast.error("Failed to product update data.");
      }
      form.reset("");
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error(error);
    }
    // refetch(true)
  };

  const getColor = () => (uploadStatus.includes("successful") ? "green" : "red");
    
    return (
      <div>
      <div>
        <div className="pt-5">
          <h1 className="text-2xl font-semibold">Product Update new</h1>
        </div>

        <form className="py-8" onSubmit={handleUpload}>
          {formData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
              {/* Details side */}
              <div className="card p-10 shadow-xl">
                {/* Product Name */}
                <div className="text-sm my-4">
                  <p className="mb-3 font-semibold">
                    Product Name <span className="text-orange-400">*</span>
                  </p>
                  <input
                    type="text"
                    name="name"
                    defaultValue={formData.name}
                    placeholder="Product Name"
                    className="text-sm input input-bordered w-full"
                    onChange={handleInputChange}
                  />
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 text-sm my-2 gap-4">
                  <div>
                    <p className="mb-2 font-semibold">
                      Category <span className="text-orange-400">*</span>
                    </p>
                    <select
                      name="categoryName"
                      className="select select-bordered w-full"
                      defaultValue={formData.categoryName}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Option</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold">
                      Sub Category <span className="text-orange-400">*</span>
                    </p>
                    <select
                      name="subCategoryName"
                      className="select select-bordered w-full"
                      defaultValue={formData.subCategoryName}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Option</option>
                      {subCategories?.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory.name}>
                          {subCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* More fields similar to the above */}
                {/* Sizes Section */}
                <div className="text-sm my-5">
                  <p className="font-semibold">
                    Add Size <span className="text-orange-400">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {(formData.sizes || []).map((size, index) => (
                      <div key={index}>
                        <label>Size:</label>
                        <input
                          name="size"
                          value={size.size}
                          onChange={(e) => handleSizeChange(index, e)}
                        />
                        <label>Price:</label>
                        <input
                          type="number"
                          name="price"
                          value={size.price}
                          onChange={(e) => handleSizeChange(index, e)}
                        />
                        <label>Discount:</label>
                        <input
                          type="number"
                          name="discount"
                          value={size.discount}
                          onChange={(e) => handleSizeChange(index, e)}
                        />
                        <button type="button" onClick={() => handleRemoveSize(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center my-4">
                    <button type="button" onClick={handleAddSize}>
                      Add More Size
                    </button>
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-3">Upload Images</p>
                  <input type="file" multiple onChange={handleImageChange} />
                  {previewUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Preview ${index}`} width="140" />
                  ))}
                </div>

                {/* Submit Button */}
                <button type="submit" className="addProductsAllButton rounded text-white font-semibold mt-5">
                  Update Product
                </button>
                <p className="text-center font-semibold mt-4">
                  <span style={{ color: getColor() }}>{uploadStatus}</span>
                </p>
              </div>
            </div>
          ) : null}
        </form>
      </div>
      <ToastContainer />
    </div>
    );
};

export default ProductListShow;