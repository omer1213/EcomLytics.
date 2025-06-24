"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react'

function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="bg-gray-900 text-gray-300 py-12"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <div>
                        {/* <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-500">Ecomlytics</h3> */}
                        <Image
                            src="/logo.png" // Replace with your actual logo path
                            alt="Logo"
                            width={160} // Increase width
                            height={40} // Increase height
                            className="object-contain max-w-none" // Ensures better visibility
                            priority
                        />
                        <p className="text-sm sm:text-base">
                            Empowering e-commerce businesses with data-driven insights and AI-powered tools.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-yellow-500">Features</h3>
                        <ul className="space-y-2">

                            <li>
                                <Link href="#" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                                    AI Description Writer
                                </Link>
                            </li>
                            <li>
                                <Link href="/profitcalculator" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                                    Profit Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                                    Analytics Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-yellow-500">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="about" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contactus" className="text-sm sm:text-base hover:text-yellow-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-yellow-500">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                                <Facebook className="w-6 h-6" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                                <Twitter className="w-6 h-6" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                                <Instagram className="w-6 h-6" strokeWidth={1.5} />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                                <Linkedin className="w-6 h-6" strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Ecomlytics. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
