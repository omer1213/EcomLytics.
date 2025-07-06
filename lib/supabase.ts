

//pagination logic is adjuusted

import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export type Conversation = {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  conversation_id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
}

export interface Product {
  id: number
  ProductName: string
  Category: string
  Image: string
  Price: number
  OriginalPrice: number
  Rating: number
  Review: number
  ItemSold: number
  Link: string
  "5_star": number
  "4_star": number
  "3_star": number
  "2_star": number
  "1_star": number
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// Function to get all conversations for a user
export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching conversations:", error)
    throw error
  }

  return data as Conversation[]
}

// Function to get a specific conversation
export async function getConversation(conversationId: string) {
  const { data, error } = await supabase.from("conversations").select("*").eq("id", conversationId).single()

  if (error) {
    console.error("Error fetching conversation:", error)
    throw error
  }

  return data as Conversation
}

// Function to get messages for a conversation
export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching messages:", error)
    throw error
  }

  return data as Message[]
}

// Function to delete a conversation
export async function deleteConversation(conversationId: string) {
  const { error } = await supabase.from("conversations").delete().eq("id", conversationId)

  if (error) {
    console.error("Error deleting conversation:", error)
    throw error
  }

  return true
}

// Helper function to check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-key"
  )
}

// Get search suggestions with category filtering
export async function getSearchSuggestions(searchTerm: string, category?: string, limit = 8): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, returning empty suggestions")
      return []
    }

    if (!searchTerm || searchTerm.trim().length < 2) {
      return []
    }

    console.log("🔍 Getting search suggestions:", { searchTerm, category, limit })

    let query = supabase
      .from("products_data")
      .select("id, ProductName, Category, Price, Rating, Image")
      .ilike("ProductName", `%${searchTerm.trim()}%`)

    // Apply category filter if provided
    if (category && category !== "" && category !== "All Categories") {
      const decodedCategory = decodeURIComponent(category)
      query = query.eq("Category", decodedCategory)
      console.log("🏷️ Filtering suggestions by category:", decodedCategory)
    }

    const { data, error } = await query.order("Rating", { ascending: false }).limit(limit)

    if (error) {
      console.error("❌ Error getting search suggestions:", error)
      return []
    }

    console.log("✅ Search suggestions found:", data?.length || 0)
    return (data as Product[]) || []
  } catch (error) {
    console.error("❌ Error in getSearchSuggestions:", error)
    return []
  }
}

