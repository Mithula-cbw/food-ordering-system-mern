import React from "react";
import  WishlistIndicator  from "./WishlistIndicator";
import  CartSummary  from "./CartSummary";
import  CartLink  from "./CartLink";

const ActionContainer: React.FC = () => {
  return (
    <div className="flex items-center space-x-6">
      <WishlistIndicator />
      <CartSummary />
      <CartLink />
    </div>
  );
};

export default ActionContainer;
