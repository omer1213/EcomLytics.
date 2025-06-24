// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Chart from "chart.js/auto"
// import { motion } from "framer-motion"
// import { BarChart, PieChart, TrendingUp, DollarSign, Percent } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"

// const ChartsSection = ({ data }) => {
//   const { toast } = useToast()
//   const pieChartRef = useRef(null)
//   const barChartRef = useRef(null)
//   const inventoryChartRef = useRef(null)
//   const priceSimulationChartRef = useRef(null)

//   // Track if charts have been rendered
//   const [chartsRendered, setChartsRendered] = useState({
//     pie: false,
//     bar: false,
//     inventory: false,
//     priceSimulation: false,
//   })

//   // Track chart instances to destroy them before re-rendering
//   const chartInstances = useRef({
//     pie: null,
//     bar: null,
//     inventory: null,
//     priceSimulation: null,
//   })

//   // Track active tab to re-render charts when tab changes
//   const [activeTab, setActiveTab] = useState("overview")

//   // State for price simulation
//   const [priceAdjustment, setPriceAdjustment] = useState(0) // 0% change by default
//   const [simulationResults, setSimulationResults] = useState({
//     newPrice: 0,
//     potentialRevenue: 0,
//     potentialProfit: 0,
//     profitIncrease: 0,
//     profitIncreasePercent: 0,
//   })

//   // Calculate simulation results when price adjustment changes
//   useEffect(() => {
//     if (data && data.quantityLeft > 0) {
//       const originalPrice = Number(data.sellingPrice)
//       const newPrice = originalPrice * (1 + priceAdjustment / 100)
//       const quantityLeft = Number(data.quantityLeft)
//       const costPerUnit = Number(data.purchasePrice)

//       const originalPotentialRevenue = originalPrice * quantityLeft
//       const newPotentialRevenue = newPrice * quantityLeft

//       const originalPotentialProfit = originalPotentialRevenue - costPerUnit * quantityLeft
//       const newPotentialProfit = newPotentialRevenue - costPerUnit * quantityLeft

//       const profitIncrease = newPotentialProfit - originalPotentialProfit
//       const profitIncreasePercent = originalPotentialProfit !== 0 ? (profitIncrease / originalPotentialProfit) * 100 : 0

//       setSimulationResults({
//         newPrice,
//         potentialRevenue: newPotentialRevenue,
//         potentialProfit: newPotentialProfit,
//         profitIncrease,
//         profitIncreasePercent,
//       })

//       // Render price simulation chart if we're on the inventory tab
//       if (activeTab === "inventory" && priceSimulationChartRef.current) {
//         renderPriceSimulationChart(priceAdjustment)
//       }
//     }
//   }, [priceAdjustment, data, activeTab])

//   // Function to render the pie chart
//   const renderPieChart = () => {
//     if (!pieChartRef.current || !data) return null

//     try {
//       const ctx = pieChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.pie) {
//         chartInstances.current.pie.destroy()
//       }

//       // Use the pre-calculated values from data
//       const inventoryValue = Number(data.inventoryValue)
//       const productCost = Number(data.purchasePrice) * (Number(data.quantity) - Number(data.quantityLeft))
//       const operationalCosts = Number(data.operationalCosts || 0)
//       const profit = Number(data.profit)

//       const chart = new Chart(ctx, {
//         type: "pie",
//         data: {
//           labels: ["Product Cost (Sold)", "Operational Costs", "Remaining Inventory Value", "Profit"],
//           datasets: [
//             {
//               data: [productCost, operationalCosts, inventoryValue, profit],
//               backgroundColor: ["#3B82F6", "#F59E0B", "#64748b", "#10B981"],
//               borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
//               borderWidth: 2,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 padding: 20,
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `$${value.toFixed(2)}`
//                 },
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.pie = chart
//       setChartsRendered((prev) => ({ ...prev, pie: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering pie chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the pie chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Function to render the bar chart
//   const renderBarChart = () => {
//     if (!barChartRef.current || !data) return null

//     try {
//       const ctx = barChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.bar) {
//         chartInstances.current.bar.destroy()
//       }

//       // Use the pre-calculated values from data
//       const totalRevenue = Number(data.totalRevenue)
//       const totalCost = Number(data.totalCost)
//       const profit = Number(data.profit)

//       const chart = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Total Revenue", "Total Cost", "Profit"],
//           datasets: [
//             {
//               data: [totalRevenue, totalCost, profit],
//               backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
//               borderColor: ["#2563EB", "#D97706", "#059669"],
//               borderWidth: 1,
//               borderRadius: 8,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `$${value.toFixed(2)}`
//                 },
//               },
//             },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               grid: {
//                 display: true,
//                 drawBorder: false,
//               },
//               ticks: {
//                 callback: (value) => "$" + value,
//               },
//             },
//             x: {
//               grid: {
//                 display: false,
//                 drawBorder: false,
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.bar = chart
//       setChartsRendered((prev) => ({ ...prev, bar: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering bar chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the bar chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Function to render the inventory chart
//   const renderInventoryChart = () => {
//     if (!inventoryChartRef.current || !data) return null

//     try {
//       const ctx = inventoryChartRef.current.getContext("2d")

//       // Ensure we're using the correct values
//       const quantitySold = Number(data.quantity) - Number(data.quantityLeft)
//       const quantityLeft = Number(data.quantityLeft)

//       // Destroy existing chart if it exists
//       if (chartInstances.current.inventory) {
//         chartInstances.current.inventory.destroy()
//       }

//       const chart = new Chart(ctx, {
//         type: "doughnut",
//         data: {
//           labels: ["Sold", "Remaining"],
//           datasets: [
//             {
//               data: [quantitySold, quantityLeft],
//               backgroundColor: ["#3B82F6", "#F59E0B"],
//               borderColor: ["#2563EB", "#D97706"],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           cutout: "70%",
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 padding: 20,
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `${value} units (${((value / Number(data.quantity)) * 100).toFixed(1)}%)`
//                 },
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.inventory = chart
//       setChartsRendered((prev) => ({ ...prev, inventory: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering inventory chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the inventory chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Function to render the price simulation chart
//   const renderPriceSimulationChart = (currentAdjustment = 0) => {
//     if (!priceSimulationChartRef.current || !data || Number(data.quantityLeft) <= 0) return null

//     try {
//       const ctx = priceSimulationChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.priceSimulation) {
//         chartInstances.current.priceSimulation.destroy()
//       }

//       // Generate data points for the chart
//       const pricePoints = []
//       const profitPoints = []
//       const revenuePoints = []
//       const currentPriceIndex = [] // To mark the current price point

//       const originalPrice = Number(data.sellingPrice)
//       const costPerUnit = Number(data.purchasePrice)
//       const quantityLeft = Number(data.quantityLeft)

//       // Generate data points from -30% to +50% of current price
//       for (let i = -30; i <= 50; i += 5) {
//         const adjustedPrice = originalPrice * (1 + i / 100)
//         const adjustedRevenue = adjustedPrice * quantityLeft
//         const adjustedProfit = adjustedRevenue - costPerUnit * quantityLeft

//         pricePoints.push(i)
//         revenuePoints.push(adjustedRevenue)
//         profitPoints.push(adjustedProfit)

//         // Find the closest point to mark as current
//         if (Math.abs(i - currentAdjustment) <= 2.5) {
//           currentPriceIndex.push(adjustedRevenue)
//         } else {
//           currentPriceIndex.push(null)
//         }
//       }

