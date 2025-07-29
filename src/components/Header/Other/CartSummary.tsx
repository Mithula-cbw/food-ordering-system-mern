import { formatPrice } from "@/utils/helpers";
import React from "react";

const CartSummary: React.FC = () => {

  return (
    <div className="">
      <span className="text-lg font-semibold text-gray-800 select-none">
        {formatPrice(59.99)}
      </span>
    </div>
  );
};

export default CartSummary;
