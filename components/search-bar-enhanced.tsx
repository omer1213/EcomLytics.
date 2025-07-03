// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { Search, X, Clock, Hash } from "lucide-react"
// import { getSearchSuggestions, type Product } from "@/lib/supabase"

// interface SearchBarEnhancedProps {
//   onSearch: (searchTerm: string) => void
//   onSuggestionClick?: (product: Product) => void
//   placeholder?: string
//   initialValue?: string
//   currentCategory?: string
//   className?: string
// }

// export default function SearchBarEnhanced({
//   onSearch,
//   onSuggestionClick,
//   placeholder = "Search products...",
//   initialValue = "",
//   currentCategory,
//   className = "",
// }: SearchBarEnhancedProps) {
//   const [searchTerm, setSearchTerm] = useState(initialValue)
//   const [suggestions, setSuggestions] = useState<Product[]>([])
//   const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [recentSearches, setRecentSearches] = useState<string[]>([])
//   const [selectedIndex, setSelectedIndex] = useState(-1)
//   const [isInputFocused, setIsInputFocused] = useState(false)

//   const searchRef = useRef<HTMLDivElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const suggestionsRef = useRef<HTMLDivElement>(null)
//   const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   // Load recent searches from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("ecomlytics-recent-searches")
//     if (saved) {
//       try {
//         setRecentSearches(JSON.parse(saved).slice(0, 5))
//       } catch (error) {
//         console.error("Error loading recent searches:", error)
//       }
//     }
//   }, [])

//   // Generate keyword suggestions from search term
//   const generateKeywordSuggestions = (term: string): string[] => {
//     if (term.length < 2) return []

//     const keywords = [
//       // Common product keywords
//       `${term} wireless`,
//       `${term} bluetooth`,
//       `${term} premium`,
//       `${term} set`,
//       `${term} kit`,
//       `${term} pro`,
//       `${term} mini`,
//       `${term} smart`,
//       `${term} electric`,
//       `${term} portable`,
//       `${term} organic`,
//       `${term} natural`,
//       // Category-specific suggestions
//       ...(currentCategory === "Electronics"
//         ? [`${term} gaming`, `${term} wireless`, `${term} bluetooth`, `${term} smart`]
//         : []),
//       ...(currentCategory === "Beauty Tools"
//         ? [`${term} organic`, `${term} natural`, `${term} premium`, `${term} set`]
//         : []),
//       ...(currentCategory === "Home & Kitchen"
//         ? [`${term} electric`, `${term} stainless`, `${term} non-stick`, `${term} set`]
//         : []),
//     ]

//     // Filter and limit to 4 unique suggestions
//     return [...new Set(keywords)].filter((k) => k.toLowerCase() !== term.toLowerCase()).slice(0, 4)
//   }

//   // 🔧 SIMPLIFIED: Only suggestions, no real-time grid updates
//   useEffect(() => {
//     if (suggestionTimeoutRef.current) {
//       clearTimeout(suggestionTimeoutRef.current)
//     }

//     if (!isInputFocused) {
//       setSuggestions([])
//       setKeywordSuggestions([])
//       setShowSuggestions(false)
//       return
//     }

//     if (searchTerm.trim().length >= 2) {
//       setLoading(true)

//       // Only fetch suggestions for dropdown - NO grid updates
//       suggestionTimeoutRef.current = setTimeout(async () => {
//         try {
//           console.log("🔍 Fetching suggestions only (no grid update):", searchTerm)
//           const results = await getSearchSuggestions(searchTerm, currentCategory, 6)
//           setSuggestions(results)

//           const keywords = generateKeywordSuggestions(searchTerm.trim())
//           setKeywordSuggestions(keywords)

//           // 🔧 FIX: Show suggestions even if no products found, but with better messaging
//           setShowSuggestions(true)
//         } catch (error) {
//           console.error("Error fetching suggestions:", error)
//           setSuggestions([])
//           setKeywordSuggestions([])
//         } finally {
//           setLoading(false)
//         }
//       }, 400) // Fast suggestions for dropdown only
//     } else if (searchTerm.trim().length === 0) {
//       setSuggestions([])
//       setKeywordSuggestions([])
//       setShowSuggestions(recentSearches.length > 0 && isInputFocused)
//     } else {
//       // 1 character - show recent searches only
//       setSuggestions([])
//       setKeywordSuggestions([])
//       setShowSuggestions(recentSearches.length > 0 && isInputFocused)
//     }

