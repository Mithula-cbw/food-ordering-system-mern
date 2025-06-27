import React from 'react';
import { SwiperProps, SwiperSlideProps } from './types';

export const Swiper: React.FC<SwiperProps> = ({ 
  children, 
  slidesPerView = 4, 
  spaceBetween = 12, 
  className = "" 
}) => (
  <div className={`overflow-x-auto ${className}`}>
    <div
      className="flex gap-3 pb-4"
      style={{
        minWidth: `${(100 / slidesPerView) * React.Children.count(children)}%`,
        gap: `${spaceBetween}px`
      }}
    >
      {children}
    </div>
  </div>
);

export const SwiperSlide: React.FC<SwiperSlideProps> = ({ children }) => (
  <div className="flex-shrink-0 w-64">{children}</div>
);