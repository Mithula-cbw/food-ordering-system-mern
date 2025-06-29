export interface Product {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    color: string;
    __v: number;
    id: string;
  };
  type: string;
  price: number;
  oldPrice?: number;
  isFeatured: boolean;
  countInStock: string;
  discount?: number;
  size: string[];
  productSize: string[];
  rating: number;
  images: string[];
  dateCreated: string;
  __v: number;
  catName: string;
}

export interface TabCategory {
  name: string;
  color?: string;
}

export interface HomeSwiperProps {
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  showTabs?: boolean;
  categories?: TabCategory[];
  products?: Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  showDoubleRow?: boolean;
  itemsPerRow?: number;
  className?: string;
  headerClassName?: string;
  swiperClassName?: string;
  loading?: boolean;
  error?: string | null; 
}

export interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  isVegan: boolean;
  setIsVegan: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SimpleSwiperProps {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  autoplay: boolean;
  autoplayDelay?: number;
  loading: boolean;
  error?: string | null;
  seeAllCard?: React.ReactNode;
}

//contexts
// category context
export interface Category {
  _id: string;
  name: string;
  images: string[];
  color: string;
  description: string;
  __v: number;
  id: string;
}

export interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}