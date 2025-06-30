import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import ProductCard from "../components/Home/ProductItem";
import { Product } from "../types";

export default function WishList() {
  const { favorites, loading } = useFavorites();
  const { user } = useUser();

  const formattedFavorites: Product[] = favorites.map((fav) => ({
    _id: fav._id,
    name: fav.productTitle,
    description: "No description available", // placeholder
    category: {
      _id: "",
      name: "",
      description: "",
      images: [],
      color: "",
      __v: 0,
      id: "",
    },
    type: "",
    price: fav.price,
    oldPrice: undefined,
    isFeatured: false,
    countInStock: "In stock", // optional placeholder
    discount: undefined,
    size: [],
    productSize: [],
    rating: fav.rating,
    images: [fav.images],
    dateCreated: "",
    __v: 0,
    catName: "",
  }));

  return (
    <div className="w-full p-8 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-72 h-fit bg-red-100 py-6 px-4 flex flex-col items-start rounded-2xl shadow-lg sticky top-4">
        <h2 className="text-xl font-bold text-red-800 mb-2">
          🍽️ {user?.name}'s Wishlist
        </h2>
        <p className="text-sm text-red-700">
          Your saved meals are just a click away!
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : favorites.length === 0 ? (
          <div className="text-gray-500 col-span-full">No items in wishlist.</div>
        ) : (
          formattedFavorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
