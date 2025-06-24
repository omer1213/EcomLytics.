"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getProductsPaginated, getAllCategories, type Product, type PaginatedResponse } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import ProductModal from "@/components/product-modal"
import FilterModal from "@/components/filter-modal"
import Pagination from "@/components/pagination"
import SearchBarEnhanced from "@/components/search-bar-enhanced"
import { Grid, List, Filter, ArrowLeft, Sparkles, X } from "lucide-react"

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramString = searchParams.toString()
  const prevParamStringRef = useRef<string>("")

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<any>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentDisplayTitle, setCurrentDisplayTitle] = useState("All Products")
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([])
  const [urlUpdateInProgress, setUrlUpdateInProgress] = useState(false)

  // Extract filters from URL parameters
  useEffect(() => {
    if (urlUpdateInProgress) {
      console.log("🚫 Skipping URL processing - update in progress")
      return
    }

    if (prevParamStringRef.current === paramString) return
    prevParamStringRef.current = paramString

    const url = new URLSearchParams(paramString)
    const category = url.get("category") ? decodeURIComponent(url.get("category")!) : ""
    const search = url.get("search") || ""
    const page = Number.parseInt(url.get("page") || "1")
    const minPrice = url.get("minPrice") || ""
    const maxPrice = url.get("maxPrice") || ""
    const minRating = url.get("minRating") || ""

    console.log("🔗 URL Parameters extracted:", { category, search, page, minPrice, maxPrice, minRating })

    const urlFilters = { category, search, minPrice, maxPrice, minRating }
    setFilters(urlFilters)
    setCurrentPage(page)
    setCurrentDisplayTitle(category && category !== "" && category !== "all" ? category : "All Products")
  }, [paramString, urlUpdateInProgress])

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const allCategories = await getAllCategories()
        setCategories(allCategories)
        console.log("📂 Available categories:", allCategories)
      } catch (error) {
        console.error("Error fetching initial data:", error)
      }
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        console.log("🔍 Fetching products with filters:", filters)
        const data = await getProductsPaginated(currentPage, 24, filters)
        console.log("✅ Products fetched:", data.count, "found")
        setProductsData(data)

        if (
          data.count === 0 &&
          (filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.minRating)
        ) {
          await fetchSuggestedProducts()
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [currentPage, filters])

  const forceUpdateURL = (newFilters: any, page = 1) => {
    setUrlUpdateInProgress(true)

    const params = new URLSearchParams()

    if (newFilters.category && newFilters.category !== "" && newFilters.category !== "all") {
      params.set("category", encodeURIComponent(newFilters.category))
    }
    if (newFilters.search && newFilters.search !== "") {
      params.set("search", newFilters.search)
    }
    if (newFilters.minPrice && newFilters.minPrice !== "") {
      params.set("minPrice", newFilters.minPrice)
    }
    if (newFilters.maxPrice && newFilters.maxPrice !== "") {
      params.set("maxPrice", newFilters.maxPrice)
    }
    if (newFilters.minRating && newFilters.minRating !== "") {
      params.set("minRating", newFilters.minRating)
    }
    if (page > 1) {
      params.set("page", page.toString())
    }

    const queryString = params.toString()
    const newURL = queryString ? `/products?${queryString}` : "/products"

    console.log("🔥 FORCING URL UPDATE TO:", newURL)

    router.replace(newURL, { scroll: false })

    setTimeout(() => {
      if (window.location.pathname + window.location.search !== newURL) {
        console.log("🚨 Router failed, using window.history.replaceState")
        window.history.replaceState({}, "", newURL)
      }
      setUrlUpdateInProgress(false)
    }, 100)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    forceUpdateURL(filters, page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFiltersChange = (newFilters: any) => {
    console.log("🔄 Filter change received:", newFilters)

    setFilters(newFilters)
    setCurrentPage(1)
    forceUpdateURL(newFilters, 1)

    if (newFilters.category && newFilters.category !== "" && newFilters.category !== "all") {
      setCurrentDisplayTitle(newFilters.category)
    } else {
      setCurrentDisplayTitle("All Products")
    }
  }

  const handleSearch = (searchTerm: string) => {
    console.log("🔍 Search triggered:", searchTerm)
    const newFilters = { ...filters, search: searchTerm }
    handleFiltersChange(newFilters)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const clearAllFilters = () => {
    console.log("🧹🔥 NUCLEAR CLEAR ALL FILTERS")

    const clearedFilters = {}
    setFilters(clearedFilters)
    setCurrentDisplayTitle("All Products")
    setCurrentPage(1)
    setSuggestedProducts([])

    setUrlUpdateInProgress(true)
    router.replace("/products", { scroll: false })
    window.history.replaceState({}, "", "/products")

    setTimeout(() => {
      if (window.location.search !== "") {
        console.log("🚨 URL STILL HAS PARAMS, FORCING RELOAD")
        window.location.href = "/products"
      }
      setUrlUpdateInProgress(false)
    }, 200)
  }

  const removeFilter = (filterKey: string) => {
    console.log("🗑️ Removing individual filter:", filterKey)
    const newFilters = { ...filters }
    delete newFilters[filterKey]

    if (filterKey === "category") {
      setCurrentDisplayTitle("All Products")
    }

    handleFiltersChange(newFilters)
  }

  const truncateSearchTerm = (term: string, maxLength = 50) => {
    if (term.length <= maxLength) return term
    return term.substring(0, maxLength - 3) + "..."
  }

  const isShowingMixedDisplay = !filters.category || filters.category === "" || filters.category === "all"

  const fetchSuggestedProducts = async () => {
    try {
      console.log("🎯 Fetching suggested products for no results case...")
      const data = await getProductsPaginated(1, 8, {})
      setSuggestedProducts(data.data)
    } catch (error) {
      console.error("Error fetching suggested products:", error)
    }
  }

  if (loading && productsData.data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pt-40">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-500 animate-pulse" />
            </div>
            <p className="text-gray-600">Loading amazing products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Header - Mobile Optimized */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </button>

            {isShowingMixedDisplay && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-orange-700">All Categories</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                {currentDisplayTitle}
                {isShowingMixedDisplay && <span className="text-xl sm:text-2xl">🎨</span>}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {loading ? "Loading..." : `Showing ${productsData.data.length} of ${productsData.count} products`}
                {filters.search && ` matching "${truncateSearchTerm(filters.search, 20)}"`}
                {isShowingMixedDisplay && <span className="text-orange-600 font-medium"> • All categories</span>}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1">
                <SearchBarEnhanced
                  onSearch={handleSearch}
                  initialValue={filters.search || ""}
                  currentCategory={filters.category}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-orange-50"
                  }`}
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-orange-50"
                  }`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-2 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>

          {/* Active Filters Display - Mobile Optimized */}
          {(filters.category || filters.search || filters.minPrice || filters.maxPrice || filters.minRating) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs sm:text-sm text-gray-600">Active:</span>

              {filters.category && filters.category !== "all" && (
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 max-w-xs">
                  <span className="truncate">📂 {decodeURIComponent(filters.category)}</span>
                  <button
                    onClick={() => removeFilter("category")}
                    className="hover:bg-orange-200 rounded-full p-0.5 transition-colors flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.search && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 max-w-xs">
                  <span className="truncate" title={filters.search}>
                    🔍 "{truncateSearchTerm(filters.search, 15)}"
                  </span>
                  <button
                    onClick={() => removeFilter("search")}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium hover:bg-red-200 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Products Grid/List - Mobile Optimized */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-3 sm:p-4 animate-pulse">
                  <div className="bg-gray-200 h-32 sm:h-48 rounded-lg mb-3 sm:mb-4"></div>
                  <div className="bg-gray-200 h-3 sm:h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 sm:h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : productsData.data.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4"
                    : "space-y-3 sm:space-y-4"
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

              <div className="mt-6 sm:mt-8">
                <Pagination
                  currentPage={productsData.currentPage}
                  totalPages={productsData.totalPages}
                  onPageChange={handlePageChange}
                  hasNextPage={productsData.hasNextPage}
                  hasPrevPage={productsData.hasPrevPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="mb-6 sm:mb-8">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <div className="text-gray-500 text-lg sm:text-xl mb-2">No products found</div>
                <p className="text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                  {filters.search ? (
                    <>
                      No products found matching <span className="font-semibold">"{filters.search}"</span>
                      {filters.category && filters.category !== "all" && (
                        <>
                          {" "}
                          in <span className="font-semibold">{filters.category}</span> category
                        </>
                      )}
                    </>
                  ) : filters.category ? (
                    `No products found in "${filters.category}" category with current filters`
                  ) : (
                    "No products match your current filter criteria"
                  )}
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {filters.search && (
                    <button
                      onClick={() => removeFilter("search")}
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-sm"
                    >
                      🔍 Clear search
                    </button>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-sm font-medium"
                  >
                    🔥 Clear All
                  </button>
                </div>
              </div>

              {/* Suggested Products */}
              {suggestedProducts.length > 0 && (
                <div className="max-w-6xl mx-auto">
                  <div className="text-left mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">💡</span>
                      You might like these products
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">Popular products from our collection</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                    {suggestedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                        viewMode="grid"
                      />
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <button
                      onClick={clearAllFilters}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-sm sm:text-base"
                    >
                      🎨 Explore All Products
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categories={categories}
        selectedCategory={filters.category}
        currentFilters={filters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  )
}
