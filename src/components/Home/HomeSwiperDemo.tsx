import React, { useContext } from "react";
import CategoryModule, { Category } from "@/contexts/CategoryContext";
import HomeSwiper from "./HomeSwiper";
import { Product } from "./types";

const { CategoryContext } = CategoryModule;

const HomeSwiperDemo: React.FC = () => {
  const { categories } = useContext(CategoryContext);

  const tabCategories = [
    { name: "all", color: "#f4f4f4" },
    ...categories.map((cat: Category) => ({
      name: cat.name.toLowerCase(),
      color: cat.color,
    })),
  ];

  const specialOfferProducts: Product[] = [
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    {
      _id: "67bfeec5aca9f06bb1fde178",
      name: "Macaroni & Cheese",
      description:
        "Macaroni elbow pasta mixed with cheese sauce, accompanied by grilled onions and layered with mozzarella cheese, served with 2 slices of garlic bread",
      category: {
        _id: "67bfd9d75953f7a06f0c140c",
        name: "Meal",
        description: "meal here",
        images: [
          "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740626391/mihl2lvhf3wzi4jbiwi9.png",
        ],
        color: "#e6ffe6",
        __v: 0,
        id: "67bfd9d75953f7a06f0c140c",
      },
      type: "Vegetarian",
      price: 200,
      oldPrice: 220,
      isFeatured: true,
      countInStock: "in stock",
      discount: 2,
      size: ["Medium"],
      productSize: [],
      rating: 4,
      images: [
        "https://res.cloudinary.com/dxqzjvplk/image/upload/v1740724079/qfu1ftgt3m6bhar3hoeg.jpg",
      ],
      dateCreated: "2025-02-27T04:49:09.887Z",
      __v: 0,
      catName: "Meal",
    },
    
  ];

  console.log("Products being passed to HomeSwiper:", specialOfferProducts);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <HomeSwiper
          title="SPECIAL OFFERS"
          subtitle="Do not miss the current offers until the end of March"
          showTabs={true}
          categories={tabCategories}
          products={specialOfferProducts}
          autoplay={true}
          autoplayDelay={5000}
          className="mb-8"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
          slidesPerView={3}
        />
      </div>
    </div>
  );
};

export default HomeSwiperDemo;

