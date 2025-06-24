"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, Star, TrendingUp, Users, ShoppingCart, Award, BarChart3, PieChart } from "lucide-react"
import type { Product } from "@/lib/supabase"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "analytics">("overview")
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  // Calculate metrics from available data
  const totalReviews = product.Review || 0
  const totalStarReviews =
    (product["5_star"] || 0) +
    (product["4_star"] || 0) +
    (product["3_star"] || 0) +
    (product["2_star"] || 0) +
    (product["1_star"] || 0)

  const itemsSold = product.ItemSold || 0
  const rating = product.Rating || 0
  const price = product.Price || 0
  const estimatedRevenue = price * itemsSold

  // Star distribution data for charts
  const starData = [
    {
      stars: 5,
      count: product["5_star"] || 0,
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600",
      borderColor: "border-emerald-500",
    },
    {
      stars: 4,
      count: product["4_star"] || 0,
      color: "bg-lime-500",
      hoverColor: "hover:bg-lime-600",
      borderColor: "border-lime-500",
    },
    {
      stars: 3,
      count: product["3_star"] || 0,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      borderColor: "border-yellow-500",
    },
    {
      stars: 2,
      count: product["2_star"] || 0,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      borderColor: "border-orange-500",
    },
    {
      stars: 1,
      count: product["1_star"] || 0,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      borderColor: "border-red-500",
    },
  ]

  // Calculate percentages for star distribution
  const starPercentages = starData.map((item) => ({
    ...item,
    percentage: totalStarReviews > 0 ? (item.count / totalStarReviews) * 100 : 0,
  }))

  // Calculate sentiment data
  const positiveReviews = (product["5_star"] || 0) + (product["4_star"] || 0)
  const negativeReviews = (product["1_star"] || 0) + (product["2_star"] || 0)
  const neutralReviews = product["3_star"] || 0

  const sentimentData = [
    {
      label: "Positive",
      count: positiveReviews,
      color: "#10b981",
      hoverColor: "#059669",
      percentage: totalStarReviews > 0 ? (positiveReviews / totalStarReviews) * 100 : 0,
    },
    {
      label: "Negative",
      count: negativeReviews,
      color: "#ef4444",
      hoverColor: "#dc2626",
      percentage: totalStarReviews > 0 ? (negativeReviews / totalStarReviews) * 100 : 0,
    },
    {
      label: "Neutral",
      count: neutralReviews,
      color: "#f59e0b",
      hoverColor: "#d97706",
      percentage: totalStarReviews > 0 ? (neutralReviews / totalStarReviews) * 100 : 0,
    },
  ]

  // Performance metrics
  const performanceScore = Math.min(
    100,
    Math.round((rating / 5) * 40 + (itemsSold / 10000) * 30 + (totalReviews / 1000) * 30),
  )

  // Modern Star Rating Component
  const StarRating = ({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : star - 0.5 <= rating
                  ? "text-yellow-400 fill-current opacity-50"
                  : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  // Modern Progress Bar Component
  const ProgressBar = ({
    percentage,
    color,
    height = "h-2",
  }: { percentage: number; color: string; height?: string }) => {
    return (
      <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  // 🎨 ENHANCED: Modern Interactive Bar Chart Component
  const RatingsBarChart = () => {
    const maxCount = Math.max(...starData.map((item) => item.count))

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          Ratings Distribution
        </h3>

        {/* Chart Container */}
        <div className="relative">
          <div className="flex items-end justify-between h-48 gap-3 mb-4">
            {starData.reverse().map(({ stars, count, color, hoverColor, borderColor }) => {
              const height = maxCount > 0 ? (count / maxCount) * 100 : 0
              const isHovered = hoveredBar === stars

              return (
                <div key={stars} className="flex flex-col items-center flex-1 group">
                  {/* Hover Tooltip */}
                  <div
                    className={`absolute -top-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isHovered
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold">{count.toLocaleString()}</div>
                      <div className="text-xs opacity-75">
                        {stars} star{stars !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>

                  {/* Bar Container */}
                  <div className="w-full flex items-end justify-center h-40 mb-3 relative">
                    <div
                      className={`w-full ${color} ${hoverColor} rounded-t-xl transition-all duration-500 ease-out cursor-pointer relative overflow-hidden group-hover:shadow-lg ${
                        isHovered ? "transform scale-105" : ""
                      }`}
                      style={{
                        height: `${height}%`,
                        minHeight: count > 0 ? "12px" : "0px",
                      }}
                      onMouseEnter={() => setHoveredBar(stars)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Shine effect on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700 ${
                          isHovered ? "translate-x-full" : "-translate-x-full"
                        }`}
                      ></div>

                      {/* Count display */}
                      {count > 0 && (
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                            isHovered ? "transform scale-110" : ""
                          }`}
                        >
                          <span className="text-white font-bold text-sm drop-shadow-lg">
                            {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Star Label */}
                  <div
                    className={`flex items-center gap-1 transition-all duration-300 ${
                      isHovered ? "transform scale-110 text-orange-600" : "text-gray-600"
                    }`}
                  >
                    <span className="text-sm font-bold">{stars}</span>
                    <Star
                      className={`w-4 h-4 fill-current transition-colors duration-300 ${
                        isHovered ? "text-yellow-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Chart Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[25, 50, 75].map((line) => (
              <div
                key={line}
                className="absolute w-full border-t border-gray-200 border-dashed opacity-30"
                style={{ bottom: `${line}%` }}
              />
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Ratings:</span>
            <span className="font-bold text-gray-800">{totalStarReviews.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Average Rating:</span>
            <span className="font-bold text-gray-800">{rating}/5</span>
          </div>
        </div>
      </div>
    )
  }

  // 🎨 ENHANCED: Modern Interactive Pie Chart Component
  const SentimentPieChart = () => {
    const total = sentimentData.reduce((sum, item) => sum + item.count, 0)
    let cumulativePercentage = 0

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          Review Sentiment
        </h3>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Interactive Pie Chart */}
          <div className="relative flex-shrink-0">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="15.915" fill="transparent" stroke="#f3f4f6" strokeWidth="8" />

                {/* Data segments */}
                {sentimentData.map((item, index) => {
                  if (item.count === 0) return null

                  const strokeDasharray = `${item.percentage} ${100 - item.percentage}`
                  const strokeDashoffset = -cumulativePercentage
                  const isHovered = hoveredSegment === item.label

                  const segment = (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="15.915"
                      fill="transparent"
                      stroke={isHovered ? item.hoverColor : item.color}
                      strokeWidth={isHovered ? "10" : "8"}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300 ease-out cursor-pointer hover:drop-shadow-lg"
                      onMouseEnter={() => setHoveredSegment(item.label)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                  )

                  cumulativePercentage += item.percentage
                  return segment
                })}
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold text-gray-900 transition-all duration-300 ${
                      hoveredSegment ? "transform scale-110" : ""
                    }`}
                  >
                    {hoveredSegment
                      ? sentimentData.find((item) => item.label === hoveredSegment)?.count.toLocaleString()
                      : total.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{hoveredSegment || "Total"}</div>
                </div>
              </div>

              {/* Hover tooltip */}
              {hoveredSegment && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  <div className="text-center">
                    <div className="font-bold">
                      {sentimentData.find((item) => item.label === hoveredSegment)?.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs opacity-75">{hoveredSegment}</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Legend */}
          <div className="flex-1 space-y-3">
            {sentimentData.map((item, index) => {
              if (item.count === 0) return null

              const isHovered = hoveredSegment === item.label

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    isHovered ? "bg-gray-100 transform scale-105 shadow-md" : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHoveredSegment(item.label)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        isHovered ? "transform scale-125 shadow-lg" : ""
                      }`}
                      style={{ backgroundColor: isHovered ? item.hoverColor : item.color }}
                    />
                    <span
                      className={`font-medium transition-all duration-300 ${
                        isHovered ? "text-gray-900 font-bold" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold transition-all duration-300 ${
                        isHovered ? "text-gray-900 text-lg" : "text-gray-800"
                      }`}
                    >
                      {item.count.toLocaleString()}
                    </div>
                    <div
                      className={`text-sm transition-all duration-300 ${
                        isHovered ? "text-gray-600 font-medium" : "text-gray-500"
                      }`}
                    >
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-green-600 font-bold text-lg">{((positiveReviews / total) * 100).toFixed(1)}%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-gray-800 font-bold text-lg">{total.toLocaleString()}</div>
              <div className="text-gray-600">Total Reviews</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Metric Card Component - Mobile Optimized
  const MetricCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "text-blue-600",
    bgColor = "bg-blue-50",
  }: {
    icon: any
    title: string
    value: string | number
    subtitle?: string
    color?: string
    bgColor?: string
  }) => (
    <div className={`${bgColor} rounded-lg p-3 border border-opacity-20`}>
      <div className="flex items-center space-x-2">
        <div className={`p-1.5 ${bgColor.replace("50", "100")} rounded-md`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-600">{title}</p>
          <p className={`text-lg font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header - Mobile Optimized */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center rounded-t-3xl sm:rounded-t-2xl z-10">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Product Details</h2>
              <p className="text-xs text-gray-500 hidden sm:block">Complete analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tab Navigation - Mobile Optimized */}
        <div className="px-4 pt-2">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: "overview", label: "Overview", icon: ShoppingCart },
              { id: "reviews", label: "Reviews", icon: Star },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content - Mobile Optimized */}
        <div className="p-4 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* Product Header - Mobile First */}
              <div className="grid grid-cols-1 gap-4">
                {/* Product Image - Mobile Optimized */}
                <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-square max-w-sm mx-auto">
                  <Image
                    src={product.Image || "/placeholder.svg?height=300&width=300"}
                    alt={product.ProductName || "Product"}
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-700">{product.Category}</span>
                  </div>
                </div>

                {/* Product Info - Mobile Optimized */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {product.ProductName}
                    </h1>
                    <div className="flex items-center space-x-3 mb-3">
                      <StarRating rating={rating} />
                      <span className="text-lg font-semibold text-gray-900">{rating}</span>
                      <span className="text-sm text-gray-500">({totalReviews.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Price - Mobile Optimized */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-1.5 bg-orange-100 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Current Price</p>
                        <p className="text-2xl font-bold text-orange-600">Rs. {price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 space-x-4">
                      <span className="flex items-center space-x-1">
                        <ShoppingCart className="w-3 h-3" />
                        <span>{itemsSold.toLocaleString()} sold</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{totalReviews.toLocaleString()} reviews</span>
                      </span>
                    </div>
                  </div>

                  {/* Quick Metrics - Mobile Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <MetricCard
                      icon={Award}
                      title="Performance"
                      value={`${performanceScore}%`}
                      subtitle="Overall score"
                      color="text-purple-600"
                      bgColor="bg-purple-50"
                    />
                    <MetricCard
                      icon={TrendingUp}
                      title="Revenue Est."
                      value={`Rs. ${(estimatedRevenue / 1000000).toFixed(1)}M`}
                      subtitle="Total estimated"
                      color="text-green-600"
                      bgColor="bg-green-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Reviews Overview - Mobile Optimized */}
              <div className="grid grid-cols-1 gap-4">
                {/* Rating Summary - Mobile */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{rating}</div>
                    <StarRating rating={rating} size="w-5 h-5" />
                    <p className="text-sm text-gray-600 mt-2">Based on {totalStarReviews.toLocaleString()} ratings</p>
                  </div>
                </div>

                {/* 🎨 ENHANCED: Interactive Visualizations Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <RatingsBarChart />
                  <SentimentPieChart />
                </div>

                {/* Star Distribution - Mobile */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-gray-600" />
                    <span>Rating Breakdown</span>
                  </h3>
                  {starPercentages.map(({ stars, count, percentage, color }) => (
                    <div key={stars} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-sm font-medium">{stars}</span>
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1">
                        <ProgressBar percentage={percentage} color={color} />
                      </div>
                      <div className="w-16 text-right">
                        <span className="text-sm font-medium text-gray-700">{count}</span>
                        <span className="text-xs text-gray-500 block">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Insights - Mobile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MetricCard
                  icon={Star}
                  title="Positive"
                  value={`${(sentimentData[0].percentage).toFixed(1)}%`}
                  subtitle="4-5 stars"
                  color="text-green-600"
                  bgColor="bg-green-50"
                />
                <MetricCard
                  icon={Users}
                  title="Reviews"
                  value={totalStarReviews.toLocaleString()}
                  subtitle="Total ratings"
                  color="text-blue-600"
                  bgColor="bg-blue-50"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Quality"
                  value={rating >= 4 ? "High" : rating >= 3 ? "Good" : "Fair"}
                  subtitle={`${rating}/5 stars`}
                  color="text-purple-600"
                  bgColor="bg-purple-50"
                />
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-4">
              {/* Performance Metrics - Mobile Grid */}
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  icon={ShoppingCart}
                  title="Sold"
                  value={itemsSold.toLocaleString()}
                  subtitle="Total units"
                  color="text-orange-600"
                  bgColor="bg-orange-50"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Revenue"
                  value={`Rs. ${(estimatedRevenue / 1000000).toFixed(1)}M`}
                  subtitle="Estimated"
                  color="text-green-600"
                  bgColor="bg-green-50"
                />
                <MetricCard
                  icon={Users}
                  title="Customers"
                  value={totalReviews.toLocaleString()}
                  subtitle="Reviewers"
                  color="text-blue-600"
                  bgColor="bg-blue-50"
                />
                <MetricCard
                  icon={Award}
                  title="Score"
                  value={`${performanceScore}/100`}
                  subtitle="Performance"
                  color="text-purple-600"
                  bgColor="bg-purple-50"
                />
              </div>

              {/* Performance Visualization - Mobile */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <span>Performance</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Rating</span>
                      <span className="text-sm text-gray-600">{Math.round((rating / 5) * 100)}%</span>
                    </div>
                    <ProgressBar percentage={(rating / 5) * 100} color="bg-yellow-500" height="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Sales</span>
                      <span className="text-sm text-gray-600">
                        {Math.min(100, Math.round((itemsSold / 10000) * 100))}%
                      </span>
                    </div>
                    <ProgressBar
                      percentage={Math.min(100, (itemsSold / 10000) * 100)}
                      color="bg-orange-500"
                      height="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Reviews</span>
                      <span className="text-sm text-gray-600">
                        {Math.min(100, Math.round((totalReviews / 1000) * 100))}%
                      </span>
                    </div>
                    <ProgressBar
                      percentage={Math.min(100, (totalReviews / 1000) * 100)}
                      color="bg-blue-500"
                      height="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
