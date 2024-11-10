import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <AiOutlineClose className="h-6 w-6" />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
