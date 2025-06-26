import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton";
import CategoryModule from "@/contexts/CategoryContext";

const { CategoryContext } = CategoryModule;

const FeaturedCategories = () => {
  const { categories, loading } = useContext(CategoryContext);

  const offerString = "Do not miss the current offers until the end of November";

  return (
    <div className="w-full flex flex-col items-start justify-start gap-6 min-h-[600px]">
      {/* Header */}
      <div className="flex flex-col items-start justify-start gap-2 w-full">
        <h3 className="text-2xl font-bold text-gray-700">FEATURED CATEGORIES</h3>
        <p className="text-base font-normal text-gray-500">{offerString}</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="w-full h-40 rounded-xl" />
            ))
          : categories.map((cat) => (
              <Link to={`/categories/${cat._id}`} key={cat._id} className="block">
                <Card className="hover:shadow-lg transition-transform hover:scale-[1.02]">
                  <CardContent className="p-3 flex flex-col items-center justify-center gap-2">
                    <img
                      src={cat.images?.[0]}
                      alt={cat.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <h4 className="text-sm font-semibold text-gray-700 text-center">
                      {cat.name}
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
