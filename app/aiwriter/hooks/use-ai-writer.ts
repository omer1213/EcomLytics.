// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useAuth, useUser } from "@clerk/nextjs"
// import { supabase } from "@/lib/supabase"
// import { v4 as uuidv4 } from "uuid"

// interface Chat {
//   id: number
//   title: string
//   message_content: string
//   created_at: string
//   updated_at: string
// }

// interface Message {
//   id: number
//   chat_id: number
//   role: string
//   content: string
//   created_at: string
// }

// export function useAIWriter() {
//   // State for sidebar
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [chats, setChats] = useState<Chat[]>([])
//   const [activeChatId, setActiveChatId] = useState<number | null>(null)
//   const [isLoadingChats, setIsLoadingChats] = useState(false)
//   const [isCreatingChat, setIsCreatingChat] = useState(false)
//   const [isDeletingChat, setIsDeletingChat] = useState(false)

//   // Chat messages and input
//   const [chatMessages, setChatMessages] = useState<Message[]>([])
//   const [inputValue, setInputValue] = useState("")
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Clerk authentication hooks
//   const { isSignedIn } = useAuth()
//   const { user } = useUser()

//   // State for user name from Supabase
//   const [name, setName] = useState("")

//   // Listen for header sidebar toggle event
//   useEffect(() => {
//     const handleToggleSidebar = () => {
//       setSidebarOpen((prev) => !prev)
//     }

//     window.addEventListener("toggleAIWriterSidebar", handleToggleSidebar)
//     return () => window.removeEventListener("toggleAIWriterSidebar", handleToggleSidebar)
//   }, [])

//   // Sync Clerk user into Supabase "users" table
//   useEffect(() => {
//     const syncUserToSupabase = async () => {
//       if (!user) return

//       const clerkId = user.id
//       const fullName = user.fullName || user.firstName || "Anonymous"

//       // Check if user already exists
//       const { data, error } = await supabase.from("users").select("name, id").eq("clerk_id", clerkId).single()

//       if (error && error.code !== "PGRST116") {
//         console.error("User fetch error:", error.message)
//         return
//       }

//       if (data) {
//         setName(data.name)
//         // Load user's chats after confirming user exists
//         fetchUserChats(data.id)
//       } else {
//         // Insert new user if not exists
//         const { data: newUser, error: insertError } = await supabase
//           .from("users")
//           .insert([
//             {
//               id: uuidv4(),
//               clerk_id: clerkId,
//               name: fullName,
//             },
//           ])
//           .select()

//         if (!insertError && newUser) {
//           setName(fullName)
//         } else {
//           console.error("Error creating user:", insertError)
//         }
//       }
//     }

//     if (isSignedIn && user) {
//       syncUserToSupabase()
//     }
//   }, [isSignedIn, user])

//   // Fetch user's chats
//   const fetchUserChats = async (userId: string) => {
//     setIsLoadingChats(true)
//     try {
//       const { data, error } = await supabase
//         .from("chats")
//         .select("*")
//         .eq("user_id", userId)
//         .order("updated_at", { ascending: false })

//       if (error) {
//         console.error("Error fetching chats:", error)
//         return
//       }

//       setChats(data || [])
//     } catch (error) {
//       console.error("Error in fetchUserChats:", error)
//     } finally {
//       setIsLoadingChats(false)
//     }
//   }

//   // Load chat messages
//   const loadChatMessages = async (chatId: number) => {
//     try {
//       const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("chat_id", chatId)
//         .order("created_at", { ascending: true })

//       if (error) {
//         console.error("Error loading messages:", error)
//         return
//       }

//       setChatMessages(data || [])
//       setActiveChatId(chatId)
//     } catch (error) {
//       console.error("Error in loadChatMessages:", error)
//     }
//   }

//   // Create a new chat
//   const createNewChat = async () => {
//     if (!user) return

//     setIsCreatingChat(true)
//     try {
//       const { data: userData, error: userError } = await supabase
//         .from("users")
//         .select("id")
//         .eq("clerk_id", user.id)
//         .single()

//       if (userError) {
//         console.error("Error fetching user ID:", userError)
//         return
//       }

//       const userId = userData.id

//       const { data, error } = await supabase
//         .from("chats")
//         .insert([
//           {
//             user_id: userId,
//             title: "New Conversation",
//             message_content: "",
//           },
//         ])
//         .select()

