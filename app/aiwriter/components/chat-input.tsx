// "use client"

// import type React from "react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Loader2, Send } from "lucide-react"

// interface ChatInputProps {
//   inputValue: string
//   setInputValue: (value: string) => void
//   isProcessing: boolean
//   isSignedIn: boolean
//   onSubmit: (e: React.FormEvent) => void
// }

// export function ChatInput({ inputValue, setInputValue, isProcessing, isSignedIn, onSubmit }: ChatInputProps) {
//   return (
//     <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-amber-100 border-t border-amber-200">
//       <form onSubmit={onSubmit} className="flex items-end space-x-2 sm:space-x-3">
//         <div className="flex-1">
//           <Input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type your message..."
//             disabled={isProcessing || !isSignedIn}
//             className="border-amber-300 focus-visible:ring-amber-500 text-amber-900 placeholder:text-amber-400 bg-white text-sm sm:text-base h-10 sm:h-11 resize-none"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault()
//                 onSubmit(e)
//               }
//             }}
//           />
//         </div>
//         <Button
//           type="submit"
//           disabled={isProcessing || !inputValue.trim() || !isSignedIn}
//           className="bg-amber-500 hover:bg-amber-600 text-white h-10 sm:h-11 px-3 sm:px-4 flex-shrink-0"
//           size="sm"
//         >
//           {isProcessing ? (
//             <>
//               <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
//               <span className="hidden sm:inline">Thinking...</span>
//             </>
//           ) : (
//             <>
//               <Send className="h-4 w-4 sm:mr-2" />
//               <span className="hidden sm:inline">Send</span>
//             </>
//           )}
//         </Button>
//       </form>
//     </div>
//   )
// }



"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send } from "lucide-react"

interface ChatInputProps {
  inputValue: string
  setInputValue: (value: string) => void
  isProcessing: boolean
  isSignedIn: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function ChatInput({
  inputValue,
  setInputValue,
  isProcessing,
  isSignedIn,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-amber-100 border-t border-amber-200">
      <form
        onSubmit={onSubmit}
        className="flex items-end space-x-2 sm:space-x-3"
      >
        <div className="flex-1">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isProcessing || !isSignedIn}
            className="w-full border-amber-300 focus-visible:ring-amber-500 text-amber-900 placeholder:text-amber-400 bg-white 
                       text-sm sm:text-base min-h-[44px] max-h-[120px] resize-none overflow-y-auto 
                       pr-10 break-words break-all rounded-md px-3 py-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onSubmit(e)
              }
            }}
            rows={1}
          />
        </div>

        <Button
          type="submit"
          disabled={isProcessing || !inputValue.trim() || !isSignedIn}
          className="bg-amber-500 hover:bg-amber-600 text-white h-10 sm:h-11 px-3 sm:px-4 flex-shrink-0"
          size="sm"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
              <span className="hidden sm:inline">Thinking...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Send</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