//     setSelectedIndex(-1)

//     return () => {
//       if (suggestionTimeoutRef.current) {
//         clearTimeout(suggestionTimeoutRef.current)
//       }
//     }
//   }, [searchTerm, currentCategory, recentSearches.length, isInputFocused])

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowSuggestions(false)
//         setSelectedIndex(-1)
//         setIsInputFocused(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Create shorter, cleaner search terms
//   const createSearchTerm = (productName: string): string => {
//     const words = productName
//       .split(/[\s,\-[\]()]+/)
//       .filter(
//         (word) =>
//           word.length > 2 && !["with", "and", "for", "the", "of", "in", "on", "at", "by"].includes(word.toLowerCase()),
//       )

//     const shortTerm = words.slice(0, 3).join(" ")
//     return shortTerm.length > 40 ? shortTerm.substring(0, 37) + "..." : shortTerm
//   }

//   const saveRecentSearch = (term: string) => {
//     if (!term.trim()) return

//     const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5)
//     setRecentSearches(updated)
//     localStorage.setItem("ecomlytics-recent-searches", JSON.stringify(updated))
//   }

//   // 🔧 SIMPLIFIED: Always trigger search and keep input focused
//   const performSearch = (term: string, clearInput = false) => {
//     console.log("🔍 Performing search for:", term)
//     saveRecentSearch(term)
//     onSearch(term) // This will update the grid

//     if (clearInput) {
//       setSearchTerm("")
//     } else {
//       setSearchTerm(term)
//     }

//     setShowSuggestions(false)
//     setSelectedIndex(-1)

//     // Keep focus on input
//     setTimeout(() => {
//       inputRef.current?.focus()
//     }, 100)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const term = searchTerm.trim()
//     if (term) {
//       performSearch(term, false) // Keep the search term in input
//     }
//   }

//   // Handle suggestion clicks
//   const handleSuggestionClick = (product: Product) => {
//     console.log("🎯 Product suggestion clicked:", product.ProductName)
//     const shortSearchTerm = createSearchTerm(product.ProductName)
//     performSearch(shortSearchTerm, false) // Keep the search term in input
//   }

//   const handleKeywordClick = (keyword: string) => {
//     console.log("🏷️ Keyword suggestion clicked:", keyword)
//     performSearch(keyword, false) // Keep the search term in input
//   }

//   const handleRecentSearchClick = (term: string) => {
//     console.log("🕒 Recent search clicked:", term)
//     performSearch(term, false) // Keep the search term in input
//   }

//   const handleClear = () => {
//     setSearchTerm("")
//     onSearch("") // Clear the grid
//     setSuggestions([])
//     setKeywordSuggestions([])
//     setShowSuggestions(false)
//     setSelectedIndex(-1)
//     inputRef.current?.focus()
//   }

//   const clearRecentSearches = () => {
//     setRecentSearches([])
//     localStorage.removeItem("ecomlytics-recent-searches")
//   }

//   const handleInputFocus = () => {
//     setIsInputFocused(true)
//     if (searchTerm.length === 0 && recentSearches.length > 0) {
//       setShowSuggestions(true)
//     }
//   }

//   const handleInputBlur = () => {
//     setTimeout(() => {
//       setIsInputFocused(false)
//     }, 200)
//   }

//   // Keyboard navigation
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!showSuggestions) return

//     const totalItems =
//       (recentSearches.length > 0 && searchTerm.length === 0 ? recentSearches.length : 0) +
//       keywordSuggestions.length +
//       suggestions.length

//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault()
//         setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : -1))
//         break
//       case "ArrowUp":
//         e.preventDefault()
//         setSelectedIndex((prev) => (prev > -1 ? prev - 1 : totalItems - 1))
//         break
//       case "Enter":
//         e.preventDefault()
//         if (selectedIndex >= 0) {
//           let currentIndex = 0

