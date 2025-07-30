import React from "react";
import { Package } from "lucide-react"; // Adjust this import based on your icon library

interface CartSummaryProps {
  subTotal: number;
  shippingCost?: number;
  location?: string;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subTotal,
  shippingCost = 20,
  location = "Colombo",
  onCheckout,
}) => {
  const total = subTotal + shippingCost;

  return (
    <div className="fixed right-12 bottom-12 w-80 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">CART TOTALS</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">SubTotal</span>
          <span className="text-green-600 font-semibold">${subTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shippingCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimate For</span>
          <span className="text-gray-500">{location}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-red-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Package className="w-5 h-5" />
        Proceed To Checkout
      </button>
    </div>
  );
};

export default CartSummary;
