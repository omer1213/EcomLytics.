"use client"

import { Package } from "lucide-react"

interface CategoryCardProps {
  category: string
  onClick: () => void
  isExploreAll?: boolean
}

export default function CategoryCard({ category, onClick, isExploreAll = false }: CategoryCardProps) {
  return (
    <div
      className={`
        ${
          isExploreAll
            ? "bg-gradient-to-br from-orange-400 to-yellow-500 text-white"
            : "bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-200"
        }
        rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`
          ${isExploreAll ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600 group-hover:bg-orange-200"}
          w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300
        `}
        >
          <Package className="w-6 h-6" />
        </div>
        <h3
          className={`
          font-semibold text-sm
          ${isExploreAll ? "text-white" : "text-gray-900 group-hover:text-orange-600"}
          transition-colors duration-300
        `}
        >
          {isExploreAll ? "⭐ Explore All Products" : category}
        </h3>
      </div>
    </div>
  )
}