//           // Recent searches
//           if (searchTerm.length === 0 && selectedIndex < recentSearches.length) {
//             handleRecentSearchClick(recentSearches[selectedIndex])
//             return
//           }
//           currentIndex += searchTerm.length === 0 ? recentSearches.length : 0

//           // Keyword suggestions
//           if (selectedIndex >= currentIndex && selectedIndex < currentIndex + keywordSuggestions.length) {
//             const keywordIndex = selectedIndex - currentIndex
//             handleKeywordClick(keywordSuggestions[keywordIndex])
//             return
//           }
//           currentIndex += keywordSuggestions.length

//           // Product suggestions
//           if (selectedIndex >= currentIndex && selectedIndex < currentIndex + suggestions.length) {
//             const productIndex = selectedIndex - currentIndex
//             handleSuggestionClick(suggestions[productIndex])
//             return
//           }
//         } else {
//           handleSubmit(e)
//         }
//         break
//       case "Escape":
//         setShowSuggestions(false)
//         setSelectedIndex(-1)
//         setIsInputFocused(false)
//         inputRef.current?.blur()
//         break
//     }
//   }

//   const getCategoryDisplayName = () => {
//     if (!currentCategory || currentCategory === "" || currentCategory === "All Categories") {
//       return "all categories"
//     }
//     return decodeURIComponent(currentCategory)
//   }

//   return (
//     <div ref={searchRef} className={`relative w-full max-w-md ${className}`}>
//       <form onSubmit={handleSubmit} className="relative">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             ref={inputRef}
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={handleInputFocus}
//             onBlur={handleInputBlur}
//             onKeyDown={handleKeyDown}
//             placeholder={`${placeholder} in ${getCategoryDisplayName()}`}
//             className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-200"
//           />
//           {searchTerm && (
//             <button
//               type="button"
//               onClick={handleClear}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Suggestions Dropdown */}
//       {showSuggestions && isInputFocused && (
//         <div
//           ref={suggestionsRef}
//           className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
//         >
//           {/* Category Context */}
//           {currentCategory && currentCategory !== "" && currentCategory !== "All Categories" && (
//             <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
//               <p className="text-xs text-orange-700 font-medium">
//                 🏷️ Searching in: <span className="font-semibold">{getCategoryDisplayName()}</span>
//               </p>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="px-4 py-3 text-center">
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
//                 <span className="text-sm text-gray-600">Finding suggestions...</span>
//               </div>
//             </div>
//           )}

//           {/* Recent Searches */}
//           {!loading && searchTerm.length === 0 && recentSearches.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4 text-gray-500" />
//                   <span className="text-xs font-medium text-gray-700">Recent Searches</span>
//                 </div>
//                 <button
//                   onClick={clearRecentSearches}
//                   className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   Clear
//                 </button>
//               </div>
//               {recentSearches.map((term, index) => (
//                 <button
//                   key={term}
//                   onClick={() => handleRecentSearchClick(term)}
//                   className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
//                     selectedIndex === index ? "bg-orange-50 border-r-2 border-orange-500" : ""
//                   }`}
//                 >
//                   <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                   <span className="text-sm text-gray-700 truncate">{term}</span>
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Keyword Suggestions */}
//           {!loading && keywordSuggestions.length > 0 && (
//             <div>
//               <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
//                 <div className="flex items-center space-x-2">
//                   <Hash className="w-4 h-4 text-blue-500" />
//                   <span className="text-xs font-medium text-blue-700">Suggested Keywords</span>
//                 </div>
//               </div>
//               {keywordSuggestions.map((keyword, index) => {
//                 const adjustedIndex = (searchTerm.length === 0 ? recentSearches.length : 0) + index
//                 return (
//                   <button
//                     key={keyword}
//                     onClick={() => handleKeywordClick(keyword)}
//                     className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
//                       selectedIndex === adjustedIndex ? "bg-blue-50 border-r-2 border-blue-500" : ""
//                     }`}
//                     onMouseDown={(e) => e.preventDefault()}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <Hash className="w-4 h-4 text-blue-400 flex-shrink-0" />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-blue-900 truncate">{keyword}</p>
//                         <p className="text-xs text-blue-600 mt-0.5">Search keyword</p>
//                       </div>
//                     </div>
//                   </button>
//                 )
//               })}
//             </div>
//           )}

