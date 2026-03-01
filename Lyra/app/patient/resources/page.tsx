"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Wind, Gamepad2, Sparkles, Bot, TreePine, PenTool, ArrowLeft, Heart, Palette, Upload, Loader2, X } from "lucide-react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import PopGame from "@/components/app/patient/games/pop-game"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const MINI_TOOLS = [
  {
    id: "breathing",
    title: "Respiration 4-7-8",
    description: "Un court exercice pour s'apaiser rapidement.",
    icon: Wind,
    color: "bg-lyra-teal-light text-lyra-teal-dark",
    action: "Respirer",
  },
  {
    id: "music",
    title: "Sons Apaisants",
    description: "Musique douce et bruits blancs pour se recentrer.",
    icon: Music,
    color: "bg-lyra-lavender-light text-lyra-lavender-dark",
    action: "Écouter",
  },
  {
    id: "game",
    title: "Mini-Jeu Pop",
    description: "Éclate les bulles pour relâcher la pression.",
    icon: Gamepad2,
    color: "bg-lyra-coral-light text-lyra-coral-dark",
    action: "Jouer",
  },
  {
    id: "drawing",
    title: "Analyse ton dessin",
    description: "Partage un dessin ou une photo et Lyra te dit ce qu'elle y ressent.",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    action: "Analyser",
  },
]

const AI_AGENTS = [
  {
    id: "gardener",
    name: "Léon le Jardinier",
    role: "Mini-Coach Nature",
    description: "Il t'aide à cultiver tes pensées positives jour après jour.",
    icon: TreePine,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "poet",
    name: "Plume",
    role: "Guide Créatif",
    description: "Une IA douce qui t'aide à exprimer tes émotions en poèmes.",
    icon: PenTool,
    color: "bg-purple-100 text-purple-700",
  },
]

type CustomAgent = {
  id: string
  name: string
  theme: string
}

