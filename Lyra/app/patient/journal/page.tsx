"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Image as ImageIcon, SmilePlus, Mic, CheckCircle2, ChevronLeft, ChevronRight, Wand2 } from "lucide-react"
import { VoiceButton } from "@/components/voice-button"
import { format, subDays, addDays, isToday } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function JournalPage() {
  const { journalEntries, addCheckIn } = useApp()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [newText, setNewText] = useState("")
  const [font, setFont] = useState("font-sans")
  const [bgColor, setBgColor] = useState("bg-[#Fdfbf7]") // paper-like color
  const [rightContent, setRightContent] = useState<"empty" | "image" | "stickers">("empty")
  const [stickers, setStickers] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])
  const [imagePrompt, setImagePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)

  // Image Generation Options
  const imageStyles = ["Aquarelle", "Réaliste", "Pixel Art", "Dessin animé", "Cinématique", "Manga"]
  const imageTones = ["Joyeux", "Apaisant", "Mélancolique", "Énergique", "Mystérieux"]
  const [selectedImageStyle, setSelectedImageStyle] = useState(imageStyles[0])
  const [selectedImageTone, setSelectedImageTone] = useState(imageTones[0])
  const [imageWarning, setImageWarning] = useState<string | null>(null)

  // MOCK DATA FOR PREVIOUS DAYS
  const mockEntries: Record<string, { text: string, imageUrl?: string }> = {
    [format(subDays(new Date(), 1), "yyyy-MM-dd")]: { // e.g. Feb 28
      text: "Aujourd'hui, j'ai eu une super note en maths (20/20) ! J'étais super contente et fière de moi. Ça m'a motivée pour le reste de la journée.",
      imageUrl: "https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?auto=format&fit=crop&q=80&w=800&h=800" // placeholder writing/A+ grade vibe
    },
    [format(subDays(new Date(), 2), "yyyy-MM-dd")]: { // e.g. Feb 27
      text: "Aujourd'hui je suis allée acheter de nouvelles chaussures avec mon amie Léa. On a passé un super moment ! C'était vraiment cool de se balader en ville.",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800&h=800" // red sneakers placeholder
    },
    [format(subDays(new Date(), 3), "yyyy-MM-dd")]: {
      text: "Génial ! Je suis allée au poney club, Tornado était super sage. Ça m'a vidé la tête. J'ai même parlé un peu avec une autre fille de mon groupe."
    }
  }

  // Update text when date changes
  const handleDateChange = (date: Date) => {
    setCurrentDate(date)
    setRightContent("empty")
    setGeneratedImageUrl(null)
    setIsGenerating(false)
    const dateKey = format(date, "yyyy-MM-dd")
    if (isToday(date)) {
      setNewText("") // Actually, we'd load today's saved draft, but let's keep it simple
    } else {
      const entry = mockEntries[dateKey]
      if (entry) {
        setNewText(entry.text)
        if (entry.imageUrl) {
          setRightContent("image")
          setGeneratedImageUrl(entry.imageUrl)
        }
      } else {
        setNewText("Je n'ai rien écrit ce jour-là...")
      }
    }
  }

  const fonts = [
    { name: "Classique", class: "font-sans" },
    { name: "Manuscrite", class: "font-serif italic" }, // approximation without importing new fonts
    { name: "Moderne", class: "font-mono" },
  ]

  const colors = [
    { name: "Crème", class: "bg-[#Fdfbf7]" },
    { name: "Bleu ciel", class: "bg-blue-50" },
    { name: "Rose pâle", class: "bg-pink-50" },
  ]

  const availableStickers = ["🌸", "⭐", "🎉", "🐱", "💖", "✨"]

  const handleAddSticker = (emoji: string) => {
    setRightContent("stickers")
    setStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji,
        x: Math.random() * 60 + 20, // 20% to 80%
        y: Math.random() * 60 + 20, // 20% to 80%
      },
    ])
  }

  const handleGenerateImage = () => {
    setRightContent("image")
    setImageWarning(null)
  }

  const handleLyraChoose = () => {
    setImagePrompt("Un jardin paisible avec quelques chevaux au loin, pour combiner mes deux passions : la jardinerie et le cheval.")
    setSelectedImageStyle("Aquarelle")
    setSelectedImageTone("Apaisant")
  }

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-lyra-teal-dark">Mon Carnet Secret</h1>
          <p className="mt-2 text-muted-foreground text-lg">Écris, dessine, et personnalise tes pages du jour.</p>
        </div>
        <div className="mt-4 flex gap-2 md:mt-0 items-center">
          <div className="flex bg-white rounded-full shadow-sm border p-1 mr-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDateChange(subDays(currentDate, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-3 flex items-center text-sm font-medium w-24 justify-center">
              {format(currentDate, "d MMM", { locale: fr })}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDateChange(addDays(currentDate, 1))} disabled={isToday(currentDate)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="rounded-full bg-background" onClick={() => {
            setNewText("");
            setRightContent("empty");
            setStickers([]);
            handleDateChange(new Date());
          }}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Nouvelle page
          </Button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4 items-center">
        {/* Style selectors */}
        <div className="flex bg-card p-2 rounded-2xl shadow-sm border border-border/50 gap-2">
          {fonts.map((f) => (
            <button
              key={f.name}
              onClick={() => setFont(f.class)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-sm transition-colors",
                font === f.class ? "bg-primary text-primary-foreground font-medium" : "hover:bg-secondary text-muted-foreground"
              )}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="flex bg-card p-2 rounded-2xl shadow-sm border border-border/50 gap-2">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setBgColor(c.class)}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                c.class,
                bgColor === c.class ? "border-primary" : "border-transparent shadow-sm"
              )}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* The Book */}
      <div className="relative flex flex-col md:flex-row min-h-[600px] w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl ring-1 ring-border/5">
        {/* Spine overlay */}
        <div className="absolute inset-y-0 left-1/2 hidden w-8 -translate-x-1/2 bg-gradient-to-r from-black/5 via-black/10 to-black/5 md:block mix-blend-multiply z-10"></div>

        {/* Left Page (Text) */}
        <div className={cn("flex-1 p-6 md:p-10 transition-colors duration-500", bgColor)}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {format(currentDate, "EEEE d MMMM yyyy", { locale: fr })}
            </span>
            <VoiceButton
              onTranscript={(text) => setNewText((prev) => prev ? prev + " " + text : text)}
              className="text-muted-foreground hover:text-primary"
            />
          </div>

          <Textarea
            placeholder="Cher journal, aujourd'hui..."
            className={cn(
              "min-h-[400px] w-full resize-none border-0 bg-transparent p-0 text-lg leading-loose focus-visible:ring-0 placeholder:text-muted-foreground/50",
              font
            )}
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.1) 31px, rgba(0,0,0,0.1) 32px)', lineHeight: '32px', paddingTop: '8px' }}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </div>

        {/* Right Page (Media/Interactive) */}
        <div className={cn("flex-1 p-6 md:p-10 transition-colors duration-500 relative border-t md:border-t-0 md:border-l border-black/5", bgColor)}>
          {rightContent === "empty" ? (
            <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
              <div className="text-muted-foreground">Personnalise ta page de droite</div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-2 rounded-2xl bg-white/50 hover:bg-white" onClick={handleGenerateImage}>
                  <Sparkles className="h-6 w-6 text-lyra-teal-dark" />
                  <span>Image IA</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 rounded-2xl bg-white/50 hover:bg-white" onClick={() => setRightContent("stickers")}>
                  <SmilePlus className="h-6 w-6 text-lyra-coral" />
                  <span>Stickers</span>
                </Button>
              </div>
            </div>
          ) : rightContent === "image" ? (
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Illustration générée</h3>
                <Button variant="ghost" size="sm" onClick={() => setRightContent("empty")}>Annuler</Button>
              </div>
              <div className="flex-1 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 p-6 flex flex-col gap-4 overflow-y-auto">
                {!generatedImageUrl && (
                  <div className="flex items-center justify-center mb-0">
                    <ImageIcon className="h-10 w-10 text-primary/40" />
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2 cursor-pointer">
                      💡 Décris l'image que tu aimerais voir :
                    </label>
                    <Textarea
                      placeholder="Par exemple: Un chaton roux qui dort sur un nuage..."
                      className="resize-none bg-white/60 focus:bg-white transition-colors"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">
                      🎨 Style de l'image
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {imageStyles.map(style => (
                        <button
                          key={style}
                          onClick={() => setSelectedImageStyle(style)}
                          className={cn(
                            "px-2 py-1 rounded-md text-xs border transition-colors",
                            selectedImageStyle === style ? "bg-primary text-primary-foreground border-primary" : "bg-white/60 hover:bg-white text-muted-foreground"
                          )}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">
                      😌 Ton de l'image
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {imageTones.map(tone => (
                        <button
                          key={tone}
                          onClick={() => setSelectedImageTone(tone)}
                          className={cn(
                            "px-2 py-1 rounded-md text-xs border transition-colors",
                            selectedImageTone === tone ? "bg-primary text-primary-foreground border-primary" : "bg-white/60 hover:bg-white text-muted-foreground"
                          )}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border/50"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase tracking-widest">ou</span>
                    <div className="flex-grow border-t border-border/50"></div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-white/60 hover:bg-white rounded-xl h-auto py-3 justify-start text-left"
                    onClick={handleLyraChoose}
                  >
                    <Wand2 className="mr-3 h-5 w-5 text-lyra-teal-dark flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Laisse Lyra choisir 🪄</div>
                      <div className="text-xs text-muted-foreground">Une surprise sur mes passions (jardinerie, cheval)</div>
                    </div>
                  </Button>
                </div>

                {imageWarning && (
                  <div className="mt-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                    <strong>Attention:</strong> {imageWarning}
                  </div>
                )}

                <div className="mt-auto pt-4 text-center">
                  <Button
                    variant="default"
                    className="rounded-full shadow-sm w-full md:w-auto"
                    disabled={!imagePrompt || isGenerating}
                    onClick={async () => {
                      setIsGenerating(true)
                      setImageWarning(null)
                      try {
                        const styleDesc = selectedImageStyle;
                        const toneDesc = selectedImageTone;
                        const colorDesc = bgColor.includes("blue") ? "tons bleutés" : bgColor.includes("pink") ? "tons chauds roses" : "tons neutres";

                        const res = await fetch("/api/generate-image", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            prompt: imagePrompt,
                            style: styleDesc,
                            tone: toneDesc,
                            colors: colorDesc,
                            date: format(currentDate, "yyyy-MM-dd")
                          })
                        })

                        // Parse response from n8n
                        const data = await res.json().catch(() => null);

                        setIsGenerating(false);

                        if (data && (data.warning || data.error || data.messageattention)) {
                          setImageWarning(data.warning || data.error || data.messageattention || "L'image générée n'a pas été validée.");
                        } else if (data && data.imageUrl) {
                          setGeneratedImageUrl(data.imageUrl);
                        } else {
                          // Fallback mockup just in case webhook format isn't fully ready but didn't error
                          setGeneratedImageUrl(`https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800&h=800`)
                        }
                      } catch (e) {
                        console.error(e)
                        setIsGenerating(false)
                        setImageWarning("Impossible de connecter à l'IA pour le moment.")
                      }
                    }}
                  >
                    {isGenerating ? "Création en cours..." : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Générer maintenant
                      </>
                    )}
                  </Button>
                </div>

                {generatedImageUrl && (
                  <div className="absolute inset-0 bg-card rounded-2xl z-10 p-2 flex flex-col">
                    <div className="flex justify-between items-center mb-2 px-2">
                      <span className="text-sm font-medium flex items-center gap-2"><Sparkles className="w-4 h-4 text-lyra-teal-dark" /> Illustration générée</span>
                      <Button variant="ghost" size="sm" onClick={() => setGeneratedImageUrl(null)}>Nouvelle image</Button>
                    </div>
                    <div className="flex-1 rounded-xl overflow-hidden shadow-inner bg-secondary/30 relative">
                      <img src={generatedImageUrl} alt="Generated illustration" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col h-full relative">
              <div className="mb-4 flex items-center justify-between z-20">
                <h3 className="font-semibold text-foreground">Tes Stickers</h3>
                <Button variant="ghost" size="sm" onClick={() => setRightContent("empty")}>Annuler</Button>
              </div>
              <div className="flex gap-2 flex-wrap mb-4 z-20">
                {availableStickers.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleAddSticker(emoji)}
                    className="h-10 w-10 text-2xl bg-white/60 hover:bg-white rounded-full shadow-sm flex items-center justify-center transition-transform hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden border border-black/5 bg-white/20">
                {stickers.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                    Clique sur les stickers au-dessus pour décorer !
                  </div>
                )}
                {stickers.map(sticker => (
                  <div
                    key={sticker.id}
                    className="absolute text-6xl drop-shadow-md transition-transform hover:scale-110 cursor-pointer pointer-events-auto"
                    style={{ left: `${sticker.x}%`, top: `${sticker.y}%`, transform: `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)` }}
                  >
                    {sticker.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button size="lg" className="rounded-full shadow-lg" disabled={!newText.trim()}>
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Enregistrer ma page
        </Button>
      </div>

    </div>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
