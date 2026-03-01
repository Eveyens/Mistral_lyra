"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Mic, MicOff, AlertTriangle, Phone, Heart, ShieldAlert, Compass, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { voiceSessions } from "@/lib/demo-data"
import { useApp } from "@/lib/app-context"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { VoiceButton } from "@/components/voice-button"

// Show nav buttons when Lyra mentions key sections (max 3 per message)
const SECTION_LINKS = [
  {
    keywords: ["journal", "cahier de bord", "noter", "note-le"],
    label: "📖 Ouvrir le Journal",
    href: "/patient/journal",
  },
  {
    keywords: ["détente", "detente", "souffler", "respir", "4-7-8", "mini-jeu", "jeu pop", "bubble"],
    label: "🌬️ Aller en Détente",
    href: "/patient/resources",
  },
  {
    keywords: ["mots de tes proches", "mots doux", "proches", "zone de repos", "entouré"],
    label: "💛 Lire les mots doux",
    href: "/patient/proches",
  },
  {
    keywords: ["gps émotionnel", "gps emotionnel", "gps", "stratégie d'apaisement"],
    label: "🧭 Voir mon GPS",
    href: "/patient/gps",
  },
  {
    keywords: ["léon", "plume", "tornado", "mini-agent", "agent ia", "petit agent"],
    label: "🤖 Voir les mini-agents",
    href: "/patient/resources",
  },
  {
    keywords: ["calendrier", "humeur du jour", "check-in", "évaluer mon humeur"],
    label: "📅 Mon Calendrier",
    href: "/patient/calendar",
  },
]

function detectSectionButtons(text: string) {
  const lower = text.toLowerCase()
  const found: typeof SECTION_LINKS = []
  for (const section of SECTION_LINKS) {
    if (section.keywords.some((kw) => lower.includes(kw))) {
      if (!found.find(f => f.href === section.href)) {
        found.push(section)
      }
    }
    if (found.length >= 3) break  // max 3 boutons
  }
  return found
}

function stripCrisisTag(text: string) {
  return text.replace(/\[CRISIS\]/gi, '').trim()
}

const crisisKeywords = [
  "suicide", "mourir", "me tuer", "en finir", "plus la peine",
  "vaut le coup", "plan pour", "moyen de", "me jeter", "me pendre",
  "medicaments pour", "sauter du", "couteau", "j'ai un plan",
]

