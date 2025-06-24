"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react"

interface CategoriesCarouselProps {
  categories: string[]
  categoryStats?: Record<string, number>
  onCategoryClick: (category: string) => void
  onExploreAllClick: () => void
}

export default function CategoriesCarousel({
  categories,
  categoryStats = {},
  onCategoryClick,
  onExploreAllClick,
}: CategoriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(5)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 🔧 FIXED: Responsive items per slide - FORCE SINGLE ROW
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 480) {
        setItemsPerSlide(2) // 🔧 INCREASED: Show 2 items on very small screens
      } else if (window.innerWidth < 640) {
        setItemsPerSlide(3) // 🔧 INCREASED: Show 3 items on small screens
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(4) // 🔧 INCREASED: Show 4 items on medium screens
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(5) // Show 5 items on large screens
      } else if (window.innerWidth < 1280) {
        setItemsPerSlide(6) // Show 6 items on xl screens
      } else {
        setItemsPerSlide(7) // Show 7 items on 2xl screens
      }
    }

    updateItemsPerSlide()
    window.addEventListener("resize", updateItemsPerSlide)
    return () => window.removeEventListener("resize", updateItemsPerSlide)
  }, [])

  const maxSlides = Math.ceil(categories.length / itemsPerSlide)

  // Auto-slide functionality - EXACTLY SAME timing as trending products
  useEffect(() => {
    if (!isHovered && categories.length > itemsPerSlide) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % maxSlides)
      }, 3500) // SAME 3.5 seconds as trending products
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
  }, [isHovered, categories.length, itemsPerSlide, maxSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + maxSlides) % maxSlides)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % maxSlides)
  }

  // Enhanced category icons with gradients
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, { emoji: string; gradient: string }> = {
      "Baby Personal Care": { emoji: "👶", gradient: "from-pink-400 to-rose-500" },
      "Bath & Body": { emoji: "🛁", gradient: "from-blue-400 to-cyan-500" },
      "Beauty Tools": { emoji: "💄", gradient: "from-purple-400 to-pink-500" },
      Wearable: { emoji: "⌚", gradient: "from-gray-400 to-slate-500" },
      "Home & Kitchen": { emoji: "🏠", gradient: "from-green-400 to-emerald-500" },
      "Sports & Outdoors": { emoji: "⚽", gradient: "from-orange-400 to-red-500" },
      Electronics: { emoji: "📱", gradient: "from-blue-500 to-indigo-600" },
      Fashion: { emoji: "👕", gradient: "from-purple-500 to-violet-600" },
      "Health & Personal Care": { emoji: "💊", gradient: "from-teal-400 to-cyan-500" },
      "Toys & Games": { emoji: "🧸", gradient: "from-yellow-400 to-orange-500" },
      Books: { emoji: "📚", gradient: "from-amber-400 to-yellow-500" },
      Automotive: { emoji: "🚗", gradient: "from-gray-500 to-zinc-600" },
      "Garden & Outdoor": { emoji: "🌿", gradient: "from-green-500 to-lime-600" },
      Jewelry: { emoji: "💍", gradient: "from-yellow-500 to-amber-600" },
      "Tools & Hardware": { emoji: "🔧", gradient: "from-slate-500 to-gray-600" },
      "Arts & Crafts": { emoji: "🎨", gradient: "from-pink-500 to-rose-600" },
      "Camera Accessories": { emoji: "📷", gradient: "from-indigo-500 to-purple-600" },
      Decor: { emoji: "🏺", gradient: "from-orange-500 to-red-600" },
      "Office Products": { emoji: "📋", gradient: "from-blue-600 to-indigo-700" },
      "Pet Supplies": { emoji: "🐕", gradient: "from-amber-500 to-orange-600" },
      "Kitchen Appliances": { emoji: "🍳", gradient: "from-red-400 to-pink-500" },
      "Laundry & Cleaning": { emoji: "🧽", gradient: "from-cyan-400 to-blue-500" },
      Makeup: { emoji: "💋", gradient: "from-rose-400 to-pink-500" },
      "Men's Care": { emoji: "🧔", gradient: "from-slate-400 to-gray-500" },
    }
    return iconMap[category] || { emoji: "📦", gradient: "from-gray-400 to-gray-500" }
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg">Loading amazing categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Carousel Container - 🔧 FIXED: FORCE SINGLE ROW */}
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
              {/* 🔧 CRITICAL FIX: FORCE SINGLE ROW WITH FLEX */}
              <div className="flex gap-2 md:gap-3 overflow-hidden">
                {categories.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((category) => {
                  const { emoji, gradient } = getCategoryIcon(category)
                  const productCount = categoryStats[category] || 0

                  return (
                    <div
                      key={category}
                      onClick={() => onCategoryClick(category)}
                      className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl border border-gray-100 hover:border-orange-200 relative overflow-hidden flex-shrink-0"
                      style={{
                        minWidth: `calc(${100 / itemsPerSlide}% - ${(itemsPerSlide - 1) * 8}px / ${itemsPerSlide})`,
                        maxWidth: `calc(${100 / itemsPerSlide}% - ${(itemsPerSlide - 1) * 8}px / ${itemsPerSlide})`,
                      }}
                    >
                      {/* Background gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl sm:rounded-2xl`}
                      ></div>

                      {/* Floating particles effect */}
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 animate-pulse" />
                      </div>

                      <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 lg:space-y-4">
                        {/* Icon with enhanced styling - 🔧 MOBILE OPTIMIZED */}
                        <div
                          className={`w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${gradient} rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-lg sm:text-2xl lg:text-3xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative`}
                        >
                          <span className="relative z-10">{emoji}</span>
                          <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Category name - 🔧 MOBILE OPTIMIZED */}
                        <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 text-xs sm:text-sm lg:text-sm leading-tight min-h-[2rem] sm:min-h-[2.5rem] flex items-center text-center">
                          {category}
                        </h3>

                        {/* Product count with enhanced styling - 🔧 MOBILE OPTIMIZED */}
                        {productCount > 0 && (
                          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 group-hover:from-orange-200 group-hover:to-yellow-200 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full transition-all duration-300">
                            <span className="text-xs sm:text-xs lg:text-xs font-semibold text-orange-700">
                              {productCount.toLocaleString()} products
                            </span>
                          </div>
                        )}

                        {/* Hover effect indicator */}
                        <div className="w-0 group-hover:w-8 sm:group-hover:w-10 lg:group-hover:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-500 mx-auto"></div>
                      </div>
                    </div>
                  )
                })}

                {/* Add Explore All card to the last slide */}
                {slideIndex === maxSlides - 1 && (
                  <div
                    onClick={onExploreAllClick}
                    className="group bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden flex-shrink-0"
                    style={{
                      minWidth: `calc(${100 / itemsPerSlide}% - ${(itemsPerSlide - 1) * 8}px / ${itemsPerSlide})`,
                      maxWidth: `calc(${100 / itemsPerSlide}% - ${(itemsPerSlide - 1) * 8}px / ${itemsPerSlide})`,
                    }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>

                    {/* Floating sparkles */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white animate-pulse" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 lg:space-y-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/20 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <Star className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:rotate-12 transition-transform duration-500" />
                      </div>
                      <h3 className="font-bold text-white text-xs sm:text-sm lg:text-sm leading-tight">
                        ⭐ Explore All Products
                      </h3>
                      <div className="bg-white/20 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full">
                        <span className="text-xs sm:text-xs lg:text-xs font-semibold text-white">View Everything</span>
                      </div>
                      <div className="w-0 group-hover:w-8 sm:group-hover:w-10 lg:group-hover:w-12 h-0.5 sm:h-1 bg-white rounded-full transition-all duration-500 mx-auto"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - EXACTLY SAME as trending products */}
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

      {/* Dots Indicator - EXACTLY SAME as trending products */}
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
