import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: NextRequest) {
    try {
        const { imageBase64, mimeType } = await req.json()

        if (!imageBase64) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 })
        }

        const apiKey = process.env.MISTRAL_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: "MISTRAL_API_KEY not configured" }, { status: 500 })
        }

        const prompt = `Tu es Lyra, un compagnon d'écoute bienveillant pour les adolescents. Un adolescent vient de te partager cette image (dessin, photo, collage...).

Analyse-la avec douceur en 3-4 phrases maximum :
1. Décris brièvement ce que tu vois.
2. Identifie les émotions ou l'ambiance qui s'en dégagent.
3. Pose une question ouverte pour inviter l'adolescent à s'exprimer.

Reste chaleureux, tutoie, et n'utilise pas de surnoms affectueux. Réponds en français.`

        // Call Mistral API directly (chat completions with vision)
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "pixtral-12b-2409",
                max_tokens: 300,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}`,
                                },
                            },
                            {
                                type: "text",
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("Mistral API error:", data)
            const message = data?.message || "Erreur API Mistral"
            // Friendly message for rate limit
            if (response.status === 429) {
                return NextResponse.json(
                    { error: "Trop de requêtes en ce moment, réessaie dans quelques secondes." },
                    { status: 429 }
                )
            }
            return NextResponse.json({ error: message }, { status: response.status })
        }

        const text = data.choices?.[0]?.message?.content || ""
        return NextResponse.json({ analysis: text })
    } catch (err: any) {
        console.error("Image analysis error:", err)
        return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 })
    }
}
