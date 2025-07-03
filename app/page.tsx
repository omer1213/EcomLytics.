
// "use client"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   BarChart3,
//   Search,
//   TrendingUp,
//   Bot,
//   Calculator,
//   ChevronRight,
//   Check,
//   ArrowRight,
//   Menu,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
// } from "lucide-react"
// import { useState } from "react"
// import { motion } from "framer-motion"

// export default function Home() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.8, ease: "easeOut" },
//   }

//   const staggerChildren = {
//     animate: {
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   }

//   const scaleIn = {
//     initial: { opacity: 0, scale: 0.9 },
//     animate: { opacity: 1, scale: 1 },
//     transition: { duration: 0.8, ease: "easeOut" },
//   }

//   const slideIn = {
//     initial: { opacity: 0, x: -20 },
//     animate: { opacity: 1, x: 0 },
//     transition: { duration: 0.8, ease: "easeOut" },
//   }

//   const rotateIn = {
//     initial: { opacity: 0, rotate: -5 },
//     animate: { opacity: 1, rotate: 0 },
//     transition: { duration: 0.8, ease: "easeOut" },
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-50 to-white">

//       <main className="flex-grow pt-20">
//         {/* Hero Section */}
//         <motion.section
//           initial="initial"
//           animate="animate"
//           variants={staggerChildren}
//           className="py-12 md:py-20 lg:py-32 overflow-hidden"
//         >
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col lg:flex-row items-center">
//               <motion.div variants={fadeInUp} className="lg:w-1/2 mb-10 lg:mb-0">
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow-900 leading-tight">
//                   Revolutionize Your <span className="text-yellow-500">E-commerce</span> Strategy
//                 </h1>
//                 <p className="text-lg sm:text-xl mb-8 text-yellow-800">
//                   Discover trending products, optimize descriptions with AI, and maximize profits all in one platform
//                 </p>
//                 <Link href="/products">
//                   <Button
//                     size="lg"
//                     className="w-full sm:w-auto bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-lg px-8 py-4 rounded-full"
//                   >
//                     Get Started for Free <ArrowRight className="ml-2" />
//                   </Button>
//                 </Link>
//               </motion.div>
//               <motion.div variants={scaleIn} className="lg:w-1/2 relative mt-10 lg:mt-0">
//                 <Image
//                   src="/main1.jpg"
//                   alt="Ecomlytics Dashboard"
//                   width={600}
//                   height={400}
//                   className="rounded-lg shadow-2xl"
//                 />
//                 <motion.div
//                   variants={rotateIn}
//                   className="absolute -bottom-4 -left-4 sm:-bottom-10 sm:-left-10 bg-white p-4 rounded-lg shadow-lg"
//                 >
//                   <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2" />
//                   <p className="text-yellow-900 font-semibold text-sm sm:text-base">200% Profit Increase</p>
//                 </motion.div>
//                 <motion.div
//                   variants={rotateIn}
//                   className="absolute -top-4 -right-4 sm:-top-10 sm:-right-10 bg-white p-4 rounded-lg shadow-lg"
//                 >
//                   <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2" />
//                   <p className="text-yellow-900 font-semibold text-sm sm:text-base">Trending Products</p>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Features Section */}
//         <motion.section
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerChildren}
//           id="features"
//           className="py-16 md:py-20 bg-white"
//         >
//           <div className="container mx-auto px-4">
//             <motion.h2
//               variants={fadeInUp}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-yellow-900"
//             >
//               Powerful Features to Boost Your Busines
//             </motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
//               <FeatureCard
//                 icon={<TrendingUp className="w-12 h-12 text-yellow-500" />}
//                 title="Trend Analysis"
//                 description="Stay ahead with real-time market trend insights"
//               />
//               <FeatureCard
//                 icon={<BarChart3 className="w-12 h-12 text-yellow-500" />}
//                 title="Analytics Dashboard"
//                 description="Visualize your data for informed decision-making"
//               />
//               <FeatureCard
//                 icon={<Bot className="w-12 h-12 text-yellow-500" />}
//                 title="AI-Powered Descriptions"
//                 description="Generate compelling product copy instantly"
//               />
//               <FeatureCard
//                 icon={<Calculator className="w-12 h-12 text-yellow-500" />}
//                 title="Profit Calculator"
//                 description="Optimize pricing for maximum profitability"
//               />
//               <FeatureCard
//                 icon={<Search className="w-12 h-12 text-yellow-500" />}
//                 title="Advanced Product Search"
//                 description="Find winning products with ease"
//               />
//             </div>
//           </div>
//         </motion.section>

