
"use client"
import { motion } from "framer-motion"
import { DollarSign, Percent, TrendingUp, TrendingDown, BarChart4, ShoppingBag } from "lucide-react"
interface ResultsData {
  totalCost: number;
  totalRevenue: number;
  profit: number;
  profitMargin: number;
  roi: number;
  quantitySold: number;
  quantity: number;
}
//sadasda
const ResultsSection = ({ data }: { data: ResultsData }) => {
  if (!data) return null;
  

  // Use the pre-calculated values from calculationData instead of recalculating
  const { totalCost, totalRevenue, profit, profitMargin, roi, quantitySold } = data

  // Only calculate costPerUnit here as it's not in the original data
  const costPerUnit = Number(data.quantity) > 0 ? totalCost / Number(data.quantity) : 0

  // Determine if profit is positive or negative
  const isProfitPositive = profit >= 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Revenue</p>
                <p className="text-2xl font-bold text-gray-800">Rs.{totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">From {quantitySold} units sold</div>
          </div>
        </motion.div>

        <motion.div
          className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-gray-800"> Rs.{totalCost.toFixed(2)}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-yellow-600" />
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">For {data.quantity} units purchased</div>
          </div>
        </motion.div>

        <motion.div
          className={`relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className={`absolute top-0 left-0 w-full h-1 ${isProfitPositive ? "bg-green-500" : "bg-red-500"}`}></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Profit/Loss</p>
                <p className={`text-2xl font-bold ${isProfitPositive ? "text-green-600" : "text-red-600"}`}>
                  Rs.{Math.abs(profit).toFixed(2)} {!isProfitPositive && <span className="text-sm">(Loss)</span>}
                </p>
              </div>
              <div className={`${isProfitPositive ? "bg-green-100" : "bg-red-100"} p-2 rounded-lg`}>
                {isProfitPositive ? (
                  <TrendingUp className={`h-5 w-5 ${isProfitPositive ? "text-green-600" : "text-red-600"}`} />
                ) : (
                  <TrendingDown className={`h-5 w-5 ${isProfitPositive ? "text-green-600" : "text-red-600"}`} />
                )}
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              {isProfitPositive ? "Net profit earned" : "Net loss incurred"}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-800">{profitMargin.toFixed(2)}%</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Percent className="h-5 w-5 text-purple-600" />
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              {profitMargin > 20 ? "Excellent margin" : profitMargin > 10 ? "Good margin" : "Low margin"}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">ROI</p>
                <p className="text-2xl font-bold text-gray-800">{roi.toFixed(2)}%</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart4 className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">Return on Investment</div>
          </div>
        </motion.div>

        <motion.div
          className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Cost per Unit</p>
                <p className="text-2xl font-bold text-gray-800"> Rs.{costPerUnit.toFixed(2)}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">Including all operational costs</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultsSection
