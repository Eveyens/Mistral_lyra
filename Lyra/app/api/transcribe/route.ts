import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const audio = formData.get("audio") as File | null
        const language = (formData.get("language") as string) || "fr"

        if (!audio) {
            return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
        }

        const apiKey = process.env.MISTRAL_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: "MISTRAL_API_KEY not configured" }, { status: 500 })
        }

        // Forward to Mistral Voxtral transcription API
        const mistralForm = new FormData()
        mistralForm.append("file", audio, "audio.webm")
        mistralForm.append("model", "voxtral-mini-latest")
        mistralForm.append("language", language)

        const response = await fetch("https://api.mistral.ai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: mistralForm,
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("Voxtral API error:", errorText)
            return NextResponse.json(
                { error: `Voxtral API error: ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json({ text: data.text || "" })
    } catch (err: any) {
        console.error("Transcription route error:", err)
        return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 })
    }
}
