"use client"

import { useVoiceDictation } from "@/lib/use-voice-dictation"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type VoiceButtonProps = {
    onTranscript: (text: string) => void
    className?: string
    size?: "default" | "sm" | "lg" | "icon"
    variant?: "default" | "outline" | "ghost" | "secondary"
}

export function VoiceButton({ onTranscript, className, size = "icon", variant = "ghost" }: VoiceButtonProps) {
    const { isRecording, isProcessing, toggleRecording } = useVoiceDictation({
        onTranscript,
        onError: (msg) => toast.error(msg),
    })

    return (
        <Button
            type="button"
            size={size}
            variant={variant}
            onClick={toggleRecording}
            disabled={isProcessing}
            title={isRecording ? "Arrêter la dictée" : "Dicter avec Voxtral"}
            className={cn(
                "transition-all",
                isRecording && "bg-red-100 text-red-600 hover:bg-red-200 animate-pulse",
                isProcessing && "opacity-60",
                className
            )}
        >
            {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : isRecording ? (
                <MicOff className="h-4 w-4" />
            ) : (
                <Mic className="h-4 w-4" />
            )}
            <span className="sr-only">{isRecording ? "Arrêter la dictée" : "Dicter"}</span>
        </Button>
    )
}