//       if (error) {
//         console.error("Error creating chat:", error)
//         return
//       }

//       if (data && data.length > 0) {
//         setChats([data[0], ...chats])
//         setActiveChatId(data[0].id)
//         setChatMessages([])
//       }
//     } catch (error) {
//       console.error("Error in createNewChat:", error)
//     } finally {
//       setIsCreatingChat(false)
//     }
//   }

//   // Delete a chat
//   const deleteChat = async (chatId: number, e: React.MouseEvent) => {
//     e.stopPropagation()

//     if (window.confirm("Are you sure you want to delete this conversation?")) {
//       setIsDeletingChat(true)
//       try {
//         const { error: messagesError } = await supabase.from("messages").delete().eq("chat_id", chatId)

//         if (messagesError) {
//           console.error("Error deleting messages:", messagesError)
//           return
//         }

//         const { error: chatError } = await supabase.from("chats").delete().eq("id", chatId)

//         if (chatError) {
//           console.error("Error deleting chat:", chatError)
//           return
//         }

//         setChats(chats.filter((chat) => chat.id !== chatId))

//         if (activeChatId === chatId) {
//           setChatMessages([])
//           setActiveChatId(null)
//         }
//       } catch (error) {
//         console.error("Error in deleteChat:", error)
//       } finally {
//         setIsDeletingChat(false)
//       }
//     }
//   }

//   // Handle sending a message
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!inputValue.trim() || isProcessing || !user) return

//     setIsProcessing(true)

//     try {
//       const { data: userData, error: userError } = await supabase
//         .from("users")
//         .select("id")
//         .eq("clerk_id", user.id)
//         .single()

//       if (userError) {
//         console.error("Error fetching user ID:", userError)
//         return
//       }

//       const userId = userData.id
//       let currentChatId = activeChatId

//       if (!currentChatId) {
//         const { data: newChat, error: chatError } = await supabase
//           .from("chats")
//           .insert([
//             {
//               user_id: userId,
//               title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
//               message_content: inputValue,
//             },
//           ])
//           .select()

//         if (chatError || !newChat || newChat.length === 0) {
//           console.error("Error creating new chat:", chatError)
//           return
//         }

//         currentChatId = newChat[0].id
//         setActiveChatId(currentChatId)
//         setChats([newChat[0], ...chats])
//       } else {
//         if (chatMessages.length === 0) {
//           const { error: updateError } = await supabase
//             .from("chats")
//             .update({
//               title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
//               message_content: inputValue,
//               updated_at: new Date().toISOString(),
//             })
//             .eq("id", currentChatId)

//           if (updateError) {
//             console.error("Error updating chat:", updateError)
//           } else {
//             setChats(
//               chats.map((chat) =>
//                 chat.id === currentChatId
//                   ? {
//                       ...chat,
//                       title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
//                       message_content: inputValue,
//                       updated_at: new Date().toISOString(),
//                     }
//                   : chat,
//               ),
//             )
//           }
//         } else {
//           const { error: updateError } = await supabase
//             .from("chats")
//             .update({
//               updated_at: new Date().toISOString(),
//             })
//             .eq("id", currentChatId)

//           if (updateError) {
//             console.error("Error updating chat timestamp:", updateError)
//           }
//         }
//       }

//       const userMessage = {
//         id: Date.now(),
//         chat_id: currentChatId,
//         role: "user",
//         content: inputValue,
//         created_at: new Date().toISOString(),
//       }

//       setChatMessages((prev) => [...prev, userMessage])

//       const { error: messageError } = await supabase.from("messages").insert([
//         {
//           chat_id: currentChatId,
//           role: "user",
//           content: inputValue,
//         },
//       ])

//       if (messageError) {
//         console.error("Error saving user message:", messageError)
//       }

//       const userPrompt = inputValue
//       setInputValue("")

//       const tempAiMessage = {
//         id: Date.now() + 1,
//         chat_id: currentChatId,
//         role: "AI Writer",
//         content: "Thinking...",
//         created_at: new Date().toISOString(),
//       }

//       setChatMessages((prev) => [...prev, tempAiMessage])

//       try {
//         const response = await fetch("/api/chat", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             prompt: userPrompt,
//             chatId: currentChatId,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error("Failed to get AI response")
//         }

//         const data = await response.json()
//         const aiResponse = data.text || "I'm sorry, I couldn't generate a response."

