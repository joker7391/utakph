import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onDeleteImage = () => {
    setFormData({ ...formData, image: "" });
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
        <div className="mb-4">
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
              setFormData({
                ...formData,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
          <label
            htmlFor="file"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            <FaUpload className="inline-block mr-2" /> Choose File
          </label>
        </div>
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
          onSave={() => {}}
          onDeleteImage={onDeleteImage}
          onClose={() => {}}
        />
      )}{" "}
    </div>
  );
};

export default FastFoodForm;
