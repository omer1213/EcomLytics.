"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react"

interface CategoriesScrollProps {
  categories: string[]
  categoryStats?: Record<string, number>
  onCategoryClick: (category: string) => void
  onExploreAllClick: () => void
}

export default function CategoriesScroll({
  categories,
  categoryStats = {},
  onCategoryClick,
  onExploreAllClick,
}: CategoriesScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isHovered || categories.length === 0) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current
        const cardWidth = 200 // Approximate card width + gap
        const maxScroll = container.scrollWidth - container.clientWidth

        if (container.scrollLeft >= maxScroll) {
          // Reset to beginning
          container.scrollTo({ left: 0, behavior: "smooth" })
          setCurrentIndex(0)
        } else {
          // Scroll to next
          const nextScroll = Math.min(container.scrollLeft + cardWidth, maxScroll)
          container.scrollTo({ left: nextScroll, behavior: "smooth" })
          setCurrentIndex(Math.floor(nextScroll / cardWidth))
        }
      }
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, isHovered, categories.length])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" })
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 10000) // Resume auto-scroll after 10s
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })
      setIsAutoScrolling(false)
      setTimeout(() => setIsAutoScrolling(true), 10000) // Resume auto-scroll after 10s
    }
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
      {/* Auto-scroll indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${isAutoScrolling && !isHovered ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
          ></div>
          <span className="text-sm text-gray-600">
            {isAutoScrolling && !isHovered ? "Auto-scrolling active" : "Manual control"}
          </span>
        </div>
        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className="text-sm bg-white hover:bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition-colors"
        >
          {isAutoScrolling ? "Pause Auto-scroll" : "Resume Auto-scroll"}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group border border-gray-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group border border-gray-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
      </button>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => {
          const { emoji, gradient } = getCategoryIcon(category)
          const productCount = categoryStats[category] || 0

          return (
            <div
              key={category}
              onClick={() => onCategoryClick(category)}
              className="group flex-shrink-0 bg-white rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl border border-gray-100 hover:border-orange-200 min-w-[180px] relative overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
              ></div>

              {/* Floating particles effect */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon with enhanced styling */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative`}
                >
                  <span className="relative z-10">{emoji}</span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Category name */}
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 text-sm leading-tight min-h-[2.5rem] flex items-center">
                  {category}
                </h3>

                {/* Product count with enhanced styling */}
                {productCount > 0 && (
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 group-hover:from-orange-200 group-hover:to-yellow-200 px-4 py-2 rounded-full transition-all duration-300">
                    <span className="text-xs font-semibold text-orange-700">
                      {productCount.toLocaleString()} products
                    </span>
                  </div>
                )}

                {/* Hover effect indicator */}
                <div className="w-0 group-hover:w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-500 mx-auto"></div>
              </div>
            </div>
          )
        })}

        {/* Enhanced Explore All Card */}
        <div
          onClick={onExploreAllClick}
          className="group flex-shrink-0 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl min-w-[180px] relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

          {/* Floating sparkles */}
          <div className="absolute top-3 right-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            <Star className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="absolute bottom-3 left-3 opacity-50 group-hover:opacity-100 transition-opacity duration-700">
            <Sparkles className="w-4 h-4 text-white animate-bounce" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
              <Star className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <h3 className="font-bold text-white text-sm leading-tight">⭐ Explore All Products</h3>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="text-xs font-semibold text-white">View Everything</span>
            </div>
            <div className="w-0 group-hover:w-12 h-1 bg-white rounded-full transition-all duration-500 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 4) === index ? "bg-orange-500 w-8" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
