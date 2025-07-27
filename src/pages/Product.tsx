import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ArrowLeftRight,
  Minus,
  Plus,
  Star,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import { deleteData, fetchDataFromApi, postData } from "@/utils/Api";
import ShinyButton from "../components/Commons/ShinyButton";
import { Product as ProductType } from "../types";
import { formatPrice } from "../utils/helpers";
import ProductSkeleton from "../components/Product/ProductSkeleton";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shine, setShine] = useState(false);
  const [discountCal, setDiscountCal] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const { favorites, refreshFavorites } = useFavorites();
  const { user } = useUser();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchDataFromApi<ProductType>(`/api/products/${id}`);
        if (data) {
          setProduct(data);
          setSelectedSize(data.size?.[0] || "");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const isInWishlist = favorites.some((fav) => fav.productId === id);
  const isInStock = product?.countInStock.toLowerCase() === "in stock";

  const triggerFromOtherComponent = () => {
    setShine(true);
    setTimeout(() => setShine(false), 1200);
  };

  const discountPercentage = product?.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product?.discount || 0;

  const hasDiscount = discountPercentage > 0;

  const updateDiscountCalculationUP = () => {
    if (product?.oldPrice && product.price) {
      const discountAmount = product.oldPrice - product.price;
      setDiscountCal(discountAmount * (quantity + 1));
    }
  };

  const updateDiscountCalculationDOWN = () => {
    if (product?.oldPrice && product.price) {
      const discountAmount = product.oldPrice - product.price;
      setDiscountCal(discountAmount * (quantity - 1));
    }
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    if (isInWishlist) {
      try {
        await deleteData(`/api/myList/${product._id}`);
        toast.success("Item removed from wishlist!");
        refreshFavorites();
      } catch {
        toast.error("Failed to remove item. Please try again!");
      }
    } else {
      const data = {
        productTitle: product.name,
        images: product.images[0],
        rating: Number(product.rating),
        price: product.price,
        productId: product._id,
        userId: user?.id,
      };

      try {
        const response = await postData("/api/myList/add/", data);
        if (response) {
          toast.success(
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-black font-semibold">
                Item added to wishlist!
              </span>
            </div>
          );
          refreshFavorites();
        } else {
          toast.error("Failed to add to wishlist.");
        }
      } catch {
        toast.error("An error occurred.");
      }
    }
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  if (loading) return <ProductSkeleton />;
  if (error || !product)
    return (
      <div className="p-10 text-red-500">{error || "Product not found"}</div>
    );

  const discount =
    hasDiscount && product.oldPrice
      ? ` ${formatPrice(product.oldPrice - product.price)}`
      : "";

  const catLink = `/categories/${product.category._id}`;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex justify-center">
      <div className="bg-white w-full lg:w-[90%] mx-auto p-2 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Images */}
          <div className="space-y-4 lg:col-span-1">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square group">
              <img
                src={
                  product.images[selectedImage] ||
                  "https://via.placeholder.com/600"
                }
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-400 ease-in-out group-hover:scale-125"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discountPercentage}%
                </div>
              )}
            </div>
            {product.images.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                      selectedImage === i
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6 lg:col-span-3 lg:pl-12 lg:pt-4">
            <div className="space-y-2 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm font-normal text-gray-500">
                  Category:
                </span>
                <Link
                  to={catLink}
                  className="px-3 py-1 rounded-full text-sm font-semibold text-gray-700"
                  style={{
                    backgroundColor: product.category.color || "#6B7280",
                  }}
                >
                  {product.category.name}
                </Link>
                {product.rating > 0 && (
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-gray-600 text-sm">
                      ({product.rating})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {product.oldPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-2xl text-red-500 font-bold">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Size */}
            {product.size.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedSize === s
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Stock */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      triggerFromOtherComponent();
                      updateDiscountCalculationDOWN();
                      setQuantity(quantity - 1);
                    }
                  }}
                  className="p-3 bg-gray-100 rounded-full hover:bg-blue-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => {
                    triggerFromOtherComponent();
                    updateDiscountCalculationUP();
                    setQuantity(quantity + 1);
                  }}
                  className="p-3 bg-gray-100 rounded-full hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span
                className={`text-sm font-semibold ${
                  isInStock ? "text-green-600" : "text-orange-600"
                }`}
              >
                {product.countInStock}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <ShinyButton triggerGlow={shine} className="flex-1">
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold">Add To Cart</span>
                  {hasDiscount && (
                    <span className="text-sm text-white/80">
                      Save{" "}
                      {discountCal === 0 ? (
                        <span className="text-green-400 font-bold">
                          {discount}
                        </span>
                      ) : (
                        <span className="text-green-400 font-bold">
                          {formatPrice(discountCal)}
                        </span>
                      )}
                      {" now!!"}
                    </span>
                  )}
                </div>
              </ShinyButton>

              <button
                onClick={handleWishlistClick}
                className={`p-3 rounded-lg border ${
                  isInWishlist
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
                />
              </button>

              <button className="p-3 rounded-lg border border-gray-300 hover:border-gray-400">
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
