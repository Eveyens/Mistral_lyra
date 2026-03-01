"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, ArrowLeft, Bot, TreePine, PenTool, Sparkles, Heart } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, useSearchParams, useRouter } from "next/navigation"

const AGENT_INFO: Record<string, { name: string, icon: any, color: string, colorIcon: string, initMessage: string, description: string }> = {
    gardener: {
        name: "Léon le Jardinier",
        icon: TreePine,
        color: "bg-green-50",
        colorIcon: "bg-green-200 text-green-800",
        initMessage: "Bonjour petite pousse ! Comment vas-tu aujourd'hui ? Viens t'asseoir à l'ombre de ce chêne et discutons un peu...",
        description: "J'adore la nature, les plantes et t'aider à cultiver tes pensées positives 🌱"
    },
    poet: {
        name: "Plume",
        icon: PenTool,
        color: "bg-purple-50",
        colorIcon: "bg-purple-200 text-purple-800",
        initMessage: "Salutations douce âme. Les mots sont des fenêtres sur le cœur. Que souhaites-tu exprimer en ce moment ?",
        description: "Je t'aide à exprimer tes émotions avec des mots doux et de la poésie ✍️"
    },
    horse: {
        name: "Tornado l'Équin",
        icon: Heart,
        color: "bg-amber-50",
        colorIcon: "bg-amber-200 text-amber-800",
        initMessage: "Hiii haha ! Prêt(e) pour une balade ? Rien de tel qu'une chevauchée au grand air pour se recentrer. Qu'est-ce qui t'amène ?",
        description: "Passionné d'équitation, je galope à tes côtés pour reprendre confiance ! 🐴"
    },
    custom: {
        name: "Ton Super Agent",
        icon: Sparkles,
        color: "bg-slate-50",
        colorIcon: "bg-slate-200 text-slate-800",
        initMessage: "Salut ! Je suis ton agent sur-mesure. Dis-moi ce qui te passionne et parlons-en pour te changer les idées !",
        description: "Un agent créé spécialement pour toi, selon tes centres d'intérêt ✨"
    }
}

export default function AgentChatPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const agentId = params.id as string || "custom"
    const theme = searchParams.get("theme")
    const customName = searchParams.get("name")

    const baseInfo = AGENT_INFO[agentId] || AGENT_INFO["custom"]
    const scrollRef = useRef<HTMLDivElement>(null)

    // Override custom agent title/message if theme is provided
    const info = agentId === "custom" && theme ? {
        ...baseInfo,
        name: customName || `Agent Spécialiste : ${theme}`,
        initMessage: `Salut ! Je vois que tu as envie de parler de ${theme.toLowerCase()}. C'est un super sujet ! Qu'est-ce qui te plaît là-dedans ? On pourrait même regarder des vidéos si tu veux !`
    } : baseInfo

    const [input, setInput] = useState("")

    const transport = new DefaultChatTransport({
        api: '/api/agents/chat',
        body: {
            agentId: agentId,
            theme: theme || null
        }
    })

    const { messages, sendMessage, status } = useChat({
        transport,
        messages: [
            {
                id: "welcome",
                role: "assistant",
                parts: [{ type: "text", text: info.initMessage }]
            }
        ] as UIMessage[]
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
    }, [messages])

    const Icon = info.icon

    return (
        <div className={cn("flex flex-col h-[calc(100vh-57px)] lg:h-screen", info.color)}>
            {/* Header */}
            <div className="border-b border-border/50 bg-white/70 backdrop-blur-md px-4 py-3 flex-shrink-0 flex items-center justify-between z-10 sticky top-0">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="rounded-full mr-1 hover:bg-black/5" asChild>
                        <Link href="/patient/resources">
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Retour</span>
                        </Link>
                    </Button>
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-background", info.colorIcon)}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground text-base leading-tight">{info.name}</h1>
                        <p className="text-xs text-muted-foreground">{info.description || "Ton mini-compagnon IA"}</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    {messages.map((msg: any, index: number) => (
                        <div
                            key={msg.id || index}
                            className={cn(
                                "flex",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {msg.role !== "user" && (
                                <div className={cn("mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1", info.colorIcon)}>
                                    <Icon className="h-4 w-4" />
                                </div>
                            )}

                            <div
                                className={cn(
                                    "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                                    msg.role === "user"
                                        ? "bg-slate-800 text-white rounded-br-sm"
                                        : "bg-white border border-border/50 text-foreground rounded-bl-sm"
                                )}
                            >
                                <p className="whitespace-pre-wrap">
                                    {(msg as any).parts
                                        ? (msg as any).parts
                                            .filter((p: any) => p.type === 'text')
                                            .map((p: any) => p.text)
                                            .join('')
                                        : msg.content}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                        <div className="flex justify-start">
                            <div className={cn("mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1", info.colorIcon)}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="rounded-2xl rounded-bl-sm border border-border/50 bg-white px-5 py-4 shadow-sm flex items-center gap-1.5">
                                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white/70 backdrop-blur-md px-4 py-3 flex-shrink-0 border-t border-border/50 pb-safe">
                <form
                    className="mx-auto flex max-w-3xl items-end gap-2 bg-white p-1.5 rounded-3xl border shadow-sm focus-within:ring-2 focus-within:ring-slate-200 transition-all"
                    onSubmit={handleSubmit}
                >
                    <VoiceButton
                        onTranscript={(text) => setInput((prev) => prev ? prev + " " + text : text)}
                        className="shrink-0 rounded-full h-9 w-9 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    />
                    <Textarea
                        placeholder="Écris ou dicte un message..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                if ((input || "").trim()) {
                                    handleSubmit(e as any)
                                }
                            }
                        }}
                        className="min-h-[40px] max-h-32 resize-none border-0 bg-transparent px-3 py-2.5 focus-visible:ring-0 shadow-none text-sm"
                        rows={1}
                    />

                    <Button
                        type="submit"
                        size="icon"
                        className="shrink-0 rounded-full h-10 w-10 bg-slate-800 hover:bg-slate-700 transition-transform active:scale-95 text-white"
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
