import React from "react";

const ModalBase = ({ isVisible, children, onClose }) => {
  if (!isVisible) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      id="wrapper"
      className="fixed inset-0 p-10 h-full bg-black bg-opacity-25 
                 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto"
      onClick={handleClose}
    >
      <div className="md:w-[600px] w-[90%] md:mx-auto flex flex-col">
        <button
          onClick={() => onClose()}
          className="text-black text-xl text-bold place-self-end"
        >
          close
        </button>
        <div className="bg-white p-2 object-cover rounded border-orange-500 border-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBase;
