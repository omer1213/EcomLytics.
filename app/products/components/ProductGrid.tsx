import type { Product } from "@/lib/dummyData"
import ProductCard from "./ProductCard"

type ProductGridProps = {
  products: Product[]
  onProductClick: (product: Product) => void
  onToggleFavorite: (product: Product) => void
  favorites: Product[]
}

export default function ProductGrid({ products, onProductClick, onToggleFavorite, favorites }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
          onToggleFavorite={() => onToggleFavorite(product)}
          isFavorite={favorites.some((fav) => fav.id === product.id)}
        />
      ))}
    </div>
  )
}

