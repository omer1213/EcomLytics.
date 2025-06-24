"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card"
import type { Product } from "@/lib/supabase"

interface TrendingCarouselProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export default function TrendingCarousel({ products, onProductClick }: TrendingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 480) {
        setItemsPerSlide(1)
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(3)
      } else if (window.innerWidth < 1280) {
        setItemsPerSlide(4)
      } else {
        setItemsPerSlide(5)
      }
    }

    updateItemsPerSlide()
    window.addEventListener("resize", updateItemsPerSlide)
    return () => window.removeEventListener("resize", updateItemsPerSlide)
  }, [])

  const maxSlides = Math.ceil(products.length / itemsPerSlide)

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered && products.length > itemsPerSlide) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % maxSlides)
      }, 3500)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isHovered, products.length, itemsPerSlide, maxSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 6000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + maxSlides) % maxSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 6000)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % maxSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 6000)
  }

  if (products.length === 0) return null

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: maxSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0 px-1 md:px-2">
              <div
                className={`grid gap-2 md:gap-3 ${
                  itemsPerSlide === 1
                    ? "grid-cols-1"
                    : itemsPerSlide === 2
                      ? "grid-cols-2"
                      : itemsPerSlide === 3
                        ? "grid-cols-3"
                        : itemsPerSlide === 4
                          ? "grid-cols-4"
                          : "grid-cols-5"
                }`}
              >
                {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((product) => (
                  <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      {maxSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl rounded-full p-1.5 md:p-2 transition-all duration-200 hover:scale-110 z-10 hidden sm:block"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl rounded-full p-1.5 md:p-2 transition-all duration-200 hover:scale-110 z-10 hidden sm:block"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {maxSlides > 1 && (
        <div className="flex justify-center mt-3 md:mt-4 space-x-1.5 md:space-x-2">
          {Array.from({ length: maxSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
