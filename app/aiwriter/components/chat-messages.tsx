// "use client"

// import { useRef, useEffect } from "react"
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface Message {
//   id: number
//   chat_id: number
//   role: string
//   content: string
//   created_at: string
// }

// interface ChatMessagesProps {
//   messages: Message[]
// }

// export function ChatMessages({ messages }: ChatMessagesProps) {
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
//     }
//   }, [messages])

//   if (messages.length === 0) {
//     return (
//       <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh] px-3 sm:px-4 py-4 sm:py-6">
//         <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
//           <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[45vh] text-center">
//             <div className="bg-amber-50 p-4 sm:p-6 rounded-xl border border-amber-200 max-w-sm sm:max-w-lg mx-4">
//               <div className="bg-amber-500 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 sm:h-8 sm:w-8 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">How can I help you today?</h3>
//               <p className="text-amber-800 text-sm sm:text-base leading-relaxed">
//                 Ask me to write product descriptions, marketing emails, or any content for your e-commerce business.
//               </p>
//             </div>
//           </div>
//         </div>
//       </ScrollArea>
//     )
//   }

//   return (
//     <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh] px-3 sm:px-4 py-4 sm:py-6">
//       <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
//         {messages.map((message) => (
//           <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-[90%] sm:max-w-[85%] group ${message.role === "user" ? "text-right" : ""}`}>
//               <div
//                 className={`inline-block rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm ${
//                   message.role === "user"
//                     ? "bg-amber-500 text-white"
//                     : "bg-amber-50 border border-amber-200 text-amber-900"
//                 }`}
//               >
//                 <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
//               </div>
//               <div className="mt-1 text-xs text-amber-700">{message.role === "user" ? "You" : "AI Writer"}</div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//     </ScrollArea>
//   )
// }



//accurate code with typewriting error.........
//responsive
// "use client"

// import { useEffect, useRef } from "react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// // import { useTypingEffect } from "../hooks/useTypingEffect"

// interface Message {
//   id: number
//   chat_id: number
//   role: string
//   content: string
//   created_at: string
// }

// interface ChatMessagesProps {
//   messages: Message[]
// }

// // function TypewriterText({ text }: { text: string }) {
// //   // const typed = useTypingEffect(text, 20)
// //   return (
// //     <p className="whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed">{typed}</p>
// //   )
// // }

// export function ChatMessages({ messages }: ChatMessagesProps) {
//   const scrollRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth"
//       })
//     }
//   }, [messages])

//   if (messages.length === 0) {
//     return (
//       <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh] px-3 sm:px-4 py-4 sm:py-6">
//         <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
//           <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[45vh] text-center">
//             <div className="bg-amber-50 p-4 sm:p-6 rounded-xl border border-amber-200 w-full max-w-xs sm:max-w-lg mx-4">
//               <div className="bg-amber-500 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 sm:h-8 sm:w-8 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">How can I help you today?</h3>
//               <p className="text-amber-800 text-sm sm:text-base leading-relaxed">
//                 Ask me to write product descriptions, marketing emails, or any content for your e-commerce business.
//               </p>
//             </div>
//           </div>
//         </div>
//       </ScrollArea>
//     )
//   }

//   return (
//     <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh] px-3 sm:px-4 py-4 sm:py-6">
//       <div
//         ref={scrollRef}
//         className="space-y-4 sm:space-y-6 px-1 sm:px-2 overflow-y-auto max-h-[60vh] transition-all duration-500 ease-in-out
//                    scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-white"
//       >
//         {messages.map((message) => (
//           <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`w-full max-w-[90%] sm:max-w-[85%] group ${message.role === "user" ? "text-right" : ""}`}>
//               <div
//                 className={`inline-block w-full break-words whitespace-pre-wrap rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-all duration-300
//                             ${message.role === "user"
//                     ? "bg-amber-500 text-white"
//                     : "bg-amber-50 border border-amber-200 text-amber-900"
//                   }`}
//               >
//                 {message.role === "assistant" ? (
//                   <TypewriterText text={message.content} />
//                 ) : (
//                   <p className="whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed">{message.content}</p>
//                 )}
//               </div>
//               <div className="mt-1 text-xs text-amber-700">{message.role === "user" ? "You" : "AI Writer"}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </ScrollArea>
//   )
// }


"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  chat_id: number
  role: string
  content: string
  created_at: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages])

  if (messages.length === 0) {
    return (
      <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh] px-3 sm:px-4 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
          <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[45vh] text-center">
            <div className="bg-amber-50 p-4 sm:p-6 rounded-xl border border-amber-200 w-full max-w-xs sm:max-w-lg mx-4">
              <div className="bg-amber-500 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">How can I help you today?</h3>
              <p className="text-amber-800 text-sm sm:text-base leading-relaxed">
                Ask me to write product descriptions, marketing emails, or any content for your e-commerce business.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh] px-3 sm:px-4 py-4 sm:py-6">
      <div
        ref={scrollRef}
        className="space-y-4 sm:space-y-6 px-1 sm:px-2 overflow-y-auto max-h-[60vh] transition-all duration-500 ease-in-out
                   scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-white"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`w-full max-w-[90%] sm:max-w-[85%] group ${message.role === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block w-full break-words whitespace-pre-wrap rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-all duration-300
                            ${message.role === "user"
                    ? "bg-amber-500 text-white"
                    : "bg-amber-50 border border-amber-200 text-amber-900"
                  }`}
              >
                <p className="whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed">{message.content}</p>
              </div>
              <div className="mt-1 text-xs text-amber-700">{message.role === "user" ? "You" : "AI Writer"}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}