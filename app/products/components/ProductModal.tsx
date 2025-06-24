import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Product } from "@/lib/dummyData"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts"

type ProductModalProps = {
    product: Product
    onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const colors = {
        sales: "#8884d8",
        revenue: "#82ca9d",
        rating: "#ffc658",
        positive: "#4caf50",
        negative: "#f44336",
    }

    return (
        <Dialog open={true} onOpenChange={onClose} >
            {/* <DialogContent className="max-w-4xl bg-white "> */}
            <DialogContent className="max-w-4xl bg-white max-h-[80vh] overflow-y-auto">

                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-yellow-800">{product.title}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div>
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={300}
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                        <div className="mt-2">
                            <Badge className="mr-2 bg-yellow-100 text-yellow-800">{product.platform}</Badge>
                            <Badge className="bg-blue-100 text-blue-800">{product.country}</Badge>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Price Range</h3>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={product.priceHistory}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Sales Over Time</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={product.salesHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke={colors.sales} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Revenue Trends</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={product.revenueHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill={colors.revenue} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Ratings Distribution</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={product.ratingsDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rating" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill={colors.rating} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Review Sentiment</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Positive", value: product.positiveReviews },
                                        { name: "Negative", value: product.negativeReviews },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    <Cell fill={colors.positive} />
                                    <Cell fill={colors.negative} />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-700">Review Trends</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={product.reviewTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="averageRating" stroke={colors.rating} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <DialogClose asChild>
                    <Button className="mt-4 bg-yellow-500 text-white hover:bg-yellow-600">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

