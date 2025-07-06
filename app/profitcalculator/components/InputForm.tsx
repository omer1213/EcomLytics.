/* eslint-disable */
// @ts-nocheck
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  Package,
  ShoppingCart,
  Building,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InputForm = ({ onCalculate }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    purchasePrice: "",
    quantity: "",
    quantityLeft: "",
    sellingPrice: "",
    operationalCosts: "",
  });

  const [errors, setErrors] = useState({
    purchasePrice: "",
    quantity: "",
    quantityLeft: "",
    sellingPrice: "",
    operationalCosts: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (showToast = true) => {
    let isValid = true;
    const newErrors = {
      purchasePrice: "",
      quantity: "",
      quantityLeft: "",
      sellingPrice: "",
      operationalCosts: "",
    };

    // Validation rules
    if (formData.purchasePrice === "") {
      newErrors.purchasePrice = "Purchase price is required";
      isValid = false;
    } else if (Number(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = "Purchase price must be greater than zero";
      isValid = false;
    }

    if (formData.quantity === "") {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    } else if (Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than zero";
      isValid = false;
    }

    if (formData.quantityLeft !== "" && Number(formData.quantityLeft) < 0) {
      newErrors.quantityLeft = "Quantity left cannot be negative";
      isValid = false;
    } else if (
      formData.quantityLeft !== "" &&
      formData.quantity !== "" &&
      Number(formData.quantityLeft) > Number(formData.quantity)
    ) {
      newErrors.quantityLeft = "Quantity left cannot exceed total quantity";
      isValid = false;
    }

    if (formData.sellingPrice === "") {
      newErrors.sellingPrice = "Selling price is required";
      isValid = false;
    } else if (Number(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = "Selling price must be greater than zero";
      isValid = false;
    }

    if (
      formData.operationalCosts !== "" &&
      Number(formData.operationalCosts) < 0
    ) {
      newErrors.operationalCosts = "Operational costs cannot be negative";
      isValid = false;
    }

    setErrors(newErrors);

    // Show toast for the first error
    if (!isValid && showToast) {
      const firstError = Object.values(newErrors).find((error) => error !== "");
      if (firstError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: firstError,
        });
      }
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values
    let sanitizedValue = value;
    if (name !== "quantityLeft" && Number(value) < 0) {
      sanitizedValue = "0";
    }

    // For quantity left, ensure it's not greater than quantity
    if (
      name === "quantityLeft" &&
      formData.quantity !== "" &&
      Number(value) > Number(formData.quantity)
    ) {
      sanitizedValue = formData.quantity;
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Quantity left cannot exceed total quantity",
      });
    }

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const isValid = validateForm(true);

    if (isValid) {
      // Convert empty operational costs to 0
      const processedData = {
        ...formData,
        operationalCosts:
          formData.operationalCosts === "" ? "0" : formData.operationalCosts,
      };

      onCalculate(processedData, true);

      toast({
        title: "Calculation Complete",
        description: "Your profit analysis has been calculated successfully.",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      purchasePrice: "",
      quantity: "",
      quantityLeft: "",
      sellingPrice: "",
      operationalCosts: "",
    });
    setErrors({
      purchasePrice: "",
      quantity: "",
      quantityLeft: "",
      sellingPrice: "",
      operationalCosts: "",
    });
    setFormSubmitted(false);

    toast({
      title: "Form Reset",
      description: "All input fields have been cleared.",
    });
  };

  return (
    <Card className="w-full overflow-hidden border-none shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Package className="h-5 w-5" />
          Enter Product Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="purchasePrice"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  {/* <DollarSign className="h-4 w-4 text-blue-500" /> */}
                  Purchase Price per Unit
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    Rs.
                  </span>
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    id="purchasePrice"
                    name="purchasePrice"
                    placeholder="10.00"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className={`pl-8 bg-gray-50 border-gray-200 focus:border-blue-500 transition-all ${
                      formSubmitted && errors.purchasePrice
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    required
                  />
                </div>
                {formSubmitted && errors.purchasePrice && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.purchasePrice}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sellingPrice"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  {/* <DollarSign className="h-4 w-4 text-blue-500" /> */}
                  Selling Price per Unit
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    Rs.
                  </span>
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    id="sellingPrice"
                    name="sellingPrice"
                    placeholder="25.00"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className={`pl-8 bg-gray-50 border-gray-200 focus:border-blue-500 transition-all ${
                      formSubmitted && errors.sellingPrice
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    required
                  />
                </div>
                {formSubmitted && errors.sellingPrice && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.sellingPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Package className="h-4 w-4 text-yellow-500" />
                  Total Quantity Purchased
                </Label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  id="quantity"
                  name="quantity"
                  placeholder="100"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`bg-gray-50 border-gray-200 focus:border-blue-500 transition-all ${
                    formSubmitted && errors.quantity
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  required
                />
                {formSubmitted && errors.quantity && (
                  <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="quantityLeft"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4 text-yellow-500" />
                  Current Inventory (Unsold Units)
                  <span className="ml-1 text-xs text-gray-500 font-normal">
                    (one-time calculation)
                  </span>
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  id="quantityLeft"
                  name="quantityLeft"
                  placeholder="0"
                  value={formData.quantityLeft}
                  onChange={handleChange}
                  className={`bg-gray-50 border-gray-200 focus:border-blue-500 transition-all ${
                    formSubmitted && errors.quantityLeft
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                {formSubmitted && errors.quantityLeft ? (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.quantityLeft}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Enter current unsold units for profit projection
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="operationalCosts"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Building className="h-4 w-4 text-blue-500" />
                Operational Costs (Shipping, Fees, etc.)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                   Rs.
                </span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  id="operationalCosts"
                  name="operationalCosts"
                  placeholder="50.00"
                  value={formData.operationalCosts}
                  onChange={handleChange}
                  className={`pl-8 bg-gray-50 border-gray-200 focus:border-blue-500 transition-all ${
                    formSubmitted && errors.operationalCosts
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formSubmitted && errors.operationalCosts && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.operationalCosts}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300"
              onClick={resetForm}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-2"
              >
                Calculate
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputForm;
