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
}