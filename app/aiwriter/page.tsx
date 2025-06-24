
// "use client"

// import { useRef, useEffect, useState } from "react"
// import { useAuth, useUser } from "@clerk/nextjs"
// import { supabase } from "@/lib/supabase"
// import { v4 as uuidv4 } from "uuid"
// import { format } from "date-fns"

// // Import components from the local components folder
// import { Sidebar } from "./components/sidebar"
// import { ChatHeader } from "./components/chat-header"
// import { WelcomeSection } from "./components/welcome-section"
// import { ChatMessages } from "./components/chat-messages"
// import { ChatInput } from "./components/chat-input"
// import { MobileChatToggle } from "./components/mobile-chat-toggle"
// import { useAIWriter } from "./hooks/use-ai-writer"

// // Define types for our database entities
// interface Chat {
//     id: number
//     title: string
//     message_content: string
//     created_at: string
//     updated_at: string
// }

// interface Message {
//     id: number
//     chat_id: number
//     role: string
//     content: string
//     created_at: string
// }

// export default function AIWriterPage() {
//     const {
//         sidebarOpen,
//         setSidebarOpen,
//         chats,
//         activeChatId,
//         isLoadingChats,
//         isCreatingChat,
//         isDeletingChat,
//         chatMessages,
//         inputValue,
//         setInputValue,
//         isProcessing,
//         isSignedIn,
//         loadChatMessages,
//         createNewChat,
//         deleteChat,
//         handleSendMessage,
//     } = useAIWriter()

//     const { isSignedIn: originalIsSignedIn } = useAuth()
//     const { user } = useUser()
//     const [name, setName] = useState("")
//     const messagesEndRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
//         }
//     }, [chatMessages])

//     useEffect(() => {
//         const syncUserToSupabase = async () => {
//             if (!user) return

//             const clerkId = user.id
//             const fullName = user.fullName || user.firstName || "Anonymous"

//             const { data, error } = await supabase.from("users").select("name, id").eq("clerk_id", clerkId).single()

//             if (error && error.code !== "PGRST116") {
//                 console.error("User fetch error:", error.message)
//                 return
//             }

//             if (data) {
//                 setName(data.name)
//             } else {
//                 const { data: newUser, error: insertError } = await supabase
//                     .from("users")
//                     .insert([
//                         {
//                             id: uuidv4(),
//                             clerk_id: clerkId,
//                             name: fullName,
//                         },
//                     ])
//                     .select()

//                 if (!insertError && newUser) {
//                     setName(fullName)
//                 } else {
//                     console.error("Error creating user:", insertError)
//                 }
//             }
//         }

//         if (originalIsSignedIn && user) {
//             syncUserToSupabase()
//         }
//     }, [originalIsSignedIn, user])

//     const formatDate = (dateString: string) => {
//         try {
//             return format(new Date(dateString), "MMM d, yyyy")
//         } catch (e) {
//             return "Invalid date"
//         }
//     }

//     return (
//         <div className="min-h-screen bg-[#fffbeb] flex pt-16 sm:pt-20">
//             {/* Sidebar */}
//             <Sidebar
//                 sidebarOpen={sidebarOpen}
//                 setSidebarOpen={setSidebarOpen}
//                 chats={chats}
//                 activeChatId={activeChatId}
//                 isLoadingChats={isLoadingChats}
//                 isCreatingChat={isCreatingChat}
//                 isDeletingChat={isDeletingChat}
//                 isSignedIn={isSignedIn}
//                 onCreateNewChat={createNewChat}
//                 onLoadChatMessages={loadChatMessages}
//                 onDeleteChat={deleteChat}
//             />

//             {/* Main content */}
//             <div className="flex-1 flex flex-col min-w-0">
//                 {/* Mobile Chat Toggle - Only show on mobile */}
//                 <MobileChatToggle
//                     onToggleSidebar={() => setSidebarOpen(true)}
//                     chatCount={chats.length}
//                     hasActiveChat={!!activeChatId}
//                 />

//                 {/* Chat area */}
//                 <div className="flex-1 p-2 sm:p-4 md:p-8">
//                     {/* Welcome section - only show when no active chat */}
//                     {chatMessages.length === 0 && !activeChatId && <WelcomeSection />}

//                     {/* Chat container */}
//                     <div className="max-w-4xl mx-auto">
//                         <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-amber-200">
//                             {/* Chat header */}
//                             <ChatHeader title="AI Writer" subtitle="Create compelling content for your e-commerce business" />

//                             {/* Messages area */}
//                             <ChatMessages messages={chatMessages} />

