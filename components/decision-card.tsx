"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"

interface DecisionCardProps {
  title: string
  color: string
  value: string
  onChange: (value: string) => void
  cardType: string
  dilemma: string
}

export function DecisionCard({ title, color, value, onChange, cardType, dilemma }: DecisionCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAIAssist = async () => {
    if (!dilemma.trim()) {
      alert("Please enter your dilemma first")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dilemma, cardType }),
      })
      const data = await response.json()
      if (data.text) {
        onChange(data.text)
      }
    } catch (error) {
      console.error("AI assist error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        padding: "2px",
        background: `linear-gradient(135deg, ${color}, transparent 50%, ${color})`,
        animation: "borderGlow 3s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 8px 2px ${color};
            opacity: 0.7;
          }
          50% {
            box-shadow: 0 0 20px 6px ${color};
            opacity: 1;
          }
        }
      `}</style>
      <div className="bg-white rounded-xl p-5 h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-[#3a4a5c]">{title}</h3>
          <button
            onClick={handleAIAssist}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all"
            style={{
              backgroundColor: `${color}20`,
              color: color,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {isLoading ? "Writing..." : "AI Assist"}
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter your ${title.toLowerCase()}...`}
          className="w-full h-32 resize-none bg-[#f8fafb] border border-[#e8eef3] rounded-lg p-3 text-[#3a4a5c] placeholder:text-[#9aa8b5] focus:outline-none focus:ring-2 focus:ring-[#a5c4f4]"
        />
      </div>
    </div>
  )
}
