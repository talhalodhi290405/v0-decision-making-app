"use client"

import { useState } from "react"
import { DecisionCard } from "./decision-card"
import { Button } from "@/components/ui/button"

const cards = [
  { id: "pros", title: "Pros", color: "#7dd3c0" },
  { id: "cons", title: "Cons", color: "#f4a5a5" },
  { id: "gut", title: "Gut Feelings", color: "#a5c4f4" },
  { id: "impact", title: "Long Term Impact", color: "#d4b5f4" },
]

export function DecisionMaker() {
  const [dilemma, setDilemma] = useState("")
  const [cardValues, setCardValues] = useState<Record<string, string>>({
    pros: "",
    cons: "",
    gut: "",
    impact: "",
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-medium text-[#3a4a5c] mb-6">What's your decision?</h1>
        <input
          type="text"
          value={dilemma}
          onChange={(e) => setDilemma(e.target.value)}
          placeholder="Enter your dilemma here..."
          className="w-full max-w-xl mx-auto px-4 py-3 text-center text-[#3a4a5c] bg-white border border-[#d1dce5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a5c4f4] placeholder:text-[#9aa8b5]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {cards.map((card) => (
          <DecisionCard
            key={card.id}
            title={card.title}
            color={card.color}
            value={cardValues[card.id]}
            onChange={(value) => setCardValues((prev) => ({ ...prev, [card.id]: value }))}
            cardType={card.id}
            dilemma={dilemma}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => console.log("Reflecting on:", { dilemma, ...cardValues })}
          className="px-8 py-3 bg-[#7dd3c0] hover:bg-[#5ec4ae] text-white font-medium rounded-lg transition-colors"
        >
          Reflect
        </Button>
      </div>
    </div>
  )
}
