import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      <h1 className="font-semibold text-2xl text-orange-500 mt-2">Welcome</h1>
    </div>
  );
};

export default Preloader;
