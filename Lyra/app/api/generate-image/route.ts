import { NextResponse } from "next/server"
import { Mistral } from "@mistralai/mistralai"

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY })

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { prompt, style, tone, colors, date } = body

        // 1. Call n8n Webhook
        const n8nRes = await fetch("https://n8n.srv849307.hstgr.cloud/webhook-test/027c5823-4b31-48df-a228-96b462747d16", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, style, tone, colors, date }),
        })

        const data = await n8nRes.json().catch(() => null)

        if (!data) {
            return NextResponse.json({ error: "No response from image generation service." }, { status: 500 })
        }

        // Check if data is an array (n8n default for some nodes) and extract the first item
        const payload = Array.isArray(data) ? data[0] : data;

        if (payload?.warning || payload?.error || payload?.messageattention) {
            // n8n caught something
            return NextResponse.json(payload)
        }

        let imageUrl = null;
        if (payload?.imageUrl || payload?.url) {
            imageUrl = payload.imageUrl || payload.url;
        }

        if (!imageUrl) {
            return NextResponse.json({ error: "No image URL returned." }, { status: 500 })
        }

        // 2. Validate Image with Mistral Vision
        if (process.env.MISTRAL_API_KEY) {
            try {
                const visionResponse = await client.chat.complete({
                    model: "pixtral-12b-2409",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "You are a safety moderator for a mental health application designed for adolescents and young adults. Analyze this image. Does it contain any graphic violence, self-harm, sexual content, disturbing imagery, or anything that could be triggering or harmful to a vulnerable youth? Answer with ONLY 'SAFE' or 'UNSAFE'. If you are unsure, err on the side of 'UNSAFE'.",
                                },
                                {
                                    type: "image_url",
                                    imageUrl: imageUrl,
                                },
                            ],
                        },
                    ],
                    maxTokens: 10,
                });

                const rawContent = visionResponse.choices?.[0]?.message?.content;
                const judgement = typeof rawContent === 'string'
                    ? rawContent.trim().toUpperCase()
                    : "";
                console.log("Mistral Vision Judgement:", judgement);

                if (judgement?.includes("UNSAFE")) {
                    return NextResponse.json({ warning: "L'image générée n'a pas passé nos filtres de sécurité. Veuillez essayer un autre style ou une autre description." })
                }
            } catch (visionError) {
                console.error("Mistral vision validation failed:", visionError);
                // Decide if we should block or allow if vision API fails. Given context, perhaps block to be safe, or allow with warning? Let's block to be safe.
                return NextResponse.json({ warning: "Impossible de valider la sécurité de l'image. Veuillez réessayer plus tard." })
            }
        } else {
            console.warn("MISTRAL_API_KEY missing, skipping Pixtral validation.")
        }

        // 3. Return safe image URL
        return NextResponse.json({ imageUrl })

    } catch (error) {
        console.error("Error in generate-image route:", error)
        return NextResponse.json({ error: "Failed to process image generation request." }, { status: 500 })
    }
}
