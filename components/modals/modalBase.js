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
      className="fixed inset-0 p-10 bg-black bg-opacity-25 
                 backdrop-blur-sm flex justify-center items-center z-20"
      onClick={handleClose}
    >
      <div className="md:w-[600px] w-[90%] md:mx-auto flex flex-col">
        <button
          onClick={() => onClose()}
          className="text-orange-600 text-xl place-self-end"
        >
          x
        </button>
        <div className="bg-white p-2 rounded border-orange-500 border-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBase;