//           {/* Product Suggestions */}
//           {!loading && suggestions.length > 0 && (
//             <div>
//               <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
//                 <div className="flex items-center space-x-2">
//                   <Search className="w-4 h-4 text-gray-500" />
//                   <span className="text-xs font-medium text-gray-700">
//                     {suggestions.length} product{suggestions.length !== 1 ? "s" : ""} found
//                   </span>
//                 </div>
//               </div>
//               {suggestions.map((product, index) => {
//                 const adjustedIndex =
//                   (searchTerm.length === 0 ? recentSearches.length : 0) + keywordSuggestions.length + index
//                 return (
//                   <button
//                     key={product.id}
//                     onClick={() => handleSuggestionClick(product)}
//                     className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
//                       selectedIndex === adjustedIndex ? "bg-orange-50 border-r-2 border-orange-500" : ""
//                     }`}
//                     onMouseDown={(e) => e.preventDefault()}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate">{product.ProductName}</p>
//                         <div className="flex items-center space-x-2 mt-0.5">
//                           <span className="text-xs text-gray-500">{product.Category}</span>
//                           <span className="text-xs text-orange-600 font-medium">Rs. {product.Price}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </button>
//                 )
//               })}
//             </div>
//           )}

//           {/* No Results */}
//           {!loading && searchTerm.length >= 2 && suggestions.length === 0 && keywordSuggestions.length === 0 && (
//             <div className="px-4 py-6 text-center">
//               <div className="text-gray-500 mb-2">
//                 <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                 <p className="text-sm">No suggestions found for "{searchTerm}"</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Press Enter to search anyway - you might find similar products
//                   {currentCategory && currentCategory !== "All Categories" && (
//                     <span className="block mt-1">in {getCategoryDisplayName()}</span>
//                   )}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Search Tip */}
//           {!loading && searchTerm.length === 1 && (
//             <div className="px-4 py-3 text-center">
//               <p className="text-xs text-gray-500">Type at least 2 characters for suggestions</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }



//claude removed the warinign 
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X, Clock, Hash } from "lucide-react"
import { getSearchSuggestions, type Product } from "@/lib/supabase"

interface SearchBarEnhancedProps {
  onSearch: (searchTerm: string) => void
  onSuggestionClick?: (product: Product) => void
  placeholder?: string
  initialValue?: string
  currentCategory?: string
  className?: string
}

