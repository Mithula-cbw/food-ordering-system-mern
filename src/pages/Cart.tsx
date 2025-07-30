import React from "react";
import CartSummary from "@/components/Cart/CartSummary";
import EmptyCartMessage from "@/components/Cart/EmptyCartMessage";
import CartItemCard from "@/components/Cart/CartItemCard";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const ShoppingCartComponent: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout...");
    alert("Proceeding to checkout!");
  };

  const handleGoShopping = () => {
    navigate("/");
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number, size: string) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity,size);
    }
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Cart Table */}
        <div className="flex-1 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600 mt-1">
              {isCartEmpty
                ? "Your cart is currently empty."
                : `You have ${cartItems.length} item(s) in your cart`}
            </p>
          </div>

          {!isCartEmpty && (
            <>
              {/* Table Header */}
              <div className="bg-gray-100 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700">
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">SubTotal</div>
                  <div className="col-span-2 text-center">Remove</div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="px-6">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={`${item.productId}-${item.size}`}
                    productId={item.productId}
                    title={item.productTitle}
                    description={`Size: ${item.size}`}
                    imageUrl={item.images}
                    price={item.price}
                    quantity={item.quantity}
                    subTotal={item.subTotal}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    size={item.size}
                  />
                ))}
              </div>
            </>
          )}

          {/* Empty Cart */}
          {isCartEmpty && (
            <div className="py-10">
              <EmptyCartMessage itemCount={0} onGoShopping={handleGoShopping} />
            </div>
          )}
        </div>

        {/* Right Section: Cart Summary */}
        <div className="w-full lg:w-[320px] shrink-0">
          <CartSummary
            subTotal={cartTotal}
            onCheckout={handleProceedToCheckout}
            isCartEmpty={isCartEmpty}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
