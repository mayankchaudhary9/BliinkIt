import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-2">
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* Description */}
          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleOnChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>
          {/* Image */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="ProductImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
              >
                <div className="flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  id="ProductImage"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>
              {/* display uploaded images */}
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 w-20 mt-1 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(img)}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-700 rounded text-white hidden group-hover:block cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Category */}
          <div className="grid gap-1">
            <label>Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });

                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoCloseOutline size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* SubCategory */}
          <div className="grid gap-1">
            <label>Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });

                  setSelectSubCategory("");
                }}
              >
                <option value={""} className="text-neutral-600">
                  Select Sub Category
                </option>
                {allSubCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoCloseOutline size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}
    </section>
  );
};

export default UploadProduct;
