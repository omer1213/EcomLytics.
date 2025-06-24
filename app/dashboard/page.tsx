"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, ArrowRight, RefreshCw } from "lucide-react"
import { getTrendingProducts, getAllCategories, getCategoryStats, type Product } from "@/lib/supabase"
import TrendingCarousel from "@/components/trending-carousel"
import CategoriesCarousel from "@/components/categories-carousel"
import ProductModal from "@/components/product-modal"

export default function Dashboard() {
  const router = useRouter()
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setError(null)
      const [products, cats, stats] = await Promise.all([
        getTrendingProducts(16),
        getAllCategories(),
        getCategoryStats(),
      ])

      setTrendingProducts(products)
      setCategories(cats)
      setCategoryStats(stats)
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error)
      setError("Failed to load dashboard data. Please check your database connection.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // 🚀 MODERN: Navigate to products page with category parameter
  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`)
  }

  // 🚀 MODERN: Navigate to products page (all categories mixed display)
  const handleExploreAllClick = () => {
    router.push("/products")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-40">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-yellow-400 animate-ping mx-auto"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h3>
            <p className="text-gray-600">Preparing your analytics experience...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Dashboard Unavailable</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Section 1: Top Trending Products Carousel - 🔧 MOBILE OPTIMIZED */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  🔥 Top Trending Products
                </h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
                  Highest selling products in Pakistan
                </p>
              </div>
            </div>
            <button
              onClick={handleExploreAllClick}
              className="group flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg text-sm sm:text-base"
            >
              <span className="font-semibold">🎨 Explore All</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <TrendingCarousel products={trendingProducts} onProductClick={handleProductClick} />
        </section>

        {/* Section 2: All Categories - 🔧 MOBILE OPTIMIZED */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-xl lg:text-2xl">🗂️</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  All Categories
                </h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
                  Explore all {categories.length} categories with{" "}
                  <span className="font-semibold text-orange-600">
                    {Object.values(categoryStats)
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}
                  </span>{" "}
                  total products
                </p>
              </div>
            </div>

            {/* Refresh Button - 🔧 MOBILE OPTIMIZED */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="group flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 disabled:opacity-50 text-sm sm:text-base"
            >
              <RefreshCw
                className={`w-4 h-4 sm:w-5 sm:h-5 ${refreshing ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-300`}
              />
              <span className="font-medium">{refreshing ? "Loading..." : "Refresh"}</span>
            </button>
          </div>

          <CategoriesCarousel
            categories={categories}
            categoryStats={categoryStats}
            onCategoryClick={handleCategoryClick}
            onExploreAllClick={handleExploreAllClick}
          />
        </section>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