export default function SearchBarEnhanced({
  onSearch,
  onSuggestionClick,
  placeholder = "Search products...",
  initialValue = "",
  currentCategory,
  className = "",
}: SearchBarEnhancedProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ecomlytics-recent-searches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5))
      } catch (error) {
        console.error("Error loading recent searches:", error)
      }
    }
  }, [])

  // 🔧 SIMPLIFIED: Only suggestions, no real-time grid updates
  useEffect(() => {
    // Generate keyword suggestions from search term
    const generateKeywordSuggestions = (term: string): string[] => {
      if (term.length < 2) return []

      const keywords = [
        // Common product keywords
        `${term} wireless`,
        `${term} bluetooth`,
        `${term} premium`,
        `${term} set`,
        `${term} kit`,
        `${term} pro`,
        `${term} mini`,
        `${term} smart`,
        `${term} electric`,
        `${term} portable`,
        `${term} organic`,
        `${term} natural`,
        // Category-specific suggestions
        ...(currentCategory === "Electronics"
          ? [`${term} gaming`, `${term} wireless`, `${term} bluetooth`, `${term} smart`]
          : []),
        ...(currentCategory === "Beauty Tools"
          ? [`${term} organic`, `${term} natural`, `${term} premium`, `${term} set`]
          : []),
        ...(currentCategory === "Home & Kitchen"
          ? [`${term} electric`, `${term} stainless`, `${term} non-stick`, `${term} set`]
          : []),
      ]

      // Filter and limit to 4 unique suggestions - Fixed for ES5 compatibility
      const uniqueKeywords = Array.from(new Set(keywords))
      return uniqueKeywords.filter((k) => k.toLowerCase() !== term.toLowerCase()).slice(0, 4)
    }

    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current)
    }

    if (!isInputFocused) {
      setSuggestions([])
      setKeywordSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (searchTerm.trim().length >= 2) {
      setLoading(true)

      // Only fetch suggestions for dropdown - NO grid updates
      suggestionTimeoutRef.current = setTimeout(async () => {
        try {
          console.log("🔍 Fetching suggestions only (no grid update):", searchTerm)
          const results = await getSearchSuggestions(searchTerm, currentCategory, 6)
          setSuggestions(results)

          const keywords = generateKeywordSuggestions(searchTerm.trim())
          setKeywordSuggestions(keywords)

          // 🔧 FIX: Show suggestions even if no products found, but with better messaging
          setShowSuggestions(true)
        } catch (error) {
          console.error("Error fetching suggestions:", error)
          setSuggestions([])
          setKeywordSuggestions([])
        } finally {
          setLoading(false)
        }
      }, 400) // Fast suggestions for dropdown only
    } else if (searchTerm.trim().length === 0) {
      setSuggestions([])
      setKeywordSuggestions([])
      setShowSuggestions(recentSearches.length > 0 && isInputFocused)
    } else {
      // 1 character - show recent searches only
      setSuggestions([])
      setKeywordSuggestions([])
      setShowSuggestions(recentSearches.length > 0 && isInputFocused)
    }

    setSelectedIndex(-1)

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current)
      }
    }
  }, [searchTerm, currentCategory, recentSearches.length, isInputFocused])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
        setIsInputFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Create shorter, cleaner search terms
  const createSearchTerm = (productName: string): string => {
    const words = productName
      .split(/[\s,\-[\]()]+/)
      .filter(
        (word) =>
          word.length > 2 && !["with", "and", "for", "the", "of", "in", "on", "at", "by"].includes(word.toLowerCase()),
      )

    const shortTerm = words.slice(0, 3).join(" ")
    return shortTerm.length > 40 ? shortTerm.substring(0, 37) + "..." : shortTerm
  }

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return

    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("ecomlytics-recent-searches", JSON.stringify(updated))
  }

  // 🔧 SIMPLIFIED: Always trigger search and keep input focused
  const performSearch = (term: string, clearInput = false) => {
    console.log("🔍 Performing search for:", term)
    saveRecentSearch(term)
    onSearch(term) // This will update the grid

    if (clearInput) {
      setSearchTerm("")
    } else {
      setSearchTerm(term)
    }

    setShowSuggestions(false)
    setSelectedIndex(-1)

    // Keep focus on input
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = searchTerm.trim()
    if (term) {
      performSearch(term, false) // Keep the search term in input
    }
  }

  // Handle suggestion clicks
  const handleSuggestionClick = (product: Product) => {
    console.log("🎯 Product suggestion clicked:", product.ProductName)
    const shortSearchTerm = createSearchTerm(product.ProductName)
    performSearch(shortSearchTerm, false) // Keep the search term in input
  }

  const handleKeywordClick = (keyword: string) => {
    console.log("🏷️ Keyword suggestion clicked:", keyword)
    performSearch(keyword, false) // Keep the search term in input
  }

  const handleRecentSearchClick = (term: string) => {
    console.log("🕒 Recent search clicked:", term)
    performSearch(term, false) // Keep the search term in input
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch("") // Clear the grid
    setSuggestions([])
    setKeywordSuggestions([])
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("ecomlytics-recent-searches")
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
    if (searchTerm.length === 0 && recentSearches.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false)
    }, 200)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    const totalItems =
      (recentSearches.length > 0 && searchTerm.length === 0 ? recentSearches.length : 0) +
      keywordSuggestions.length +
      suggestions.length

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : -1))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : totalItems - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          let currentIndex = 0

          // Recent searches
          if (searchTerm.length === 0 && selectedIndex < recentSearches.length) {
            handleRecentSearchClick(recentSearches[selectedIndex])
            return
          }
          currentIndex += searchTerm.length === 0 ? recentSearches.length : 0

          // Keyword suggestions
          if (selectedIndex >= currentIndex && selectedIndex < currentIndex + keywordSuggestions.length) {
            const keywordIndex = selectedIndex - currentIndex
            handleKeywordClick(keywordSuggestions[keywordIndex])
            return
          }
          currentIndex += keywordSuggestions.length

          // Product suggestions
          if (selectedIndex >= currentIndex && selectedIndex < currentIndex + suggestions.length) {
            const productIndex = selectedIndex - currentIndex
            handleSuggestionClick(suggestions[productIndex])
            return
          }
        } else {
          handleSubmit(e)
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        setIsInputFocused(false)
        inputRef.current?.blur()
        break
    }
  }

  const getCategoryDisplayName = () => {
    if (!currentCategory || currentCategory === "" || currentCategory === "All Categories") {
      return "all categories"
    }
    return decodeURIComponent(currentCategory)
  }

  return (
    <div ref={searchRef} className={`relative w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={`${placeholder} in ${getCategoryDisplayName()}`}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-all duration-200"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && isInputFocused && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
        >
          {/* Category Context */}
          {currentCategory && currentCategory !== "" && currentCategory !== "All Categories" && (
            <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
              <p className="text-xs text-orange-700 font-medium">
                🏷️ Searching in: <span className="font-semibold">{getCategoryDisplayName()}</span>
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="px-4 py-3 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                <span className="text-sm text-gray-600">Finding suggestions...</span>
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!loading && searchTerm.length === 0 && recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">Recent Searches</span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((term, index) => (
                <button
                  key={term}
                  onClick={() => handleRecentSearchClick(term)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                    selectedIndex === index ? "bg-orange-50 border-r-2 border-orange-500" : ""
                  }`}
                >
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{term}</span>
                </button>
              ))}
            </div>
          )}

          {/* Keyword Suggestions */}
          {!loading && keywordSuggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-blue-700">Suggested Keywords</span>
                </div>
              </div>
              {keywordSuggestions.map((keyword, index) => {
                const adjustedIndex = (searchTerm.length === 0 ? recentSearches.length : 0) + index
                return (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                    className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                      selectedIndex === adjustedIndex ? "bg-blue-50 border-r-2 border-blue-500" : ""
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center space-x-3">
                      <Hash className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-900 truncate">{keyword}</p>
                        <p className="text-xs text-blue-600 mt-0.5">Search keyword</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Product Suggestions */}
          {!loading && suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">
                    {suggestions.length} product{suggestions.length !== 1 ? "s" : ""} found
                  </span>
                </div>
              </div>
              {suggestions.map((product, index) => {
                const adjustedIndex =
                  (searchTerm.length === 0 ? recentSearches.length : 0) + keywordSuggestions.length + index
                return (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedIndex === adjustedIndex ? "bg-orange-50 border-r-2 border-orange-500" : ""
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.ProductName}</p>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="text-xs text-gray-500">{product.Category}</span>
                          <span className="text-xs text-orange-600 font-medium">Rs. {product.Price}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* No Results */}
          {!loading && searchTerm.length >= 2 && suggestions.length === 0 && keywordSuggestions.length === 0 && (
            <div className="px-4 py-6 text-center">
              <div className="text-gray-500 mb-2">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No suggestions found for "{searchTerm}"</p>
                <p className="text-xs text-gray-400 mt-1">
                  Press Enter to search anyway - you might find similar products
                  {currentCategory && currentCategory !== "All Categories" && (
                    <span className="block mt-1">in {getCategoryDisplayName()}</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Search Tip */}
          {!loading && searchTerm.length === 1 && (
            <div className="px-4 py-3 text-center">
              <p className="text-xs text-gray-500">Type at least 2 characters for suggestions</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}