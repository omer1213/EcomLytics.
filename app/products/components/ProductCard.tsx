import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import type { Product } from "@/lib/dummyData"

type ProductCardProps = {
  product: Product
  onClick: () => void
  onToggleFavorite: () => void
  isFavorite: boolean
}

export default function ProductCard({ product, onClick, onToggleFavorite, isFavorite }: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white border border-yellow-100 relative"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} layout="fill" objectFit="cover" />
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 truncate text-yellow-800">{product.title}</h3>
          <p className="text-2xl font-bold mb-2 text-yellow-600">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-2">
            <Star className="text-yellow-400 mr-1" />
            <span className="text-yellow-700">{product.rating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-yellow-600 mb-2">Sales: {product.sales}</p>
          <Badge className="bg-yellow-100 text-yellow-800">{product.platform}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

