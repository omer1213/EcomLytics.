"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Heart, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import FilterPanel from "./components/FilterPanel"

import ProductGrid from "./components/ProductGrid"

import ProductModal from "./components/ProductModal"
import { type Product, dummyProducts } from "@/lib/dummyData"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts)
    const [favorites, setFavorites] = useState<Product[]>([])
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchSuggestions([])
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        // Load favorites from local storage when the component mounts
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        }
    }, [])

    useEffect(() => {
        // Save favorites to local storage whenever it changes
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (query.length > 0) {
            const suggestions = dummyProducts
                .filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
                .map((product) => product.title)
                .slice(0, 5)
            setSearchSuggestions(suggestions)
        } else {
            setSearchSuggestions([])
        }
        const filtered = dummyProducts.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
        setFilteredProducts(filtered)
    }

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion)
        setSearchSuggestions([])
        const filtered = dummyProducts.filter((product) => product.title.toLowerCase().includes(suggestion.toLowerCase()))
        setFilteredProducts(filtered)
    }

    const toggleFavorite = (product: Product) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.id === product.id)
            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.id !== product.id)
            } else {
                return [...prevFavorites, product]
            }
        })
    }

    const removeFavorite = (productId: number) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== productId))
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-yellow-50 pt-28">
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex flex-col lg:flex-row items-center justify-between p-4 bg-white border-b border-yellow-100">
                    <div className="relative w-full max-w-xl mb-4 lg:mb-0" ref={searchRef}>
                        <Input
                            type="search"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        {searchSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-yellow-200 rounded-md mt-1 shadow-lg">
                                {searchSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-yellow-700"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="relative">
                                <Heart className="h-5 w-5 text-yellow-500" />
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    {favorites.length}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                            {favorites.length === 0 ? (
                                <DropdownMenuItem>No favorites yet</DropdownMenuItem>
                            ) : (
                                favorites.map((product) => (
                                    <DropdownMenuItem key={product.id} className="flex justify-between items-center">
                                        <div className="flex flex-col cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                            <span className="font-medium">{product.title}</span>
                                            <span className="text-sm text-gray-500">${product.price.toFixed(2)}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeFavorite(product.id)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </DropdownMenuItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    <section className="flex-1 overflow-y-auto p-4">
                        <ProductGrid
                            products={filteredProducts}
                            onProductClick={setSelectedProduct}
                            onToggleFavorite={toggleFavorite}
                            favorites={favorites}
                        />
                    </section>
                    <FilterPanel onFilterChange={setFilteredProducts} />
                </main>
            </div>
            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </div>
    )
}

