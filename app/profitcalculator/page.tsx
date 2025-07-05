/* eslint-disable */
// @ts-nocheck
"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultsSection from "./components/ResultsSection";
import ChartsSection from "./components/ChartsSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  BarChartIcon as ChartBar,
  TrendingUp,
  BarChart4,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function Dashboard() {
  const [calculationData, setCalculationData] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleCalculate = (data, validationPassed) => {
    if (!validationPassed) return;

    // Convert all input values to numbers to ensure consistent calculations
    const purchasePrice = Number(data.purchasePrice);
    const quantity = Number(data.quantity);
    const operationalCosts = Number(data.operationalCosts || 0);
    const sellingPrice = Number(data.sellingPrice);
    const quantityLeft =
      data.quantityLeft !== "" ? Number(data.quantityLeft) : 0;

    // Calculate derived values
    const quantitySold = quantity - quantityLeft;
    const totalCost = purchasePrice * quantity + operationalCosts;
    const totalRevenue = sellingPrice * quantitySold;
    const profit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const inventoryValue = purchasePrice * quantityLeft;
    const potentialRevenue = sellingPrice * quantityLeft;
    const potentialProfit = potentialRevenue - inventoryValue;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

    setCalculationData({
      ...data,
      purchasePrice,
      quantity,
      operationalCosts,
      sellingPrice,
      quantityLeft,
      quantitySold,
      totalCost,
      totalRevenue,
      profit,
      profitMargin,
      inventoryValue,
      potentialRevenue,
      potentialProfit,
      roi,
    });

    // Switch to results tab
    setActiveTab("results");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="relative bg-gradient-to-r from-blue-600 to-yellow-500 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/20 bg-[size:20px_20px] opacity-20"></div>
        <motion.div
          className="container mx-auto px-4 py-12 md:py-20 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Business Profit <br />
                <span className="text-yellow-300">Calculator Pro</span>
              </motion.h1>
              <motion.p
                className="text-blue-100 text-lg md:text-xl max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Make data-driven decisions for your business with our advanced
                profit analysis tool. Track sales, inventory, and maximize your
                returns.
              </motion.p>

              {/* Key Features Section */}
              <motion.div
                className="mt-6 grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 text-blue-100">
                  <Calculator className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Profit & ROI Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <ChartBar className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Visual Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <TrendingUp className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Price Simulation</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <BarChart4 className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Inventory Tracking</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="flex-1 flex justify-center md:justify-end"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-yellow-300/30 rounded-3xl blur-xl"></div>
                <Image
                  src="/imgProfit.jpg"
                  alt="Profit Estimator"
                  width={400}
                  height={320}
                  className="rounded-3xl shadow-2xl border-2 border-white/20 relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20 mb-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8"
        >
          {/* Feature Description */}
          {!calculationData && (
            <motion.div
              className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Profit Analysis
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate revenue, costs, profit margins, and ROI based on
                  your product data and sales information.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <BarChart4 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Visual Insights
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  View your business data through interactive charts showing
                  cost breakdown, revenue comparison, and more.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Price Simulation
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Test different pricing strategies for your remaining inventory
                  to maximize potential profits.
                </p>
              </div>
            </motion.div>
          )}

          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full grid grid-cols-2 mb-8">
              <TabsTrigger value="dashboard" className="text-sm sm:text-base">
                Input Details
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="text-sm sm:text-base"
                disabled={!calculationData}
              >
                Results & Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <InputForm onCalculate={handleCalculate} />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="results">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {calculationData && (
                  <>
                    <motion.div variants={itemVariants}>
                      <ResultsSection data={calculationData} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-8">
                      <ChartsSection data={calculationData} />
                    </motion.div>

                    {calculationData.quantityLeft > 0 && (
                      <motion.div variants={itemVariants} className="mt-8">
                        <Card className="bg-gradient-to-r from-blue-50 to-yellow-50 border-none shadow-md">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <h3 className="text-xl font-semibold text-gray-800">
                                Inventory Forecast
                              </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-sm font-medium text-gray-500 mb-1">
                                  Current Inventory
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                  {calculationData.quantityLeft} units
                                </p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-sm font-medium text-gray-500 mb-1">
                                  Inventory Value
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                {calculationData.inventoryValue.toFixed(2)}
                                </p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-sm font-medium text-gray-500 mb-1">
                                  Potential Revenue
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                {calculationData.potentialRevenue.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
