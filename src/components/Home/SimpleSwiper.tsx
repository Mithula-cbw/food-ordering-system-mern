import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimpleSwiperProps {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  autoplay: boolean;
  autoplayDelay?: number;
}

const SimpleSwiper: React.FC<SimpleSwiperProps> = ({
  children,
  slidesPerView,
  spaceBetween,
  autoplay,
  autoplayDelay = 3000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const maxSlide = Math.max(0, totalSlides - slidesPerView);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || totalSlides <= slidesPerView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, maxSlide, totalSlides, slidesPerView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center">
        {totalSlides > slidesPerView && (
          <button
            onClick={prevSlide}
            className="absolute  aspect-square left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronLeft size={20}/>
          </button>
        )}

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${
                currentSlide * (100 / slidesPerView)
              }%)`,
              gap: `${spaceBetween}px`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{
                  width: `calc(${100 / slidesPerView}% - ${
                    (spaceBetween * (slidesPerView - 1)) / slidesPerView
                  }px)`,
                  marginRight:
                    index < slides.length - 1 ? `${spaceBetween}px` : "0",
                }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {totalSlides > slidesPerView && (
          <button
            onClick={nextSlide}
            className="absolute aspect-square right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronRight size={20}/>
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleSwiper;