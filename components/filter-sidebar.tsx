// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { ChevronDown, Filter, X, Star, TrendingUp, DollarSign, Crown } from "lucide-react"

// interface FilterSidebarProps {
//   categories: string[]
//   selectedCategory?: string
//   currentFilters?: any
//   onFiltersChange: (filters: any) => void
// }

// export default function FilterSidebar({
//   categories,
//   selectedCategory,
//   currentFilters = {},
//   onFiltersChange,
// }: FilterSidebarProps) {
//   const [filters, setFilters] = useState({
//     category: selectedCategory || "",
//     minPrice: "",
//     maxPrice: "",
//     minRating: "",
//     maxRating: "",
//     minReviews: "",
//     maxReviews: "",
//     minItemsSold: "",
//     maxItemsSold: "",
//     min5Star: "",
//     min4Star: "",
//     min3Star: "",
//     ...currentFilters,
//   })

//   const [isOpen, setIsOpen] = useState(false)
//   const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null)

//   // Update filters when props change with proper decoding
//   useEffect(() => {
//     console.log("🔧 FilterSidebar: Updating filters from props", { selectedCategory, currentFilters })

//     const decodedCategory = selectedCategory ? decodeURIComponent(selectedCategory) : ""

//     const newFilters = {
//       category: decodedCategory,
//       minPrice: "",
//       maxPrice: "",
//       minRating: "",
//       maxRating: "",
//       minReviews: "",
//       maxReviews: "",
//       minItemsSold: "",
//       maxItemsSold: "",
//       min5Star: "",
//       min4Star: "",
//       min3Star: "",
//       ...currentFilters,
//     }

//     console.log("🔧 Setting filters to:", newFilters)
//     setFilters(newFilters)

//     // Detect which quick filter is active
//     detectActiveQuickFilter(newFilters)
//   }, [selectedCategory, currentFilters])

//   // Detect which quick filter is currently active
//   const detectActiveQuickFilter = (currentFilters: any) => {
//     if (currentFilters.minRating === "4" && currentFilters.min5Star === "100") {
//       setActiveQuickFilter("high-rated")
//     } else if (currentFilters.minReviews === "500") {
//       setActiveQuickFilter("popular")
//     } else if (currentFilters.maxPrice === "1000") {
//       setActiveQuickFilter("budget")
//     } else if (currentFilters.minPrice === "2000") {
//       setActiveQuickFilter("premium")
//     } else {
//       setActiveQuickFilter(null)
//     }
//   }

//   // Debounced filter change to prevent real-time filtering during typing
//   const debouncedFilterChange = useCallback(
//     debounce((newFilters: any) => {
//       console.log("🔄 Debounced filter change:", newFilters)
//       onFiltersChange(newFilters)
//     }, 800),
//     [onFiltersChange],
//   )

//   const handleFilterChange = (key: string, value: string) => {
//     console.log("🔧 FilterSidebar: Filter change", key, "=", value)
//     const newFilters = { ...filters, [key]: value }
//     setFilters(newFilters)

//     // Clear active quick filter when manual changes are made
//     setActiveQuickFilter(null)

//     // For non-numeric fields, apply immediately
//     if (key === "category" || key === "minRating" || key === "maxRating") {
//       onFiltersChange(newFilters)
//     } else {
//       // For price and numeric fields, use debounced change
//       debouncedFilterChange(newFilters)
//     }
//   }

//   const clearFilters = () => {
//     console.log("🧹 FilterSidebar: Clearing all filters...")
//     const clearedFilters = {
//       category: "",
//       minPrice: "",
//       maxPrice: "",
//       minRating: "",
//       maxRating: "",
//       minReviews: "",
//       maxReviews: "",
//       minItemsSold: "",
//       maxItemsSold: "",
//       min5Star: "",
//       min4Star: "",
//       min3Star: "",
//     }

//     setFilters(clearedFilters)
//     setActiveQuickFilter(null)
//     onFiltersChange(clearedFilters)
//   }

//   // 🚀 IMPROVED: Smart Quick Filter Logic
//   const applyQuickFilter = (filterType: string) => {
//     let newFilters = { ...filters }

//     // Clear previous quick filter settings
//     delete newFilters.minRating
//     delete newFilters.minReviews
//     delete newFilters.minPrice
//     delete newFilters.maxPrice
//     delete newFilters.min5Star

//     switch (filterType) {
//       case "high-rated":
//         // 🔥 HIGH RATED: 4+ stars with good review quality
//         newFilters = {
//           ...newFilters,
//           minRating: "4",
//           min5Star: "100", // At least 100 five-star reviews for quality assurance
//         }
//         setActiveQuickFilter("high-rated")
//         break

//       case "popular":
//         // 📈 POPULAR: Reduced from 1000 to 500 reviews (more inclusive)
//         newFilters = {
//           ...newFilters,
//           minReviews: "500", // 🔧 IMPROVED: More realistic threshold
//         }
//         setActiveQuickFilter("popular")
//         break

//       case "budget":
//         // 💰 BUDGET: Increased from 500 to 1000 (more realistic)
//         newFilters = {
//           ...newFilters,
//           maxPrice: "1000", // 🔧 IMPROVED: More practical budget range
//         }
//         setActiveQuickFilter("budget")
//         break

//       case "premium":
//         // 💎 PREMIUM: Increased from 1000 to 2000 (true premium)
//         newFilters = {
//           ...newFilters,
//           minPrice: "2000", // 🔧 IMPROVED: Higher threshold for premium
//         }
//         setActiveQuickFilter("premium")
//         break

//       default:
//         setActiveQuickFilter(null)
//     }

//     setFilters(newFilters)
//     onFiltersChange(newFilters)
//   }

//   const hasActiveFilters = Object.entries(filters).some(([key, value]) => value !== "")

//   // 🎨 IMPROVED: Quick Filter Button Component
//   const QuickFilterButton = ({
//     type,
//     label,
//     icon: Icon,
//     color,
//     description,
//   }: {
//     type: string
//     label: string
//     icon: any
//     color: string
//     description: string
//   }) => {
//     const isActive = activeQuickFilter === type

//     return (
//       <button
//         onClick={() => applyQuickFilter(type)}
//         className={`
//           relative p-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg
//           ${
//             isActive
//               ? `${color} text-white shadow-lg scale-105`
//               : `bg-gray-50 hover:${color.replace("bg-", "bg-").replace("-500", "-100")} text-gray-700 hover:text-gray-900`
//           }
//         `}
//         title={description}
//       >
//         <div className="flex flex-col items-center space-y-1">
//           <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`} />
//           <span className="text-xs leading-tight">{label}</span>
//         </div>

//         {/* Active indicator */}
//         {isActive && (
//           <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
//             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//           </div>
//         )}
//       </button>
//     )
//   }

//   return (
//     <>
//       {/* Mobile Filter Toggle */}
//       <div className="lg:hidden mb-4">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center justify-between bg-white border border-orange-200 text-orange-700 px-4 py-3 rounded-lg w-full shadow-sm"
//         >
//           <div className="flex items-center space-x-2">
//             <Filter className="w-4 h-4" />
//             <span className="font-medium">Filters</span>
//             {hasActiveFilters && (
//               <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
//             )}
//           </div>
//           <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
//         </button>
//       </div>

//       {/* Filter Sidebar */}
//       <div
//         className={`
//         ${isOpen ? "block" : "hidden"} lg:block
//         bg-white rounded-xl shadow-sm border border-orange-100 p-6 space-y-6
//       `}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <Filter className="w-5 h-5 text-orange-600" />
//             <h3 className="font-semibold text-gray-900">Filters</h3>
//           </div>
//           {hasActiveFilters && (
//             <button
//               onClick={clearFilters}
//               className="flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700 transition-colors"
//             >
//               <X className="w-4 h-4" />
//               <span>Clear All</span>
//             </button>
//           )}
//         </div>

//         {/* Category Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//           <select
//             value={filters.category || ""}
//             onChange={(e) => handleFilterChange("category", e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
//           >
//             <option value="">🎨 All Categories</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 📂 {category}
//               </option>
//             ))}
//           </select>
//           {filters.category === "" && (
//             <p className="text-xs text-orange-600 mt-1">✨ Mixed display - diverse categories</p>
//           )}
//         </div>

//         {/* 🚀 IMPROVED: Smart Quick Filters */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Smart Filters
//             <span className="text-xs text-gray-500 ml-2">• One-click filtering</span>
//           </label>
//           <div className="grid grid-cols-2 gap-3">
//             <QuickFilterButton
//               type="high-rated"
//               label="High Rated"
//               icon={Star}
//               color="bg-orange-500"
//               description="Products with 4+ stars and 100+ five-star reviews"
//             />
//             <QuickFilterButton
//               type="popular"
//               label="Popular"
//               icon={TrendingUp}
//               color="bg-blue-500"
//               description="Products with 500+ reviews (proven popularity)"
//             />
//             <QuickFilterButton
//               type="budget"
//               label="Budget"
//               icon={DollarSign}
//               color="bg-green-500"
//               description="Products under Rs. 1,000 (affordable options)"
//             />
//             <QuickFilterButton
//               type="premium"
//               label="Premium"
//               icon={Crown}
//               color="bg-purple-500"
//               description="Products over Rs. 2,000 (premium quality)"
//             />
//           </div>

//           {/* Active filter description */}
//           {activeQuickFilter && (
//             <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-xs text-blue-700">
//                 <span className="font-medium">Active:</span>{" "}
//                 {activeQuickFilter === "high-rated" &&
//                   "Showing highly-rated products (4+ stars, 100+ five-star reviews)"}
//                 {activeQuickFilter === "popular" && "Showing popular products (500+ reviews)"}
//                 {activeQuickFilter === "budget" && "Showing budget-friendly products (under Rs. 1,000)"}
//                 {activeQuickFilter === "premium" && "Showing premium products (over Rs. 2,000)"}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Price Range with debounced filtering */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Price Range (Rs.)
//             <span className="text-xs text-gray-500 ml-2">• Filters apply after you stop typing</span>
//           </label>
//           <div className="grid grid-cols-2 gap-3">
//             <input
//               type="number"
//               placeholder="Min Price"
//               value={filters.minPrice}
//               onChange={(e) => handleFilterChange("minPrice", e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               min="0"
//             />
//             <input
//               type="number"
//               placeholder="Max Price"
//               value={filters.maxPrice}
//               onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               min="0"
//             />
//           </div>
//           <p className="text-xs text-gray-500 mt-1">💡 Tip: Filters apply automatically after you finish typing</p>
//         </div>

//         {/* Rating Range */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Rating Range</label>
//           <div className="grid grid-cols-2 gap-3">
//             <select
//               value={filters.minRating}
//               onChange={(e) => handleFilterChange("minRating", e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             >
//               <option value="">Min Rating</option>
//               <option value="1">1+ Stars</option>
//               <option value="2">2+ Stars</option>
//               <option value="3">3+ Stars</option>
//               <option value="4">4+ Stars</option>
//               <option value="4.5">4.5+ Stars</option>
//             </select>
//             <select
//               value={filters.maxRating}
//               onChange={(e) => handleFilterChange("maxRating", e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             >
//               <option value="">Max Rating</option>
//               <option value="2">Up to 2 Stars</option>
//               <option value="3">Up to 3 Stars</option>
//               <option value="4">Up to 4 Stars</option>
//               <option value="5">Up to 5 Stars</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// // Debounce utility function
// function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
//   let timeout: NodeJS.Timeout | null = null
//   return ((...args: any[]) => {
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(() => func(...args), wait)
//   }) as T
// }







//claude removed the waringin of call back
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronDown, Filter, X, Star, TrendingUp, DollarSign, Crown } from "lucide-react"

interface FilterSidebarProps {
  categories: string[]
  selectedCategory?: string
  currentFilters?: any
  onFiltersChange: (filters: any) => void
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  currentFilters = {},
  onFiltersChange,
}: FilterSidebarProps) {
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

  const [isOpen, setIsOpen] = useState(false)
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null)
  
  // Use useRef to store the timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update filters when props change with proper decoding
  useEffect(() => {
    console.log("🔧 FilterSidebar: Updating filters from props", { selectedCategory, currentFilters })

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

    console.log("🔧 Setting filters to:", newFilters)
    setFilters(newFilters)

    // Detect which quick filter is active
    detectActiveQuickFilter(newFilters)
  }, [selectedCategory, currentFilters])

  // Detect which quick filter is currently active
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

  // Fixed debounced filter change using useCallback properly
  const debouncedFilterChange = useCallback((newFilters: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      console.log("🔄 Debounced filter change:", newFilters)
      onFiltersChange(newFilters)
    }, 800)
  }, [onFiltersChange])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    console.log("🔧 FilterSidebar: Filter change", key, "=", value)
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Clear active quick filter when manual changes are made
    setActiveQuickFilter(null)

    // For non-numeric fields, apply immediately
    if (key === "category" || key === "minRating" || key === "maxRating") {
      onFiltersChange(newFilters)
    } else {
      // For price and numeric fields, use debounced change
      debouncedFilterChange(newFilters)
    }
  }

  const clearFilters = () => {
    console.log("🧹 FilterSidebar: Clearing all filters...")
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
  }

  // 🚀 IMPROVED: Smart Quick Filter Logic
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
        // 🔥 HIGH RATED: 4+ stars with good review quality
        newFilters = {
          ...newFilters,
          minRating: "4",
          min5Star: "100", // At least 100 five-star reviews for quality assurance
        }
        setActiveQuickFilter("high-rated")
        break

      case "popular":
        // 📈 POPULAR: Reduced from 1000 to 500 reviews (more inclusive)
        newFilters = {
          ...newFilters,
          minReviews: "500", // 🔧 IMPROVED: More realistic threshold
        }
        setActiveQuickFilter("popular")
        break

      case "budget":
        // 💰 BUDGET: Increased from 500 to 1000 (more realistic)
        newFilters = {
          ...newFilters,
          maxPrice: "1000", // 🔧 IMPROVED: More practical budget range
        }
        setActiveQuickFilter("budget")
        break

      case "premium":
        // 💎 PREMIUM: Increased from 1000 to 2000 (true premium)
        newFilters = {
          ...newFilters,
          minPrice: "2000", // 🔧 IMPROVED: Higher threshold for premium
        }
        setActiveQuickFilter("premium")
        break

      default:
        setActiveQuickFilter(null)
    }

    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => value !== "")

  // 🎨 IMPROVED: Quick Filter Button Component
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
          relative p-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg
          ${
            isActive
              ? `${color} text-white shadow-lg scale-105`
              : `bg-gray-50 hover:${color.replace("bg-", "bg-").replace("-500", "-100")} text-gray-700 hover:text-gray-900`
          }
        `}
        title={description}
      >
        <div className="flex flex-col items-center space-y-1">
          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`} />
          <span className="text-xs leading-tight">{label}</span>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>
    )
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between bg-white border border-orange-200 text-orange-700 px-4 py-3 rounded-lg w-full shadow-sm"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`
        ${isOpen ? "block" : "hidden"} lg:block
        bg-white rounded-xl shadow-sm border border-orange-100 p-6 space-y-6
      `}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
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
          {filters.category === "" && (
            <p className="text-xs text-orange-600 mt-1">✨ Mixed display - diverse categories</p>
          )}
        </div>

        {/* 🚀 IMPROVED: Smart Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Smart Filters
            <span className="text-xs text-gray-500 ml-2">• One-click filtering</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <QuickFilterButton
              type="high-rated"
              label="High Rated"
              icon={Star}
              color="bg-orange-500"
              description="Products with 4+ stars and 100+ five-star reviews"
            />
            <QuickFilterButton
              type="popular"
              label="Popular"
              icon={TrendingUp}
              color="bg-blue-500"
              description="Products with 500+ reviews (proven popularity)"
            />
            <QuickFilterButton
              type="budget"
              label="Budget"
              icon={DollarSign}
              color="bg-green-500"
              description="Products under Rs. 1,000 (affordable options)"
            />
            <QuickFilterButton
              type="premium"
              label="Premium"
              icon={Crown}
              color="bg-purple-500"
              description="Products over Rs. 2,000 (premium quality)"
            />
          </div>

          {/* Active filter description */}
          {activeQuickFilter && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700">
                <span className="font-medium">Active:</span>{" "}
                {activeQuickFilter === "high-rated" &&
                  "Showing highly-rated products (4+ stars, 100+ five-star reviews)"}
                {activeQuickFilter === "popular" && "Showing popular products (500+ reviews)"}
                {activeQuickFilter === "budget" && "Showing budget-friendly products (under Rs. 1,000)"}
                {activeQuickFilter === "premium" && "Showing premium products (over Rs. 2,000)"}
              </p>
            </div>
          )}
        </div>

        {/* Price Range with debounced filtering */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (Rs.)
            <span className="text-xs text-gray-500 ml-2">• Filters apply after you stop typing</span>
          </label>
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
          <p className="text-xs text-gray-500 mt-1">💡 Tip: Filters apply automatically after you finish typing</p>
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
    </>
  )
}