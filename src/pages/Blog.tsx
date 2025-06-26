import React from "react";

export default function Blog() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Blog</h1>
      
      {/* Big image to enable scroll */}
      <img
        src="https://picsum.photos/1200/1600"
        alt="Placeholder"
        className="w-full rounded-lg shadow-md"
      />

      {/* Extra content to simulate scrolling */}
      <div className="space-y-4">
        {[...Array(40)].map((_, i) => (
          <p key={i} className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio.
          </p>
        ))}
      </div>
    </div>
  );
}
