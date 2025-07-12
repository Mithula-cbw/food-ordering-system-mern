import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import ProductCard from "../components/Home/ProductItem";
import { Product } from "../types";
import { Link } from "react-router-dom";

export default function WishList() {
  const { favorites, loading } = useFavorites();
  const { user } = useUser();

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="w-full bg-[url('/wishlist-banner.webp')] bg-cover bg-top md:p-8 flex items-center justify-center font-lato bg-white/90">
        <div className="flex flex-col justify-start gap-y-4 items-center bg-[url('/wishlist-banner.webp')] backdrop-blur-md bg-cover bg-center py-12 px-4 md:px-12 md:rounded-2xl shadow-lg text-center md:max-w-lg">
          <div className="relative backdrop-blur-lg bg-white/10 flex flex-col justify-start gap-y-4 items-center py-12 px-4 md:px-8 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Log in to save your favorite cravings!
            </h2>
            <p className="text-white mb-6 font-light">
              Create an account or sign in to start building your personalized
              wishlist of delicious meals.
            </p>
            <Link to="/sign-in">
              <button
                className="bg-app-bannerbtn hover:bg-app-bannerbtnhover text-black font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
                aria-label="Sign In or Sign Up"
              >
                Sign In / Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="w-full h-full p-8 flex flex-col md:flex-row gap-6">
      {/* Left Column - Image Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <div className="h-full bg-[url('/wishlist-banner.webp')] bg-cover bg-center py-8 px-6 flex flex-col items-center justify-start rounded-2xl shadow-lg sticky top-4">
          <div className="relative backdrop-blur-xl rounded-xl bg-white/20 flex flex-col justify-start gap-y-2 items-center py-12 px-4 text-center">
            <p className="text-2xl font-bold text-white">
              🍽️ {user?.name}'s Wishlist
            </p>
            <p className="text-sm text-white/90 leading-relaxed">
              Your saved meals are just a click away!
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Product Grid */}
      <div className="md:w-2/3 lg:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-gray-500 col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto mb-4"></div>
                Loading...
              </div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-gray-500 col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🍽️</div>
                <p className="text-lg">No items in wishlist.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Start adding your favorite meals!
                </p>
              </div>
            </div>
          ) : (
            formattedFavorites.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
