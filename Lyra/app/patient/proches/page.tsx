"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  MessageCircleHeart,
  Pin,
  PinOff,
  Volume2,
  Video,
  MessageSquare,
  Sparkles,
  Heart,
  ShieldAlert,
  Send
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ProchesPage() {
  const { positiveMessages, setPositiveMessages } = useApp()
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  const pinnedMessages = positiveMessages.filter((m) => m.pinned)
  const otherMessages = positiveMessages.filter((m) => !m.pinned)

  const togglePin = (id: string) => {
    setPositiveMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m))
    )
  }

  // Mock chat messages
  const [chatLog, setChatLog] = useState([
    { id: 1, sender: "Maman", text: "Coucou mon coeur, j'espere que ta journee s'est bien passee. Je pense fort a toi.", isPatient: false, moderated: false },
    { id: 2, sender: "Moi", text: "Merci maman, c'etait un peu dur ce matin mais ca va mieux.", isPatient: true, moderated: false },
    { id: 3, sender: "Lyra (Moderation)", text: "Un message de 'Papa' a ete masque car il semblait stressant. Tu pourras le lire plus tard si tu le souhaites.", isPatient: false, moderated: true },
  ])

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    setChatLog([...chatLog, { id: Date.now(), sender: "Moi", text: chatMessage, isPatient: true, moderated: false }])
    setChatMessage("")
  }

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Zone de repos</h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Ton espace securise pour te ressourcer et echanger avec tes proches.
        </p>
      </div>

      <Tabs defaultValue="mots-doux" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 rounded-xl p-1 bg-secondary/50">
          <TabsTrigger value="mots-doux" className="rounded-lg">Mots Doux</TabsTrigger>
          <TabsTrigger value="discussion" className="rounded-lg">Discussion (Moderee)</TabsTrigger>
        </TabsList>

        {/* ================= TAB 1: MOTS DOUX ================= */}
        <TabsContent value="mots-doux" className="space-y-6 focus-visible:outline-none">
          {/* AI Suggestion */}
          <Card className="border-primary/20 bg-lyra-teal-light/30 shadow-sm">
            <CardContent className="flex items-start gap-3 p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Lyra te propose</p>
                {!showSuggestion ? (
                  <>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Besoin de reconfort ? Je peux t'afficher 3 mots doux laisses par tes proches.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 rounded-full text-xs bg-background hover:bg-primary/10"
                      onClick={() => setShowSuggestion(true)}
                    >
                      <Heart className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      Oui, montre-moi
                    </Button>
                  </>
                ) : (
                  <div className="mt-3 space-y-3">
                    {positiveMessages.slice(0, 3).map((m) => (
                      <div key={m.id} className="rounded-xl bg-card p-4 shadow-sm border border-border/50">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">{m.from}</p>
                        <p className="mt-1 text-sm text-foreground">{m.content}</p>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs mt-2"
                      onClick={() => setShowSuggestion(false)}
                    >
                      Cacher
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* All messages */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <MessageCircleHeart className="h-5 w-5 text-lyra-coral" />
              Le coffre-fort ({positiveMessages.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[...pinnedMessages, ...otherMessages].map((msg) => (
                <Card key={msg.id} className={cn("transition-all hover:shadow-md", msg.pinned ? "border-primary ring-1 ring-primary/20" : "border-border/50")}>
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {msg.type === "audio" ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lyra-coral-light/50 text-lyra-coral-dark">
                            <Volume2 className="h-5 w-5" />
                          </div>
                        ) : msg.type === "video" ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lyra-teal-light/50 text-lyra-teal-dark">
                            <Video className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lyra-lavender-light/50 text-lyra-lavender-dark">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-foreground">{msg.from}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(msg.createdAt), "d MMM yyyy", { locale: fr })}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mr-2 -mt-2"
                        onClick={() => togglePin(msg.id)}
                      >
                        {msg.pinned ? (
                          <PinOff className="h-4 w-4 text-primary" />
                        ) : (
                          <Pin className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                        <span className="sr-only">{msg.pinned ? "Desepingler" : "Epingler"}</span>
                      </Button>
                    </div>
                    {/* Tags */}
                    {msg.tags && msg.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] px-2 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-relaxed text-foreground">{msg.content}</p>

                    {msg.type === "audio" && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary p-2 border border-border/50">
                        <Button variant="secondary" size="sm" className="h-8 rounded-full text-xs shadow-sm">
                          <Volume2 className="mr-1.5 h-3.5 w-3.5" />
                          Ecouter
                        </Button>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex gap-1 items-center h-4">
                            {Array.from({ length: 15 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-1 rounded-full bg-primary/40"
                                style={{ height: `${20 + Math.random() * 80}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {msg.type === "video" && msg.url && (() => {
                      const isImageFile = /\.(png|jpg|jpeg|gif|webp)$/i.test(msg.url)
                      return isImageFile ? (
                        <div className="mt-4 rounded-xl overflow-hidden border border-border/50">
                          <img src={msg.url} alt="Souvenir partagé" className="w-full max-h-52 object-cover" />
                        </div>
                      ) : (
                        <div className="mt-4 rounded-xl overflow-hidden border border-border/50 bg-black aspect-video relative flex items-center justify-center">
                          <video src={msg.url} className="w-full h-full object-cover opacity-80" controls poster="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ================= TAB 2: DISCUSSION ================= */}
        <TabsContent value="discussion" className="flex flex-col h-[500px] rounded-xl border border-border/50 bg-card overflow-hidden focus-visible:outline-none shadow-sm">
          {/* Notice */}
          <div className="bg-lyra-teal-light/20 p-3 flex items-center gap-3 border-b border-border/50">
            <ShieldAlert className="h-5 w-5 text-lyra-teal-dark shrink-0" />
            <p className="text-xs text-lyra-teal-dark font-medium leading-relaxed">
              Pour te proteger, l'IA filtre automatiquement les messages de tes proches s'ils sont juges stressants ou inadaptes a ton etat.
            </p>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
            {chatLog.map((c) => (
              <div key={c.id} className={cn("flex flex-col max-w-[80%] ", c.isPatient ? "ml-auto items-end" : "items-start")}>
                {!c.isPatient && !c.moderated && (
                  <span className="text-xs font-semibold text-muted-foreground ml-1 mb-1">{c.sender}</span>
                )}
                <div className={cn(
                  "p-3 rounded-2xl text-sm",
                  c.isPatient ? "bg-primary text-primary-foreground rounded-tr-sm" :
                    c.moderated ? "bg-secondary text-muted-foreground border border-border italic flex items-center gap-2" :
                      "bg-card border border-border/50 text-foreground rounded-tl-sm shadow-sm"
                )}>
                  {c.moderated && <ShieldAlert className="h-4 w-4 shrink-0" />}
                  {c.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-card border-t border-border/50">
            <form onSubmit={handleSendChat} className="flex items-center gap-2 relative">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ecrire a un proche..."
                className="rounded-full bg-secondary/50 pr-12"
              />
              <Button type="submit" size="icon" className="absolute right-1 rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4 ml-0.5" />
                <span className="sr-only">Envoyer</span>
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
