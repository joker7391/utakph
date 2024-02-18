import React, { useState } from "react";
import { MdFileUpload, MdClose } from "react-icons/md";

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    document.getElementById("file-upload").value = "";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
      >
        <MdFileUpload className="mr-2" />
        Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {selectedFile && (
        <div className="mt-2 relative">
          <img src={previewUrl} alt="Preview" className="max-w-xs max-h-40" />
          <button
            onClick={handleDelete}
            className="absolute top-0 right-0 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700"
          >
            <MdClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
