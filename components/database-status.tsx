// "use client"

// import { useState, useEffect } from "react"
// import { supabase } from "@/lib/supabase"
// import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

// export default function DatabaseStatus() {
//   const [status, setStatus] = useState<"checking" | "connected" | "error" | "empty">("checking")
//   const [productCount, setProductCount] = useState<number>(0)
//   const [error, setError] = useState<string>("")

//   const checkDatabaseStatus = async () => {
//     setStatus("checking")
//     setError("")

//     try {
//       console.log("🔍 Checking database connection...")

//       // Test basic connection
//       const { data: testData, error: testError } = await supabase
//         .from("products_data")
//         .select("count", { count: "exact", head: true })

//       if (testError) {
//         console.error("❌ Database connection error:", testError)
//         setError(testError.message)
//         setStatus("error")
//         return
//       }

//       const count = testData || 0
//       setProductCount(count)

//       if (count === 0) {
//         console.log("⚠️ Database connected but empty")
//         setStatus("empty")
//       } else {
//         console.log("✅ Database connected with", count, "products")
//         setStatus("connected")
//       }
//     } catch (err) {
//       console.error("❌ Database check failed:", err)
//       setError(err instanceof Error ? err.message : "Unknown error")
//       setStatus("error")
//     }
//   }

//   useEffect(() => {
//     checkDatabaseStatus()
//   }, [])

//   const getStatusIcon = () => {
//     switch (status) {
//       case "checking":
//         return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
//       case "connected":
//         return <CheckCircle className="w-5 h-5 text-green-500" />
//       case "error":
//         return <XCircle className="w-5 h-5 text-red-500" />
//       case "empty":
//         return <AlertCircle className="w-5 h-5 text-yellow-500" />
//       default:
//         return <Database className="w-5 h-5 text-gray-500" />
//     }
//   }

//   const getStatusMessage = () => {
//     switch (status) {
//       case "checking":
//         return "Checking database connection..."
//       case "connected":
//         return `Connected successfully! ${productCount.toLocaleString()} products found`
//       case "error":
//         return `Connection failed: ${error}`
//       case "empty":
//         return "Connected but no products found. Run the seed script to add sample data."
//       default:
//         return "Unknown status"
//     }
//   }

//   const getStatusColor = () => {
//     switch (status) {
//       case "connected":
//         return "bg-green-50 border-green-200 text-green-800"
//       case "error":
//         return "bg-red-50 border-red-200 text-red-800"
//       case "empty":
//         return "bg-yellow-50 border-yellow-200 text-yellow-800"
//       default:
//         return "bg-blue-50 border-blue-200 text-blue-800"
//     }
//   }

//   return (
//     <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
//       <div className="flex items-center space-x-3">
//         <Database className="w-6 h-6" />
//         <div className="flex-1">
//           <div className="flex items-center space-x-2 mb-1">
//             {getStatusIcon()}
//             <span className="font-semibold">Database Status</span>
//           </div>
//           <p className="text-sm">{getStatusMessage()}</p>
//           {status === "empty" && (
//             <p className="text-xs mt-2 opacity-75">
//               💡 Tip: Execute the SQL scripts in the sidebar to create and populate your database
//             </p>
//           )}
//         </div>
//         <button
//           onClick={checkDatabaseStatus}
//           className="p-2 rounded-lg hover:bg-black/5 transition-colors"
//           title="Refresh status"
//         >
//           <RefreshCw className={`w-4 h-4 ${status === "checking" ? "animate-spin" : ""}`} />
//         </button>
//       </div>
//     </div>
//   )
// }


"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

export default function DatabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error" | "empty">("checking")
  const [productCount, setProductCount] = useState<number>(0)
  const [error, setError] = useState<string>("")

  const checkDatabaseStatus = async () => {
    setStatus("checking")
    setError("")

    try {
      console.log("🔍 Checking database connection...")

      // Test basic connection
      const { data: testData, error: testError, count } = await supabase
        .from("products_data")
        .select("*", { count: "exact", head: true })

      if (testError) {
        console.error("❌ Database connection error:", testError)
        setError(testError.message)
        setStatus("error")
        return
      }

      const actualCount = count || 0
      setProductCount(actualCount)

      if (actualCount === 0) {
        console.log("⚠️ Database connected but empty")
        setStatus("empty")
      } else {
        console.log("✅ Database connected with", actualCount, "products")
        setStatus("connected")
      }
    } catch (err) {
      console.error("❌ Database check failed:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setStatus("error")
    }
  }

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "empty":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <Database className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "checking":
        return "Checking database connection..."
      case "connected":
        return `Connected successfully! ${productCount.toLocaleString()} products found`
      case "error":
        return `Connection failed: ${error}`
      case "empty":
        return "Connected but no products found. Run the seed script to add sample data."
      default:
        return "Unknown status"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "empty":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        <Database className="w-6 h-6" />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            {getStatusIcon()}
            <span className="font-semibold">Database Status</span>
          </div>
          <p className="text-sm">{getStatusMessage()}</p>
          {status === "empty" && (
            <p className="text-xs mt-2 opacity-75">
              💡 Tip: Execute the SQL scripts in the sidebar to create and populate your database
            </p>
          )}
        </div>
        <button
          onClick={checkDatabaseStatus}
          className="p-2 rounded-lg hover:bg-black/5 transition-colors"
          title="Refresh status"
        >
          <RefreshCw className={`w-4 h-4 ${status === "checking" ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  )
}