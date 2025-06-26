import React, { useState } from "react";
import { X } from "lucide-react";

const HeaderStrip: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible)
    return (
      <div className="w-full h-2 bg-orange-700">
        <span className="sr-only">Header strip closed</span>
      </div>
    );

  return (
    <div
      id="header-to-strip"
      className="w-full h-auto bg-header-strip flex justify-center items-center max-h-[40px] overflow-hidden relative"
    >
      <div className="text-white font-semibold py-2 text-center">
        Get free delivery on orders over $500
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 text-white hover:text-gray-300 transition"
        aria-label="Close strip"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeaderStrip;
