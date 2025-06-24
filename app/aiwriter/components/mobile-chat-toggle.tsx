"use client"

import { MessageSquare, History } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileChatToggleProps {
    onToggleSidebar: () => void
    chatCount: number
    hasActiveChat: boolean
}

export function MobileChatToggle({ onToggleSidebar, chatCount, hasActiveChat }: MobileChatToggleProps) {
    return (
        <div className="md:hidden bg-amber-50/80 border-b border-amber-200 p-3 flex items-center justify-between">
            {/* Chat History Button */}
            <Button
                onClick={onToggleSidebar}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-amber-300 text-amber-800 hover:bg-amber-100"
            >
                <History size={16} />
                <span className="text-sm">{chatCount > 0 ? `${chatCount} Chat${chatCount !== 1 ? "s" : ""}` : "No Chats"}</span>
            </Button>

            {/* Current Chat Indicator */}
            <div className="flex items-center gap-2 text-amber-700">
                <MessageSquare size={16} />
                <span className="text-sm font-medium">{hasActiveChat ? "Active Chat" : "New Chat"}</span>
            </div>
        </div>
    )
}
