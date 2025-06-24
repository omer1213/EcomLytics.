// export type Product = {
//     id: number
//     title: string
//     description: string
//     price: number
//     category: string
//     subcategory: string
//     platform: string
//     image: string
//     rating: number
//     sales: number
//     country: string
//     popularity: "Low" | "Medium" | "High"
//     priceHistory: { date: string; price: number }[]
//     salesHistory: { date: string; sales: number }[]
//     revenueHistory: { date: string; revenue: number }[]
//     ratingsDistribution: { rating: number; count: number }[]
//     positiveReviews: number
//     negativeReviews: number
//     reviewTrends: { date: string; averageRating: number }[]
//   }

//   export const categories = [
//     { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Accessories"] },
//     { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
//     { name: "Home & Garden", subcategories: ["Furniture", "Decor", "Kitchen"] },
//     { name: "Sports & Outdoors", subcategories: ["Fitness", "Camping", "Team Sports"] },
//     { name: "Beauty & Personal Care", subcategories: ["Skincare", "Makeup", "Hair Care"] },
//     { name: "Books & Media", subcategories: ["Fiction", "Non-Fiction", "Digital Content"] },
//   ]

//   export const platforms = ["Amazon", "eBay", "Etsy", "Daraz"]

//   export const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "Pakistan"]

//   function generateRandomData(days: number, baseValue: number, variance: number) {
//     return Array.from({ length: days }, (_, i) => ({
//       date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
//       value: Math.max(0, baseValue + Math.random() * variance * 2 - variance),
//     }))
//   }

//   export const dummyProducts: Product[] = [
//     {
//       id: 1,
//       title: "Smartphone X",
//       description: "The latest smartphone with advanced features and sleek design.",
//       price: 799,
//       category: "Electronics",
//       subcategory: "Smartphones",
//       platform: "Daraz",
//       image: "/placeholder.svg",
//       rating: 4.5,
//       sales: 1000,
//       country: "Pakistan",
//       popularity: "High",
//       priceHistory: generateRandomData(30, 799, 50).map((d) => ({ date: d.date, price: d.value })),
//       salesHistory: generateRandomData(30, 33, 10).map((d) => ({ date: d.date, sales: Math.round(d.value) })),
//       revenueHistory: generateRandomData(12, 26000, 5000).map((d) => ({ date: d.date, revenue: Math.round(d.value) })),
//       ratingsDistribution: [
//         { rating: 5, count: 500 },
//         { rating: 4, count: 300 },
//         { rating: 3, count: 100 },
//         { rating: 2, count: 50 },
//         { rating: 1, count: 50 },
//       ],
//       positiveReviews: 800,
//       negativeReviews: 200,
//       reviewTrends: generateRandomData(12, 4.5, 0.5).map((d) => ({ date: d.date, averageRating: d.value })),
//     },
//     // ... Add more products here
//   ]

//   // Helper function to generate random products
//   function generateRandomProducts(count: number): Product[] {
//     const products: Product[] = []
//     for (let i = 2; i <= count; i++) {
//       const category = categories[Math.floor(Math.random() * categories.length)]
//       const basePrice = Math.floor(Math.random() * 1000) + 1
//       const baseSales = Math.floor(Math.random() * 1000)
//       products.push({
//         id: i,
//         title: `Product ${i}`,
//         description: `This is a description for Product ${i}.`,
//         price: basePrice,
//         category: category.name,
//         subcategory: category.subcategories[Math.floor(Math.random() * category.subcategories.length)],
//         platform: platforms[Math.floor(Math.random() * platforms.length)],
//         image: "/placeholder.svg",
//         rating: Math.random() * 2 + 3, // Random rating between 3 and 5
//         sales: baseSales,
//         country: countries[Math.floor(Math.random() * countries.length)],
//         popularity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High",
//         priceHistory: generateRandomData(30, basePrice, basePrice * 0.1).map((d) => ({ date: d.date, price: d.value })),
//         salesHistory: generateRandomData(30, baseSales / 30, baseSales / 100).map((d) => ({
//           date: d.date,
//           sales: Math.round(d.value),
//         })),
//         revenueHistory: generateRandomData(12, (basePrice * baseSales) / 12, (basePrice * baseSales) / 50).map((d) => ({
//           date: d.date,
//           revenue: Math.round(d.value),
//         })),
//         ratingsDistribution: [
//           { rating: 5, count: Math.floor(Math.random() * 500) },
//           { rating: 4, count: Math.floor(Math.random() * 300) },
//           { rating: 3, count: Math.floor(Math.random() * 100) },
//           { rating: 2, count: Math.floor(Math.random() * 50) },
//           { rating: 1, count: Math.floor(Math.random() * 50) },
//         ],
//         positiveReviews: Math.floor(Math.random() * 800),
//         negativeReviews: Math.floor(Math.random() * 200),
//         reviewTrends: generateRandomData(12, 4, 0.5).map((d) => ({ date: d.date, averageRating: d.value })),
//       })
//     }
//     return products
//   }

