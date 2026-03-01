import { useState, useRef, useCallback } from "react"

type VoiceDictationOptions = {
    onTranscript: (text: string) => void
    onError?: (error: string) => void
    language?: string
}

export function useVoiceDictation({ onTranscript, onError, language = "fr" }: VoiceDictationOptions) {
    const [isRecording, setIsRecording] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const streamRef = useRef<MediaStream | null>(null)

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream

            // Pick best supported audio format
            const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                ? "audio/webm;codecs=opus"
                : MediaRecorder.isTypeSupported("audio/webm")
                    ? "audio/webm"
                    : "audio/ogg"

            const mediaRecorder = new MediaRecorder(stream, { mimeType })
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data)
            }

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: mimeType })

                // Stop all tracks
                streamRef.current?.getTracks().forEach((t) => t.stop())

                setIsProcessing(true)
                try {
                    const formData = new FormData()
                    formData.append("audio", blob, "recording.webm")
                    formData.append("language", language)

                    const res = await fetch("/api/transcribe", {
                        method: "POST",
                        body: formData,
                    })

                    if (!res.ok) {
                        const err = await res.json()
                        throw new Error(err.error || "Transcription failed")
                    }

                    const data = await res.json()
                    if (data.text?.trim()) {
                        onTranscript(data.text.trim())
                    }
                } catch (err: any) {
                    console.error("Transcription error:", err)
                    onError?.(err.message || "Erreur de transcription")
                } finally {
                    setIsProcessing(false)
                }
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (err: any) {
            console.error("Mic error:", err)
            onError?.("Impossible d'accéder au microphone")
        }
    }, [onTranscript, onError, language])

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current?.state === "recording") {
            mediaRecorderRef.current.stop()
        }
        setIsRecording(false)
    }, [])

    const toggleRecording = useCallback(() => {
        if (isRecording) stopRecording()
        else startRecording()
    }, [isRecording, startRecording, stopRecording])

    return { isRecording, isProcessing, toggleRecording, startRecording, stopRecording }
}
