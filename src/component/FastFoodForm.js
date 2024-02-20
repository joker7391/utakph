import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { fieldConfig } from "../assets/data";
import PreviewModal from "./PreviewModal";

const FastFoodForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    options: "",
    price: "",
    cost: "",
    stock: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setImagePreview(
      formData.image ? URL.createObjectURL(formData.image) : null
    );
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    for (let i = 1; i <= 100; i++) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setLoading(false);
    setShowModal(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit}>
        {fieldConfig.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required={field.required}
              >
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
                required={field.required}
              />
            )}
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
            <label
              htmlFor="file"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              <FaUpload className="inline-block mr-2" /> Choose File
            </label>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>
        {loading && (
          <div className="mt-2 bg-gray-200 h-2 rounded-md">
            <div
              className="bg-blue-500 h-full rounded-md"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </div>
      </form>
      {showModal && (
        <PreviewModal
          formData={formData}
          imagePreview={imagePreview}
          setShowModal={setShowModal}
          setFormData={setFormData}
          setImagePreview={setImagePreview}
        />
      )}
    </div>
  );
};

export default FastFoodForm;