export default function ChatPage() {
  const { gps, trustedContact } = useApp()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [showCrisis, setShowCrisis] = useState(false)
  const [input, setInput] = useState("")

  const transport = new DefaultChatTransport({
    api: '/api/chat',
    body: {
      data: {
        strategies: gps.strategies,
        contacts: gps.contactPeople,
        trustedContact: trustedContact
      }
    }
  })

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [{ type: 'text', text: "Bonjour ! Je suis Lyra, ton compagnon d'écoute. Comment tu te sens aujourd'hui ? N'hésite pas à me parler de ce qui te passe par la tête." }]
      }
    ] as any[]
  })

  const isLoading = status === "submitted" || status === "streaming"

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const currentInput = input
    setInput("")

    await sendMessage({
      text: currentInput,
    })
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
    // Auto-open crisis modal if Lyra's last response contains [CRISIS] tag
    const lastMsg = messages[messages.length - 1]
    if (lastMsg && lastMsg.role === "assistant") {
      const text = (lastMsg as any).parts
        ? (lastMsg as any).parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
        : (lastMsg as any).content || ''
      if (/\[CRISIS\]/i.test(text)) {
        setShowCrisis(true)
      }
    }
  }, [messages])

  const detectCrisis = (text: string) => {
    return crisisKeywords.some((kw) => text.toLowerCase().includes(kw))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (!(input || "").trim()) return

    if (detectCrisis(input || "")) {
      setShowCrisis(true)
    }

    handleSubmit(e as any)
  }

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col lg:h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-lg">Parler avec Lyra</h1>
              <p className="text-xs text-muted-foreground">Compagnon d'écoute propulsé par Mistral AI</p>
            </div>
          </div>
          {/* Disclaimer */}
          <div className="bg-lyra-teal-light/50 rounded-full px-4 py-1.5 text-center text-xs font-medium text-lyra-teal-dark">
            Sécurisé & Non-jugeant
          </div>
        </div>
      </div>

      {/* Crisis alert - blocking banner */}
      {showCrisis && (
        <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-4 animate-in slide-in-from-top-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-destructive animate-pulse" />
              <div className="flex-1">
                <p className="text-base font-bold text-foreground">Besoin d'aide d'urgence ?</p>
                <p className="mt-1 text-sm text-foreground/80">
                  Ce que tu ressens est immense, mais tu n'as pas à le traverser seul(e). Des personnes formées sont là pour toi, tout de suite.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 pl-9">
              <Button size="sm" className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90" asChild>
                <a href="tel:3114"><Phone className="mr-1.5 h-4 w-4" />3114 (Prévention Suicide - Gratuit 24/7)</a>
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-destructive text-destructive hover:bg-destructive/10" asChild>
                <a href="tel:15"><AlertTriangle className="mr-1.5 h-4 w-4" />15 (SAMU)</a>
              </Button>
              <Button size="sm" variant="secondary" className="rounded-full" asChild>
                <a href={`tel:${trustedContact.phone.replace(/\s/g, "")}`}>
                  <Heart className="mr-1.5 h-4 w-4" /> Appeler {trustedContact.name}
                </a>
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 pr-2">
              <Button variant="ghost" size="sm" onClick={() => setShowCrisis(false)} className="text-xs text-muted-foreground hover:text-foreground">
                Fermer l'alerte
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 bg-slate-50/50">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role !== "user" && (
                <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 mt-1">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-white border border-border/50 text-foreground rounded-bl-sm"
                )}
              >
                {msg.role === "assistant" ? (() => {
                  const rawText = (msg as any).parts
                    ? (msg as any).parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
                    : (msg as any).content || ''
                  const text = stripCrisisTag(rawText)
                  const sectionButtons = detectSectionButtons(text)
                  return (
                    <>
                      <div className="prose prose-sm max-w-none
                        prose-p:my-1 prose-p:leading-relaxed
                        prose-ul:my-1 prose-ol:my-1
                        prose-li:my-0.5
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-em:text-muted-foreground
                        prose-headings:text-foreground">
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </div>
                      {sectionButtons.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border/30">
                          {sectionButtons.map((btn) => (
                            <Button
                              key={btn.label}
                              asChild
                              size="sm"
                              variant="outline"
                              className="rounded-full text-xs h-7 border-primary/40 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all gap-1 font-medium shadow-sm"
                            >
                              <Link href={btn.href}>
                                {btn.label}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </>
                  )
                })() : (
                  <p className="whitespace-pre-wrap">
                    {(msg as any).parts
                      ? (msg as any).parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
                      : (msg as any).content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {messages.length <= 1 && (
            <div className="mx-auto max-w-3xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
              <p className="text-center text-xs text-muted-foreground mb-3 font-medium tracking-wide uppercase">Sujets de discussion</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm" className="rounded-full bg-white text-primary text-xs hover:bg-primary hover:text-white transition-all shadow-sm" onClick={() => handleInputChange({ target: { value: "Je me sens un peu stressé..." } } as any)}>☁️ Je suis un peu stressé</Button>
                <Button variant="outline" size="sm" className="rounded-full bg-white text-primary text-xs hover:bg-primary hover:text-white transition-all shadow-sm" onClick={() => handleInputChange({ target: { value: "J'aimerai te raconter ma journée." } } as any)}>📖 Raconter ma journée</Button>
                <Button variant="outline" size="sm" className="rounded-full bg-white text-primary text-xs hover:bg-primary hover:text-white transition-all shadow-sm" onClick={() => handleInputChange({ target: { value: "Je n'arrive pas à dormir." } } as any)}>🌙 Je n'arrive pas à dormir</Button>
              </div>

              <div className="mt-8 mx-auto max-w-sm bg-blue-50/50 rounded-3xl p-5 border border-blue-100 text-center shadow-sm">
                <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Compass className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-slate-600 mb-4 font-medium">Tu n'as pas encore rempli ton journal ou ton calendrier aujourd'hui.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <Button variant="default" size="sm" asChild className="rounded-full w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/patient/journal">Voir le Journal</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="rounded-full w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                    <Link href="/patient/calendar">Évaluer mon humeur</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 mt-1">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-bl-sm border border-border/50 bg-white px-5 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-white px-4 py-4 flex-shrink-0 lg:pb-6">
        <form
          className="mx-auto flex max-w-3xl items-end gap-3 bg-secondary/30 p-2 rounded-3xl border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all"
          onSubmit={onSubmit}
        >
          <VoiceButton
            onTranscript={(text) => setInput((prev) => prev ? prev + " " + text : text)}
            className="shrink-0 rounded-full h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary"
          />

          <Textarea
            placeholder="Pose tes maux ici..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                onSubmit(e)
              }
            }}
            className="min-h-[40px] max-h-32 resize-none border-0 bg-transparent px-2 py-2.5 focus-visible:ring-0 shadow-none text-base"
            rows={1}
          />

          <Button
            type="submit"
            size="icon"
            className="shrink-0 rounded-full h-10 w-10 bg-primary hover:bg-primary/90 transition-transform active:scale-95"
            disabled={!(input || "").trim()}
          >
            <Send className="h-4 w-4 ml-0.5" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
