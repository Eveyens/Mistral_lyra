"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Bubble {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
}

const COLORS = [
    "bg-blue-300", "bg-purple-300", "bg-pink-300", "bg-orange-300", "bg-teal-300"
]

export default function PopGame() {
    const [bubbles, setBubbles] = useState<Bubble[]>([])
    const [score, setScore] = useState(0)
    const [soundEnabled, setSoundEnabled] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    // Audio contexts
    const popAudioRef = useRef<HTMLAudioElement | null>(null)
    const bgAudioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        popAudioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=bubble-pop-2600.mp3")
        popAudioRef.current.volume = 0.5

        bgAudioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3")
        bgAudioRef.current.loop = true
        bgAudioRef.current.volume = 0.2

        return () => {
            bgAudioRef.current?.pause()
        }
    }, [])

    useEffect(() => {
        if (soundEnabled) {
            bgAudioRef.current?.play().catch(() => console.log("Audio autoplay prevented"))
        } else {
            bgAudioRef.current?.pause()
        }
    }, [soundEnabled])

    const spawnBubble = useCallback(() => {
        if (!containerRef.current) return

        const { width, height } = containerRef.current.getBoundingClientRect()
        const size = Math.random() * 40 + 40 // 40px to 80px
        const x = Math.random() * (width - size)
        const y = Math.random() * (height - size)
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]

        const newBubble: Bubble = {
            id: Date.now() + Math.random(),
            x,
            y,
            color,
            size
        }

        setBubbles(prev => [...prev, newBubble])

        // Auto remove after some time if not popped
        setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
        }, 4000 + Math.random() * 2000)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (bubbles.length < 15) {
                spawnBubble()
            }
        }, 800)
        return () => clearInterval(interval)
    }, [bubbles.length, spawnBubble])

    const handlePop = (id: number) => {
        if (soundEnabled && popAudioRef.current) {
            popAudioRef.current.currentTime = 0
            popAudioRef.current.play().catch(() => { })
        }
        setBubbles(prev => prev.filter(b => b.id !== id))
        setScore(s => s + 1)
    }

    return (
        <div className="flex flex-col h-full min-h-[500px] w-full bg-slate-50 relative rounded-3xl overflow-hidden border border-border/50 shadow-inner">
            {/* Header Info */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-slate-100/80 to-transparent">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-lyra-teal-dark font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Score: {score}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/70 backdrop-blur-sm rounded-full shadow-sm hover:bg-white"
                        onClick={() => setScore(0)}
                    >
                        <RefreshCw className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/70 backdrop-blur-sm rounded-full shadow-sm hover:bg-white"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                    >
                        {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                    </Button>
                </div>
            </div>

            {/* Game Area */}
            <div
                ref={containerRef}
                className="flex-1 relative cursor-crosshair overflow-hidden"
            >
                <AnimatePresence>
                    {bubbles.map((bubble) => (
                        <motion.div
                            key={bubble.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 0.8,
                                y: [bubble.y + 20, bubble.y - 20, bubble.y], // subtle floating
                                x: [bubble.x, bubble.x + 10, bubble.x - 10, bubble.x]
                            }}
                            exit={{ scale: 1.5, opacity: 0, filter: "blur(4px)" }}
                            transition={{
                                duration: 4, // floating duration
                                exit: { duration: 0.2 } // popping duration
                            }}
                            className={`absolute rounded-full shadow-sm ${bubble.color} flex items-center justify-center backdrop-blur-sm border border-white/40`}
                            style={{
                                width: bubble.size,
                                height: bubble.size,
                                left: bubble.x,
                                top: bubble.y,
                            }}
                            onMouseDown={() => handlePop(bubble.id)}
                            onTouchStart={() => handlePop(bubble.id)}
                        >
                            <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[1px]"></div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {bubbles.length === 0 && score === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-pulse">
                        Ouf... Prépare-toi à éclater les bulles !
                    </div>
                )}
            </div>
        </div >
    )
}
