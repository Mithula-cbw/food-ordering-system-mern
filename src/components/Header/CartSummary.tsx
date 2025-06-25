import React from "react";

const CartSummary: React.FC = () => {
  const cartTotal = 59.99;

  return (
    <div className="">
      <span className="text-lg font-semibold text-gray-800 select-none">
        ${cartTotal.toFixed(2)}    
      </span>
    </div>
  );
};

export default CartSummary;