//         {/* AI Description Writer Section */}
//         <motion.section
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerChildren}
//           id="ai-writer"
//           className="py-16 md:py-20 bg-gradient-to-r from-yellow-50 to-yellow-100"
//         >
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col lg:flex-row items-center justify-between">
//               <motion.div variants={slideIn} className="lg:w-1/2 mb-10 lg:mb-0">
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-yellow-900">
//                   AI-Powered Description Writer
//                 </h2>
//                 <p className="text-lg sm:text-xl mb-8 text-yellow-800">
//                   Create engaging and SEO-optimized product descriptions in seconds. Our AI understands your product and
//                   target audience to generate compelling copy that sells.
//                 </p>
//                 <ul className="space-y-4 mb-8">
//                   {[
//                     "Unique and original content",
//                     "SEO-friendly descriptions",
//                     "Tailored to your brand voice",
//                     "Multiple variations to choose from",
//                   ].map((item, index) => (
//                     <motion.li key={index} variants={fadeInUp} className="flex items-center">
//                       <Check className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
//                       <span className="text-base sm:text-lg">{item}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//                 <Button
//                   size="lg"
//                   className="w-full sm:w-auto bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-lg px-8 py-4 rounded-full"
//                 >
//                   Try AI Writer Now <ArrowRight className="ml-2" />
//                 </Button>
//               </motion.div>
//               <motion.div variants={scaleIn} className="lg:w-1/2 relative mt-10 lg:mt-0">
//                 <Image
//                   src="/ai.png"
//                   alt="AI Description Writer Demo"
//                   width={600}
//                   height={400}
//                   className="rounded-lg shadow-2xl"
//                 />
//                 <motion.div
//                   variants={rotateIn}
//                   className="absolute -bottom-4 -right-4 sm:-bottom-10 sm:-right-10 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs"
//                 >
//                   <p className="text-yellow-900 font-semibold mb-2 text-sm sm:text-base">AI-Generated Description</p>
//                   <p className="text-xs sm:text-sm text-yellow-700">
//                     "Elevate your style with our premium leather jacket, crafted for the modern trendsetter..."
//                   </p>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Profit Calculator Section */}
//         <motion.section
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerChildren}
//           id="profit-calculator"
//           className="py-16 md:py-20 bg-white"
//         >
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
//               <motion.div variants={slideIn} className="lg:w-1/2 mb-10 lg:mb-0 lg:pl-12">
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-yellow-900">
//                   Smart Profit Calculator
//                 </h2>
//                 <p className="text-lg sm:text-xl mb-8 text-yellow-800">
//                   Make data-driven decisions with our advanced profit calculator. Input your costs and let Ecomlytics
//                   provide detailed profit projections and breakeven analysis.
//                 </p>
//                 <ul className="space-y-4 mb-8">
//                   {[
//                     "Accurate profit estimations",
//                     "Break-even point analysis",
//                     "Revenue forecasting",
//                     "Interactive graphs and charts",
//                   ].map((item, index) => (
//                     <motion.li key={index} variants={fadeInUp} className="flex items-center">
//                       <Check className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
//                       <span className="text-base sm:text-lg">{item}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//                 <Link href="/profitcalculator">
//                   <Button
//                     size="lg"
//                     className="w-full sm:w-auto bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-lg px-8 py-4 rounded-full"
//                   >
//                     Calculate Your Profits <ArrowRight className="ml-2" />
//                   </Button>
//                 </Link>
//               </motion.div>
//               <motion.div variants={scaleIn} className="lg:w-1/2 relative mt-10 lg:mt-0">
//                 <Image
//                   src="/main3.jpg"
//                   alt="Profit Calculator Demo"
//                   width={600}
//                   height={400}
//                   className="rounded-lg shadow-2xl"
//                 />
//                 <motion.div
//                   variants={rotateIn}
//                   className="absolute -top-4 -left-4 sm:-top-10 sm:-left-10 bg-white p-4 sm:p-6 rounded-lg shadow-lg"
//                 >
//                   <p className="text-yellow-900 font-semibold mb-2 text-sm sm:text-base">Projected Profit</p>
//                   <p className="text-2xl sm:text-3xl font-bold text-yellow-500">$12,500</p>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Testimonials Section */}
//         <motion.section
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerChildren}
//           className="py-16 md:py-20 bg-gradient-to-b from-yellow-50 to-white"
//         >
//           <div className="container mx-auto px-4 text-center">
//             <motion.h2
//               variants={fadeInUp}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-yellow-900"
//             >
//               What Our Customers Say
//             </motion.h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
//               {[
//                 {
//                   name: "John Doe",
//                   role: "E-commerce Entrepreneur",
//                   quote: "Ecomlytics has transformed my business. The AI writer saves me hours every week!",
//                   image: "/testimonial-1.jpg",
//                 },
//                 {
//                   name: "Jane Smith",
//                   role: "Marketing Manager",
//                   quote: "The trend analysis feature helped us identify our next bestseller. Incredible tool!",
//                   image: "/testimonial-2.jpg",
//                 },
//                 {
//                   name: "Mike Johnson",
//                   role: "Online Store Owner",
//                   quote: "The profit calculator is a game-changer. I can now make informed decisions quickly.",
//                   image: "/testimonial-3.jpg",
//                 },
//               ].map((testimonial, index) => (
//                 <motion.div
//                   key={index}
//                   variants={scaleIn}
//                   className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <div className="flex items-center justify-center mb-4">
//                     <Image
//                       src={testimonial.image || "/placeholder.svg"}
//                       alt={testimonial.name}
//                       width={80}
//                       height={80}
//                       className="rounded-full"
//                     />
//                   </div>
//                   <p className="italic mb-6 text-base sm:text-lg">"{testimonial.quote}"</p>
//                   <p className="font-semibold text-yellow-900">{testimonial.name}</p>
//                   <p className="text-yellow-700 text-sm">{testimonial.role}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>