//       const chart = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: pricePoints.map((p) => `${p > 0 ? "+" : ""}${p}%`),
//           datasets: [
//             {
//               label: "Potential Revenue",
//               data: revenuePoints,
//               borderColor: "#3B82F6",
//               backgroundColor: "rgba(59, 130, 246, 0.1)",
//               borderWidth: 2,
//               tension: 0.3,
//               fill: false,
//             },
//             {
//               label: "Potential Profit",
//               data: profitPoints,
//               borderColor: "#10B981",
//               backgroundColor: "rgba(16, 185, 129, 0.1)",
//               borderWidth: 2,
//               tension: 0.3,
//               fill: false,
//             },
//             {
//               label: "Current Selection",
//               data: currentPriceIndex,
//               borderColor: "#ef4444",
//               backgroundColor: "#ef4444",
//               borderWidth: 0,
//               pointRadius: 6,
//               pointHoverRadius: 8,
//               pointStyle: "circle",
//               showLine: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "bottom",
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   if (context.datasetIndex === 2) {
//                     return `Selected Price Point`
//                   }
//                   return `${context.dataset.label}: $${value.toFixed(2)}`
//                 },
//                 title: (items) => {
//                   return `Price Change: ${items[0].label}`
//                 },
//               },
//             },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               grid: {
//                 display: true,
//                 drawBorder: false,
//               },
//               ticks: {
//                 callback: (value) => "$" + value,
//               },
//             },
//             x: {
//               grid: {
//                 display: false,
//                 drawBorder: false,
//               },
//               title: {
//                 display: true,
//                 text: "Price Adjustment",
//               },
//             },
//           },
//           animation: false,
//         },
//       })

//       chartInstances.current.priceSimulation = chart
//       setChartsRendered((prev) => ({ ...prev, priceSimulation: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering price simulation chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the price simulation chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Render charts when component mounts or data changes
//   useEffect(() => {
//     if (data) {
//       // Use a timeout to ensure DOM is ready
//       const timer = setTimeout(() => {
//         if (activeTab === "overview") {
//           renderPieChart()
//           renderBarChart()
//         } else if (activeTab === "inventory") {
//           renderInventoryChart()
//           if (Number(data.quantityLeft) > 0) {
//             renderPriceSimulationChart(priceAdjustment)
//           }
//         }
//       }, 100)

//       return () => clearTimeout(timer)
//     }
//   }, [data, activeTab])

//   // Clean up charts when component unmounts
//   useEffect(() => {
//     return () => {
//       if (chartInstances.current.pie) chartInstances.current.pie.destroy()
//       if (chartInstances.current.bar) chartInstances.current.bar.destroy()
//       if (chartInstances.current.inventory) chartInstances.current.inventory.destroy()
//       if (chartInstances.current.priceSimulation) chartInstances.current.priceSimulation.destroy()
//     }
//   }, [])

//   if (!data) return null

//   return (
//     <div className="space-y-8">
//       <Tabs
//         defaultValue="overview"
//         value={activeTab}
//         onValueChange={(value) => {
//           setActiveTab(value)
//           // Reset charts rendered state when changing tabs
//           setChartsRendered({
//             pie: false,
//             bar: false,
//             inventory: false,
//             priceSimulation: false,
//           })
//         }}
//         className="w-full"
//       >
//         <TabsList className="w-full grid grid-cols-2 mb-6">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="inventory">Inventory</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
//                 <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <PieChart className="h-5 w-5 text-blue-500" />
//                     Cost and Profit Breakdown
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <div className="h-[300px] relative">
//                     <canvas ref={pieChartRef} height={300}></canvas>
//                     {!chartsRendered.pie && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                         <p className="text-gray-500">Loading chart...</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
//                 <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <BarChart className="h-5 w-5 text-blue-500" />
//                     Revenue, Costs, and Profit
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <div className="h-[300px] relative">
//                     <canvas ref={barChartRef} height={300}></canvas>
//                     {!chartsRendered.bar && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                         <p className="text-gray-500">Loading chart...</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </TabsContent>

//         <TabsContent value="inventory">
//           <div className="space-y-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
//                 <CardHeader className="bg-yellow-50 border-b border-yellow-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <PieChart className="h-5 w-5 text-yellow-500" />
//                     Inventory Status
//                   </CardTitle>
//                   <p className="text-xs text-gray-500 mt-1">Based on your input data - not live tracking</p>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex justify-center items-center">
//                       <div className="h-[250px] w-full relative">
//                         <canvas ref={inventoryChartRef} height={250}></canvas>
//                         {!chartsRendered.inventory && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                             <p className="text-gray-500">Loading chart...</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Sold Units</p>
//                         <p className="text-2xl font-bold text-blue-700">
//                           {Number(data.quantity) - Number(data.quantityLeft)} units
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Value: $
//                           {(Number(data.sellingPrice) * (Number(data.quantity) - Number(data.quantityLeft))).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Remaining Inventory</p>
//                         <p className="text-2xl font-bold text-yellow-700">{Number(data.quantityLeft)} units</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Potential Value: ${(Number(data.sellingPrice) * Number(data.quantityLeft)).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
//                         <p className="text-2xl font-bold text-green-700">
//                           {(
//                             ((Number(data.quantity) - Number(data.quantityLeft)) / Number(data.quantity)) *
//                             100
//                           ).toFixed(1)}
//                           %
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {Number(data.quantityLeft) === 0 ? "All inventory sold!" : "Percentage of inventory sold"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {Number(data.quantityLeft) > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//               >
//                 <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
//                   <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                     <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                       <TrendingUp className="h-5 w-5 text-blue-500" />
//                       Price Simulation for Remaining Inventory
//                     </CardTitle>
//                     <p className="text-xs text-gray-500 mt-1">Hypothetical scenarios based on your current data</p>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="space-y-6">
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center">
//                           <p className="text-sm font-medium text-gray-700">Adjust Selling Price</p>
//                           <Badge variant="outline" className="font-semibold">
//                             {priceAdjustment > 0 ? "+" : ""}
//                             {priceAdjustment}% (
//                             {priceAdjustment === 0
//                               ? "Current Price"
//                               : priceAdjustment > 0
//                                 ? "Price Increase"
//                                 : "Price Decrease"}
//                             )
//                           </Badge>
//                         </div>
//                         <div className="px-2">
//                           <Slider
//                             defaultValue={[0]}
//                             min={-30}
//                             max={50}
//                             step={1}
//                             value={[priceAdjustment]}
//                             onValueChange={(value) => {
//                               setPriceAdjustment(value[0])
//                               // Immediately update the chart with the new value
//                               if (priceSimulationChartRef.current) {
//                                 renderPriceSimulationChart(value[0])
//                               }
//                             }}
//                             className="py-4"
//                           />
//                           <div className="flex justify-between text-xs text-gray-500 mt-1">
//                             <span>-30%</span>
//                             <span>Current Price</span>
//                             <span>+50%</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <DollarSign className="h-4 w-4 text-blue-500" />
//                             New Price per Unit
//                           </p>
//                           <p className="text-2xl font-bold text-blue-600">${simulationResults.newPrice.toFixed(2)}</p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             Original: ${Number(data.sellingPrice).toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <DollarSign className="h-4 w-4 text-green-500" />
//                             Potential Revenue
//                           </p>
//                           <p className="text-2xl font-bold text-green-600">
//                             ${simulationResults.potentialRevenue.toFixed(2)}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">From {Number(data.quantityLeft)} units</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <Percent className="h-4 w-4 text-purple-500" />
//                             Profit Change
//                           </p>
//                           <p
//                             className={`text-2xl font-bold ${simulationResults.profitIncrease >= 0 ? "text-green-600" : "text-red-600"}`}
//                           >
//                             {simulationResults.profitIncreasePercent > 0 ? "+" : ""}
//                             {simulationResults.profitIncreasePercent.toFixed(1)}%
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">${simulationResults.profitIncrease.toFixed(2)}</p>
//                         </div>
//                       </div>

//                       <div className="h-[250px] relative mt-4">
//                         <canvas ref={priceSimulationChartRef} height={250}></canvas>
//                         {!chartsRendered.priceSimulation && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                             <p className="text-gray-500">Loading chart...</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default ChartsSection

// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Chart from "chart.js/auto"
// import { motion } from "framer-motion"
// import { BarChart, PieChart, TrendingUp, DollarSign, Percent } from 'lucide-react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"

// // This ensures TypeScript knows we're using these components
// const _unusedForTypeCheck = {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   motion,
//   BarChart,
//   PieChart,
//   TrendingUp,
//   DollarSign,
//   Percent,
//   TabsContent,
//   TabsList
// }

// const ChartsSection = ({ data }) => {
//   const { toast } = useToast()
//   const pieChartRef = useRef(null)
//   const barChartRef = useRef(null)
//   const inventoryChartRef = useRef(null)
//   const priceSimulationChartRef = useRef(null)

//   // Track if charts have been rendered
//   const [chartsRendered, setChartsRendered] = useState({
//     pie: false,
//     bar: false,
//     inventory: false,
//     priceSimulation: false,
//   })

//   // Track chart instances to destroy them before re-rendering
//   const chartInstances = useRef({
//     pie: null,
//     bar: null,
//     inventory: null,
//     priceSimulation: null,
//   })

//   // Track active tab to re-render charts when tab changes
//   const [activeTab, setActiveTab] = useState("overview")

//   // State for price simulation
//   const [priceAdjustment, setPriceAdjustment] = useState(0) // 0% change by default
//   const [simulationResults, setSimulationResults] = useState({
//     newPrice: 0,
//     potentialRevenue: 0,
//     potentialProfit: 0,
//     profitIncrease: 0,
//     profitIncreasePercent: 0,
//   })

//   // Calculate simulation results when price adjustment changes
//   useEffect(() => {
//     if (data && data.quantityLeft > 0) {
//       const originalPrice = Number(data.sellingPrice)
//       const newPrice = originalPrice * (1 + priceAdjustment / 100)
//       const quantityLeft = Number(data.quantityLeft)
//       const costPerUnit = Number(data.purchasePrice)

//       const originalPotentialRevenue = originalPrice * quantityLeft
//       const newPotentialRevenue = newPrice * quantityLeft

//       const originalPotentialProfit = originalPotentialRevenue - costPerUnit * quantityLeft
//       const newPotentialProfit = newPotentialRevenue - costPerUnit * quantityLeft

//       const profitIncrease = newPotentialProfit - originalPotentialProfit
//       const profitIncreasePercent = originalPotentialProfit !== 0 ? (profitIncrease / originalPotentialProfit) * 100 : 0

//       setSimulationResults({
//         newPrice,
//         potentialRevenue: newPotentialRevenue,
//         potentialProfit: newPotentialProfit,
//         profitIncrease,
//         profitIncreasePercent,
//       })

//       // Render price simulation chart if we're on the inventory tab
//       if (activeTab === "inventory" && priceSimulationChartRef.current) {
//         renderPriceSimulationChart(priceAdjustment)
//       }
//     }
//   }, [priceAdjustment, data, activeTab])

//   // Function to render the pie chart
//   const renderPieChart = () => {
//     if (!pieChartRef.current || !data) return null

//     try {
//       const ctx = pieChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.pie) {
//         chartInstances.current.pie.destroy()
//       }

//       // Use the pre-calculated values from data
//       const inventoryValue = Number(data.inventoryValue)
//       const productCost = Number(data.purchasePrice) * (Number(data.quantity) - Number(data.quantityLeft))
//       const operationalCosts = Number(data.operationalCosts || 0)
//       const profit = Number(data.profit)

//       const chart = new Chart(ctx, {
//         type: "pie",
//         data: {
//           labels: ["Product Cost (Sold)", "Operational Costs", "Remaining Inventory Value", "Profit"],
//           datasets: [
//             {
//               data: [productCost, operationalCosts, inventoryValue, profit],
//               backgroundColor: ["#3B82F6", "#F59E0B", "#64748b", "#10B981"],
//               borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
//               borderWidth: 2,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 padding: 20,
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `$${value.toFixed(2)}`
//                 },
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.pie = chart
//       setChartsRendered((prev) => ({ ...prev, pie: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering pie chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the pie chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Function to render the bar chart
//   const renderBarChart = () => {
//     if (!barChartRef.current || !data) return null

//     try {
//       const ctx = barChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.bar) {
//         chartInstances.current.bar.destroy()
//       }

//       // Use the pre-calculated values from data
//       const totalRevenue = Number(data.totalRevenue)
//       const totalCost = Number(data.totalCost)
//       const profit = Number(data.profit)

//       const chart = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Total Revenue", "Total Cost", "Profit"],
//           datasets: [
//             {
//               data: [totalRevenue, totalCost, profit],
//               backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
//               borderColor: ["#2563EB", "#D97706", "#059669"],
//               borderWidth: 1,
//               borderRadius: 8,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `$${value.toFixed(2)}`
//                 },
//               },
//             },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               grid: {
//                 display: true,
//                 drawBorder: false,
//               },
//               ticks: {
//                 callback: (value) => "$" + value,
//               },
//             },
//             x: {
//               grid: {
//                 display: false,
//                 drawBorder: false,
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.bar = chart
//       setChartsRendered((prev) => ({ ...prev, bar: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering bar chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the bar chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Function to render the inventory chart
//   const renderInventoryChart = () => {
//     if (!inventoryChartRef.current || !data) return null

//     try {
//       const ctx = inventoryChartRef.current.getContext("2d")

//       // Ensure we're using the correct values
//       const quantitySold = Number(data.quantity) - Number(data.quantityLeft)
//       const quantityLeft = Number(data.quantityLeft)

//       // Destroy existing chart if it exists
//       if (chartInstances.current.inventory) {
//         chartInstances.current.inventory.destroy()
//       }

//       const chart = new Chart(ctx, {
//         type: "doughnut",
//         data: {
//           labels: ["Sold", "Remaining"],
//           datasets: [
//             {
//               data: [quantitySold, quantityLeft],
//               backgroundColor: ["#3B82F6", "#F59E0B"],
//               borderColor: ["#2563EB", "#D97706"],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           cutout: "70%",
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 padding: 20,
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `${value} units (${((value / Number(data.quantity)) * 100).toFixed(1)}%)`
//                 },
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.inventory = chart
//       setChartsRendered((prev) => ({ ...prev, inventory: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering inventory chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the inventory chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Function to render the price simulation chart
//   const renderPriceSimulationChart = (currentAdjustment = 0) => {
//     if (!priceSimulationChartRef.current || !data || Number(data.quantityLeft) <= 0) return null

//     try {
//       const ctx = priceSimulationChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.priceSimulation) {
//         chartInstances.current.priceSimulation.destroy()
//       }

//       // Generate data points for the chart
//       const pricePoints = []
//       const profitPoints = []
//       const revenuePoints = []
//       const currentPriceIndex = [] // To mark the current price point

//       const originalPrice = Number(data.sellingPrice)
//       const costPerUnit = Number(data.purchasePrice)
//       const quantityLeft = Number(data.quantityLeft)

//       // Generate data points from -30% to +50% of current price
//       for (let i = -30; i <= 50; i += 5) {
//         const adjustedPrice = originalPrice * (1 + i / 100)
//         const adjustedRevenue = adjustedPrice * quantityLeft
//         const adjustedProfit = adjustedRevenue - costPerUnit * quantityLeft

//         pricePoints.push(i)
//         revenuePoints.push(adjustedRevenue)
//         profitPoints.push(adjustedProfit)

//         // Find the closest point to mark as current
//         if (Math.abs(i - currentAdjustment) <= 2.5) {
//           currentPriceIndex.push(adjustedRevenue)
//         } else {
//           currentPriceIndex.push(null)
//         }
//       }

//       const chart = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: pricePoints.map((p) => `${p > 0 ? "+" : ""}${p}%`),
//           datasets: [
//             {
//               label: "Potential Revenue",
//               data: revenuePoints,
//               borderColor: "#3B82F6",
//               backgroundColor: "rgba(59, 130, 246, 0.1)",
//               borderWidth: 2,
//               tension: 0.3,
//               fill: false,
//             },
//             {
//               label: "Potential Profit",
//               data: profitPoints,
//               borderColor: "#10B981",
//               backgroundColor: "rgba(16, 185, 129, 0.1)",
//               borderWidth: 2,
//               tension: 0.3,
//               fill: false,
//             },
//             {
//               label: "Current Selection",
//               data: currentPriceIndex,
//               borderColor: "#ef4444",
//               backgroundColor: "#ef4444",
//               borderWidth: 0,
//               pointRadius: 6,
//               pointHoverRadius: 8,
//               pointStyle: "circle",
//               showLine: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "bottom",
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   if (context.datasetIndex === 2) {
//                     return `Selected Price Point`
//                   }
//                   return `${context.dataset.label}: $${value.toFixed(2)}`
//                 },
//                 title: (items) => {
//                   return `Price Change: ${items[0].label}`
//                 },
//               },
//             },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               grid: {
//                 display: true,
//                 drawBorder: false,
//               },
//               ticks: {
//                 callback: (value) => "$" + value,
//               },
//             },
//             x: {
//               grid: {
//                 display: false,
//                 drawBorder: false,
//               },
//               title: {
//                 display: true,
//                 text: "Price Adjustment",
//               },
//             },
//           },
//           animation: false,
//         },
//       })

//       chartInstances.current.priceSimulation = chart
//       setChartsRendered((prev) => ({ ...prev, priceSimulation: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering price simulation chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the price simulation chart. Please try again.",
//       })
//       return null
//     }
//   }

//   // Render charts when component mounts or data changes
//   useEffect(() => {
//     if (data) {
//       // Use a timeout to ensure DOM is ready
//       const timer = setTimeout(() => {
//         if (activeTab === "overview") {
//           renderPieChart()
//           renderBarChart()
//         } else if (activeTab === "inventory") {
//           renderInventoryChart()
//           if (Number(data.quantityLeft) > 0) {
//             renderPriceSimulationChart(priceAdjustment)
//           }
//         }
//       }, 100)

//       return () => clearTimeout(timer)
//     }
//   }, [data, activeTab])

//   // Clean up charts when component unmounts
//   useEffect(() => {
//     return () => {
//       if (chartInstances.current.pie) chartInstances.current.pie.destroy()
//       if (chartInstances.current.bar) chartInstances.current.bar.destroy()
//       if (chartInstances.current.inventory) chartInstances.current.inventory.destroy()
//       if (chartInstances.current.priceSimulation) chartInstances.current.priceSimulation.destroy()
//     }
//   }, [])

//   if (!data) return null

//   return (
//     <div className="space-y-8">
//       <Tabs
//         defaultValue="overview"
//         value={activeTab}
//         onValueChange={(value) => {
//           setActiveTab(value)
//           // Reset charts rendered state when changing tabs
//           setChartsRendered({
//             pie: false,
//             bar: false,
//             inventory: false,
//             priceSimulation: false,
//           })
//         }}
//         className="w-full"
//       >
//         <TabsList className="w-full grid grid-cols-2 mb-6">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="inventory">Inventory</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
//                 <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <PieChart className="h-5 w-5 text-blue-500" />
//                     Cost and Profit Breakdown
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <div className="h-[300px] relative">
//                     <canvas ref={pieChartRef} height={300}></canvas>
//                     {!chartsRendered.pie && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                         <p className="text-gray-500">Loading chart...</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
//                 <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <BarChart className="h-5 w-5 text-blue-500" />
//                     Revenue, Costs, and Profit
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <div className="h-[300px] relative">
//                     <canvas ref={barChartRef} height={300}></canvas>
//                     {!chartsRendered.bar && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                         <p className="text-gray-500">Loading chart...</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </TabsContent>

//         <TabsContent value="inventory">
//           <div className="space-y-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
//                 <CardHeader className="bg-yellow-50 border-b border-yellow-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <PieChart className="h-5 w-5 text-yellow-500" />
//                     Inventory Status
//                   </CardTitle>
//                   <p className="text-xs text-gray-500 mt-1">Based on your input data - not live tracking</p>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex justify-center items-center">
//                       <div className="h-[250px] w-full relative">
//                         <canvas ref={inventoryChartRef} height={250}></canvas>
//                         {!chartsRendered.inventory && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                             <p className="text-gray-500">Loading chart...</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Sold Units</p>
//                         <p className="text-2xl font-bold text-blue-700">
//                           {Number(data.quantity) - Number(data.quantityLeft)} units
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Value: $
//                           {(Number(data.sellingPrice) * (Number(data.quantity) - Number(data.quantityLeft))).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Remaining Inventory</p>
//                         <p className="text-2xl font-bold text-yellow-700">{Number(data.quantityLeft)} units</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Potential Value: ${(Number(data.sellingPrice) * Number(data.quantityLeft)).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
//                         <p className="text-2xl font-bold text-green-700">
//                           {(
//                             ((Number(data.quantity) - Number(data.quantityLeft)) / Number(data.quantity)) *
//                             100
//                           ).toFixed(1)}
//                           %
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {Number(data.quantityLeft) === 0 ? "All inventory sold!" : "Percentage of inventory sold"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {Number(data.quantityLeft) > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//               >
//                 <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
//                   <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                     <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                       <TrendingUp className="h-5 w-5 text-blue-500" />
//                       Price Simulation for Remaining Inventory
//                     </CardTitle>
//                     <p className="text-xs text-gray-500 mt-1">Hypothetical scenarios based on your current data</p>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="space-y-6">
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center">
//                           <p className="text-sm font-medium text-gray-700">Adjust Selling Price</p>
//                           <Badge variant="outline" className="font-semibold">
//                             {priceAdjustment > 0 ? "+" : ""}
//                             {priceAdjustment}% (
//                             {priceAdjustment === 0
//                               ? "Current Price"
//                               : priceAdjustment > 0
//                                 ? "Price Increase"
//                                 : "Price Decrease"}
//                             )
//                           </Badge>
//                         </div>
//                         <div className="px-2">
//                           <Slider
//                             defaultValue={[0]}
//                             min={-30}
//                             max={50}
//                             step={1}
//                             value={[priceAdjustment]}
//                             onValueChange={(value) => {
//                               setPriceAdjustment(value[0])
//                               // Immediately update the chart with the new value
//                               if (priceSimulationChartRef.current) {
//                                 renderPriceSimulationChart(value[0])
//                               }
//                             }}
//                             className="py-4"
//                           />
//                           <div className="flex justify-between text-xs text-gray-500 mt-1">
//                             <span>-30%</span>
//                             <span>Current Price</span>
//                             <span>+50%</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <DollarSign className="h-4 w-4 text-blue-500" />
//                             New Price per Unit
//                           </p>
//                           <p className="text-2xl font-bold text-blue-600">${simulationResults.newPrice.toFixed(2)}</p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             Original: ${Number(data.sellingPrice).toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <DollarSign className="h-4 w-4 text-green-500" />
//                             Potential Revenue
//                           </p>
//                           <p className="text-2xl font-bold text-green-600">
//                             ${simulationResults.potentialRevenue.toFixed(2)}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">From {Number(data.quantityLeft)} units</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <Percent className="h-4 w-4 text-purple-500" />
//                             Profit Change
//                           </p>
//                           <p
//                             className={`text-2xl font-bold ${simulationResults.profitIncrease >= 0 ? "text-green-600" : "text-red-600"}`}
//                           >
//                             {simulationResults.profitIncreasePercent > 0 ? "+" : ""}
//                             {simulationResults.profitIncreasePercent.toFixed(1)}%
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">${simulationResults.profitIncrease.toFixed(2)}</p>
//                         </div>
//                       </div>

//                       <div className="h-[250px] relative mt-4">
//                         <canvas ref={priceSimulationChartRef} height={250}></canvas>
//                         {!chartsRendered.priceSimulation && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                             <p className="text-gray-500">Loading chart...</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default ChartsSection

// "use client"

// import { useEffect, useRef, useState, useCallback } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Chart from "chart.js/auto"
// import { motion } from "framer-motion"
// import { BarChart, PieChart, TrendingUp, DollarSign, Percent } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Slider } from "@/components/ui/slider"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"

// const ChartsSection = ({ data }) => {
//   const { toast } = useToast()
//   const pieChartRef = useRef(null)
//   const barChartRef = useRef(null)
//   const inventoryChartRef = useRef(null)
//   const priceSimulationChartRef = useRef(null)

//   // Track if charts have been rendered
//   const [chartsRendered, setChartsRendered] = useState({
//     pie: false,
//     bar: false,
//     inventory: false,
//     priceSimulation: false,
//   })

//   // Track chart instances to destroy them before re-rendering
//   const chartInstances = useRef({
//     pie: null,
//     bar: null,
//     inventory: null,
//     priceSimulation: null,
//   })

//   // Track active tab to re-render charts when tab changes
//   const [activeTab, setActiveTab] = useState("overview")

//   // State for price simulation
//   const [priceAdjustment, setPriceAdjustment] = useState(0) // 0% change by default
//   const [simulationResults, setSimulationResults] = useState({
//     newPrice: 0,
//     potentialRevenue: 0,
//     potentialProfit: 0,
//     profitIncrease: 0,
//     profitIncreasePercent: 0,
//   })

//   // Function to render the pie chart - memoized to prevent recreation on every render
//   const renderPieChart = useCallback(() => {
//     if (!pieChartRef.current || !data) return null

//     try {
//       const ctx = pieChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.pie) {
//         chartInstances.current.pie.destroy()
//       }

//       // Use the pre-calculated values from data
//       const inventoryValue = Number(data.inventoryValue)
//       const productCost = Number(data.purchasePrice) * (Number(data.quantity) - Number(data.quantityLeft))
//       const operationalCosts = Number(data.operationalCosts || 0)
//       const profit = Number(data.profit)

//       const chart = new Chart(ctx, {
//         type: "pie",
//         data: {
//           labels: ["Product Cost (Sold)", "Operational Costs", "Remaining Inventory Value", "Profit"],
//           datasets: [
//             {
//               data: [productCost, operationalCosts, inventoryValue, profit],
//               backgroundColor: ["#3B82F6", "#F59E0B", "#64748b", "#10B981"],
//               borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
//               borderWidth: 2,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 padding: 20,
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `$${value.toFixed(2)}`
//                 },
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.pie = chart
//       setChartsRendered((prev) => ({ ...prev, pie: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering pie chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the pie chart. Please try again.",
//       })
//       return null
//     }
//   }, [data, toast])

//   // Function to render the bar chart - memoized to prevent recreation on every render
//   const renderBarChart = useCallback(() => {
//     if (!barChartRef.current || !data) return null

//     try {
//       const ctx = barChartRef.current.getContext("2d")

//       // Destroy existing chart if it exists
//       if (chartInstances.current.bar) {
//         chartInstances.current.bar.destroy()
//       }

//       // Use the pre-calculated values from data
//       const totalRevenue = Number(data.totalRevenue)
//       const totalCost = Number(data.totalCost)
//       const profit = Number(data.profit)

//       const chart = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Total Revenue", "Total Cost", "Profit"],
//           datasets: [
//             {
//               data: [totalRevenue, totalCost, profit],
//               backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
//               borderColor: ["#2563EB", "#D97706", "#059669"],
//               borderWidth: 1,
//               borderRadius: 8,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `$${value.toFixed(2)}`
//                 },
//               },
//             },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               grid: {
//                 display: true,
//                 drawBorder: false,
//               },
//               ticks: {
//                 callback: (value) => "$" + value,
//               },
//             },
//             x: {
//               grid: {
//                 display: false,
//                 drawBorder: false,
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.bar = chart
//       setChartsRendered((prev) => ({ ...prev, bar: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering bar chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the bar chart. Please try again.",
//       })
//       return null
//     }
//   }, [data, toast])

//   // Function to render the inventory chart - memoized to prevent recreation on every render
//   const renderInventoryChart = useCallback(() => {
//     if (!inventoryChartRef.current || !data) return null

//     try {
//       const ctx = inventoryChartRef.current.getContext("2d")

//       // Ensure we're using the correct values
//       const quantitySold = Number(data.quantity) - Number(data.quantityLeft)
//       const quantityLeft = Number(data.quantityLeft)

//       // Destroy existing chart if it exists
//       if (chartInstances.current.inventory) {
//         chartInstances.current.inventory.destroy()
//       }

//       const chart = new Chart(ctx, {
//         type: "doughnut",
//         data: {
//           labels: ["Sold", "Remaining"],
//           datasets: [
//             {
//               data: [quantitySold, quantityLeft],
//               backgroundColor: ["#3B82F6", "#F59E0B"],
//               borderColor: ["#2563EB", "#D97706"],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           cutout: "70%",
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 padding: 20,
//                 font: {
//                   size: 12,
//                 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: (context) => {
//                   const value = context.raw
//                   return `${value} units (${((value / Number(data.quantity)) * 100).toFixed(1)}%)`
//                 },
//               },
//             },
//           },
//           animation: false, // Disable animation to prevent flickering
//         },
//       })

//       chartInstances.current.inventory = chart
//       setChartsRendered((prev) => ({ ...prev, inventory: true }))
//       return chart
//     } catch (error) {
//       console.error("Error rendering inventory chart:", error)
//       toast({
//         variant: "destructive",
//         title: "Chart Error",
//         description: "There was an error rendering the inventory chart. Please try again.",
//       })
//       return null
//     }
//   }, [data, toast])

//   // Function to render the price simulation chart - memoized to prevent recreation on every render
//   const renderPriceSimulationChart = useCallback(
//     (currentAdjustment = 0) => {
//       if (!priceSimulationChartRef.current || !data || Number(data.quantityLeft) <= 0) return null

//       try {
//         const ctx = priceSimulationChartRef.current.getContext("2d")

//         // Destroy existing chart if it exists
//         if (chartInstances.current.priceSimulation) {
//           chartInstances.current.priceSimulation.destroy()
//         }

//         // Generate data points for the chart
//         const pricePoints = []
//         const profitPoints = []
//         const revenuePoints = []
//         const currentPriceIndex = [] // To mark the current price point

//         const originalPrice = Number(data.sellingPrice)
//         const costPerUnit = Number(data.purchasePrice)
//         const quantityLeft = Number(data.quantityLeft)

//         // Generate data points from -30% to +50% of current price
//         for (let i = -30; i <= 50; i += 5) {
//           const adjustedPrice = originalPrice * (1 + i / 100)
//           const adjustedRevenue = adjustedPrice * quantityLeft
//           const adjustedProfit = adjustedRevenue - costPerUnit * quantityLeft

//           pricePoints.push(i)
//           revenuePoints.push(adjustedRevenue)
//           profitPoints.push(adjustedProfit)

//           // Find the closest point to mark as current
//           if (Math.abs(i - currentAdjustment) <= 2.5) {
//             currentPriceIndex.push(adjustedRevenue)
//           } else {
//             currentPriceIndex.push(null)
//           }
//         }

//         const chart = new Chart(ctx, {
//           type: "line",
//           data: {
//             labels: pricePoints.map((p) => `${p > 0 ? "+" : ""}${p}%`),
//             datasets: [
//               {
//                 label: "Potential Revenue",
//                 data: revenuePoints,
//                 borderColor: "#3B82F6",
//                 backgroundColor: "rgba(59, 130, 246, 0.1)",
//                 borderWidth: 2,
//                 tension: 0.3,
//                 fill: false,
//               },
//               {
//                 label: "Potential Profit",
//                 data: profitPoints,
//                 borderColor: "#10B981",
//                 backgroundColor: "rgba(16, 185, 129, 0.1)",
//                 borderWidth: 2,
//                 tension: 0.3,
//                 fill: false,
//               },
//               {
//                 label: "Current Selection",
//                 data: currentPriceIndex,
//                 borderColor: "#ef4444",
//                 backgroundColor: "#ef4444",
//                 borderWidth: 0,
//                 pointRadius: 6,
//                 pointHoverRadius: 8,
//                 pointStyle: "circle",
//                 showLine: false,
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//               legend: {
//                 position: "bottom",
//               },
//               tooltip: {
//                 callbacks: {
//                   label: (context) => {
//                     const value = context.raw
//                     if (context.datasetIndex === 2) {
//                       return `Selected Price Point`
//                     }
//                     return `${context.dataset.label}: $${value.toFixed(2)}`
//                   },
//                   title: (items) => {
//                     return `Price Change: ${items[0].label}`
//                   },
//                 },
//               },
//             },
//             scales: {
//               y: {
//                 beginAtZero: true,
//                 grid: {
//                   display: true,
//                   drawBorder: false,
//                 },
//                 ticks: {
//                   callback: (value) => "$" + value,
//                 },
//               },
//               x: {
//                 grid: {
//                   display: false,
//                   drawBorder: false,
//                 },
//                 title: {
//                   display: true,
//                   text: "Price Adjustment",
//                 },
//               },
//             },
//             animation: false,
//           },
//         })

//         chartInstances.current.priceSimulation = chart
//         setChartsRendered((prev) => ({ ...prev, priceSimulation: true }))
//         return chart
//       } catch (error) {
//         console.error("Error rendering price simulation chart:", error)
//         toast({
//           variant: "destructive",
//           title: "Chart Error",
//           description: "There was an error rendering the price simulation chart. Please try again.",
//         })
//         return null
//       }
//     },
//     [data, toast],
//   )

//   // Calculate simulation results when price adjustment changes
//   useEffect(() => {
//     if (!data || !data.quantityLeft) return

//     if (Number(data.quantityLeft) > 0) {
//       const originalPrice = Number(data.sellingPrice)
//       const newPrice = originalPrice * (1 + priceAdjustment / 100)
//       const quantityLeft = Number(data.quantityLeft)
//       const costPerUnit = Number(data.purchasePrice)

//       const originalPotentialRevenue = originalPrice * quantityLeft
//       const newPotentialRevenue = newPrice * quantityLeft

//       const originalPotentialProfit = originalPotentialRevenue - costPerUnit * quantityLeft
//       const newPotentialProfit = newPotentialRevenue - costPerUnit * quantityLeft

//       const profitIncrease = newPotentialProfit - originalPotentialProfit
//       const profitIncreasePercent = originalPotentialProfit !== 0 ? (profitIncrease / originalPotentialProfit) * 100 : 0

//       setSimulationResults({
//         newPrice,
//         potentialRevenue: newPotentialRevenue,
//         potentialProfit: newPotentialProfit,
//         profitIncrease,
//         profitIncreasePercent,
//       })
//     }
//     // Intentionally omitting renderPriceSimulationChart from dependencies
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [priceAdjustment, data])

//   // Handle tab changes and initial chart rendering
//   useEffect(() => {
//     if (!data) return

//     // Separate effect for rendering charts based on active tab
//     const renderChartsForActiveTab = () => {
//       if (activeTab === "overview") {
//         renderPieChart()
//         renderBarChart()
//       } else if (activeTab === "inventory") {
//         renderInventoryChart()
//         if (Number(data.quantityLeft) > 0) {
//           renderPriceSimulationChart(priceAdjustment)
//         }
//       }
//     }

//     // Use a timeout to ensure DOM is ready
//     const timer = setTimeout(renderChartsForActiveTab, 100)

//     return () => clearTimeout(timer)
//     // Intentionally including the memoized render functions in dependencies
//   }, [
//     data,
//     activeTab,
//     priceAdjustment,
//     renderPieChart,
//     renderBarChart,
//     renderInventoryChart,
//     renderPriceSimulationChart,
//   ])

//   // Render price simulation chart when on inventory tab and price adjustment changes
//   useEffect(() => {
//     if (!data || activeTab !== "inventory" || !priceSimulationChartRef.current) return

//     if (Number(data.quantityLeft) > 0) {
//       renderPriceSimulationChart(priceAdjustment)
//     }
//   }, [activeTab, priceAdjustment, data, renderPriceSimulationChart])

//   // Clean up charts when component unmounts
//   useEffect(() => {
//     return () => {
//       // Copy the ref value to a variable to avoid the warning
//       const currentChartInstances = { ...chartInstances.current }

//       if (currentChartInstances.pie) currentChartInstances.pie.destroy()
//       if (currentChartInstances.bar) currentChartInstances.bar.destroy()
//       if (currentChartInstances.inventory) currentChartInstances.inventory.destroy()
//       if (currentChartInstances.priceSimulation) currentChartInstances.priceSimulation.destroy()
//     }
//   }, [])

//   if (!data) return null

//   return (
//     <div className="space-y-8">
//       <Tabs
//         defaultValue="overview"
//         value={activeTab}
//         onValueChange={(value) => {
//           setActiveTab(value)
//           // Reset charts rendered state when changing tabs
//           setChartsRendered({
//             pie: false,
//             bar: false,
//             inventory: false,
//             priceSimulation: false,
//           })
//         }}
//         className="w-full"
//       >
//         <TabsList className="w-full grid grid-cols-2 mb-6">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="inventory">Inventory</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
//                 <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <PieChart className="h-5 w-5 text-blue-500" />
//                     Cost and Profit Breakdown
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <div className="h-[300px] relative">
//                     <canvas ref={pieChartRef} height={300}></canvas>
//                     {!chartsRendered.pie && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                         <p className="text-gray-500">Loading chart...</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
//                 <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <BarChart className="h-5 w-5 text-blue-500" />
//                     Revenue, Costs, and Profit
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <div className="h-[300px] relative">
//                     <canvas ref={barChartRef} height={300}></canvas>
//                     {!chartsRendered.bar && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                         <p className="text-gray-500">Loading chart...</p>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </TabsContent>

//         <TabsContent value="inventory">
//           <div className="space-y-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
//                 <CardHeader className="bg-yellow-50 border-b border-yellow-100 p-4">
//                   <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <PieChart className="h-5 w-5 text-yellow-500" />
//                     Inventory Status
//                   </CardTitle>
//                   <p className="text-xs text-gray-500 mt-1">Based on your input data - not live tracking</p>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex justify-center items-center">
//                       <div className="h-[250px] w-full relative">
//                         <canvas ref={inventoryChartRef} height={250}></canvas>
//                         {!chartsRendered.inventory && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                             <p className="text-gray-500">Loading chart...</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="bg-blue-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Sold Units</p>
//                         <p className="text-2xl font-bold text-blue-700">
//                           {Number(data.quantity) - Number(data.quantityLeft)} units
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Value: $
//                           {(Number(data.sellingPrice) * (Number(data.quantity) - Number(data.quantityLeft))).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="bg-yellow-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Remaining Inventory</p>
//                         <p className="text-2xl font-bold text-yellow-700">{Number(data.quantityLeft)} units</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Potential Value: ${(Number(data.sellingPrice) * Number(data.quantityLeft)).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <p className="text-sm font-medium text-gray-600">Inventory Turnover</p>
//                         <p className="text-2xl font-bold text-green-700">
//                           {(
//                             ((Number(data.quantity) - Number(data.quantityLeft)) / Number(data.quantity)) *
//                             100
//                           ).toFixed(1)}
//                           %
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {Number(data.quantityLeft) === 0 ? "All inventory sold!" : "Percentage of inventory sold"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {Number(data.quantityLeft) > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//               >
//                 <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
//                   <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
//                     <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                       <TrendingUp className="h-5 w-5 text-blue-500" />
//                       Price Simulation for Remaining Inventory
//                     </CardTitle>
//                     <p className="text-xs text-gray-500 mt-1">Hypothetical scenarios based on your current data</p>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="space-y-6">
//                       <div className="space-y-2">
//                         <div className="flex justify-between items-center">
//                           <p className="text-sm font-medium text-gray-700">Adjust Selling Price</p>
//                           <Badge variant="outline" className="font-semibold">
//                             {priceAdjustment > 0 ? "+" : ""}
//                             {priceAdjustment}% (
//                             {priceAdjustment === 0
//                               ? "Current Price"
//                               : priceAdjustment > 0
//                                 ? "Price Increase"
//                                 : "Price Decrease"}
//                             )
//                           </Badge>
//                         </div>
//                         <div className="px-2">
//                           <Slider
//                             defaultValue={[0]}
//                             min={-30}
//                             max={50}
//                             step={1}
//                             value={[priceAdjustment]}
//                             onValueChange={(value) => {
//                               setPriceAdjustment(value[0])
//                             }}
//                             className="py-4"
//                           />
//                           <div className="flex justify-between text-xs text-gray-500 mt-1">
//                             <span>-30%</span>
//                             <span>Current Price</span>
//                             <span>+50%</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <DollarSign className="h-4 w-4 text-blue-500" />
//                             New Price per Unit
//                           </p>
//                           <p className="text-2xl font-bold text-blue-600">${simulationResults.newPrice.toFixed(2)}</p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             Original: ${Number(data.sellingPrice).toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <DollarSign className="h-4 w-4 text-green-500" />
//                             Potential Revenue
//                           </p>
//                           <p className="text-2xl font-bold text-green-600">
//                             ${simulationResults.potentialRevenue.toFixed(2)}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">From {Number(data.quantityLeft)} units</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                           <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
//                             <Percent className="h-4 w-4 text-purple-500" />
//                             Profit Change
//                           </p>
//                           <p
//                             className={`text-2xl font-bold ${simulationResults.profitIncrease >= 0 ? "text-green-600" : "text-red-600"}`}
//                           >
//                             {simulationResults.profitIncreasePercent > 0 ? "+" : ""}
//                             {simulationResults.profitIncreasePercent.toFixed(1)}%
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">${simulationResults.profitIncrease.toFixed(2)}</p>
//                         </div>
//                       </div>

//                       <div className="h-[250px] relative mt-4">
//                         <canvas ref={priceSimulationChartRef} height={250}></canvas>
//                         {!chartsRendered.priceSimulation && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
//                             <p className="text-gray-500">Loading chart...</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default ChartsSection

/* eslint-disable */
// @ts-nocheck
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BarChart,
  PieChart,
  TrendingUp,
  DollarSign,
  Percent,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type {
  ChartType,
  ChartData as ChartJsData,
  TooltipItem,
} from "chart.js";

// Define Chart.js tooltip context type
type TooltipContext = {
  raw: unknown;
  parsed: unknown;
  formattedValue: string;
  dataset: ChartJsData<"bar" | "pie" | "doughnut" | "line">["datasets"][0];
  datasetIndex: number;
  dataIndex: number;
};

// Define the type for the data prop
interface ChartData {
  inventoryValue: string | number;
  purchasePrice: string | number;
  quantity: string | number;
  quantityLeft: string | number;
  operationalCosts?: string | number;
  profit: string | number;
  totalRevenue: string | number;
  totalCost: string | number;
  sellingPrice: string | number;
}

// Define Chart module type
interface ChartModule {
  default: {
    new (
      ctx: CanvasRenderingContext2D,
      config: {
        type: string;
        data: unknown;
        options?: unknown;
      }
    ): ChartType;
  };
}

// Apply the type to the component props
const ChartsSection = ({ data }: { data: ChartData }) => {
  const { toast } = useToast();
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const inventoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const priceSimulationChartRef = useRef<HTMLCanvasElement | null>(null);

  // Track if charts have been rendered
  const [chartsRendered, setChartsRendered] = useState({
    pie: false,
    bar: false,
    inventory: false,
    priceSimulation: false,
  });

  // Track if Chart.js is loaded
  const [chartJsLoaded, setChartJsLoaded] = useState(false);
  const [Chart, setChart] = useState<ChartModule["default"] | null>(null);

  // Track chart instances to destroy them before re-rendering
  const chartInstances = useRef<{
    pie: ChartType | null;
    bar: ChartType | null;
    inventory: ChartType | null;
    priceSimulation: ChartType | null;
  }>({
    pie: null,
    bar: null,
    inventory: null,
    priceSimulation: null,
  });

  // Track active tab to re-render charts when tab changes
  const [activeTab, setActiveTab] = useState("overview");

  // State for price simulation
  const [priceAdjustment, setPriceAdjustment] = useState(0); // 0% change by default
  const [simulationResults, setSimulationResults] = useState({
    newPrice: 0,
    potentialRevenue: 0,
    potentialProfit: 0,
    profitIncrease: 0,
    profitIncreasePercent: 0,
  });

  // Load Chart.js on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadChartJs = async () => {
        try {
          const chartModule = (await import(
            "chart.js/auto"
          )) as unknown as ChartModule;
          setChart(() => chartModule.default || chartModule);
          setChartJsLoaded(true);
        } catch (error) {
          console.error("Failed to load Chart.js:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "Failed to load chart library. Please refresh the page.",
          });
        }
      };

      loadChartJs();
    }
  }, [toast]);

  // Function to render the pie chart - memoized to prevent recreation on every render
  const renderPieChart = useCallback(() => {
    if (!pieChartRef.current || !data || !Chart) return null;

    try {
      const ctx = pieChartRef.current.getContext("2d");
      if (!ctx) return null;

      // Destroy existing chart if it exists
      if (chartInstances.current.pie) {
        chartInstances.current.pie.destroy();
      }

      // Use the pre-calculated values from data
      const inventoryValue = Number(data.inventoryValue);
      const productCost =
        Number(data.purchasePrice) *
        (Number(data.quantity) - Number(data.quantityLeft));
      const operationalCosts = Number(data.operationalCosts || 0);
      const profit = Number(data.profit);

      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: [
            "Product Cost (Sold)",
            "Operational Costs",
            "Remaining Inventory Value",
            "Profit",
          ],
          datasets: [
            {
              data: [productCost, operationalCosts, inventoryValue, profit],
              backgroundColor: ["#3B82F6", "#F59E0B", "#64748b", "#10B981"],
              borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipContext) => {
                  // Safely convert the unknown value to a number
                  const value =
                    typeof context.raw === "number" ? context.raw : 0;
                  return `$${value.toFixed(2)}`;
                },
              },
            },
          },
          animation: false, // Disable animation to prevent flickering
        },
      });

      chartInstances.current.pie = chart;
      setChartsRendered((prev) => ({ ...prev, pie: true }));
      return chart;
    } catch (error) {
      console.error("Error rendering pie chart:", error);
      toast({
        variant: "destructive",
        title: "Chart Error",
        description:
          "There was an error rendering the pie chart. Please try again.",
      });
      return null;
    }
  }, [data, toast, Chart]);

  // Function to render the bar chart - memoized to prevent recreation on every render
  const renderBarChart = useCallback(() => {
    if (!barChartRef.current || !data || !Chart) return null;

    try {
      const ctx = barChartRef.current.getContext("2d");
      if (!ctx) return null;

      // Destroy existing chart if it exists
      if (chartInstances.current.bar) {
        chartInstances.current.bar.destroy();
      }

      // Use the pre-calculated values from data
      const totalRevenue = Number(data.totalRevenue);
      const totalCost = Number(data.totalCost);
      const profit = Number(data.profit);

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Revenue", "Total Cost", "Profit"],
          datasets: [
            {
              data: [totalRevenue, totalCost, profit],
              backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
              borderColor: ["#2563EB", "#D97706", "#059669"],
              borderWidth: 1,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipContext) => {
                  // Safely convert the unknown value to a number
                  const value =
                    typeof context.raw === "number" ? context.raw : 0;
                  return `$${value.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                callback: (value) => "$" + value,
              },
            },
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
            },
          },
          animation: false, // Disable animation to prevent flickering
        },
      });

      chartInstances.current.bar = chart;
      setChartsRendered((prev) => ({ ...prev, bar: true }));
      return chart;
    } catch (error) {
      console.error("Error rendering bar chart:", error);
      toast({
        variant: "destructive",
        title: "Chart Error",
        description:
          "There was an error rendering the bar chart. Please try again.",
      });
      return null;
    }
  }, [data, toast, Chart]);

  // Function to render the inventory chart - memoized to prevent recreation on every render
  const renderInventoryChart = useCallback(() => {
    if (!inventoryChartRef.current || !data || !Chart) return null;

    try {
      const ctx = inventoryChartRef.current.getContext("2d");
      if (!ctx) return null;

      // Ensure we're using the correct values
      const quantitySold = Number(data.quantity) - Number(data.quantityLeft);
      const quantityLeft = Number(data.quantityLeft);

      // Destroy existing chart if it exists
      if (chartInstances.current.inventory) {
        chartInstances.current.inventory.destroy();
      }

      const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Sold", "Remaining"],
          datasets: [
            {
              data: [quantitySold, quantityLeft],
              backgroundColor: ["#3B82F6", "#F59E0B"],
              borderColor: ["#2563EB", "#D97706"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipContext) => {
                  // Safely convert the unknown value to a number
                  const value =
                    typeof context.raw === "number" ? context.raw : 0;
                  const quantity = Number(data.quantity);
                  return `${value} units (${((value / quantity) * 100).toFixed(
                    1
                  )}%)`;
                },
              },
            },
          },
          animation: false, // Disable animation to prevent flickering
        },
      });

      chartInstances.current.inventory = chart;
      setChartsRendered((prev) => ({ ...prev, inventory: true }));
      return chart;
    } catch (error) {
      console.error("Error rendering inventory chart:", error);
      toast({
        variant: "destructive",
        title: "Chart Error",
        description:
          "There was an error rendering the inventory chart. Please try again.",
      });
      return null;
    }
  }, [data, toast, Chart]);

  // Function to render the price simulation chart - memoized to prevent recreation on every render
  const renderPriceSimulationChart = useCallback(
    (currentAdjustment = 0) => {
      if (
        !priceSimulationChartRef.current ||
        !data ||
        Number(data.quantityLeft) <= 0 ||
        !Chart
      )
        return null;

      try {
        const ctx = priceSimulationChartRef.current.getContext("2d");
        if (!ctx) return null;

        // Destroy existing chart if it exists
        if (chartInstances.current.priceSimulation) {
          chartInstances.current.priceSimulation.destroy();
        }

        // Generate data points for the chart
        const pricePoints: number[] = [];
        const profitPoints: number[] = [];
        const revenuePoints: number[] = [];
        const currentPriceIndex: (number | null)[] = []; // To mark the current price point

        const originalPrice = Number(data.sellingPrice);
        const costPerUnit = Number(data.purchasePrice);
        const quantityLeft = Number(data.quantityLeft);

        // Generate data points from -30% to +50% of current price
        for (let i = -30; i <= 50; i += 5) {
          const adjustedPrice = originalPrice * (1 + i / 100);
          const adjustedRevenue = adjustedPrice * quantityLeft;
          const adjustedProfit = adjustedRevenue - costPerUnit * quantityLeft;

          pricePoints.push(i);
          revenuePoints.push(adjustedRevenue);
          profitPoints.push(adjustedProfit);

          // Find the closest point to mark as current
          if (Math.abs(i - currentAdjustment) <= 2.5) {
            currentPriceIndex.push(adjustedRevenue);
          } else {
            currentPriceIndex.push(null);
          }
        }

        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: pricePoints.map((p) => `${p > 0 ? "+" : ""}${p}%`),
            datasets: [
              {
                label: "Potential Revenue",
                data: revenuePoints,
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: false,
              },
              {
                label: "Potential Profit",
                data: profitPoints,
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: false,
              },
              {
                label: "Current Selection",
                data: currentPriceIndex,
                borderColor: "#ef4444",
                backgroundColor: "#ef4444",
                borderWidth: 0,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointStyle: "circle",
                showLine: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: (context: TooltipContext) => {
                    // Safely convert the unknown value to a number
                    const value =
                      typeof context.raw === "number" ? context.raw : 0;
                    if (context.datasetIndex === 2) {
                      return `Selected Price Point`;
                    }
                    return `${context.dataset.label}: $${value.toFixed(2)}`;
                  },
                  title: (items: TooltipItem<"line">[]) => {
                    return items.length > 0
                      ? `Price Change: ${items[0].label}`
                      : "";
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: true,
                  drawBorder: false,
                },
                ticks: {
                  callback: (value) => "$" + value,
                },
              },
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                title: {
                  display: true,
                  text: "Price Adjustment",
                },
              },
            },
            animation: false,
          },
        });

        chartInstances.current.priceSimulation = chart;
        setChartsRendered((prev) => ({ ...prev, priceSimulation: true }));
        return chart;
      } catch (error) {
        console.error("Error rendering price simulation chart:", error);
        toast({
          variant: "destructive",
          title: "Chart Error",
          description:
            "There was an error rendering the price simulation chart. Please try again.",
        });
        return null;
      }
    },
    [data, toast, Chart]
  );

  // Calculate simulation results when price adjustment changes
  useEffect(() => {
    if (!data || !data.quantityLeft) return;

    if (Number(data.quantityLeft) > 0) {
      const originalPrice = Number(data.sellingPrice);
      const newPrice = originalPrice * (1 + priceAdjustment / 100);
      const quantityLeft = Number(data.quantityLeft);
      const costPerUnit = Number(data.purchasePrice);

      const originalPotentialRevenue = originalPrice * quantityLeft;
      const newPotentialRevenue = newPrice * quantityLeft;

      const originalPotentialProfit =
        originalPotentialRevenue - costPerUnit * quantityLeft;
      const newPotentialProfit =
        newPotentialRevenue - costPerUnit * quantityLeft;

      const profitIncrease = newPotentialProfit - originalPotentialProfit;
      const profitIncreasePercent =
        originalPotentialProfit !== 0
          ? (profitIncrease / originalPotentialProfit) * 100
          : 0;

      setSimulationResults({
        newPrice,
        potentialRevenue: newPotentialRevenue,
        potentialProfit: newPotentialProfit,
        profitIncrease,
        profitIncreasePercent,
      });
    }
  }, [priceAdjustment, data]);

  // Handle tab changes and initial chart rendering
  useEffect(() => {
    if (!data || !chartJsLoaded) return;

    // Separate effect for rendering charts based on active tab
    const renderChartsForActiveTab = () => {
      if (activeTab === "overview") {
        renderPieChart();
        renderBarChart();
      } else if (activeTab === "inventory") {
        renderInventoryChart();
        if (Number(data.quantityLeft) > 0) {
          renderPriceSimulationChart(priceAdjustment);
        }
      }
    };

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(renderChartsForActiveTab, 300);

    return () => clearTimeout(timer);
  }, [
    data,
    activeTab,
    priceAdjustment,
    renderPieChart,
    renderBarChart,
    renderInventoryChart,
    renderPriceSimulationChart,
    chartJsLoaded,
  ]);

  // Render price simulation chart when on inventory tab and price adjustment changes
  useEffect(() => {
    if (
      !data ||
      activeTab !== "inventory" ||
      !priceSimulationChartRef.current ||
      !chartJsLoaded
    )
      return;

    if (Number(data.quantityLeft) > 0) {
      renderPriceSimulationChart(priceAdjustment);
    }
  }, [
    activeTab,
    priceAdjustment,
    data,
    renderPriceSimulationChart,
    chartJsLoaded,
  ]);

  // Clean up charts when component unmounts
  useEffect(() => {
    return () => {
      // Copy the ref value to a variable to avoid the warning
      const currentChartInstances = { ...chartInstances.current };

      if (currentChartInstances.pie) currentChartInstances.pie.destroy();
      if (currentChartInstances.bar) currentChartInstances.bar.destroy();
      if (currentChartInstances.inventory)
        currentChartInstances.inventory.destroy();
      if (currentChartInstances.priceSimulation)
        currentChartInstances.priceSimulation.destroy();
    };
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          // Reset charts rendered state when changing tabs
          setChartsRendered({
            pie: false,
            bar: false,
            inventory: false,
            priceSimulation: false,
          });
        }}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
                <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    Cost and Profit Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] relative">
                    <canvas ref={pieChartRef} height={300}></canvas>
                    {!chartsRendered.pie && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
                        <p className="text-gray-500">
                          {chartJsLoaded
                            ? "Rendering chart..."
                            : "Loading chart library..."}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none h-full">
                <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-blue-500" />
                    Revenue, Costs, and Profit
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] relative">
                    <canvas ref={barChartRef} height={300}></canvas>
                    {!chartsRendered.bar && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
                        <p className="text-gray-500">
                          {chartJsLoaded
                            ? "Rendering chart..."
                            : "Loading chart library..."}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
                <CardHeader className="bg-yellow-50 border-b border-yellow-100 p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-yellow-500" />
                    Inventory Status
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on your input data - not live tracking
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center items-center">
                      <div className="h-[250px] w-full relative">
                        <canvas ref={inventoryChartRef} height={250}></canvas>
                        {!chartsRendered.inventory && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
                            <p className="text-gray-500">
                              {chartJsLoaded
                                ? "Rendering chart..."
                                : "Loading chart library..."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">
                          Sold Units
                        </p>
                        <p className="text-2xl font-bold text-blue-700">
                          {Number(data.quantity) - Number(data.quantityLeft)}{" "}
                          units
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Value: $
                          {(
                            Number(data.sellingPrice) *
                            (Number(data.quantity) - Number(data.quantityLeft))
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">
                          Remaining Inventory
                        </p>
                        <p className="text-2xl font-bold text-yellow-700">
                          {Number(data.quantityLeft)} units
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Potential Value: $
                          {(
                            Number(data.sellingPrice) *
                            Number(data.quantityLeft)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">
                          Inventory Turnover
                        </p>
                        <p className="text-2xl font-bold text-green-700">
                          {(
                            ((Number(data.quantity) -
                              Number(data.quantityLeft)) /
                              Number(data.quantity)) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {Number(data.quantityLeft) === 0
                            ? "All inventory sold!"
                            : "Percentage of inventory sold"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {Number(data.quantityLeft) > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
                  <CardHeader className="bg-blue-50 border-b border-blue-100 p-4">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Price Simulation for Remaining Inventory
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Hypothetical scenarios based on your current data
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-700">
                            Adjust Selling Price
                          </p>
                          <Badge variant="outline" className="font-semibold">
                            {priceAdjustment > 0 ? "+" : ""}
                            {priceAdjustment}% (
                            {priceAdjustment === 0
                              ? "Current Price"
                              : priceAdjustment > 0
                              ? "Price Increase"
                              : "Price Decrease"}
                            )
                          </Badge>
                        </div>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0]}
                            min={-30}
                            max={50}
                            step={1}
                            value={[priceAdjustment]}
                            onValueChange={(value) => {
                              setPriceAdjustment(value[0]);
                            }}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>-30%</span>
                            <span>Current Price</span>
                            <span>+50%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-blue-500" />
                            New Price per Unit
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${simulationResults.newPrice.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Original: ${Number(data.sellingPrice).toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Potential Revenue
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            ${simulationResults.potentialRevenue.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            From {Number(data.quantityLeft)} units
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <Percent className="h-4 w-4 text-purple-500" />
                            Profit Change
                          </p>
                          <p
                            className={`text-2xl font-bold ${
                              simulationResults.profitIncrease >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {simulationResults.profitIncreasePercent > 0
                              ? "+"
                              : ""}
                            {simulationResults.profitIncreasePercent.toFixed(1)}
                            %
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            ${simulationResults.profitIncrease.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="h-[250px] relative mt-4">
                        <canvas
                          ref={priceSimulationChartRef}
                          height={250}
                        ></canvas>
                        {!chartsRendered.priceSimulation && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
                            <p className="text-gray-500">
                              {chartJsLoaded
                                ? "Rendering chart..."
                                : "Loading chart library..."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartsSection;
