"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, MessageSquare } from "lucide-react"

export function WelcomeSection() {
  const features = [
    {
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      title: "Product Descriptions",
      description: "Create engaging product descriptions that convert browsers into buyers",
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      title: "Marketing Copy",
      description: "Generate persuasive marketing content for emails, ads, and social media",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
      title: "SEO Content",
      description: "Craft SEO-optimized content that ranks higher in search results",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto mb-6 sm:mb-10 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
          <span className="bg-amber-500 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full">AI-POWERED</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-900 mb-2 sm:mb-3 tracking-tight leading-tight">
          Create <span className="text-amber-500">Compelling Content</span> in Seconds
        </h1>
        <p className="text-amber-700 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
          Boost your e-commerce business with AI-generated product descriptions, marketing copy, and SEO content.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 sm:p-5 border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="mr-2 sm:mr-3 bg-amber-50 p-2 rounded-full flex-shrink-0">{feature.icon}</div>
              <h3 className="font-semibold text-amber-900 text-sm sm:text-base">{feature.title}</h3>
            </div>
            <p className="text-amber-700 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
