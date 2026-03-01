<div align="center">

# 🌸 Lyra — The AI Guardrail for Adolescent Mental Health

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Mistral AI](https://img.shields.io/badge/Mistral_AI-Powered-FF7000?logo=data:image/svg+xml;base64,PHN2Zy8+)](https://mistral.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

> **Mistral AI Hackathon — March 2026**

*Created by **Alexandre Piron** and **Raphael Chaboud** (French Students)*

*Much more than a chatbot: Lyra is a secure clinical ecosystem connecting the isolated teenager, their family, and their psychiatrist.*

</div>

---

## ⚠️ The Dual Crisis: Digital Danger & The Clinical Void

**1. The Danger of Generic AI:** Today, when facing anxiety or depression, teenagers often turn to public LLMs because they are available 24/7 and judgment-free. **The problem:** These models are not trained for psychiatric care. They can miss vital warning signs, offer inappropriate generic advice, or worse, hallucinate during a suicidal crisis.

**2. The 23-Hour Gap:** Meanwhile, a teenager in psychiatric care spends an average of **23 out of 24 hours without any professional support** between sessions. Parents feel helpless for fear of being intrusive, and doctors navigate blindly from one week to the next.

**Lyra bridges this gap by transforming the youth's attraction to AI into a secure, supervised, and multimodal healthcare tool.**

---

## 🌍 A Complete Ecosystem (Beyond the Chatbot)

Lyra is not just a chat window. It is a three-dimensional therapeutic platform:

### 🧒 1. The Patient's Sanctuary
* **Emotional Calendar:** A quick daily check-in (sleep, mood, anxiety, eating habits) to track well-being trends over time.
* **Multimodal Secret Journal:** A safe space to write or dictate thoughts, enriched by safe AI-generated images.
* **Relaxation Toolbox:** Guided breathing exercises (4-7-8), stress-relief mini-games, and drawing analysis.
* **SOS & Emergency Kit:** Always accessible in the bottom right corner. Provides grounding exercises (5-4-3-2-1) and immediate access to the 3114 (French Suicide Prevention) and 15 (Emergency Medical Services).
* **Emotional GPS:** A personalized clinical sheet where the patient defines what helps them, what triggers them, and their trusted contacts.

### 👨‍👩‍👧 2. The Parent Space: Support Without Intrusion
* **Benevolent Dashboard:** Anonymized 30-day mood visualization (journal entries remain strictly confidential).
* **Words from Loved Ones:** Send supportive messages (videos, voice notes, texts) that pass through an AI filter to ensure they are positive and non-guilt-inducing.
* **GPS Access:** If the teenager consents, parents gain access to "early warning signs" to react appropriately.

### 🩺 3. The Doctor Space: The Clinical Dashboard
* **Augmented Patient File:** The practitioner no longer loses the first 15 minutes of a session asking "How was your week?".
* **Risk Alerts:** Immediate notifications if the teenager triggers the SOS button or expresses dark thoughts.

---

## 🧠 The Power of the Mistral AI Stack

Each Mistral model was carefully selected and configured for a specific psychological purpose:

### 👑 1. Lyra, the "Orchestrator" Chatbot (`mistral-large-latest`)
Lyra is not passive; she is the "director" of the website.
* **Contextual Navigation:** If the patient feels anxious, Lyra doesn't just offer comforting words; she generates a dynamic action button redirecting to the "Relaxation" page or a breathing exercise.
* **Automated Crisis Guardrail:** Thanks to a strict system prompt, if the teen mentions suicidal thoughts, Lyra inserts a hidden `[CRISIS]` tag. The front-end detects it, pauses the casual conversation, and opens a **Critical Emergency Modal** directing them to the 3114 hotline and their Emotional GPS contacts.

### 🎨 2. Restrictive Image Generation & Vision (`pixtral-12b-2409`)
* **Therapeutic Refusal:** In the journal, the user can ask the AI to illustrate their day. If the prompt is morbid or harmful, Pixtral is configured to **refuse generation**, explaining that it is not healthy.
* **Positive Bias:** The AI then pivots to generate a soothing image based on the patient's registered "passions" (e.g., horses, nature).
* **Drawing Analysis:** The teenager can upload a real drawing or sketch. Pixtral analyzes it to help the patient put complex emotions into words.

### 🗣️ 3. Voice Accessibility (`voxtral-mini-latest`)
During a panic attack, typing on a keyboard is often impossible. A microphone is integrated into all input fields (Journal, Chat) for instant Speech-to-Text transcription, removing the friction of expression.

### 🤖 4. Specialized Mini-Agents (`mistral-small-latest`)
To distract the teenager from their distress, we use lighter, faster models to create thematic companions (e.g., Leon the Gardener, Plume the Poet). They assist in emotional regulation through hobbies and creativity.

### 📊 5. The Weekly Medical Report (`mistral-large-latest`)
In the background, the AI compiles calendar data, journal emotions (anonymized), and themes discussed with Lyra to generate a **structured clinical synthesis** for the psychiatrist. It identifies the week's triggers and suggests questions for the next consultation.

---

## 🛠️ Architecture & Technical Details

### Technology Stack
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **AI SDK:** Vercel AI SDK paired with the `@ai-sdk/mistral` provider for response streaming
* **UI/UX:** Tailwind CSS, shadcn/ui, Framer Motion (smooth animations are essential for soothing the user)

### Engineering Choices & Optimizations
1. **Edge-Side Media Compression:** To guarantee responsiveness (even on a 3G mobile connection) and optimize Vision API costs, images (e.g., a 4MB photo of a drawing) are resized and compressed locally via an HTML5 `<canvas>` (max 800px, JPEG 0.7) before being sent to Pixtral.
2. **Streaming & Markdown:** Responses from Mistral agents are streamed in real-time and rendered via `react-markdown` to support lists, formatting, and clickable hyperlinks to emergency resources.
3. **Reusable Audio Hooks:** We implemented a global React hook `useVoiceDictation` that handles recording states, audio encoding, and the request to the Voxtral API for all text inputs across the application.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js ≥ 18
- A Mistral API Key (get it from [console.mistral.ai](https://console.mistral.ai/))

### Setup Instructions


 Clone the repository
git clone [https://github.com/Eveyens/Mistral_lyra.git](https://github.com/Eveyens/Mistral_lyra.git)
cd Mistral_lyra/Lyra

 Install dependencies
npm install

 Configure environment variables
cp .env.example .env
 Add MISTRAL_API_KEY=your_key_here to the .env file

 Run the development server (http://localhost:3000)
npm run dev


<div align="center">
<p><em>"Artificial intelligence serving humanity, right where human presence cannot always be."</em></p>
<p>Developed with 💛 for the Mistral AI Hackathon.</p>
</div>