//         {/* CTA Section */}
//         <motion.section
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerChildren}
//           className="py-16 md:py-20 bg-yellow-500"
//         >
//           <div className="container mx-auto px-4 text-center">
//             <motion.h2
//               variants={fadeInUp}
//               className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
//             >
//               Ready to Supercharge Your E-commerce Business?
//             </motion.h2>
//             <motion.p variants={fadeInUp} className="text-lg sm:text-xl mb-8 md:mb-10 text-yellow-100">
//               Join thousands of successful sellers using Ecomlytics to drive their business forward.
//             </motion.p>
//             <motion.div variants={scaleIn}>
//               <Link href="/products">
//                 <Button
//                   size="lg"
//                   className="w-full sm:w-auto bg-white text-yellow-500 hover:bg-yellow-100 transition-colors text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-full"
//                 >
//                   Start Your Journey Now <ChevronRight className="ml-2" />
//                 </Button>
//               </Link>
//             </motion.div>
//           </div>
//         </motion.section>
//       </main>

//       {/* Footer */}

//     </div>
//   )
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <motion.div
//       variants={{
//         initial: { opacity: 0, y: 20 },
//         animate: { opacity: 1, y: 0 },
//       }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
//     >
//       <div className="mb-6">{icon}</div>
//       <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-900">{title}</h3>
//       <p className="text-yellow-800 text-sm sm:text-base">{description}</p>
//     </motion.div>
//   )
// }


