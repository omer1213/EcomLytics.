
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";
// import Image from "next/image";

// function Header() {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     return (
//         <motion.header
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-yellow-100"
//         >
//             <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//                 <Link href="/" className="text-2xl font-bold text-yellow-600">
//                     <Image
//                         src="/logo.png" // Replace with your actual logo path
//                         alt="Logo"
//                         width={160} // Increase width
//                         height={40} // Increase height
//                         className="object-contain max-w-none" // Ensures better visibility
//                         priority
//                     />

//                 </Link>
//                 <nav className="hidden md:flex space-x-8">
//                     <Link href="/products" className="text-yellow-800 hover:text-yellow-600 transition-colors">
//                         Dashboard
//                     </Link>
//                     <Link href="#ai-writer" className="text-yellow-800 hover:text-yellow-600 transition-colors">
//                         AI Writer
//                     </Link>
//                     <Link href="/profitcalculator" className="text-yellow-800 hover:text-yellow-600 transition-colors">
//                         Profit Calculator
//                     </Link>
//                     <Link href="/about" className="text-yellow-800 hover:text-yellow-600 transition-colors">
//                         About
//                     </Link>
//                 </nav>
//                 <div className="flex items-center space-x-4">
//                     <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors hidden md:inline-flex">
//                         Login
//                     </Button>
//                     <Button
//                         className="md:hidden"
//                         variant="ghost"
//                         size="icon"
//                         aria-label="Toggle Mobile Menu"
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                     >
//                         <Menu className="h-6 w-6" />
//                     </Button>
//                 </div>
//             </div>
//             {/* Mobile menu */}
//             {mobileMenuOpen && (
//                 <div className="md:hidden bg-white border-t border-yellow-100">
//                     <nav className="flex flex-col p-4">
//                         <Link href="#products" className="py-2 text-yellow-800 hover:text-yellow-600 transition-colors">
//                             Dashboard
//                         </Link>
//                         <Link href="#ai-writer" className="py-2 text-yellow-800 hover:text-yellow-600 transition-colors">
//                             AI Writer
//                         </Link>
//                         <Link href="#profit-calculator" className="py-2 text-yellow-800 hover:text-yellow-600 transition-colors">
//                             Profit Calculator
//                         </Link>
//                         <Link href="/products">
//                             <Button className="mt-4 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">
//                                 Login
//                             </Button>
//                         </Link>
//                     </nav>
//                 </div>
//             )}
//         </motion.header>
//     );
// }

// export default Header;


"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Calculator, PenTool, Info } from "lucide-react"
import Image from "next/image"
import { useAuth, useUser, SignInButton, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const pathname = usePathname()

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element
            const mobileMenu = document.getElementById("mobile-menu")
            const menuButton = document.querySelector("[data-mobile-menu-button]")

            if (mobileMenuOpen && mobileMenu && !mobileMenu.contains(target) && menuButton && !menuButton.contains(target)) {
                setMobileMenuOpen(false)
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("touchstart", handleClickOutside)
            // Prevent body scroll when menu is open
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
            document.body.style.overflow = "unset"
        }
    }, [mobileMenuOpen])

    // Close menu on escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscapeKey)
        return () => document.removeEventListener("keydown", handleEscapeKey)
    }, [mobileMenuOpen])

    const navigationItems = [
        { href: "/products", label: "Dashboard", icon: Home },
        { href: "/aiwriter", label: "AI Writer", icon: PenTool },
        { href: "/profitcalculator", label: "Profit Calculator", icon: Calculator },
        { href: "/about", label: "About", icon: Info },
    ]

    const isActiveLink = (href: string) => {
        return pathname === href
    }

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-yellow-100 shadow-sm"
            >
                <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-yellow-600 flex-shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={140}
                            height={35}
                            className="object-contain max-w-none sm:w-[160px] sm:h-[40px]"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 lg:space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${isActiveLink(item.href)
                                    ? "text-yellow-600 bg-yellow-50 font-medium"
                                    : "text-yellow-800 hover:text-yellow-600 hover:bg-yellow-50"
                                    }`}
                            >
                                {item.label}
                                {isActiveLink(item.href) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-yellow-100 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {/* Desktop Authentication */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isSignedIn ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-yellow-800 font-medium text-sm lg:text-base">
                                        Welcome, {user?.firstName || user?.fullName || "User"}!
                                    </span>
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8 lg:w-9 lg:h-9",
                                                userButtonPopoverCard: "bg-white border border-yellow-200 shadow-lg",
                                                userButtonPopoverActionButton: "text-yellow-800 hover:bg-yellow-50",
                                            },
                                        }}
                                    />
                                </div>
                            ) : (
                                <SignInButton>
                                    <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg">
                                        Sign In
                                    </Button>
                                </SignInButton>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            data-mobile-menu-button
                            className="md:hidden relative z-50"
                            variant="ghost"
                            size="icon"
                            aria-label="Toggle Mobile Menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6 text-yellow-800" />
                                ) : (
                                    <Menu className="h-6 w-6 text-yellow-800" />
                                )}
                            </motion.div>
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed top-16 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-yellow-100 z-50 md:hidden overflow-hidden"
                        >
                            <div className="p-6">
                                {/* Navigation Links */}
                                <nav className="space-y-2">
                                    {navigationItems.map((item, index) => {
                                        const Icon = item.icon
                                        return (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActiveLink(item.href)
                                                        ? "bg-yellow-100 text-yellow-700 font-medium"
                                                        : "text-yellow-800 hover:bg-yellow-50"
                                                        }`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <Icon size={20} className="flex-shrink-0" />
                                                    <span className="text-base">{item.label}</span>
                                                    {isActiveLink(item.href) && <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full" />}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </nav>

                                {/* Mobile Authentication */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-6 pt-6 border-t border-yellow-100"
                                >
                                    {isSignedIn ? (
                                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                                                    <span className="text-yellow-700 font-semibold text-sm">
                                                        {(user?.firstName?.[0] || user?.fullName?.[0] || "U").toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-yellow-800 font-medium text-sm">
                                                        {user?.firstName || user?.fullName || "User"}
                                                    </p>
                                                    <p className="text-yellow-600 text-xs">Signed in</p>
                                                </div>
                                            </div>
                                            <UserButton
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "w-8 h-8",
                                                        userButtonPopoverCard: "bg-white border border-yellow-200",
                                                    },
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <SignInButton>
                                            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl py-3 text-base font-medium rounded-xl">
                                                Sign In to Continue
                                            </Button>
                                        </SignInButton>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
