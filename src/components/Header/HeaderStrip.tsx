import React from 'react';

const HeaderStrip: React.FC = () => {
  return (
    <div
      id="header-to-strip"
      className="w-full h-auto bg-header-strip flex justify-center items-center max-h-[40px] overflow-hidden"
    >
      <div className="text-white font-semibold py-2 text-center">
        Get free delivery on orders over $500
      </div>
    </div>
  );
};

export default HeaderStrip;
