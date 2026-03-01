"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Compass,
  HeartPulse,
  AlertTriangle,
  Eye,
  Phone,
  MessageCircle,
  Ban,
  Lightbulb,
  Stethoscope,
  Shield,
  Bot,
  Send,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function GPSPage() {
  const { gps } = useApp()
  const [isSetupMode, setIsSetupMode] = useState(false)

  // AI Setup Chat state
  const [setupStep, setSetupStep] = useState(0)
  const [chatInput, setChatInput] = useState("")
  const [chatLog, setChatLog] = useState<{ sender: string, text: string, isAi: boolean }[]>([
    { sender: "Lyra", text: "Coucou ! On va mettre à jour ton GPS ensemble. Dis-moi, quand tu te sens mal, qu'est-ce qui t'aide le plus généralement ?", isAi: true }
  ])

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message
    const newLog = [...chatLog, { sender: "Moi", text: chatInput, isAi: false }]
    setChatLog(newLog)
    setChatInput("")

    // Simulate AI response asking next question in the flow
    setTimeout(() => {
      let aiResponse = ""
      if (setupStep === 0) {
        aiResponse = "C'est noté ! Et au contraire, qu'est-ce qu'on doit absolument éviter de te dire ou de faire quand tu es en crise ?"
        setSetupStep(1)
      } else if (setupStep === 1) {
        aiResponse = "Très bien. Y a-t-il une personne en particulier (famille, ami, pro) que tu veux que je te propose d'appeler en priorité ?"
        setSetupStep(2)
      } else {
        aiResponse = "Merci ! J'ai mis à jour ton GPS. Tu es très courageux(se) d'avoir fait ça. Tu peux fermer cette discussion."
      }
      setChatLog((prev) => [...prev, { sender: "Lyra", text: aiResponse, isAi: true }])
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-3xl p-6 relative">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Mon GPS</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Tes directives anticipées. Lyra s'en sert pour t'aider au mieux.
          </p>
        </div>
        <Button onClick={() => setIsSetupMode(true)} className="rounded-full shadow-sm">
          <Bot className="mr-2 h-4 w-4" />
          Mettre à jour avec Lyra
        </Button>
      </div>

      <div className="mb-6 rounded-xl border border-primary/20 bg-lyra-teal-light/30 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            Si Lyra detecte de la grande angoisse, elle puisera dans ce GPS :
            <span className="italic text-muted-foreground block mt-1"> "{'"'}J'ai vu que appeler Léa t{"'"}aide souvent. Tu veux que je te passe son numéro ?{'"'}"</span>
          </p>
        </div>
      </div>

      {/* Static Info Rendering */}
      <GPSSection
        icon={HeartPulse}
        title="Quand je vais mal, ce qui m'aide"
        color="text-primary"
        bgColor="bg-lyra-teal-light"
        items={gps.whatHelps}
      />

      <GPSSection
        icon={AlertTriangle}
        title="Ce qui aggrave"
        color="text-lyra-coral"
        bgColor="bg-lyra-coral-light"
        items={gps.whatMakesWorse}
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Phone className="h-5 w-5 text-primary" />
            Personnes a contacter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {gps.contactPeople.map((person) => (
            <div key={person.name} className="flex items-center justify-between rounded-xl bg-secondary p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.relationship}</p>
              </div>
              <Badge variant="outline" className="text-xs">{person.phone}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageCircle className="h-5 w-5 text-primary" />
              Ce que je veux qu{"'"}on me dise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gps.whatToSay.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Ban className="h-5 w-5 text-lyra-coral" />
              Ce que je veux qu{"'"}on evite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gps.whatToAvoidSaying.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg bg-lyra-coral-light p-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lyra-coral" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI SETUP MODAL */}
      {isSetupMode && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/50 p-4 sm:items-center backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-card shadow-2xl overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <h2 className="font-bold">Lyra GPS Setup</h2>
              </div>
              <button onClick={() => setIsSetupMode(false)} className="rounded-full p-1 hover:bg-primary-foreground/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
              {chatLog.map((msg, i) => (
                <div key={i} className={cn("flex flex-col max-w-[85%]", msg.isAi ? "items-start" : "ml-auto items-end")}>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm",
                    msg.isAi ? "bg-card border border-border/50 text-foreground rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendResponse} className="p-3 bg-card border-t border-border flex items-center gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Discute avec Lyra..."
                className="rounded-full bg-secondary/50"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

function GPSSection({
  icon: Icon,
  title,
  color,
  bgColor,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  color: string
  bgColor: string
  items: string[]
}) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={cn("h-5 w-5", color)} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className={cn("flex items-start gap-2 rounded-lg p-3", bgColor)}>
              <div className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", color.replace("text-", "bg-"))} />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