//         setChatMessages((prev) => {
//           if (
//             prev.length > 0 &&
//             prev[prev.length - 1].role === "AI Writer" &&
//             prev[prev.length - 1].content === "Thinking..."
//           ) {
//             return [
//               ...prev.slice(0, -1),
//               {
//                 id: tempAiMessage.id,
//                 chat_id: currentChatId,
//                 role: "AI Writer",
//                 content: aiResponse,
//                 created_at: new Date().toISOString(),
//               },
//             ]
//           }
//           return [
//             ...prev,
//             {
//               id: Date.now() + 1,
//               chat_id: currentChatId,
//               role: "AI Writer",
//               content: aiResponse,
//               created_at: new Date().toISOString(),
//             },
//           ]
//         })

//         setChats((prevChats) => {
//           const updatedChats = prevChats.map((chat) =>
//             chat.id === currentChatId ? { ...chat, updated_at: new Date().toISOString() } : chat,
//           )
//           return [...updatedChats].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
//         })
//       } catch (error) {
//         console.error("Error generating AI response:", error)
//         setChatMessages((prev) => {
//           if (
//             prev.length > 0 &&
//             prev[prev.length - 1].role === "AI Writer" &&
//             prev[prev.length - 1].content === "Thinking..."
//           ) {
//             return [
//               ...prev.slice(0, -1),
//               {
//                 id: tempAiMessage.id,
//                 chat_id: currentChatId,
//                 role: "AI Writer",
//                 content: "Sorry, I encountered an error while generating a response.",
//                 created_at: new Date().toISOString(),
//               },
//             ]
//           }
//           return [
//             ...prev,
//             {
//               id: Date.now() + 1,
//               chat_id: currentChatId,
//               role: "AI Writer",
//               content: "Sorry, I encountered an error while generating a response.",
//               created_at: new Date().toISOString(),
//             },
//           ]
//         })
//       }
//     } catch (error) {
//       console.error("Error in handleSendMessage:", error)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   return {
//     // State
//     sidebarOpen,
//     setSidebarOpen,
//     chats,
//     activeChatId,
//     isLoadingChats,
//     isCreatingChat,
//     isDeletingChat,
//     chatMessages,
//     inputValue,
//     setInputValue,
//     isProcessing,
//     isSignedIn,
//     name,

//     // Functions
//     loadChatMessages,
//     createNewChat,
//     deleteChat,
//     handleSendMessage,
//   }
// }



// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useAuth, useUser } from "@clerk/nextjs"
// import { supabase } from "@/lib/supabase"
// import { v4 as uuidv4 } from "uuid"

// interface Chat {
//   id: number
//   title: string
//   message_content: string
//   created_at: string
//   updated_at: string
// }

// interface Message {
//   id: number
//   chat_id: number
//   role: string
//   content: string
//   created_at: string
// }

// export function useAIWriter() {
//   // State for sidebar
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [chats, setChats] = useState<Chat[]>([])
//   const [activeChatId, setActiveChatId] = useState<number | null>(null)
//   const [isLoadingChats, setIsLoadingChats] = useState(false)
//   const [isCreatingChat, setIsCreatingChat] = useState(false)
//   const [isDeletingChat, setIsDeletingChat] = useState(false)

//   // Chat messages and input
//   const [chatMessages, setChatMessages] = useState<Message[]>([])
//   const [inputValue, setInputValue] = useState("")
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Clerk authentication hooks
//   const { isSignedIn } = useAuth()
//   const { user } = useUser()

//   // State for user name from Supabase
//   const [name, setName] = useState("")

//   // Listen for header sidebar toggle event
//   useEffect(() => {
//     const handleToggleSidebar = () => {
//       setSidebarOpen((prev) => !prev)
//     }

//     window.addEventListener("toggleAIWriterSidebar", handleToggleSidebar)
//     return () => window.removeEventListener("toggleAIWriterSidebar", handleToggleSidebar)
//   }, [])

//   // Sync Clerk user into Supabase "users" table
//   useEffect(() => {
//     const syncUserToSupabase = async () => {
//       if (!user) return

//       const clerkId = user.id
//       const fullName = user.fullName || user.firstName || "Anonymous"

//       // Check if user already exists
//       const { data, error } = await supabase.from("users").select("name, id").eq("clerk_id", clerkId).single()

