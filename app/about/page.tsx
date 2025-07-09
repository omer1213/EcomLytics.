

"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Search, BarChart2, PieChart, Calculator, Cpu } from "lucide-react"
import type { ReactNode } from "react"

export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <main className="flex-grow">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-20 px-4 sm:px-6 lg:px-8"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            About Ecomlytics
                        </h1>
                        <p className="mt-5 text-xl text-gray-500">
                            Empowering e-commerce entrepreneurs with actionable insights and AI-driven tools to maximize profits and
                            optimize growth.
                        </p>
                    </div>
                </motion.section>

                {/* Mission Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="py-16 px-4 sm:px-6 lg:px-8 bg-yellow-50"
                >
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
                        <p className="text-xl text-gray-700 mb-8">
                            Ecomlytics is designed to help e-commerce enthusiasts discover trending products, gain valuable insights,
                            and optimize their product listings. Our platform provides powerful tools to search, analyze, and
                            visualize product data across various categories, calculate potential profits, and even generate
                            AI-powered product descriptions. With Ecomlytics, you can make informed decisions and stay ahead in the
                            competitive e-commerce landscape.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Search className="w-8 h-8 text-yellow-500" />}
                                title="Product Search"
                                description="Find top-ranked products across different categories with our advanced search functionality."
                            />
                            <FeatureCard
                                icon={<BarChart2 className="w-8 h-8 text-yellow-500" />}
                                title="Category Rankings"
                                description="Explore product rankings within specific categories to identify market trends and opportunities."
                            />
                            <FeatureCard
                                icon={<PieChart className="w-8 h-8 text-yellow-500" />}
                                title="Detailed Insights"
                                description="Access comprehensive product data and analytics for in-depth market understanding."
                            />
                            <FeatureCard
                                icon={<Calculator className="w-8 h-8 text-yellow-500" />}
                                title="Profit Calculator"
                                description="Estimate potential profits with our built-in calculator, factoring in costs and market prices."
                            />
                            <FeatureCard
                                icon={<Cpu className="w-8 h-8 text-yellow-500" />}
                                title="AI Description Writer"
                                description="Generate compelling product descriptions using our AI-powered writing tool, saving you time and effort."
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Call to Action Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="py-20 px-4 sm:px-6 lg:px-8"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to elevate your e-commerce game?</h2>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
                        >
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Ecomlytics. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

// FeatureCard Component with Animation
// function FeatureCard({ icon, title, description }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             viewport={{ once: true }}
//             className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
//         >
//             <div className="flex items-center justify-center mb-4">{icon}</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
//             <p className="text-gray-600">{description}</p>
//         </motion.div>
//     );
// }

interface FeatureCardProps {
    icon: ReactNode
    title: string
    description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            <div className="flex items-center justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    )
}