//                             {/* Input area */}
//                             <ChatInput
//                                 inputValue={inputValue}
//                                 setInputValue={setInputValue}
//                                 isProcessing={isProcessing}
//                                 isSignedIn={isSignedIn}
//                                 onSubmit={handleSendMessage}
//                             />
//                         </div>

//                         {/* Footer note */}
//                         <div className="mt-3 sm:mt-4 text-center text-amber-700 text-xs sm:text-sm px-4">
//                             <p>Discover trending products, optimize descriptions with AI, and maximize profits all in one platform</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



"use client"

import { useRef, useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

// Import components from the local components folder
import { Sidebar } from "./components/sidebar"
import { ChatHeader } from "./components/chat-header"
import { WelcomeSection } from "./components/welcome-section"
import { ChatMessages } from "./components/chat-messages"
import { ChatInput } from "./components/chat-input"
import { MobileChatToggle } from "./components/mobile-chat-toggle"
import { useAIWriter } from "./hooks/use-ai-writer"

// Define types for our database entities
// interface Chat {
//     id: number
//     title: string
//     message_content: string
//     created_at: string
//     updated_at: string
// }

// interface Message {
//     id: number
//     chat_id: number
//     role: string
//     content: string
//     created_at: string
// }

export default function AIWriterPage() {
    const {
        sidebarOpen,
        setSidebarOpen,
        chats,
        activeChatId,
        isLoadingChats,
        isCreatingChat,
        isDeletingChat,
        chatMessages,
        inputValue,
        setInputValue,
        isProcessing,
        isSignedIn,
        loadChatMessages,
        createNewChat,
        deleteChat,
        handleSendMessage,
    } = useAIWriter()

    const { isSignedIn: originalIsSignedIn } = useAuth()
    const { user } = useUser()
    const [name, setName] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
     console.log("name", name);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [chatMessages])

    useEffect(() => {
        const syncUserToSupabase = async () => {
            if (!user) return

            const clerkId = user.id
            const fullName = user.fullName || user.firstName || "Anonymous"

            const { data, error } = await supabase.from("users").select("name, id").eq("clerk_id", clerkId).single()

            if (error && error.code !== "PGRST116") {
                console.error("User fetch error:", error.message)
                return
            }

            if (data) {
                setName(data.name)
            } else {
                const { data: newUser, error: insertError } = await supabase
                    .from("users")
                    .insert([
                        {
                            id: uuidv4(),
                            clerk_id: clerkId,
                            name: fullName,
                        },
                    ])
                    .select()

                if (!insertError && newUser) {
                    setName(fullName)
                } else {
                    console.error("Error creating user:", insertError)
                }
            }
        }

        if (originalIsSignedIn && user) {
            syncUserToSupabase()
        }
    }, [originalIsSignedIn, user])

    // const formatDate = (dateString: string) => {
    //     try {
    //         return format(new Date(dateString), "MMM d, yyyy")
    //     } catch (e) {
    //         return "Invalid date"
    //     }
    // }

    return (
        <div className="min-h-screen bg-[#fffbeb] flex pt-16 sm:pt-20">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                chats={chats}
                activeChatId={activeChatId}
                isLoadingChats={isLoadingChats}
                isCreatingChat={isCreatingChat}
                isDeletingChat={isDeletingChat}
                isSignedIn={isSignedIn}
                onCreateNewChat={createNewChat}
                onLoadChatMessages={loadChatMessages}
                onDeleteChat={deleteChat}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Chat Toggle - Only show on mobile */}
                <MobileChatToggle
                    onToggleSidebar={() => setSidebarOpen(true)}
                    chatCount={chats.length}
                    hasActiveChat={!!activeChatId}
                />

                {/* Chat area */}
                <div className="flex-1 p-2 sm:p-4 md:p-8">
                    {/* Welcome section - only show when no active chat */}
                    {chatMessages.length === 0 && !activeChatId && <WelcomeSection />}

                    {/* Chat container */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-amber-200">
                            {/* Chat header */}
                            <ChatHeader title="AI Writer" subtitle="Create compelling content for your e-commerce business" />

                            {/* Messages area */}
                            <ChatMessages messages={chatMessages} />

                            {/* Input area */}
                            <ChatInput
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                isProcessing={isProcessing}
                                isSignedIn={isSignedIn}
                                onSubmit={handleSendMessage}
                            />
                        </div>

                        {/* Footer note */}
                        <div className="mt-3 sm:mt-4 text-center text-amber-700 text-xs sm:text-sm px-4">
                            <p>Discover trending products, optimize descriptions with AI, and maximize profits all in one platform</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
