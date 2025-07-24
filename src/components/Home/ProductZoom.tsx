// src/components/ui/Modal.tsx
import ReactDOM from "react-dom";
import React from "react";

type ProductZoomProps = {
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProductZoom: React.FC<ProductZoomProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById("ProductZoom-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-[90%] max-w-md">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose(e);
          }}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ProductZoom;