//       if (error && error.code !== "PGRST116") {
//         console.error("User fetch error:", error.message)
//         return
//       }

//       if (data) {
//         setName(data.name)
//         // Load user's chats after confirming user exists
//         fetchUserChats(data.id)
//       } else {
//         // Insert new user if not exists
//         const { data: newUser, error: insertError } = await supabase
//           .from("users")
//           .insert([
//             {
//               id: uuidv4(),
//               clerk_id: clerkId,
//               name: fullName,
//             },
//           ])
//           .select()

//         if (!insertError && newUser) {
//           setName(fullName)
//         } else {
//           console.error("Error creating user:", insertError)
//         }
//       }
//     }

//     if (isSignedIn && user) {
//       syncUserToSupabase()
//     }
//   }, [isSignedIn, user])

//   // Fetch user's chats
//   const fetchUserChats = async (userId: string) => {
//     setIsLoadingChats(true)
//     try {
//       const { data, error } = await supabase
//         .from("chats")
//         .select("*")
//         .eq("user_id", userId)
//         .order("updated_at", { ascending: false })

//       if (error) {
//         console.error("Error fetching chats:", error)
//         return
//       }

//       setChats(data || [])
//     } catch (error) {
//       console.error("Error in fetchUserChats:", error)
//     } finally {
//       setIsLoadingChats(false)
//     }
//   }

//   // Load chat messages
//   const loadChatMessages = async (chatId: number) => {
//     try {
//       const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("chat_id", chatId)
//         .order("created_at", { ascending: true })

//       if (error) {
//         console.error("Error loading messages:", error)
//         return
//       }

//       setChatMessages(data || [])
//       setActiveChatId(chatId)
//     } catch (error) {
//       console.error("Error in loadChatMessages:", error)
//     }
//   }

//   // Create a new chat
//   const createNewChat = async () => {
//     if (!user) return

//     setIsCreatingChat(true)
//     try {
//       const { data: userData, error: userError } = await supabase
//         .from("users")
//         .select("id")
//         .eq("clerk_id", user.id)
//         .single()

//       if (userError) {
//         console.error("Error fetching user ID:", userError)
//         return
//       }

//       const userId = userData.id

//       const { data, error } = await supabase
//         .from("chats")
//         .insert([
//           {
//             user_id: userId,
//             title: "New Conversation",
//             message_content: "",
//           },
//         ])
//         .select()

//       if (error) {
//         console.error("Error creating chat:", error)
//         return
//       }

//       if (data && data.length > 0) {
//         setChats([data[0], ...chats])
//         setActiveChatId(data[0].id)
//         setChatMessages([])
//       }
//     } catch (error) {
//       console.error("Error in createNewChat:", error)
//     } finally {
//       setIsCreatingChat(false)
//     }
//   }

//   // Delete a chat
//   const deleteChat = async (chatId: number, e: React.MouseEvent) => {
//     e.stopPropagation()

//     if (window.confirm("Are you sure you want to delete this conversation?")) {
//       setIsDeletingChat(true)
//       try {
//         const { error: messagesError } = await supabase.from("messages").delete().eq("chat_id", chatId)

//         if (messagesError) {
//           console.error("Error deleting messages:", messagesError)
//           return
//         }

//         const { error: chatError } = await supabase.from("chats").delete().eq("id", chatId)

//         if (chatError) {
//           console.error("Error deleting chat:", chatError)
//           return
//         }

//         setChats(chats.filter((chat) => chat.id !== chatId))

//         if (activeChatId === chatId) {
//           setChatMessages([])
//           setActiveChatId(null)
//         }
//       } catch (error) {
//         console.error("Error in deleteChat:", error)
//       } finally {
//         setIsDeletingChat(false)
//       }
//     }
//   }

//   // Handle sending a message
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!inputValue.trim() || isProcessing || !user) return

//     setIsProcessing(true)

//     try {
//       const { data: userData, error: userError } = await supabase
//         .from("users")
//         .select("id")
//         .eq("clerk_id", user.id)
//         .single()

//       if (userError) {
//         console.error("Error fetching user ID:", userError)
//         return
//       }

//       const userId = userData.id
//       let currentChatId = activeChatId

//       if (!currentChatId) {
//         const { data: newChat, error: chatError } = await supabase
//           .from("chats")
//           .insert([
//             {
//               user_id: userId,
//               title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
//               message_content: inputValue,
//             },
//           ])
//           .select()

