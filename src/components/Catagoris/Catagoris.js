import React, { useEffect, useState } from "react";
import "./Catagoris.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Catagoris = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const imageHostKey = process.env.REACT_APP_image_key;

  // image
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

  // time formate
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // If hours = 0, set to 12
      minutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes with leading 0 if needed

      const formattedTime = `${hours}:${minutes} ${ampm}`;
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // date formate
  useEffect(() => {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, "0"); // Get day and pad with 0 if needed
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with 0 (Months are 0-based)
    const year = now.getFullYear(); // Get full year

    const formattedDate = `${day}/${month}/${year}`;
    setDate(formattedDate);
  }, []);

  // data post haldle
  // without imge and image
  const categoryPostHandle = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const activeStatus = form.status.value;
    const imageFile = form.image.files[0]; // Get image file

    if (imageFile) {
      // If image is selected, upload it first
      const formData = new FormData();
      formData.append("image", imageFile);

      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          const imageUrl = imageData.data.display_url; // Uploaded image URL
          categoryDataPost(name, activeStatus, imageUrl, date, time); // Post with image
          form.reset();
        })
        .catch((e) => {
          console.log(e);
          setImageError("Failed to upload image. Please try again.");
        });
    } else {
      // If no image is selected, post data without image
      categoryDataPost(name, activeStatus, null, date, time);
      form.reset();
    }
  };

  // by default image set

  // category data
  const categoryDataPost = (name, activeStatus, image, date, time) => {
    const categoryData = {
      name: name,
      activeStatus: activeStatus,
      image: image,
      date: date,
      time: time,
    };

    fetch(`http://localhost:5000/api/category`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          // Show success toast
          toast.success("Category posted successfully!");
        } else {
          // Handle error response
          toast.error("Failed to post Category data.");
        }
      })
      .catch((e) => console.log(e));
  };

  // const categoryPostHandle = (event) => {
  //   event.preventDefault();
  //   const form = event.target;

  //   const name = form.name.value;
  //   const activeStatus = form.status.value;
  //   const imageFile = form.image.files[0]; // Get selected image file

  //   // Set a default image (previous image or placeholder)
  //   let image = idByCategoryData?.image ||
  //     "https://e7.pngegg.com/pngimages/179/588/png-clipart-leaf-text-tree-yellow-new-yellow-and-white-new-logo-leaf-text-thumbnail.png";

  //   // If an image is selected, upload it first
  //   if (imageFile) {
  //     const formData = new FormData();
  //     formData.append("image", imageFile);

  //     fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((imageData) => {
  //         image = imageData.data.display_url; // Update image URL if uploaded
  //         categoryDataPost(name, activeStatus, image, date, time);
  //         form.reset();
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         setImageError("You must choose a category photo.");
  //       });
  //   } else {
  //     // No new image selected, keep the existing image
  //     categoryDataPost(name, activeStatus, image, date, time);
  //     form.reset();
  //   }
  // };

  return (
    <div>
      <form className="py-5 text-sm" onSubmit={categoryPostHandle}>
        <div className="flex justify-center items-center mt-16">
          <div className="card p-5 w-8/12">
            <div>
              <p className="text-xl font-semibold pt-5">Add Category</p>
            </div>
            <div className="py-4">
              <p className="pb-4 font-semibold">
                Category Name <span className="text-orange-400">*</span>
              </p>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="text-sm input input-bordered w-full"
                required
              />
            </div>
            <div>
              <p className="mb-2 font-semibold">
                Activity <span className="text-orange-400">*</span>
              </p>
              <select
                name="status"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Option</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-4 font-semibold">
                Category Image <span className="text-orange-400">*</span>
              </p>
              <div class="">
                <div class="upload-area">
                  <div class="drag-drop">
                    <p className="pb-3">Choos Category Photo</p>
                    <label for="file-upload" class="file-label">
                      Choose File
                    </label>

                    <input
                      type="file"
                      name="image"
                      id="file-upload"
                      className="file-input"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {image ? (
                <img src={previewUrl} className="w-40 h-32 pb-4" alt="" />
              ) : (
                <></>
              )}
            </div>
            <div>
              {image ? (
                <></>
              ) : (
                <p className="text-center text-red-500 font-semibold pb-2">
                  {imageError}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="addProductsAllButton rounded font-semibold text-white p-2 w-3/5"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Catagoris;
