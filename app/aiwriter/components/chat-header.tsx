"use client"

interface ChatHeaderProps {
  title: string
  subtitle: string
}

export function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-4 border-b border-amber-200">
      <h2 className="font-bold text-amber-900">{title}</h2>
      <p className="text-sm text-amber-700">{subtitle}</p>
    </div>
  )
}