//         if (chatError || !newChat || newChat.length === 0) {
//           console.error("Error creating new chat:", chatError)
//           return
//         }

//         currentChatId = newChat[0].id
//         setActiveChatId(currentChatId)
//         setChats([newChat[0], ...chats])
//       } else {
//         if (chatMessages.length === 0) {
//           const { error: updateError } = await supabase
//             .from("chats")
//             .update({
//               title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
//               message_content: inputValue,
//               updated_at: new Date().toISOString(),
//             })
//             .eq("id", currentChatId)

//           if (updateError) {
//             console.error("Error updating chat:", updateError)
//           } else {
//             setChats(
//               chats.map((chat) =>
//                 chat.id === currentChatId
//                   ? {
//                     ...chat,
//                     title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
//                     message_content: inputValue,
//                     updated_at: new Date().toISOString(),
//                   }
//                   : chat,
//               ),
//             )
//           }
//         } else {
//           const { error: updateError } = await supabase
//             .from("chats")
//             .update({
//               updated_at: new Date().toISOString(),
//             })
//             .eq("id", currentChatId)

//           if (updateError) {
//             console.error("Error updating chat timestamp:", updateError)
//           }
//         }
//       }

//       const userMessage = {
//         id: Date.now(),
//         chat_id: currentChatId,
//         role: "user",
//         content: inputValue,
//         created_at: new Date().toISOString(),
//       }

//       setChatMessages((prev) => [...prev, userMessage])

//       const { error: messageError } = await supabase.from("messages").insert([
//         {
//           chat_id: currentChatId,
//           role: "user",
//           content: inputValue,
//         },
//       ])

//       if (messageError) {
//         console.error("Error saving user message:", messageError)
//       }

//       const userPrompt = inputValue
//       setInputValue("")

//       const tempAiMessage = {
//         id: Date.now() + 1,
//         chat_id: currentChatId,
//         role: "AI Writer",
//         content: "Thinking...",
//         created_at: new Date().toISOString(),
//       }

//       setChatMessages((prev) => [...prev, tempAiMessage])

//       try {
//         const response = await fetch("/api/chat", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             prompt: userPrompt,
//             chatId: currentChatId,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error("Failed to get AI response")
//         }

//         const data = await response.json()
//         const aiResponse = data.text || "I'm sorry, I couldn't generate a response."

//         setChatMessages((prev) => {
//           if (
//             prev.length > 0 &&
//             prev[prev.length - 1].role === "AI Writer" &&
//             prev[prev.length - 1].content === "Thinking..."
//           ) {
//             return [
//               ...prev.slice(0, -1),
//               {
//                 id: tempAiMessage.id,
//                 chat_id: currentChatId,
//                 role: "AI Writer",
//                 content: aiResponse,
//                 created_at: new Date().toISOString(),
//               },
//             ]
//           }
//           return [
//             ...prev,
//             {
//               id: Date.now() + 1,
//               chat_id: currentChatId,
//               role: "AI Writer",
//               content: aiResponse,
//               created_at: new Date().toISOString(),
//             },
//           ]
//         })

//         setChats((prevChats) => {
//           const updatedChats = prevChats.map((chat) =>
//             chat.id === currentChatId ? { ...chat, updated_at: new Date().toISOString() } : chat,
//           )
//           return [...updatedChats].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
//         })
//       } catch (error) {
//         console.error("Error generating AI response:", error)
//         setChatMessages((prev) => {
//           if (
//             prev.length > 0 &&
//             prev[prev.length - 1].role === "AI Writer" &&
//             prev[prev.length - 1].content === "Thinking..."
//           ) {
//             return [
//               ...prev.slice(0, -1),
//               {
//                 id: tempAiMessage.id,
//                 chat_id: currentChatId,
//                 role: "AI Writer",
//                 content: "Sorry, I encountered an error while generating a response.",
//                 created_at: new Date().toISOString(),
//               },
//             ]
//           }
//           return [
//             ...prev,
//             {
//               id: Date.now() + 1,
//               chat_id: currentChatId,
//               role: "AI Writer",
//               content: "Sorry, I encountered an error while generating a response.",
//               created_at: new Date().toISOString(),
//             },
//           ]
//         })
//       }
//     } catch (error) {
//       console.error("Error in handleSendMessage:", error)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   return {
//     // State
//     sidebarOpen,
//     setSidebarOpen,
//     chats,
//     activeChatId,
//     isLoadingChats,
//     isCreatingChat,
//     isDeletingChat,
//     chatMessages,
//     inputValue,
//     setInputValue,
//     isProcessing,
//     isSignedIn,
//     name,

