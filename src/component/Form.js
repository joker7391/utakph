import React, { useState } from "react";
import { category } from "../assets/Data";
import { ref, push } from "firebase/database";
import FileUpload from "./FileUpload";

const Form = () => {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemStock, setItemStock] = useState("");
  const [itemImage, setItemImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      category: itemCategory,
      name: itemName,
      size: itemSize,
      price: itemPrice,
      cost: itemCost,
      stock: itemStock,
    };
    console.log(newItem);
    // Here you would typically send the newItem to your database
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setItemImage(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="max-w-md mx-auto bg-blue-700 shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <select
            className="w-full h-10 border-gray-300 border rounded-md"
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {category.map((cat) => (
              <option
                className="font-semibold px-2"
                key={cat.name}
                value={cat.name}
              >
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Item Name"
            className="w-full h-10 border-gray-300 border rounded-md px-3"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        {itemCategory === "Fries" || itemCategory === "Beverages" ? (
          <select
            className="w-full h-10 border-gray-300 border rounded-md"
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
          >
            <option value="" disabled>
              Select Size
            </option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        ) : null}
        <input
          type="number"
          placeholder="Price"
          className="w-full h-10 border-gray-300 border rounded-md px-3"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          className="w-full h-10 border-gray-300 border rounded-md px-3"
          value={itemCost}
          onChange={(e) => setItemCost(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount in Stock"
          className="w-full h-10 border-gray-300 border rounded-md px-3"
          value={itemStock}
          onChange={(e) => setItemStock(e.target.value)}
        />
        <FileUpload />
        <button
          type="submit"
          className="w-full h-10 bg-gray-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Form;
