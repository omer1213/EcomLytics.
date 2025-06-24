export interface Chat {
    id: number
    title: string
    message_content: string
    created_at: string
    updated_at: string
}

export interface Message {
    id: number
    chat_id: number
    role: string
    content: string
    created_at: string
}

export interface User {
    id: string
    clerk_id: string
    name: string
    created_at: string
    updated_at: string
}
