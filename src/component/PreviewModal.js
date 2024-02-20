import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa"; // Import the Save icon from react-icons/fa

const PreviewModal = ({ formData, onSave, onDeleteImage, onClose }) => {
  const [editedFormData, setEditedFormData] = useState(formData);
  const [imagePreview, setImagePreview] = useState(formData.image);

  useEffect(() => {
    setEditedFormData(formData);
    setImagePreview(formData.image);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({ ...editedFormData, [name]: value });
  };

  const handleDeleteImage = () => {
    onDeleteImage();
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
        <div>
          <p>
            <strong>Category:</strong>
            <select
              name="category"
              value={editedFormData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
              style={{ border: "1px solid #e2e8f0", marginBottom: "8px" }}
            >
              <option value="Burgers">Burgers</option>
              <option value="Fries">Fries</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </select>
          </p>
          <p>
            <strong>Name:</strong>{" "}
            <input
              type="text"
              name="name"
              value={editedFormData.name}
              onChange={handleChange}
              style={{
                border: "1px solid #e2e8f0",
                marginBottom: "8px",
                padding: "0.5rem",
              }}
            />
          </p>
          <p>
            <strong>Options:</strong>
            <select
              name="options"
              value={editedFormData.options}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
              style={{ border: "1px solid #e2e8f0", marginBottom: "8px" }}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </p>
          <p>
            <strong>Price:</strong>{" "}
            <input
              type="number"
              name="price"
              value={editedFormData.price}
              onChange={handleChange}
              style={{
                border: "1px solid #e2e8f0",
                marginBottom: "8px",
                padding: "0.5rem",
              }}
            />
          </p>
          <p>
            <strong>Cost:</strong>{" "}
            <input
              type="number"
              name="cost"
              value={editedFormData.cost}
              onChange={handleChange}
              style={{
                border: "1px solid #e2e8f0",
                marginBottom: "8px",
                padding: "0.5rem",
              }}
            />
          </p>
          <p>
            <strong>Stock:</strong>{" "}
            <input
              type="number"
              name="stock"
              value={editedFormData.stock}
              onChange={handleChange}
              style={{
                border: "1px solid #e2e8f0",
                marginBottom: "8px",
                padding: "0.5rem",
              }}
            />
          </p>
          {imagePreview && (
            <div className="mt-4 flex items-center">
              <img src={imagePreview} alt="Preview" className="mr-2" />
              <button onClick={handleDeleteImage} className="text-blue-500">
                Delete Image
              </button>
            </div>
          )}
          <div className="mt-4">
            <img
              onChange={(e) =>
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => onSave(editedFormData)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <FaSave className="inline-block mr-1" /> Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
