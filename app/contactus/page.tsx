// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
// import { Toaster, toast } from "react-hot-toast"

// export default function ContactPageLightYellow() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [message, setMessage] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const loadingToast = toast.loading("Sending message...")

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, message }),
//       })

//       if (res.ok) {
//         toast.success("Message sent successfully!", { id: loadingToast })
//       } else {
//         throw new Error("Failed to send message")
//       }
//     } catch (error) {
//       toast.error("Failed to send message. Please try again.", { id: loadingToast })
//     }

//     // Clear fields regardless of success or failure
//     setName("")
//     setEmail("")
//     setMessage("")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 5000,
//           style: {
//             background: "#333",
//             color: "#fff",
//             padding: "16px",
//             borderRadius: "10px",
//             fontSize: "16px",
//             maxWidth: "350px",
//             boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
//           },
//           success: {
//             style: {
//               background: "green",
//             },
//             iconTheme: {
//               primary: "white",
//               secondary: "green",
//             },
//           },
//           error: {
//             style: {
//               background: "red",
//             },
//             iconTheme: {
//               primary: "white",
//               secondary: "red",
//             },
//           },
//         }}
//       />
//       <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">
//         <div className="md:w-1/2 space-y-6">
//           <div>
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Get in Touch</h2>
//             <p className="text-lg text-gray-600">We're here to help and answer any question you might have.</p>
//           </div>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Name
//               </label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="w-full px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-yellow-300 focus:border-yellow-300"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="w-full px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-yellow-300 focus:border-yellow-300"
//                 placeholder="john@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                 Message
//               </label>
//               <Textarea
//                 id="message"
//                 name="message"
//                 required
//                 className="w-full px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-yellow-300 focus:border-yellow-300"
//                 placeholder="Your message here..."
//                 rows={4}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
//             >
//               Send Message
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//         <div className="md:w-1/2 bg-yellow-50 rounded-xl p-6 space-y-6 flex flex-col justify-between">
//           <div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
//             <div className="space-y-4">
//               <div className="flex items-center text-gray-700">
//                 <div className="bg-yellow-200 rounded-full p-2 mr-4">
//                   <Mail className="h-6 w-6 text-yellow-600" />
//                 </div>
//                 <span className="text-lg">contact@ecomlytics.com</span>
//               </div>
//               <div className="flex items-center text-gray-700">
//                 <div className="bg-yellow-200 rounded-full p-2 mr-4">
//                   <Phone className="h-6 w-6 text-yellow-600" />
//                 </div>
//                 <span className="text-lg">+923217934949</span>
//               </div>
//               <div className="flex items-center text-gray-700">
//                 <div className="bg-yellow-200 rounded-full p-2 mr-4">
//                   <MapPin className="h-6 w-6 text-yellow-600" />
//                 </div>
//                 <span className="text-lg">National Textile University</span>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6">
//             <div className="bg-yellow-100 rounded-lg p-4">
//               <h4 className="text-lg font-semibold text-gray-800 mb-2">Office Hours</h4>
//               <p className="text-gray-700">Monday - Friday: 9am - 5pm</p>
//               <p className="text-gray-700">Saturday: 10am - 2pm</p>
//               <p className="text-gray-700">Sunday: Closed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Toaster, toast } from "react-hot-toast"

export default function ContactPageLightYellow() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const loadingToast = toast.loading("Sending message...")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        toast.success("Message sent successfully!", { id: loadingToast })
      } else {
        throw new Error()
      }
    } catch {
      toast.error("Failed to send message. Please try again.", { id: loadingToast })
    }

    // Clear fields regardless of success or failure
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
            fontSize: "16px",
            maxWidth: "350px",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
          },
          success: {
            style: {
              background: "green",
            },
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          },
        }}
      />
      <div className="mt-14 max-w-4xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-6">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-lg text-gray-600">We&apos;re here to help and answer any question you might have.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-yellow-300 focus:border-yellow-300"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-yellow-300 focus:border-yellow-300"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                className="w-full px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-yellow-300 focus:border-yellow-300"
                placeholder="Your message here..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              Send Message
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
        <div className="md:w-1/2 bg-yellow-50 rounded-xl p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <div className="bg-yellow-200 rounded-full p-2 mr-4">
                  <Mail className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-lg">contact@ecomlytics.com</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="bg-yellow-200 rounded-full p-2 mr-4">
                  <Phone className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-lg">+923217934949</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="bg-yellow-200 rounded-full p-2 mr-4">
                  <MapPin className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-lg">National Textile University</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-yellow-100 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Office Hours</h4>
              <p className="text-gray-700">Monday - Friday: 9am - 5pm</p>
              <p className="text-gray-700">Saturday: 10am - 2pm</p>
              <p className="text-gray-700">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}