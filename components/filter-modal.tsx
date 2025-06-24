"use client"

import { useState, useEffect } from "react"
import { X, Filter, Star, TrendingUp, DollarSign, Crown } from "lucide-react"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  selectedCategory?: string
  currentFilters?: any
  onFiltersChange: (filters: any) => void
}

export default function FilterModal({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  currentFilters = {},
  onFiltersChange,
}: FilterModalProps) {
  const [filters, setFilters] = useState({
    category: selectedCategory || "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    maxRating: "",
    minReviews: "",
    maxReviews: "",
    minItemsSold: "",
    maxItemsSold: "",
    min5Star: "",
    min4Star: "",
    min3Star: "",
    ...currentFilters,
  })

  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null)

  // Update filters when props change
  useEffect(() => {
    const decodedCategory = selectedCategory ? decodeURIComponent(selectedCategory) : ""
    const newFilters = {
      category: decodedCategory,
      minPrice: "",
      maxPrice: "",
      minRating: "",
      maxRating: "",
      minReviews: "",
      maxReviews: "",
      minItemsSold: "",
      maxItemsSold: "",
      min5Star: "",
      min4Star: "",
      min3Star: "",
      ...currentFilters,
    }
    setFilters(newFilters)
    detectActiveQuickFilter(newFilters)
  }, [selectedCategory, currentFilters])

  // Detect which quick filter is active
  const detectActiveQuickFilter = (currentFilters: any) => {
    if (currentFilters.minRating === "4" && currentFilters.min5Star === "100") {
      setActiveQuickFilter("high-rated")
    } else if (currentFilters.minReviews === "500") {
      setActiveQuickFilter("popular")
    } else if (currentFilters.maxPrice === "1000") {
      setActiveQuickFilter("budget")
    } else if (currentFilters.minPrice === "2000") {
      setActiveQuickFilter("premium")
    } else {
      setActiveQuickFilter(null)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    setActiveQuickFilter(null)
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    onClose()
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      maxRating: "",
      minReviews: "",
      maxReviews: "",
      minItemsSold: "",
      maxItemsSold: "",
      min5Star: "",
      min4Star: "",
      min3Star: "",
    }
    setFilters(clearedFilters)
    setActiveQuickFilter(null)
    onFiltersChange(clearedFilters)
    onClose()
  }

  const applyQuickFilter = (filterType: string) => {
    let newFilters = { ...filters }

    // Clear previous quick filter settings
    delete newFilters.minRating
    delete newFilters.minReviews
    delete newFilters.minPrice
    delete newFilters.maxPrice
    delete newFilters.min5Star

    switch (filterType) {
      case "high-rated":
        newFilters = {
          ...newFilters,
          minRating: "4",
          min5Star: "100",
        }
        setActiveQuickFilter("high-rated")
        break
      case "popular":
        newFilters = {
          ...newFilters,
          minReviews: "500",
        }
        setActiveQuickFilter("popular")
        break
      case "budget":
        newFilters = {
          ...newFilters,
          maxPrice: "1000",
        }
        setActiveQuickFilter("budget")
        break
      case "premium":
        newFilters = {
          ...newFilters,
          minPrice: "2000",
        }
        setActiveQuickFilter("premium")
        break
      default:
        setActiveQuickFilter(null)
    }

    setFilters(newFilters)
    onFiltersChange(newFilters)
    onClose()
  }

  const QuickFilterButton = ({
    type,
    label,
    icon: Icon,
    color,
    description,
  }: {
    type: string
    label: string
    icon: any
    color: string
    description: string
  }) => {
    const isActive = activeQuickFilter === type

    return (
      <button
        onClick={() => applyQuickFilter(type)}
        className={`
          relative p-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105
          ${
            isActive
              ? `${color} text-white shadow-lg scale-105`
              : `bg-gray-50 hover:${color.replace("bg-", "bg-").replace("-500", "-100")} text-gray-700`
          }
        `}
        title={description}
      >
        <div className="flex flex-col items-center space-y-1">
          <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
          <span className="text-xs leading-tight">{label}</span>
        </div>
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
          {/* Quick Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Smart Filters</label>
            <div className="grid grid-cols-2 gap-3">
              <QuickFilterButton
                type="high-rated"
                label="High Rated"
                icon={Star}
                color="bg-orange-500"
                description="4+ stars with 100+ five-star reviews"
              />
              <QuickFilterButton
                type="popular"
                label="Popular"
                icon={TrendingUp}
                color="bg-blue-500"
                description="500+ reviews"
              />
              <QuickFilterButton
                type="budget"
                label="Budget"
                icon={DollarSign}
                color="bg-green-500"
                description="Under Rs. 1,000"
              />
              <QuickFilterButton
                type="premium"
                label="Premium"
                icon={Crown}
                color="bg-purple-500"
                description="Over Rs. 2,000"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category || ""}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option value="">🎨 All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  📂 {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (Rs.)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                min="0"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                min="0"
              />
            </div>
          </div>

          {/* Rating Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating Range</label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange("minRating", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Min Rating</option>
                <option value="1">1+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
              <select
                value={filters.maxRating}
                onChange={(e) => handleFilterChange("maxRating", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Max Rating</option>
                <option value="2">Up to 2 Stars</option>
                <option value="3">Up to 3 Stars</option>
                <option value="4">Up to 4 Stars</option>
                <option value="5">Up to 5 Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex space-x-3">
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