// ROBUST CATEGORY FETCHING WITH MULTIPLE STRATEGIES
export async function getAllCategories(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning fallback categories")
    return getFallbackCategories()
  }

  console.log("🔍 Starting robust category fetch...")

  // Strategy 1: Try with increased timeout and chunked approach
  try {
    console.log("📊 Strategy 1: Chunked category fetch...")

    const categories = new Set<string>()
    let offset = 0
    const chunkSize = 1000
    let hasMore = true

    while (hasMore && offset < 10000) {
      console.log(`📦 Fetching chunk ${offset}-${offset + chunkSize}...`)

      const { data, error } = await supabase
        .from("products_data")
        .select("Category")
        .not("Category", "is", null)
        .not("Category", "eq", "")
        .range(offset, offset + chunkSize - 1)

      if (error) {
        console.error(`❌ Error in chunk ${offset}:`, error)
        break
      }

      if (!data || data.length === 0) {
        console.log("✅ No more data, stopping...")
        hasMore = false
        break
      }

      // Add categories to set
      data.forEach((item) => {
        if (item.Category && typeof item.Category === "string" && item.Category.trim()) {
          categories.add(item.Category.trim())
        }
      })

      console.log(`📈 Chunk processed. Total unique categories so far: ${categories.size}`)

      if (data.length < chunkSize) {
        hasMore = false
      } else {
        offset += chunkSize
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const result = Array.from(categories).sort()
    console.log("✅ Strategy 1 SUCCESS:", result.length, "categories")

    if (result.length > 5) {
      return result
    }
  } catch (error) {
    console.error("❌ Strategy 1 failed:", error)
  }

  // Strategy 2: Try with RPC function (if available)
  try {
    console.log("📊 Strategy 2: RPC function...")
    const { data, error } = await supabase.rpc("get_distinct_categories")

    if (!error && data && Array.isArray(data) && data.length > 5) {
      console.log("✅ Strategy 2 SUCCESS:", data.length, "categories")
      return data.sort()
    }
  } catch (error) {
    console.error("❌ Strategy 2 failed:", error)
  }

  // Strategy 3: Simple query with high limit
  try {
    console.log("📊 Strategy 3: High limit query...")

    const { data, error } = await supabase
      .from("products_data")
      .select("Category")
      .not("Category", "is", null)
      .not("Category", "eq", "")
      .limit(5000)

    if (error) {
      console.error("❌ Strategy 3 error:", error)
      throw error
    }

  
    if (data && data.length > 0) {
      const categories = Array.from(
        new Set(
          data
            .map((item) => item.Category)
            .filter((cat) => cat && typeof cat === "string" && cat.trim())
            .map((cat) => cat.trim()),
        )
      ).sort()

      console.log("✅ Strategy 3 SUCCESS:", categories.length, "categories")

      if (categories.length > 5) {
        return categories
      }
    }
  } catch (error) {
    console.error("❌ Strategy 3 failed:", error)
  }

  console.log("⚠️ All strategies failed, using fallback...")
  return getFallbackCategories()
}

// Fallback categories function
function getFallbackCategories(): string[] {
  return [
    "Baby Personal Care",
    "Bath & Body",
    "Beauty Tools",
    "Camera Accessories",
    "Decor",
    "Electronics",
    "Fashion",
    "Health & Personal Care",
    "Home & Kitchen",
    "Jewelry",
    "Sports & Outdoors",
    "Toys & Games",
    "Wearable",
    "Arts & Crafts",
    "Automotive",
  ]
}
// ROBUST CATEGORY STATS WITH CHUNKED APPROACH
export async function getCategoryStats(): Promise<Record<string, number>> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty stats")
    return {}
  }

  try {
    console.log("📊 Fetching category stats with chunked approach...")

    const stats: Record<string, number> = {}
    let offset = 0
    const chunkSize = 1000
    let hasMore = true

    while (hasMore && offset < 10000) {
      console.log(`📦 Stats chunk ${offset}-${offset + chunkSize}...`)

      const { data, error } = await supabase
        .from("products_data")
        .select("Category")
        .not("Category", "is", null)
        .not("Category", "eq", "")
        .range(offset, offset + chunkSize - 1)

      if (error) {
        console.error(`❌ Stats error in chunk ${offset}:`, error)
        break
      }

      if (!data || data.length === 0) {
        hasMore = false
        break
      }

      data.forEach((item) => {
        if (item.Category && typeof item.Category === "string" && item.Category.trim()) {
          const category = item.Category.trim()
          stats[category] = (stats[category] || 0) + 1
        }
      })

      if (data.length < chunkSize) {
        hasMore = false
      } else {
        offset += chunkSize
      }

      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    console.log("✅ Category stats completed:", Object.keys(stats).length, "categories")
    return stats
  } catch (error) {
    console.error("❌ Error in getCategoryStats:", error)
    return {}
  }
}

// Get total count of products
export async function getTotalProductsCount(): Promise<number> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning 0 count")
    return 0
  }

  try {
    const { count, error } = await supabase.from("products_data").select("*", { count: "exact", head: true })

    if (error) {
      console.error("❌ Error getting total count:", error)
      throw error
    }

    console.log("📈 Total products in database:", count)
    return count || 0
  } catch (error) {
    console.error("❌ Error in getTotalProductsCount:", error)
    return 0
  }
}

