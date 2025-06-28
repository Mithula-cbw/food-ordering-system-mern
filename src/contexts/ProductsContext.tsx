export interface Category {
  _id: string;
  name: string;
  description: string;
  images: string[];
  color: string;
  __v: number;
  id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category;
  type: string; // e.g., "Vegetarian" | "Non-Vegetarian" etc.
  price: number;
  oldPrice: number;
  isFeatured: boolean;
  countInStock: string; // or change to enum: 'in stock' | 'out of stock'
  discount: number;
  size: string[];
  productSize: string[]; // type this more strictly if possible
  rating: number;
  images: string[];
  dateCreated: string; // could use `Date` if you convert it later
  __v: number;
  catName: string;
}
