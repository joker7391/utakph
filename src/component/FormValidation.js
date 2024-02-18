import { useState } from "react";
import { ref, set } from "firebase/database";
import database from "../firebase.config";
import { initialFormState } from "../assets/State";
import { toast } from "react-toastify";

export default function FormValidation() {
  const [values, setValues] = useState({
    initialFormState,
  });

  const [errors, setErrors] = useState({
    itemName: false,
    size: false,
    price: false,
    cost: false,
    stock: false,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    const requiredFields = ["itemName", "price", "cost", "stock"];
    requiredFields.forEach((field) => {
      if (values[field].trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: true,
        }));
        hasError = true;
      }
    });

    if (
      (values.selectedCategory === "Beverages" ||
        values.selectedCategory === "Fries") &&
      values.size.trim() === ""
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        size: true,
      }));
      hasError = true;
    }

    if (!hasError) {
      const newItemId = Date.now().toString();
      const itemRef = ref(database, "items/" + newItemId);

      set(itemRef, values)
        .then(() => {
          toast("Item added successfully!");
          setValues(initialFormState);
          setErrors({});
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
        });
    }
  };

  return { values, errors, handleChange, handleSubmit };
}