//     // Functions
//     loadChatMessages,
//     createNewChat,
//     deleteChat,
//     handleSendMessage,
//   }
// }



//claude enhanced
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

interface Chat {
  id: number
  title: string
  message_content: string
  created_at: string
  updated_at: string
}

interface Message {
  id: number
  chat_id: number
  role: string
  content: string
  created_at: string
}

export function useAIWriter() {
  // State for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<number | null>(null)
  const [isLoadingChats, setIsLoadingChats] = useState(false)
  const [isCreatingChat, setIsCreatingChat] = useState(false)
  const [isDeletingChat, setIsDeletingChat] = useState(false)

  // Chat messages and input
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Clerk authentication hooks
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  // State for user name from Supabase
  const [name, setName] = useState("")

  // Listen for header sidebar toggle event
  useEffect(() => {
    const handleToggleSidebar = () => {
      setSidebarOpen((prev) => !prev)
    }

    window.addEventListener("toggleAIWriterSidebar", handleToggleSidebar)
    return () => window.removeEventListener("toggleAIWriterSidebar", handleToggleSidebar)
  }, [])

  // Sync Clerk user into Supabase "users" table
  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (!user) return

      const clerkId = user.id
      const fullName = user.fullName || user.firstName || "Anonymous"

      // Check if user already exists
      const { data, error } = await supabase.from("users").select("name, id").eq("clerk_id", clerkId).single()

      if (error && error.code !== "PGRST116") {
        console.error("User fetch error:", error.message)
        return
      }

      if (data) {
        setName(data.name)
        // Load user's chats after confirming user exists
        fetchUserChats(data.id)
      } else {
        // Insert new user if not exists
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

    if (isSignedIn && user) {
      syncUserToSupabase()
    }
  }, [isSignedIn, user])

  // Fetch user's chats
  const fetchUserChats = async (userId: string) => {
    setIsLoadingChats(true)
    try {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })

      if (error) {
        console.error("Error fetching chats:", error)
        return
      }

      setChats(data || [])
    } catch (error) {
      console.error("Error in fetchUserChats:", error)
    } finally {
      setIsLoadingChats(false)
    }
  }

  // Load chat messages
  const loadChatMessages = async (chatId: number) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true })

      if (error) {
        console.error("Error loading messages:", error)
        return
      }

      setChatMessages(data || [])
      setActiveChatId(chatId)
    } catch (error) {
      console.error("Error in loadChatMessages:", error)
    }
  }

  // Create a new chat
  const createNewChat = async () => {
    if (!user) return

    setIsCreatingChat(true)
    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single()

      if (userError) {
        console.error("Error fetching user ID:", userError)
        return
      }

      const userId = userData.id

      const { data, error } = await supabase
        .from("chats")
        .insert([
          {
            user_id: userId,
            title: "New Conversation",
            message_content: "",
          },
        ])
        .select()

      if (error) {
        console.error("Error creating chat:", error)
        return
      }

      if (data && data.length > 0) {
        setChats([data[0], ...chats])
        setActiveChatId(data[0].id)
        setChatMessages([])
      }
    } catch (error) {
      console.error("Error in createNewChat:", error)
    } finally {
      setIsCreatingChat(false)
    }
  }

  // Delete a chat
  const deleteChat = async (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation()

    if (window.confirm("Are you sure you want to delete this conversation?")) {
      setIsDeletingChat(true)
      try {
        const { error: messagesError } = await supabase.from("messages").delete().eq("chat_id", chatId)

        if (messagesError) {
          console.error("Error deleting messages:", messagesError)
          return
        }

        const { error: chatError } = await supabase.from("chats").delete().eq("id", chatId)

        if (chatError) {
          console.error("Error deleting chat:", chatError)
          return
        }

        setChats(chats.filter((chat) => chat.id !== chatId))

        if (activeChatId === chatId) {
          setChatMessages([])
          setActiveChatId(null)
        }
      } catch (error) {
        console.error("Error in deleteChat:", error)
      } finally {
        setIsDeletingChat(false)
      }
    }
  }

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || isProcessing || !user) return

    setIsProcessing(true)

    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single()

      if (userError) {
        console.error("Error fetching user ID:", userError)
        return
      }

      const userId = userData.id
      let currentChatId = activeChatId

      if (!currentChatId) {
        const { data: newChat, error: chatError } = await supabase
          .from("chats")
          .insert([
            {
              user_id: userId,
              title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
              message_content: inputValue,
            },
          ])
          .select()

        if (chatError || !newChat || newChat.length === 0) {
          console.error("Error creating new chat:", chatError)
          return
        }

        currentChatId = newChat[0].id
        setActiveChatId(currentChatId)
        setChats([newChat[0], ...chats])
      } else {
        if (chatMessages.length === 0) {
          const { error: updateError } = await supabase
            .from("chats")
            .update({
              title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
              message_content: inputValue,
              updated_at: new Date().toISOString(),
            })
            .eq("id", currentChatId)

          if (updateError) {
            console.error("Error updating chat:", updateError)
          } else {
            setChats(
              chats.map((chat) =>
                chat.id === currentChatId
                  ? {
                    ...chat,
                    title: inputValue.substring(0, 30) + (inputValue.length > 30 ? "..." : ""),
                    message_content: inputValue,
                    updated_at: new Date().toISOString(),
                  }
                  : chat,
              ),
            )
          }
        } else {
          const { error: updateError } = await supabase
            .from("chats")
            .update({
              updated_at: new Date().toISOString(),
            })
            .eq("id", currentChatId)

          if (updateError) {
            console.error("Error updating chat timestamp:", updateError)
          }
        }
      }

      const userMessage = {
        id: Date.now(),
        chat_id: currentChatId as number,
        role: "user",
        content: inputValue,
        created_at: new Date().toISOString(),
      }

      setChatMessages((prev) => [...prev, userMessage])

      const { error: messageError } = await supabase.from("messages").insert([
        {
          chat_id: currentChatId,
          role: "user",
          content: inputValue,
        },
      ])

      if (messageError) {
        console.error("Error saving user message:", messageError)
      }

      const userPrompt = inputValue
      setInputValue("")

      const tempAiMessage = {
        id: Date.now() + 1,
        chat_id: currentChatId as number,
        role: "AI Writer",
        content: "Thinking...",
        created_at: new Date().toISOString(),
      }

      setChatMessages((prev) => [...prev, tempAiMessage])

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: userPrompt,
            chatId: currentChatId,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get AI response")
        }

        const data = await response.json()
        const aiResponse = data.text || "I'm sorry, I couldn't generate a response."

        setChatMessages((prev) => {
          if (
            prev.length > 0 &&
            prev[prev.length - 1].role === "AI Writer" &&
            prev[prev.length - 1].content === "Thinking..."
          ) {
            return [
              ...prev.slice(0, -1),
              {
                id: tempAiMessage.id,
                chat_id: currentChatId as number,
                role: "AI Writer",
                content: aiResponse,
                created_at: new Date().toISOString(),
              },
            ]
          }
          return [
            ...prev,
            {
              id: Date.now() + 1,
              chat_id: currentChatId as number,
              role: "AI Writer",
              content: aiResponse,
              created_at: new Date().toISOString(),
            },
          ]
        })

        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) =>
            chat.id === currentChatId ? { ...chat, updated_at: new Date().toISOString() } : chat,
          )
          return [...updatedChats].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        })
      } catch (error) {
        console.error("Error generating AI response:", error)
        setChatMessages((prev) => {
          if (
            prev.length > 0 &&
            prev[prev.length - 1].role === "AI Writer" &&
            prev[prev.length - 1].content === "Thinking..."
          ) {
            return [
              ...prev.slice(0, -1),
              {
                id: tempAiMessage.id,
                chat_id: currentChatId as number,
                role: "AI Writer",
                content: "Sorry, I encountered an error while generating a response.",
                created_at: new Date().toISOString(),
              },
            ]
          }
          return [
            ...prev,
            {
              id: Date.now() + 1,
              chat_id: currentChatId as number,
              role: "AI Writer",
              content: "Sorry, I encountered an error while generating a response.",
              created_at: new Date().toISOString(),
            },
          ]
        })
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    // State
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
    name,

    // Functions
    loadChatMessages,
    createNewChat,
    deleteChat,
    handleSendMessage,
  }
}