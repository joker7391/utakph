import React from "react";
import Form from "../component/Form";

const Home = () => {
  return (
    <div className="bg-[#193258] max-w-lg mx-auto shadow-xl rounded-lg p-6 sm:p-8 md:p-10 flex flex-col gap-3">
      <h1 className="text-white font-bold text-lg">Add Menu</h1>

      <Form />
    </div>
  );
};

export default Home;
