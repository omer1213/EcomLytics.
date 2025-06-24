"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Product, dummyProducts, categories, platforms, countries } from "@/lib/dummyData"

type FilterPanelProps = {
    onFilterChange: (filteredProducts: Product[]) => void
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const [selectedPopularity, setSelectedPopularity] = useState<string>("")
    const [minRating, setMinRating] = useState(0)

    const applyFilters = () => {
        const filtered = dummyProducts.filter(
            (product) =>
                (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
                (selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory)) &&
                (selectedPlatforms.length === 0 || selectedPlatforms.includes(product.platform)) &&
                (selectedCountry === "" || product.country === selectedCountry) &&
                (selectedPopularity === "" || product.popularity === selectedPopularity) &&
                product.price >= priceRange[0] &&
                product.price <= priceRange[1] &&
                product.rating >= minRating,
        )
        onFilterChange(filtered)
    }

    return (
        <aside className="w-64 bg-white border-l border-yellow-100 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-yellow-800">Filters</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="price">
                    <AccordionTrigger className="text-yellow-700">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <Slider min={0} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} className="mt-2" />
                        <div className="flex justify-between mt-2 text-yellow-600">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="categories">
                    <AccordionTrigger className="text-yellow-700">Categories</AccordionTrigger>
                    <AccordionContent>
                        {categories.map((category) => (
                            <div key={category.name}>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Checkbox
                                        id={category.name}
                                        checked={selectedCategories.includes(category.name)}
                                        onCheckedChange={(checked) => {
                                            setSelectedCategories((prev) =>
                                                checked ? [...prev, category.name] : prev.filter((c) => c !== category.name),
                                            )
                                        }}
                                    />
                                    <Label htmlFor={category.name} className="text-yellow-700">
                                        {category.name}
                                    </Label>
                                </div>
                                {category.subcategories.map((subcategory) => (
                                    <div key={subcategory} className="flex items-center space-x-2 mt-2 ml-4">
                                        <Checkbox
                                            id={subcategory}
                                            checked={selectedSubcategories.includes(subcategory)}
                                            onCheckedChange={(checked) => {
                                                setSelectedSubcategories((prev) =>
                                                    checked ? [...prev, subcategory] : prev.filter((c) => c !== subcategory),
                                                )
                                            }}
                                        />
                                        <Label htmlFor={subcategory} className="text-yellow-600">
                                            {subcategory}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="platforms">
                    <AccordionTrigger className="text-yellow-700">Platforms</AccordionTrigger>
                    <AccordionContent>
                        {platforms.map((platform) => (
                            <div key={platform} className="flex items-center space-x-2 mt-2">
                                <Checkbox
                                    id={platform}
                                    checked={selectedPlatforms.includes(platform)}
                                    onCheckedChange={(checked) => {
                                        setSelectedPlatforms((prev) => (checked ? [...prev, platform] : prev.filter((p) => p !== platform)))
                                    }}
                                />
                                <Label htmlFor={platform} className="text-yellow-600">
                                    {platform}
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="country">
                    <AccordionTrigger className="text-yellow-700">Country</AccordionTrigger>
                    <AccordionContent>
                        <Select onValueChange={setSelectedCountry}>
                            <SelectTrigger className="bg-white border-yellow-200">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="popularity">
                    <AccordionTrigger className="text-yellow-700">Popularity</AccordionTrigger>
                    <AccordionContent>
                        <Select onValueChange={setSelectedPopularity}>
                            <SelectTrigger className="bg-white border-yellow-200">
                                <SelectValue placeholder="Select popularity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rating">
                    <AccordionTrigger className="text-yellow-700">Minimum Rating</AccordionTrigger>
                    <AccordionContent>
                        <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={[minRating]}
                            onValueChange={([value]) => setMinRating(value)}
                            className="mt-2"
                        />
                        <div className="mt-2 text-yellow-600">
                            <span>{minRating} stars & above</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button className="w-full mt-4 bg-yellow-500 text-white hover:bg-yellow-600" onClick={applyFilters}>
                Apply Filters
            </Button>
        </aside>
    )
}

