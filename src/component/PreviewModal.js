import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { ref as dbRef, set } from "firebase/database";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "../firebase.config";
import { toast } from "react-toastify";

const PreviewModal = ({
  formData,
  imagePreview,
  setShowModal,
  setImagePreview,
  setFormData,
}) => {
  const [editedFormData, setEditedFormData] = useState(formData);
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({ ...editedFormData, [name]: value });
  };

  const handleSave = async (e) => {
    try {
      const fileName = `${Date.now().toString()}`;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imagePreview);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${uploadProgress}% done`);
        },
        (error) => {
          console.log("Error uploading image:", error);
          toast.error("Error uploading image.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);

            // Save data to Firebase Realtime Database
            const itemRef = dbRef(database, `items/${fileName}`);
            set(itemRef, {
              name: editedFormData.name,
              category: editedFormData.category,
              options: editedFormData.options,
              price: editedFormData.price,
              cost: editedFormData.cost,
              stock: editedFormData.stock,
              imageUrl: downloadURL,
            });

            console.log("Data saved successfully!");
            toast.success("Data saved successfully!");
            setShowModal(false);
            clearData();
          });
        }
      );
    } catch (error) {
      console.log("Error saving data:", error);
      toast.error("Error saving data.");
    }
  };

  const clearData = () => {
    setFormData({
      category: "",
      name: "",
      options: "",
      price: "",
      cost: "",
      stock: "",
      image: "",
    });
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black bg-opacity-80 h-screen w-screen">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold ">Edit Item</h2>
          <button onClick={() => setShowModal(false)} className="font-bold">
            X
          </button>
        </div>

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
        </div>

        <button
          onClick={() => handleSave(editedFormData)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaSave className="inline-block mr-1" /> Save
        </button>
      </div>
    </div>
  );
};

export default PreviewModal;
