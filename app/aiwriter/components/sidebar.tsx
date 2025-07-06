


"use client"

import { useEffect } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, PlusCircle, Trash2, X, MessageSquareText } from "lucide-react"

interface Chat {
    id: number
    title: string
    message_content: string
    created_at: string
    updated_at: string
}

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    chats: Chat[]
    activeChatId: number | null
    isLoadingChats: boolean
    isCreatingChat: boolean
    isDeletingChat: boolean
    isSignedIn: boolean
    onCreateNewChat: () => void
    onLoadChatMessages: (chatId: number) => void
    onDeleteChat: (chatId: number, e: React.MouseEvent) => void
}

export function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    chats,
    activeChatId,
    isLoadingChats,
    isCreatingChat,
    isDeletingChat,
    isSignedIn,
    onCreateNewChat,
    onLoadChatMessages,
    onDeleteChat,
}: SidebarProps) {
    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            const sidebar = document.getElementById("mobile-sidebar")
            const target = e.target as HTMLElement

            if (
                sidebarOpen &&
                sidebar &&
                !sidebar.contains(target) &&
                !target.closest("[data-menu-button]") &&
                !target.closest("[data-chat-toggle]")
            ) {
                setSidebarOpen(false)
            }
        }

        if (sidebarOpen) {
            document.addEventListener("mousedown", handler)
            document.addEventListener("touchstart", handler)
        }

        return () => {
            document.removeEventListener("mousedown", handler)
            document.removeEventListener("touchstart", handler)
        }
    }, [sidebarOpen, setSidebarOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSidebarOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [setSidebarOpen])

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                id="mobile-sidebar"
                className={`
          fixed inset-y-0 left-0 z-50 bg-amber-50 border-r border-amber-200
          w-72 sm:w-80 md:w-64 h-screen transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:z-auto
        `}
            >
                <div className="flex flex-col h-full pt-16 sm:pt-20 md:pt-0">
                    {/* Header */}
                    <div className="p-4 border-b border-amber-200 flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl font-bold text-amber-900">Chat History</h2>
                        <button
                            className="md:hidden p-1 rounded-md hover:bg-amber-100 text-amber-700 hover:text-amber-900"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* New Chat Button */}
                    <div className="p-4 pt-2 border-b border-amber-200">
                        <Button
                            onClick={() => {
                                onCreateNewChat()
                                if (window.innerWidth < 768) setSidebarOpen(false)
                            }}
                            disabled={isCreatingChat || !isSignedIn}
                            className="w-full h-10 sm:h-11 bg-amber-500 hover:bg-amber-600 text-white text-sm sm:text-base flex items-center justify-center gap-2"
                        >
                            {isCreatingChat ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <PlusCircle className="h-4 w-4" />
                            )}
                            New Conversation
                        </Button>
                    </div>

                    {/* Scrollable Chat List */}
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <ScrollArea className="h-full pr-2">
                            <div className="p-2">
                                {isLoadingChats ? (
                                    <div className="flex justify-center p-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
                                    </div>
                                ) : chats.length === 0 ? (
                                    <div className="text-center text-sm p-4 text-amber-700">
                                        <MessageSquareText className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                        <p>No conversations yet</p>
                                        <p className="text-xs mt-1 opacity-75">Start a new chat to begin!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {chats.map((chat) => (
                                            <div
                                                key={chat.id}
                                                onClick={() => {
                                                    onLoadChatMessages(chat.id)
                                                    if (window.innerWidth < 768) setSidebarOpen(false)
                                                }}
                                                className={`
                          flex items-center justify-between p-3 sm:p-2 rounded-md cursor-pointer group
                          transition-colors ${activeChatId === chat.id
                                                        ? "bg-amber-200 text-amber-900"
                                                        : "hover:bg-amber-100 text-amber-800"
                                                    }
                        `}
                                            >
                                                <div className="flex items-center space-x-2 truncate min-w-0 flex-1">
                                                    <MessageSquareText size={16} className="flex-shrink-0" />
                                                    <div className="truncate">
                                                        <span className="block truncate text-sm sm:text-base">
                                                            {chat.title || "New Conversation"}
                                                        </span>
                                                        <span className="block text-xs opacity-60">
                                                            {new Date(chat.updated_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => onDeleteChat(chat.id, e)}
                                                    disabled={isDeletingChat}
                                                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 p-1 rounded transition-all flex-shrink-0 ml-2"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>
    )
}
