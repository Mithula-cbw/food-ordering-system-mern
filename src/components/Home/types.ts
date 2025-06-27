// -------------------- Types --------------------
export interface Category {
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  category: Category;
}

export interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export interface HomeSwiperProps {
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  showTabs?: boolean;
  categories?: Category[];
  products?: Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  showDoubleRow?: boolean;
  itemsPerRow?: number;
  className?: string;
  headerClassName?: string;
  swiperClassName?: string;
}

export interface SwiperProps {
  children: React.ReactNode;
  autoplay?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
}

export interface SwiperSlideProps {
  children: React.ReactNode;
}