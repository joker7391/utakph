import React, { useState, useEffect } from "react";
import { category } from "../assets/Data";
import FileUpload from "./FileUpload";
import FormValidation from "../component/FormValidation";

const Form = () => {
  const { values, errors, handleChange, handleSubmit } = FormValidation();
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="w-full h-12 border-gray-300 border rounded-lg text-lg px-2"
          name="selectedCategory"
          value={values.selectedCategory}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Category
          </option>
          {category.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Item Name"
          name="itemName"
          value={values.itemName}
          onChange={handleChange}
          className={`w-full h-12 border-gray-300 border rounded-lg text-lg px-4 ${
            errors.itemName ? "border-red-500" : ""
          }`}
        />
      </div>
      {errors.itemName && (
        <div className="text-red-500">Please enter item name</div>
      )}

      {(values.selectedCategory === "Beverages" ||
        values.selectedCategory === "Fries") && (
        <div>
          <select
            className="w-full h-12 border-gray-300 border rounded-lg text-lg px-2"
            name="size"
            value={values.size}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Size
            </option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          {errors.size && (
            <div className="text-red-500">Please select size</div>
          )}
        </div>
      )}

      <input
        type="number"
        placeholder="Price"
        name="price"
        value={values.price}
        onChange={handleChange}
        className={`w-full h-12 border-gray-300 border rounded-lg text-lg px-4 ${
          errors.price ? "border-red-500" : ""
        }`}
      />
      {errors.price && <div className="text-red-500">Please enter price</div>}

      <input
        type="number"
        placeholder="Cost"
        name="cost"
        value={values.cost}
        onChange={handleChange}
        className={`w-full h-12 border-gray-300 border rounded-lg text-lg px-4 ${
          errors.cost ? "border-red-500" : ""
        }`}
      />
      {errors.cost && <div className="text-red-500">Please enter cost</div>}

      <input
        type="number"
        placeholder="Amount in Stock"
        name="stock"
        value={values.stock}
        onChange={handleChange}
        className={`w-full h-12 border-gray-300 border rounded-lg text-lg px-4 ${
          errors.stock ? "border-red-500" : ""
        }`}
      />
      {errors.stock && (
        <div className="text-red-500">Please enter stock amount</div>
      )}
      <FileUpload />
      <button className="w-full h-12 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">
        Add Item
      </button>
    </form>
  );
};

export default Form;
