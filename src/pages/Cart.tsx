import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';

const ShoppingCartComponent: React.FC = () => {
  // Mock click handlers
  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout...');
    alert('Proceeding to checkout!');
  };

  const handleGoShopping = () => {
    console.log('Going shopping...');
    alert('Redirecting to shopping page!');
  };

  const handleRemoveItem = (productId: string) => {
    console.log(`Removing item with ID: ${productId}`);
    alert(`Item ${productId} removed from cart!`);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    console.log(`Changing quantity for ${productId} to ${newQuantity}`);
    alert(`Quantity updated to ${newQuantity}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-1">There are products in your cart</p>
        </div>

        {/* Cart Table Header */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700">
            <div className="col-span-4">Product</div>
            <div className="col-span-2 text-center">Unit Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">SubTotal</div>
            <div className="col-span-2 text-center">Remove</div>
          </div>
        </div>

        {/* Empty Cart Content */}
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">
              0
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
          
          <button 
            onClick={handleGoShopping}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Go Shopping
          </button>
        </div>
      </div>

      {/* Cart Totals Sidebar */}
      <div className="fixed right-6 top-24 w-80 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">CART TOTALS</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">SubTotal</span>
            <span className="text-green-600 font-semibold">$0.00</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">$20</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimate For</span>
            <span className="text-gray-500">Colombo</span>
          </div>
          
          <hr className="my-4" />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-red-600">$20.00</span>
          </div>
        </div>
        
        <button 
          onClick={handleProceedToCheckout}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" />
          Proceed To Checkout
        </button>
      </div>

      {/* Example of how items would look when added */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6" style={{ display: 'none' }}>
        <h3 className="text-lg font-semibold mb-4">Example Cart Item (Hidden)</h3>
        <div className="grid grid-cols-12 gap-4 items-center py-4 border-b">
          <div className="col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div>
                <h4 className="font-semibold">Sample Product</h4>
                <p className="text-gray-600 text-sm">Product description</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-center font-semibold">$25.00</div>
          <div className="col-span-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <button 
                onClick={() => handleQuantityChange('sample-1', 1)}
                className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center">2</span>
              <button 
                onClick={() => handleQuantityChange('sample-1', 3)}
                className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div className="col-span-2 text-center font-semibold">$50.00</div>
          <div className="col-span-2 text-center">
            <button 
              onClick={() => handleRemoveItem('sample-1')}
              className="text-red-500 hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;