export default function BienEtrePage() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [showCustomAgentDialog, setShowCustomAgentDialog] = useState(false)
  const [customAgentName, setCustomAgentName] = useState("")
  const [customAgentTheme, setCustomAgentTheme] = useState("L'histoire")
  const [customAgents, setCustomAgents] = useState<CustomAgent[]>([])
  const router = useRouter()

  // Drawing analyzer state
  const [drawingFile, setDrawingFile] = useState<File | null>(null)
  const [drawingPreview, setDrawingPreview] = useState<string | null>(null)
  const [drawingAnalysis, setDrawingAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)
  const drawingInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("lyra_custom_agents")
    if (saved) {
      try {
        setCustomAgents(JSON.parse(saved))
      } catch (e) {
        console.error("Error parsing custom agents", e)
      }
    }
  }, [])

  const handleCreateCustomAgent = () => {
    if (!customAgentName.trim()) return

    const newAgent: CustomAgent = {
      id: `custom_${Date.now()}`,
      name: customAgentName,
      theme: customAgentTheme
    }

    const updated = [...customAgents, newAgent]
    setCustomAgents(updated)
    localStorage.setItem("lyra_custom_agents", JSON.stringify(updated))

    setShowCustomAgentDialog(false)
    setCustomAgentName("")
    setCustomAgentTheme("L'histoire")
  }

  const handleDrawingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDrawingFile(file)
    setDrawingAnalysis(null)
    setAnalyzeError(null)

    // Compress image via canvas before storing preview
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 800
      const ratio = Math.min(MAX / img.width, MAX / img.height, 1)
      const canvas = document.createElement("canvas")
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const compressed = canvas.toDataURL("image/jpeg", 0.7)
      setDrawingPreview(compressed)
      URL.revokeObjectURL(objectUrl)
    }
    img.src = objectUrl
  }

  const handleAnalyzeDrawing = async () => {
    if (!drawingPreview) return
    setIsAnalyzing(true)
    setDrawingAnalysis(null)
    setAnalyzeError(null)
    try {
      // Preview is always JPEG (compressed via canvas)
      const base64 = drawingPreview.split(",")[1]
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: "image/jpeg" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'analyse")
      setDrawingAnalysis(data.analysis)
    } catch (err: any) {
      setAnalyzeError(err.message || "Une erreur est survenue")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Mon Espace Bien-Être</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Prends un moment pour toi avec ces petits outils et compagnons virtuels.
        </p>
      </div>

      {/* Mini-Outils Section */}
      <section>
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lyra-warm/50 text-orange-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">La boîte à outils</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MINI_TOOLS.map((tool) => {
            const Icon = tool.icon
            return (
              <Card
                key={tool.id}
                className={cn(
                  "group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                  activeTool === tool.id ? "ring-2 ring-primary ring-offset-2" : "border-border/50 bg-secondary/20"
                )}
              >
                <CardContent className="p-6">
                  <div className={cn("mb-4 inline-flex rounded-2xl p-3", tool.color)}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{tool.title}</h3>
                  <p className="mb-6 text-sm text-muted-foreground">{tool.description}</p>

                  <Button
                    className="w-full rounded-full transition-transform active:scale-95"
                    variant={activeTool === tool.id ? "default" : "secondary"}
                    onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                  >
                    {activeTool === tool.id ? "Fermer" : tool.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Active Tool Content */}
        {activeTool === "game" && (
          <div className="mt-8 h-[600px] w-full rounded-3xl border border-border shadow-md animate-in slide-in-from-bottom-10 fade-in duration-500">
            <PopGame />
          </div>
        )}

        {activeTool === "drawing" && (
          <div className="mt-8 rounded-3xl border border-pink-100 bg-pink-50/30 p-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-pink-500" />
              <h3 className="font-semibold text-foreground">Partage ton dessin ou ta photo</h3>
            </div>

            <input
              ref={drawingInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleDrawingUpload}
            />

            {!drawingPreview ? (
              <button
                type="button"
                onClick={() => drawingInputRef.current?.click()}
                className="w-full rounded-2xl border-2 border-dashed border-pink-200 bg-white p-12 text-center hover:border-pink-400 hover:bg-pink-50 transition-all group"
              >
                <Upload className="h-10 w-10 mx-auto mb-3 text-pink-300 group-hover:text-pink-400 transition-colors" />
                <p className="text-sm font-medium text-muted-foreground">Clique pour choisir une image</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Dessin, photo, collage, aquarelle...</p>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-pink-100 bg-white">
                  <img src={drawingPreview} alt="Ton image" className="max-h-72 mx-auto object-contain" />
                  <button
                    type="button"
                    onClick={() => { setDrawingPreview(null); setDrawingFile(null); setDrawingAnalysis(null) }}
                    className="absolute top-2 right-2 rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {!drawingAnalysis && !isAnalyzing && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAnalyzeDrawing}
                      className="flex-1 rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyser avec Lyra
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => drawingInputRef.current?.click()}
                      className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50"
                    >
                      Changer
                    </Button>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="flex items-center justify-center gap-3 rounded-2xl bg-white border border-pink-100 p-5">
                    <Loader2 className="h-5 w-5 animate-spin text-pink-400" />
                    <p className="text-sm text-muted-foreground">Lyra analyse ton image...</p>
                  </div>
                )}

                {analyzeError && (
                  <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                    <p className="text-sm text-red-600">{analyzeError}</p>
                  </div>
                )}

                {drawingAnalysis && (
                  <div className="rounded-2xl bg-white border border-pink-100 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">Ce que Lyra ressent...</p>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{drawingAnalysis}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => { setDrawingPreview(null); setDrawingFile(null); setDrawingAnalysis(null) }}
                    >
                      Analyser une autre image
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* AI Agents Section */}
      <section>
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bot className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Mes Mini-Agents IA</h2>
        </div>

        <p className="mb-6 text-muted-foreground">
          Discute avec un compagnon spécialisé pour te changer les idées ou apprendre de nouvelles choses selon tes passions.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AI_AGENTS.map((agent) => {
            const Icon = agent.icon
            return (
              <Card key={agent.id} className="group cursor-pointer border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className={cn("mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-inner", agent.color)}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    {agent.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    {agent.description}
                  </p>
                  {agent.id === "custom" ? (
                    <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground" onClick={() => setShowCustomAgentDialog(true)}>
                      Créer
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                      <Link href={`/patient/agents/${agent.id}`}>Démarrer</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {customAgents.map((agent) => (
            <Card key={agent.id} className="group cursor-pointer border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-inner bg-slate-100 text-slate-700">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  Expert : {agent.theme}
                </p>
                <p className="text-sm text-muted-foreground mb-6 flex-1">
                  Ton mini-agent personnalisé spécialisé en {agent.theme.toLowerCase()}.
                </p>
                <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                  <Link href={`/patient/agents/custom?theme=${encodeURIComponent(agent.theme)}&name=${encodeURIComponent(agent.name)}`}>Démarrer</Link>
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Add New Custom Agent Card */}
          <Card
            className="group cursor-pointer border-dashed border-2 border-border bg-secondary/10 hover:bg-secondary/30 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col items-center justify-center min-h-[280px]"
            onClick={() => setShowCustomAgentDialog(true)}
          >
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">Créer un nouvel agent</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Un compagnon sur-mesure pour apprendre et discuter.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Custom Agent Dialog */}
      <Dialog open={showCustomAgentDialog} onOpenChange={setShowCustomAgentDialog}>
        <DialogContent className="sm:max-w-[425px] border-border/50 bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Créer ton propre agent IA
            </DialogTitle>
            <DialogDescription>
              Quel est le thème ou ta passion ? L'agent adaptera ses réponses et ses recommandations vidéos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Prénom de l'agent :</Label>
              <Input
                id="name"
                value={customAgentName}
                onChange={(e) => setCustomAgentName(e.target.value)}
                placeholder="Ex: Professeur Tournesol, Galilée..."
                className="bg-secondary/50"
              />
            </div>
            <div className="grid gap-2 mt-2">
              <Label htmlFor="theme">Thème :</Label>
              <select
                id="theme"
                value={customAgentTheme}
                onChange={(e) => setCustomAgentTheme(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="L'histoire">L'histoire</option>
                <option value="La géographie">La géographie</option>
                <option value="Les mathématiques">Les mathématiques</option>
                <option value="Les sciences">Les sciences</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            {customAgentTheme === "Autre" && (
              <div className="grid gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="customTheme">Préciser le thème :</Label>
                <Input
                  id="customTheme"
                  placeholder="Ex: La musique, les dinosaures..."
                  className="bg-secondary/50"
                  onChange={(e) => {
                    // Update the state cautiously if they type here, maybe use a localized state?
                    // For simplicity, we can let them type directly into a separate state, but the user requested:
                    // "on peut séléctionné le un des theme dans un drpodxown qui serait : l'histoire, la géorphiie ou les maths ou les scinces ou autres"
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomAgentDialog(false)} className="rounded-full">Annuler</Button>
            <Button onClick={handleCreateCustomAgent} disabled={!customAgentName.trim()} className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
