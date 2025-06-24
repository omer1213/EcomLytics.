"use client"

import Image from "next/image"
import { Star, TrendingUp, Eye } from "lucide-react"
import type { Product } from "@/lib/supabase"

interface ProductCardProps {
  product: Product
  onClick: () => void
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, onClick, viewMode = "grid" }: ProductCardProps) {
  const numericSales = product.ItemSold || 0

  if (viewMode === "list") {
    return (
      <div
        className="bg-white rounded-xl shadow-sm border border-orange-50 hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer group p-3 sm:p-4"
        onClick={onClick}
      >
        <div className="flex gap-3 sm:gap-4">
          <div className="relative overflow-hidden rounded-lg flex-shrink-0">
            <Image
              src={product.Image || "/placeholder.svg?height=100&width=100"}
              alt={product.ProductName}
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500"
              style={{ objectFit: "contain" }}
            />
            <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full p-1">
              <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 text-orange-500" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                {product.ProductName}
              </h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0 hidden sm:inline">
                {product.Category}
              </span>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm text-gray-600 ml-1 font-medium">{product.Rating}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">({product.Review})</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1 hidden sm:block">Expected Selling Price</div>
                <span className="text-lg sm:text-xl font-bold text-orange-600">
                  Rs. {product.Price.toLocaleString()}
                </span>
              </div>

              <div className="text-right">
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-green-600">{numericSales.toLocaleString()}</span>
                  <span className="text-gray-600 ml-1">sold</span>
                </div>
                <div className="flex items-center text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full mt-1">
                  <Eye className="w-3 h-3 mr-1" />
                  <span>View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-orange-50 hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 w-full"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-xl bg-gray-50">
        <Image
          src={product.Image || "/placeholder.svg?height=200&width=200"}
          alt={product.ProductName}
          width={200}
          height={200}
          className="w-full h-36 sm:h-44 object-contain group-hover:scale-105 transition-transform duration-500 p-2"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
          <TrendingUp className="w-3 h-3 text-orange-500" />
        </div>
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {product.Category}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        {/* Title with consistent height */}
        <div className="h-10 sm:h-12 mb-2 overflow-hidden">
          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm leading-5 line-clamp-2">
            {product.ProductName}
          </h3>
        </div>

        <div className="flex items-center mb-2 sm:mb-3">
          <div className="flex items-center">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm text-gray-600 ml-1 font-medium">{product.Rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.Review})</span>
        </div>

        <div className="mb-2 sm:mb-3">
          <div className="text-xs text-gray-500 mb-1 hidden sm:block">Expected Selling Price</div>
          <span className="text-base sm:text-lg font-bold text-orange-600">Rs. {product.Price.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-bold text-green-600">{numericSales.toLocaleString()}</span>
            <span className="text-gray-600 ml-1 text-xs">sold</span>
          </div>
          <div className="flex items-center text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full">
            🔥 <span className="ml-1">Hot</span>
          </div>
        </div>
      </div>
    </div>
  )
}
