"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatWithData() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      type: "assistant",
      content:
        'Hello! I can help you analyze your business data. Try asking questions like: "What is our total revenue?" or "Show me invoices by vendor."',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call to Vanna AI
    setTimeout(() => {
      const responses = [
        "Based on the data, your total revenue for November is $312,000 with 208 invoices processed.",
        "The top vendor by invoice volume is Cloud Systems Inc with 156 invoices totaling $298,000.",
        "Currently, you have 542 paid invoices, 348 pending invoices, and 157 overdue invoices.",
        "Your average invoice value is $1,920, showing a consistent trend over the past months.",
        "I notice 157 overdue invoices that may need immediate attention for collection.",
        "The invoice processing time has improved by 23% compared to last quarter.",
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-card border-border h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Chat with Your Data</CardTitle>
          <CardDescription>
            Ask questions about your invoices and business metrics. Powered by Vanna AI.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-6 bg-muted/20">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-chart-1 text-primary-foreground rounded-br-none"
                      : "bg-card border border-border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${message.type === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader className="w-4 h-4 animate-spin text-chart-1" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question about your data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} size="icon">
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
