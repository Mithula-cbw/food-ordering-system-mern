import React from 'react';

const NoProductsFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
    <p className="text-sm">Try adjusting your filters or check back later.</p>
  </div>
);

export default NoProductsFound;