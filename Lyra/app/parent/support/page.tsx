"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Send, Lightbulb, MessageCircleHeart, ImageIcon, Video, Music, X, CheckCircle2 } from "lucide-react"

type MediaType = "image" | "video" | "audio"

interface MediaPreview {
    url: string
    name: string
    type: MediaType
}

export default function ParentSupportPage() {
    const [message, setMessage] = useState("")
    const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null)
    const [isSent, setIsSent] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        let type: MediaType = "image"
        if (file.type.startsWith("video/")) type = "video"
        else if (file.type.startsWith("audio/")) type = "audio"

        setMediaPreview({ url, name: file.name, type })
    }

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim() && !mediaPreview) return
        setIsSent(true)
        setTimeout(() => {
            setMessage("")
            setMediaPreview(null)
            setIsSent(false)
        }, 3000)
    }

    const triggerFileInput = (accept: string) => {
        if (!fileInputRef.current) return
        fileInputRef.current.accept = accept
        fileInputRef.current.click()
    }

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                    <MessageCircleHeart className="h-6 w-6 text-lyra-coral" />
                    <h1 className="text-2xl font-bold text-foreground">Soutenir mon proche</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Envoyez des mots d{"'"}encouragement, des photos, vidéos ou messages audio.
                    Ils apparaîtront dans la <strong>Zone de repos</strong> de Camille.
                </p>
            </div>

            {/* Tips */}
            <div className="mb-8 rounded-xl border border-primary/20 bg-lyra-teal-light/30 p-4">
                <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="text-sm text-foreground">
                        <p className="font-medium mb-1">Comment rédiger un mot doux efficace ?</p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Misez sur la bienveillance inconditionnelle (&ldquo;Je suis là pour toi&rdquo;)</li>
                            <li>Évitez les injonctions ou conseils non sollicités (&ldquo;Secoue-toi&rdquo;)</li>
                            <li>Un souvenir heureux partagé peut redonner le sourire 💛</li>
                            <li>
                                Lyra filtre automatiquement les messages pour s{"'"}assurer qu{"'"}ils sont positifs et adaptés.
                            </li>
                            <li>Vous pouvez aussi joindre une <strong>photo</strong>, une <strong>vidéo</strong> ou un <strong>message vocal</strong>.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Form */}
            <Card className="border-lyra-coral/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-lyra-coral" />
                        Écrire un mot doux ou partager un souvenir
                    </CardTitle>
                    <CardDescription>Ce message pourra être lu par Camille quand elle en ressentira le besoin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSend} className="space-y-4">
                        <Textarea
                            placeholder="Un petit mot pour dire que je pense à toi et que je t'aime fort..."
                            className="min-h-[120px] resize-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isSent}
                        />

                        {/* Media preview */}
                        {mediaPreview && (
                            <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/30 p-3">
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                                    onClick={() => setMediaPreview(null)}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                {mediaPreview.type === "image" && (
                                    <img src={mediaPreview.url} alt="Aperçu" className="max-h-48 w-auto mx-auto rounded-lg object-cover" />
                                )}
                                {mediaPreview.type === "video" && (
                                    <video src={mediaPreview.url} controls className="max-h-48 w-full rounded-lg" />
                                )}
                                {mediaPreview.type === "audio" && (
                                    <div className="flex flex-col items-center gap-2 py-3">
                                        <Music className="h-8 w-8 text-lyra-coral" />
                                        <p className="text-sm text-muted-foreground font-medium">{mediaPreview.name}</p>
                                        <audio src={mediaPreview.url} controls className="w-full" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Media action buttons */}
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-full gap-1.5 text-xs border-lyra-coral/30 hover:bg-lyra-coral/10 hover:text-lyra-coral"
                                onClick={() => triggerFileInput("image/*")}
                                disabled={isSent}
                            >
                                <ImageIcon className="h-3.5 w-3.5" />
                                Photo
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-full gap-1.5 text-xs border-lyra-coral/30 hover:bg-lyra-coral/10 hover:text-lyra-coral"
                                onClick={() => triggerFileInput("video/*")}
                                disabled={isSent}
                            >
                                <Video className="h-3.5 w-3.5" />
                                Vidéo
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-full gap-1.5 text-xs border-lyra-coral/30 hover:bg-lyra-coral/10 hover:text-lyra-coral"
                                onClick={() => triggerFileInput("audio/*")}
                                disabled={isSent}
                            >
                                <Music className="h-3.5 w-3.5" />
                                Message vocal
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">Lyra s{"'"}assure de transmettre cela avec douceur. 💜</p>
                            <Button
                                type="submit"
                                disabled={(!message.trim() && !mediaPreview) || isSent}
                                className="bg-lyra-coral hover:bg-lyra-coral-dark text-white"
                            >
                                {isSent ? (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4" /> Envoyé !
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" /> Envoyer à Camille
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