//   // Generate 69 more random products
//   dummyProducts.push(...generateRandomProducts(70))


export type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  subcategory: string
  platform: string
  image: string
  rating: number
  sales: number
  country: string
  popularity: "Low" | "Medium" | "High"
  priceHistory: { date: string; price: number }[]
  salesHistory: { date: string; sales: number }[]
  revenueHistory: { date: string; revenue: number }[]
  ratingsDistribution: { rating: number; count: number }[]
  positiveReviews: number
  negativeReviews: number
  reviewTrends: { date: string; averageRating: number }[]
}

export const categories = [
  { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Accessories"] },
  { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
  { name: "Home & Garden", subcategories: ["Furniture", "Decor", "Kitchen"] },
  { name: "Sports & Outdoors", subcategories: ["Fitness", "Camping", "Team Sports"] },
  { name: "Beauty & Personal Care", subcategories: ["Skincare", "Makeup", "Hair Care"] },
  { name: "Books & Media", subcategories: ["Fiction", "Non-Fiction", "Digital Content"] },
]

export const platforms = ["Amazon", "eBay", "Etsy", "Daraz"]

export const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "Pakistan"]

function generateRandomData(days: number, baseValue: number, variance: number) {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    value: Math.max(0, baseValue + Math.random() * variance * 2 - variance),
  }))
}

// Update the getRandomImageUrl function to use a reliable placeholder service
function getRandomImageUrl(category: string): string {
  // Using a reliable placeholder service with category-specific dimensions
  const dimensions = {
    Electronics: { width: 400, height: 400 },
    Fashion: { width: 400, height: 600 },
    "Home & Garden": { width: 600, height: 400 },
    "Sports & Outdoors": { width: 500, height: 500 },
    "Beauty & Personal Care": { width: 400, height: 500 },
    "Books & Media": { width: 400, height: 600 },
  }

  const { width, height } = dimensions[category as keyof typeof dimensions] || { width: 400, height: 400 }
  return `https://picsum.photos/${width}/${height}`
}

// Function to generate a random product name based on category and subcategory
function generateProductName(category: string, subcategory: string): string {
  const adjectives = ["Premium", "Ultra", "Smart", "Eco-friendly", "Deluxe", "Professional", "Compact", "Innovative"]
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]

  const productNames = {
    Electronics: {
      Smartphones: ["iPhone", "Galaxy", "Pixel", "OnePlus", "Xperia"],
      Laptops: ["MacBook", "ThinkPad", "XPS", "Spectre", "Yoga"],
      Accessories: ["Wireless Earbuds", "Power Bank", "Smart Watch", "Bluetooth Speaker", "Phone Case"],
    },
    Fashion: {
      Men: ["Slim-fit Suit", "Leather Jacket", "Dress Shirt", "Chino Pants", "Polo Shirt"],
      Women: ["Cocktail Dress", "Blazer", "High-waist Jeans", "Blouse", "Maxi Skirt"],
      Kids: ["Dinosaur T-shirt", "Princess Dress", "Superhero Pajamas", "School Uniform", "Sneakers"],
    },
    "Home & Garden": {
      Furniture: ["Sectional Sofa", "Dining Table", "Bookshelf", "Bed Frame", "Armchair"],
      Decor: ["Wall Art", "Area Rug", "Table Lamp", "Throw Pillows", "Curtains"],
      Kitchen: ["Stand Mixer", "Knife Set", "Dutch Oven", "Espresso Machine", "Air Fryer"],
    },
    "Sports & Outdoors": {
      Fitness: ["Yoga Mat", "Dumbbells", "Resistance Bands", "Treadmill", "Fitness Tracker"],
      Camping: ["Tent", "Sleeping Bag", "Camping Stove", "Hiking Backpack", "Headlamp"],
      "Team Sports": ["Soccer Ball", "Basketball", "Baseball Glove", "Tennis Racket", "Hockey Stick"],
    },
    "Beauty & Personal Care": {
      Skincare: ["Face Serum", "Moisturizer", "Cleansing Balm", "Sheet Masks", "Eye Cream"],
      Makeup: ["Foundation", "Eyeshadow Palette", "Lipstick Set", "Mascara", "Makeup Brushes"],
      "Hair Care": ["Shampoo", "Conditioner", "Hair Dryer", "Curling Iron", "Leave-in Treatment"],
    },
    "Books & Media": {
      Fiction: ["Mystery Novel", "Romance Paperback", "Sci-Fi Trilogy", "Fantasy Series", "Thriller Bestseller"],
      "Non-Fiction": ["Self-Help Book", "Cookbook", "Biography", "History Book", "Science Encyclopedia"],
      "Digital Content": [
        "E-book Reader",
        "Audiobook Subscription",
        "Digital Magazine",
        "Online Course",
        "Streaming Device",
      ],
    },
  }

  const productOptions =
    productNames[category as keyof typeof productNames][
      subcategory as keyof (typeof productNames)[keyof typeof productNames]
    ]
  const randomProduct = productOptions[Math.floor(Math.random() * productOptions.length)]

  return `${randomAdjective} ${randomProduct}`
}

// Helper function to generate random products
function generateRandomProducts(count: number): Product[] {
  const products: Product[] = []
  for (let i = 2; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const basePrice = Math.floor(Math.random() * 1000) + 1
    const baseSales = Math.floor(Math.random() * 1000)
    products.push({
      id: i,
      title: generateProductName(
        category.name,
        category.subcategories[Math.floor(Math.random() * category.subcategories.length)],
      ),
      description: `This is a description for Product ${i}.`,
      price: basePrice,
      category: category.name,
      subcategory: category.subcategories[Math.floor(Math.random() * category.subcategories.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      image: getRandomImageUrl(category.name),
      rating: Math.random() * 2 + 3,
      sales: baseSales,
      country: countries[Math.floor(Math.random() * countries.length)],
      popularity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High",
      priceHistory: generateRandomData(30, basePrice, basePrice * 0.1).map((d) => ({ date: d.date, price: d.value })),
      salesHistory: generateRandomData(30, baseSales / 30, baseSales / 100).map((d) => ({
        date: d.date,
        sales: Math.round(d.value),
      })),
      revenueHistory: generateRandomData(12, (basePrice * baseSales) / 12, (basePrice * baseSales) / 50).map((d) => ({
        date: d.date,
        revenue: Math.round(d.value),
      })),
      ratingsDistribution: [
        { rating: 5, count: Math.floor(Math.random() * 500) },
        { rating: 4, count: Math.floor(Math.random() * 300) },
        { rating: 3, count: Math.floor(Math.random() * 100) },
        { rating: 2, count: Math.floor(Math.random() * 50) },
        { rating: 1, count: Math.floor(Math.random() * 50) },
      ],
      positiveReviews: Math.floor(Math.random() * 800),
      negativeReviews: Math.floor(Math.random() * 200),
      reviewTrends: generateRandomData(12, 4, 0.5).map((d) => ({ date: d.date, averageRating: d.value })),
    })
  }
  return products
}

// Update the initialProduct image
const initialProduct: Product = {
  id: 1,
  title: "Smartphone X",
  description: "The latest smartphone with advanced features and sleek design.",
  price: 799,
  category: "Electronics",
  subcategory: "Smartphones",
  platform: "Daraz",
  image: "https://picsum.photos/400/400",
  rating: 4.5,
  sales: 1000,
  country: "Pakistan",
  popularity: "High",
  priceHistory: generateRandomData(30, 799, 50).map((d) => ({ date: d.date, price: d.value })),
  salesHistory: generateRandomData(30, 33, 10).map((d) => ({ date: d.date, sales: Math.round(d.value) })),
  revenueHistory: generateRandomData(12, 26000, 5000).map((d) => ({ date: d.date, revenue: Math.round(d.value) })),
  ratingsDistribution: [
    { rating: 5, count: 500 },
    { rating: 4, count: 300 },
    { rating: 3, count: 100 },
    { rating: 2, count: 50 },
    { rating: 1, count: 50 },
  ],
  positiveReviews: 800,
  negativeReviews: 200,
  reviewTrends: generateRandomData(12, 4.5, 0.5).map((d) => ({ date: d.date, averageRating: d.value })),
}

// Generate 70 random products including the initial product
export const dummyProducts: Product[] = [initialProduct, ...generateRandomProducts(70)]

