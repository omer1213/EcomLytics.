"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  placeholder?: string
  initialValue?: string
}

export default function SearchBar({ onSearch, placeholder = "Search products...", initialValue = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm.trim())
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  )
}