"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Search,
  TrendingUp,
  Bot,
  Calculator,
  ChevronRight,
  Check,
  ArrowRight,
} from "lucide-react"
// import { useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const slideIn = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const rotateIn = {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <main className="flex-grow ">
        {/* Hero Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="py-12 md:py-20 lg:py-32 overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div variants={fadeInUp} className="lg:w-1/2 mb-10 lg:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow-900 leading-tight">
                  Revolutionize Your <span className="text-yellow-500">E-commerce</span> Strategy
                </h1>
                <p className="text-lg sm:text-xl mb-8 text-yellow-800">
                  Discover trending products, optimize descriptions with AI, and maximize profits all in one platform
                </p>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-lg px-8 py-4 rounded-full"
                  >
                    Get Started for Free <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={scaleIn} className="lg:w-1/2 relative mt-10 lg:mt-0">
                <Image
                  src="/main1.jpg"
                  alt="Ecomlytics Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <motion.div
                  variants={rotateIn}
                  className="absolute -bottom-4 -left-4 sm:-bottom-10 sm:-left-10 bg-white p-4 rounded-lg shadow-lg"
                >
                  <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2" />
                  <p className="text-yellow-900 font-semibold text-sm sm:text-base">200% Profit Increase</p>
                </motion.div>
                <motion.div
                  variants={rotateIn}
                  className="absolute -top-4 -right-4 sm:-top-10 sm:-right-10 bg-white p-4 rounded-lg shadow-lg"
                >
                  <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2" />
                  <p className="text-yellow-900 font-semibold text-sm sm:text-base">Trending Products</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          id="features"
          className="py-16 md:py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-yellow-900"
            >
              Powerful Features to Boost Your Business
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <FeatureCard
                icon={<TrendingUp className="w-12 h-12 text-yellow-500" />}
                title="Trend Analysis"
                description="Stay ahead with real-time market trend insights"
              />
              <FeatureCard
                icon={<BarChart3 className="w-12 h-12 text-yellow-500" />}
                title="Analytics Dashboard"
                description="Visualize your data for informed decision-making"
              />
              <FeatureCard
                icon={<Bot className="w-12 h-12 text-yellow-500" />}
                title="AI-Powered Descriptions"
                description="Generate compelling product copy instantly"
              />
              <FeatureCard
                icon={<Calculator className="w-12 h-12 text-yellow-500" />}
                title="Profit Calculator"
                description="Optimize pricing for maximum profitability"
              />
              <FeatureCard
                icon={<Search className="w-12 h-12 text-yellow-500" />}
                title="Advanced Product Search"
                description="Find winning products with ease"
              />
            </div>
          </div>
        </motion.section>

        {/* AI Description Writer Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          id="ai-writer"
          className="py-16 md:py-20 bg-gradient-to-r from-yellow-50 to-yellow-100"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <motion.div variants={slideIn} className="lg:w-1/2 mb-10 lg:mb-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-yellow-900">
                  AI-Powered Description Writer
                </h2>
                <p className="text-lg sm:text-xl mb-8 text-yellow-800">
                  Create engaging and SEO-optimized product descriptions in seconds. Our AI understands your product and
                  target audience to generate compelling copy that sells.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Unique and original content",
                    "SEO-friendly descriptions",
                    "Tailored to your brand voice",
                    "Multiple variations to choose from",
                  ].map((item, index) => (
                    <motion.li key={index} variants={fadeInUp} className="flex items-center">
                      <Check className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-base sm:text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/aiwriter">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-lg px-8 py-4 rounded-full"
                >
                  Try AI Writer Now <ArrowRight className="ml-2" />
                </Button>
                </Link>
              </motion.div>
              <motion.div variants={scaleIn} className="lg:w-1/2 relative mt-10 lg:mt-0">
                <Image
                  src="/ai.png"
                  alt="AI Description Writer Demo"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <motion.div
                  variants={rotateIn}
                  className="absolute -bottom-4 -right-4 sm:-bottom-10 sm:-right-10 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs"
                >
                  <p className="text-yellow-900 font-semibold mb-2 text-sm sm:text-base">AI-Generated Description</p>
                  <p className="text-xs sm:text-sm text-yellow-700">
                    &quot;Elevate your style with our premium leather jacket, crafted for the modern trendsetter...&quot;
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Profit Calculator Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          id="profit-calculator"
          className="py-16 md:py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
              <motion.div variants={slideIn} className="lg:w-1/2 mb-10 lg:mb-0 lg:pl-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-yellow-900">
                  Smart Profit Calculator
                </h2>
                <p className="text-lg sm:text-xl mb-8 text-yellow-800">
                  Make data-driven decisions with our advanced profit calculator. Input your costs and let Ecomlytics
                  provide detailed profit projections and breakeven analysis.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Accurate profit estimations",
                    "Break-even point analysis",
                    "Revenue forecasting",
                    "Interactive graphs and charts",
                  ].map((item, index) => (
                    <motion.li key={index} variants={fadeInUp} className="flex items-center">
                      <Check className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-base sm:text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/profitcalculator">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-yellow-500 text-white hover:bg-yellow-600 transition-colors text-lg px-8 py-4 rounded-full"
                  >
                    Calculate Your Profits <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={scaleIn} className="lg:w-1/2 relative mt-10 lg:mt-0">
                <Image
                  src="/main3.jpg"
                  alt="Profit Calculator Demo"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <motion.div
                  variants={rotateIn}
                  className="absolute -top-4 -left-4 sm:-top-10 sm:-left-10 bg-white p-4 sm:p-6 rounded-lg shadow-lg"
                >
                  <p className="text-yellow-900 font-semibold mb-2 text-sm sm:text-base">Projected Profit</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-500">$12,500</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-16 md:py-20 bg-gradient-to-b from-yellow-50 to-white"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-yellow-900"
            >
              What Our Customers Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  name: "John Doe",
                  role: "E-commerce Entrepreneur",
                  quote: "Ecomlytics has transformed my business. The AI writer saves me hours every week!",
                  image: "/testimonial-1.jpg",
                },
                {
                  name: "Jane Smith",
                  role: "Marketing Manager",
                  quote: "The trend analysis feature helped us identify our next bestseller. Incredible tool!",
                  image: "/testimonial-2.jpg",
                },
                {
                  name: "Mike Johnson",
                  role: "Online Store Owner",
                  quote: "The profit calculator is a game-changer. I can now make informed decisions quickly.",
                  image: "/testimonial-3.jpg",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <p className="italic mb-6 text-base sm:text-lg">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold text-yellow-900">{testimonial.name}</p>
                  <p className="text-yellow-700 text-sm">{testimonial.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-16 md:py-20 bg-yellow-500"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
            >
              Ready to Supercharge Your E-commerce Business?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl mb-8 md:mb-10 text-yellow-100">
              Join thousands of successful sellers using Ecomlytics to drive their business forward.
            </motion.p>
            <motion.div variants={scaleIn}>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-yellow-500 hover:bg-yellow-100 transition-colors text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-full"
                >
                  Start Your Journey Now <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-900">{title}</h3>
      <p className="text-yellow-800 text-sm sm:text-base">{description}</p>
    </motion.div>
  )
}