// Get top trending products with integer ItemSold
export async function getTrendingProducts(limit = 16): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty trending products")
    return []
  }

  try {
    console.log("🔥 Fetching diverse trending products (one per category)...")

    const categories = await getAllCategories()
    console.log("📂 Categories for trending:", categories.length)

    const trendingProducts: Product[] = []
    const processedCategories = new Set<string>()

    for (const category of categories) {
      if (trendingProducts.length >= limit) break

      try {
        console.log(`🏷️ Fetching top product from: ${category}`)

        const { data, error } = await supabase
          .from("products_data")
          .select("*")
          .eq("Category", category)
          .not("ItemSold", "is", null)
          .gte("ItemSold", 1)
          .order("ItemSold", { ascending: false })
          .limit(1)

        if (error) {
          console.error(`❌ Error fetching from ${category}:`, error)
          continue
        }

        if (!data || data.length === 0) {
          console.log(`⚠️ No products found in ${category}`)
          continue
        }

        const topProduct = data[0]
        trendingProducts.push(topProduct as Product)
        processedCategories.add(category)
        console.log(`✅ Added top product from ${category}: ${topProduct.ProductName} (${topProduct.ItemSold} sold)`)

        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Error processing category ${category}:`, error)
        continue
      }
    }

    if (trendingProducts.length < limit) {
      console.log(`📈 Need more products, filling with overall top products...`)

      const { data, error } = await supabase
        .from("products_data")
        .select("*")
        .not("ItemSold", "is", null)
        .gte("ItemSold", 1)
        .order("ItemSold", { ascending: false })
        .limit(200)

      if (!error && data) {
        const remainingProducts = data
          .filter((product) => !processedCategories.has(product.Category))
          .slice(0, limit - trendingProducts.length)

        trendingProducts.push(...(remainingProducts as Product[]))
      }
    }

    console.log("✅ Diverse trending products fetched:", trendingProducts.length)
    return trendingProducts.slice(0, limit)
  } catch (error) {
    console.error("❌ Error in getTrendingProducts:", error)

    const { data, error: fallbackError } = await supabase
      .from("products_data")
      .select("*")
      .not("ItemSold", "is", null)
      .gte("ItemSold", 1)
      .order("ItemSold", { ascending: false })
      .limit(limit)

    if (fallbackError || !data) {
      return []
    }

    return data as Product[]
  }
}

// 🔧 CRITICAL FIX: Enhanced products pagination with proper category detection
export async function getProductsPaginated(
  page = 1,
  limit = 24,
  filters?: {
    category?: string
    minPrice?: number | string
    maxPrice?: number | string
    minRating?: number | string
    maxRating?: number | string
    minReviews?: number | string
    maxReviews?: number | string
    search?: string
    min5Star?: number | string
    min4Star?: number | string
    min3Star?: number | string
    minItemsSold?: number | string
    maxItemsSold?: number | string
  },
): Promise<PaginatedResponse<Product>> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty paginated response")
    return {
      data: [],
      count: 0,
      totalPages: 0,
      currentPage: page,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }

  try {
    console.log("📄 Fetching paginated products:", { page, limit, filters })

    // 🔧 CRITICAL FIX: More precise category detection
    const categoryFilter = filters?.category
    const hasSpecificCategory = !!(
      categoryFilter &&
      categoryFilter.trim() !== "" &&
      categoryFilter !== "All Categories" &&
      categoryFilter !== "all" &&
      categoryFilter !== "undefined" &&
      categoryFilter !== "null"
    )

    console.log("🔍 FIXED Category Analysis:", {
      originalCategoryFilter: categoryFilter,
      hasSpecificCategory,
      shouldFilterByCategory: hasSpecificCategory,
      willUseMixedDisplay: !hasSpecificCategory,
    })

    // 🔧 MAJOR FIX: For "All Products" view, use direct pagination instead of mixed display
    if (!hasSpecificCategory) {
      console.log("🎨 ALL PRODUCTS VIEW - Using direct pagination for all 3300+ products")
      return await getAllProductsPaginated(page, limit, filters)
    }

    // 🔧 CRITICAL FIX: We have a specific category - apply direct filtering
    console.log("🏷️ SPECIFIC CATEGORY DETECTED - Direct filtering for:", categoryFilter)

    const offset = (page - 1) * limit
    let query = supabase.from("products_data").select("*", { count: "exact" })

    // Apply category filter with proper decoding
    const decodedCategory = decodeURIComponent(categoryFilter)
    console.log("🔄 Applying category filter:", decodedCategory)

    // Try exact match first
    const { count: exactCount } = await supabase
      .from("products_data")
      .select("*", { count: "exact", head: true })
      .eq("Category", decodedCategory)

    if (exactCount && exactCount > 0) {
      console.log("✅ Using exact category match:", exactCount, "products found")
      query = query.eq("Category", decodedCategory)
    } else {
      console.log("🔄 Trying partial category match...")
      const { count: partialCount } = await supabase
        .from("products_data")
        .select("*", { count: "exact", head: true })
        .ilike("Category", `%${decodedCategory}%`)

      if (partialCount && partialCount > 0) {
        console.log("✅ Using partial category match:", partialCount, "products found")
        query = query.ilike("Category", `%${decodedCategory}%`)
      } else {
        console.log("❌ No products found for category:", decodedCategory)
        return {
          data: [],
          count: 0,
          totalPages: 0,
          currentPage: page,
          hasNextPage: false,
          hasPrevPage: false,
        }
      }
    }

    // Apply all other filters
    if (filters?.minPrice && filters.minPrice !== "") {
      const minPrice = typeof filters.minPrice === "string" ? Number.parseFloat(filters.minPrice) : filters.minPrice
      if (!isNaN(minPrice)) query = query.gte("Price", minPrice)
    }
    if (filters?.maxPrice && filters.maxPrice !== "") {
      const maxPrice = typeof filters.maxPrice === "string" ? Number.parseFloat(filters.maxPrice) : filters.maxPrice
      if (!isNaN(maxPrice)) query = query.lte("Price", maxPrice)
    }
    if (filters?.minRating && filters.minRating !== "") {
      const minRating = typeof filters.minRating === "string" ? Number.parseFloat(filters.minRating) : filters.minRating
      if (!isNaN(minRating)) query = query.gte("Rating", minRating)
    }
    if (filters?.maxRating && filters.maxRating !== "") {
      const maxRating = typeof filters.maxRating === "string" ? Number.parseFloat(filters.maxRating) : filters.maxRating
      if (!isNaN(maxRating)) query = query.lte("Rating", maxRating)
    }
    if (filters?.minReviews && filters.minReviews !== "") {
      const minReviews =
        typeof filters.minReviews === "string" ? Number.parseInt(filters.minReviews) : filters.minReviews
      if (!isNaN(minReviews)) query = query.gte("Review", minReviews)
    }
    if (filters?.maxReviews && filters.maxReviews !== "") {
      const maxReviews =
        typeof filters.maxReviews === "string" ? Number.parseInt(filters.maxReviews) : filters.maxReviews
      if (!isNaN(maxReviews)) query = query.lte("Review", maxReviews)
    }
    if (filters?.min5Star && filters.min5Star !== "") {
      const min5Star = typeof filters.min5Star === "string" ? Number.parseInt(filters.min5Star) : filters.min5Star
      if (!isNaN(min5Star)) query = query.gte("5_star", min5Star)
    }
    if (filters?.min4Star && filters.min4Star !== "") {
      const min4Star = typeof filters.min4Star === "string" ? Number.parseInt(filters.min4Star) : filters.min4Star
      if (!isNaN(min4Star)) query = query.gte("4_star", min4Star)
    }
    if (filters?.min3Star && filters.min3Star !== "") {
      const min3Star = typeof filters.min3Star === "string" ? Number.parseInt(filters.min3Star) : filters.min3Star
      if (!isNaN(min3Star)) query = query.gte("3_star", min3Star)
    }
    if (filters?.minItemsSold && filters.minItemsSold !== "") {
      const minItemsSold =
        typeof filters.minItemsSold === "string" ? Number.parseInt(filters.minItemsSold) : filters.minItemsSold
      if (!isNaN(minItemsSold)) query = query.gte("ItemSold", minItemsSold)
    }
    if (filters?.maxItemsSold && filters.maxItemsSold !== "") {
      const maxItemsSold =
        typeof filters.maxItemsSold === "string" ? Number.parseInt(filters.maxItemsSold) : filters.maxItemsSold
      if (!isNaN(maxItemsSold)) query = query.lte("ItemSold", maxItemsSold)
    }
    if (filters?.search && filters.search.trim() !== "") {
      query = query.ilike("ProductName", `%${filters.search.trim()}%`)
    }

    // Apply pagination and ordering
    query = query.range(offset, offset + limit - 1).order("id", { ascending: true })

    const { data, error, count } = await query

    if (error) {
      console.error("❌ Error fetching category-filtered products:", error)
      throw error
    }

    // 🔧 FIX: Validate pagination and redirect to last valid page if needed
    if (data && data.length === 0 && page > 1 && count && count > 0) {
      // Calculate the actual last page with data
      const actualLastPage = Math.ceil(count / limit)

      if (page > actualLastPage) {
        console.log(`🔄 Page ${page} is beyond actual data, redirecting to page ${actualLastPage}`)
        // Recursively call with the correct last page
        return getProductsPaginated(actualLastPage, limit, filters)
      }
    }

    const totalPages = Math.ceil((count || 0) / limit)
    const hasNextPage = page < totalPages && (data?.length || 0) > 0
    const hasPrevPage = page > 1

    console.log("✅ FIXED Category-filtered results:", {
      page,
      productsFound: data?.length || 0,
      totalCount: count,
      totalPages,
      hasNextPage,
      hasPrevPage,
      categoryFilter: hasSpecificCategory ? decodedCategory : "all-products",
      appliedFilters: filters,
    })

    return {
      data: (data as Product[]) || [],
      count: count || 0,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPrevPage,
    }
  } catch (error) {
    console.error("❌ Error in getProductsPaginated:", error)
    return {
      data: [],
      count: 0,
      totalPages: 0,
      currentPage: page,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

// 🔧 NEW FUNCTION: Direct pagination for ALL products (no mixing, no sampling)
async function getAllProductsPaginated(page = 1, limit = 24, filters?: any): Promise<PaginatedResponse<Product>> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, returning empty all products response")
    return {
      data: [],
      count: 0,
      totalPages: 0,
      currentPage: page,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }

  try {
    console.log("🌍 FETCHING ALL PRODUCTS - Direct pagination for full 3300+ products...")

    const offset = (page - 1) * limit
    let query = supabase.from("products_data").select("*", { count: "exact" })

    // Apply filters (but NO category filter since this is "All Products")
    if (filters?.minPrice && filters.minPrice !== "") {
      const minPrice = typeof filters.minPrice === "string" ? Number.parseFloat(filters.minPrice) : filters.minPrice
      if (!isNaN(minPrice)) query = query.gte("Price", minPrice)
    }
    if (filters?.maxPrice && filters.maxPrice !== "") {
      const maxPrice = typeof filters.maxPrice === "string" ? Number.parseFloat(filters.maxPrice) : filters.maxPrice
      if (!isNaN(maxPrice)) query = query.lte("Price", maxPrice)
    }
    if (filters?.minRating && filters.minRating !== "") {
      const minRating = typeof filters.minRating === "string" ? Number.parseFloat(filters.minRating) : filters.minRating
      if (!isNaN(minRating)) query = query.gte("Rating", minRating)
    }
    if (filters?.maxRating && filters.maxRating !== "") {
      const maxRating = typeof filters.maxRating === "string" ? Number.parseFloat(filters.maxRating) : filters.maxRating
      if (!isNaN(maxRating)) query = query.lte("Rating", maxRating)
    }
    if (filters?.minReviews && filters.minReviews !== "") {
      const minReviews =
        typeof filters.minReviews === "string" ? Number.parseInt(filters.minReviews) : filters.minReviews
      if (!isNaN(minReviews)) query = query.gte("Review", minReviews)
    }
    if (filters?.maxReviews && filters.maxReviews !== "") {
      const maxReviews =
        typeof filters.maxReviews === "string" ? Number.parseInt(filters.maxReviews) : filters.maxReviews
      if (!isNaN(maxReviews)) query = query.lte("Review", maxReviews)
    }
    if (filters?.min5Star && filters.min5Star !== "") {
      const min5Star = typeof filters.min5Star === "string" ? Number.parseInt(filters.min5Star) : filters.min5Star
      if (!isNaN(min5Star)) query = query.gte("5_star", min5Star)
    }
    if (filters?.min4Star && filters.min4Star !== "") {
      const min4Star = typeof filters.min4Star === "string" ? Number.parseInt(filters.min4Star) : filters.min4Star
      if (!isNaN(min4Star)) query = query.gte("4_star", min4Star)
    }
    if (filters?.min3Star && filters.min3Star !== "") {
      const min3Star = typeof filters.min3Star === "string" ? Number.parseInt(filters.min3Star) : filters.min3Star
      if (!isNaN(min3Star)) query = query.gte("3_star", min3Star)
    }
    if (filters?.minItemsSold && filters.minItemsSold !== "") {
      const minItemsSold =
        typeof filters.minItemsSold === "string" ? Number.parseInt(filters.minItemsSold) : filters.minItemsSold
      if (!isNaN(minItemsSold)) query = query.gte("ItemSold", minItemsSold)
    }
    if (filters?.maxItemsSold && filters.maxItemsSold !== "") {
      const maxItemsSold =
        typeof filters.maxItemsSold === "string" ? Number.parseInt(filters.maxItemsSold) : filters.maxItemsSold
      if (!isNaN(maxItemsSold)) query = query.lte("ItemSold", maxItemsSold)
    }
    if (filters?.search && filters.search.trim() !== "") {
      query = query.ilike("ProductName", `%${filters.search.trim()}%`)
    }

    // Apply pagination and ordering - Use consistent ordering for predictable pagination
    query = query.range(offset, offset + limit - 1).order("id", { ascending: true })

    const { data, error, count } = await query

    if (error) {
      console.error("❌ Error fetching all products:", error)
      throw error
    }

    if (!data) {
      return {
        data: [],
        count: 0,
        totalPages: 0,
        currentPage: page,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }

    const totalPages = Math.ceil((count || 0) / limit)

    // 🔧 FIX: Validate pagination and redirect to last valid page if needed
    if (data.length === 0 && page > 1 && count && count > 0) {
      const actualLastPage = Math.ceil(count / limit)
      if (page > actualLastPage) {
        console.log(`🔄 All Products: Page ${page} beyond data, redirecting to page ${actualLastPage}`)
        return getAllProductsPaginated(actualLastPage, limit, filters)
      }
    }

    const hasNextPage = page < totalPages && data.length > 0
    const hasPrevPage = page > 1

   
    console.log("✅ ALL PRODUCTS DIRECT PAGINATION:", {
      page,
      productsFound: data.length,
      totalCount: count,
      totalPages,
      hasNextPage,
      hasPrevPage,
      appliedFilters: filters,
      categoriesInPage: Array.from(new Set(data.map((p: Product) => p.Category))).length,
    });
    return {
      data: data as Product[],
      count: count || 0,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPrevPage,
    }
  } catch (error) {
    console.error("❌ Error in getAllProductsPaginated:", error)
    return {
      data: [],
      count: 0,
      totalPages: 0,
      currentPage: page,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

// Get products by category with pagination
export async function getProductsByCategory(
  category: string,
  page = 1,
  limit = 24,
): Promise<PaginatedResponse<Product>> {
  console.log("🏷️ Getting products by category:", category)
  return getProductsPaginated(page, limit, { category })
}
