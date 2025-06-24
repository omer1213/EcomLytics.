"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { getAllCategories, type Product, type PaginatedResponse, getProductsPaginated } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import ProductModal from "@/components/product-modal"
import FilterSidebar from "@/components/filter-sidebar"
import Pagination from "@/components/pagination"
import SearchBarEnhanced from "@/components/search-bar-enhanced"
import { Grid, List, Filter, ArrowLeft } from "lucide-react"

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = decodeURIComponent(params.category as string)

  const [productsData, setProductsData] = useState<PaginatedResponse<Product>>({
    data: [],
    count: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [categories, setCategories] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<any>({ category: initialCategory })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [currentDisplayCategory, setCurrentDisplayCategory] = useState(initialCategory)
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([])

  // Get initial page from URL
  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1")
    setCurrentPage(page)
  }, [searchParams])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const allCategories = await getAllCategories()
        setCategories(allCategories)
        console.log("📂 Categories loaded for category page:", allCategories.length)
      } catch (error) {
        console.error("❌ Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  const handleFiltersChange = (newFilters: any) => {
    console.log("🔄 Filter change:", newFilters)

    // If category filter changed to a different category, update URL dynamically
    if (newFilters.category && newFilters.category !== "" && newFilters.category !== initialCategory) {
      console.log("🔄 Category changed, updating URL to:", newFilters.category)
      router.replace(`/category/${encodeURIComponent(newFilters.category)}`)
      setCurrentDisplayCategory(newFilters.category)
    } else if (newFilters.category === "" || newFilters.category === "All Categories") {
      // If "All Categories" selected, go to products page
      console.log("🔄 All categories selected, redirecting to products page")
      router.replace("/products")
      return
    } else {
      setCurrentDisplayCategory(newFilters.category || initialCategory)
    }

    setFilters(newFilters)
    setCurrentPage(1)
  }

  const fetchSuggestedProducts = async () => {
    try {
      console.log("🎯 Fetching suggested products for category page...")
      // Get products from other categories as suggestions
      const data = await getProductsPaginated(1, 8, {}) // Get 8 random products
      setSuggestedProducts(data.data)
    } catch (error) {
      console.error("Error fetching suggested products:", error)
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        console.log("🔍 Fetching products with filters:", filters, "page:", currentPage)

        const data = await getProductsPaginated(currentPage, 24, filters)
        setProductsData(data)
        console.log("✅ Products loaded:", data.count, "total")

        // 🚀 NEW: If no results, fetch suggested products
        if (data.count === 0) {
          await fetchSuggestedProducts()
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [currentPage, filters])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // 🔧 SIMPLIFIED: Only one search handler
  const handleSearch = (searchTerm: string) => {
    console.log("🔍 Search in category:", searchTerm)
    const newFilters = { ...filters, search: searchTerm }
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentDisplayCategory}</h1>
              <p className="text-gray-600">
                {loading ? "Loading..." : `${productsData.count} products found`}
                {filters.search && ` matching "${filters.search}"`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* 🔧 SIMPLIFIED: Removed onRealTimeSearch prop */}
              <SearchBarEnhanced
                onSearch={handleSearch}
                initialValue={filters.search || ""}
                currentCategory={currentDisplayCategory}
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-600"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-600"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className={`lg:w-72 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <FilterSidebar
              categories={categories}
              selectedCategory={filters.category}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : productsData.data.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "space-y-4"
                  }
                >
                  {productsData.data.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={productsData.currentPage}
                  totalPages={productsData.totalPages}
                  onPageChange={handlePageChange}
                  hasNextPage={productsData.hasNextPage}
                  hasPrevPage={productsData.hasPrevPage}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mb-8">
                  <div className="text-6xl mb-4">🔍</div>
                  <div className="text-gray-500 text-xl mb-2">No products found</div>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {filters.search ? (
                      <>
                        No products found matching <span className="font-semibold">"{filters.search}"</span> in{" "}
                        <span className="font-semibold">{currentDisplayCategory}</span> category
                      </>
                    ) : (
                      <>
                        No products found in <span className="font-semibold">{currentDisplayCategory}</span> category
                      </>
                    )}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {filters.search && (
                      <button
                        onClick={() => {
                          console.log("🔍 Clearing search in category")
                          const newFilters = { ...filters }
                          delete newFilters.search
                          handleFiltersChange(newFilters)
                        }}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        🔍 Clear search in this category
                      </button>
                    )}
                    <button
                      onClick={() => router.replace("/products")}
                      className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors text-sm"
                    >
                      📂 Search in all categories
                    </button>
                  </div>
                </div>

                {/* 🚀 NEW: Suggested Products Section */}
                {suggestedProducts.length > 0 && (
                  <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        You might like these products from other categories
                      </h3>
                      <p className="text-gray-600">Popular products from our collection</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {suggestedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={() => handleProductClick(product)}
                          viewMode="grid"
                        />
                      ))}
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={() => {
                          console.log("🎨 Explore All Products from category page")
                          router.replace("/products")
                        }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                      >
                        🎨 Explore All Products
                      </button>
                    </div>
                  </div>
                )}

                {/* Fallback if no suggested products */}
                {suggestedProducts.length === 0 && (
                  <button
                    onClick={() => {
                      console.log("🎨 Fallback Explore All Products from category page")
                      router.replace("/products")
                    }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                  >
                    🎨 Explore All Products
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
