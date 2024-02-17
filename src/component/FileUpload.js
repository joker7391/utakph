import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    // Handle file upload here
    console.log("Uploading:", selectedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
      >
        <MdFileUpload className="mr-2" />
        Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <div className="mt-2">
          <button
            onClick={handleFileUpload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
