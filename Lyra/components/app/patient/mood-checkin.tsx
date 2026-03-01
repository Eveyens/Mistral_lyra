"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ShieldAlert, Phone } from "lucide-react"
import type { SuicidalIdeation } from "@/lib/demo-data"

const moodOptions = [
  { value: 1, label: "Tres mal", emoji: "1" },
  { value: 2, label: "Mal", emoji: "2" },
  { value: 3, label: "Moyen", emoji: "3" },
  { value: 4, label: "Bien", emoji: "4" },
  { value: 5, label: "Tres bien", emoji: "5" },
]

const scaleLabels: Record<string, string> = {
  mood: "Comment tu te sens ?",
  stress: "Ton niveau de stress ?",
  sleep: "Qualite du sommeil ?",
  energy: "Ton energie ?",
  ideation: "Question importante",
}

export function MoodCheckin() {
  const { addCheckIn } = useApp()
  const [step, setStep] = useState(0)
  const [mood, setMood] = useState(0)
  const [stress, setStress] = useState(0)
  const [sleep, setSleep] = useState(0)
  const [energy, setEnergy] = useState(0)

  // Suicidal ideation state
  const [ideation, setIdeation] = useState<SuicidalIdeation>({ hasThoughts: null })
  const [ideationStep, setIdeationStep] = useState<"ask" | "intensity" | "plan" | "intention" | "done">("ask")
  const [showCrisisHelp, setShowCrisisHelp] = useState(false)

  // Steps: 0-3 = mood/stress/sleep/energy, 4 = ideation
  const scales = [
    { key: "mood" as const, value: mood, setter: setMood },
    { key: "stress" as const, value: stress, setter: setStress },
    { key: "sleep" as const, value: sleep, setter: setSleep },
    { key: "energy" as const, value: energy, setter: setEnergy },
  ]

  const isScaleStep = step < 4
  const current = isScaleStep ? scales[step] : null

  const handleSelect = (val: number) => {
    if (!current) return
    current.setter(val)
    if (step < 3) {
      setTimeout(() => setStep(step + 1), 200)
    } else {
      // Move to ideation step after energy
      setTimeout(() => setStep(4), 200)
    }
  }

  const handleIdeationAnswer = (answer: boolean | null) => {
    if (answer === null) {
      // "je prefere ne pas repondre"
      setIdeation({ hasThoughts: null })
      setIdeationStep("done")
      setShowCrisisHelp(true) // still show help button
    } else if (answer === false) {
      setIdeation({ hasThoughts: false })
      setIdeationStep("done")
    } else {
      setIdeation({ hasThoughts: true })
      setIdeationStep("intensity")
    }
  }

  const handleIntensity = (val: number) => {
    setIdeation(prev => ({ ...prev, intensity: val }))
    setIdeationStep("plan")
  }

  const handlePlan = (val: boolean) => {
    setIdeation(prev => ({ ...prev, hasPlan: val }))
    if (val) {
      // CRITICAL: plan detected = immediate crisis screen
      setShowCrisisHelp(true)
    }
    setIdeationStep("intention")
  }

  const handleIntention = (val: boolean) => {
    setIdeation(prev => ({ ...prev, hasIntention: val }))
    if (val) {
      setShowCrisisHelp(true)
    }
    setIdeationStep("done")
  }

  const handleSubmit = () => {
    addCheckIn({
      patientId: "p1",
      date: new Date().toISOString().split("T")[0],
      mood,
      stress,
      sleep,
      energy,
      suicidalIdeation: ideationStep === "done" ? ideation : undefined,
    })
  }

  const canSubmit = mood > 0 && stress > 0 && sleep > 0 && energy > 0 && ideationStep === "done"

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-lyra-teal-light/30 pb-3">
        <CardTitle className="text-base">
          {isScaleStep && current ? scaleLabels[current.key] : scaleLabels.ideation}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {isScaleStep ? "Juste une note rapide. Pas besoin de faire long." : "Ta reponse nous aide a mieux t'accompagner."}
        </p>
      </CardHeader>
      <CardContent className="p-5">
        {/* Progress dots */}
        <div className="mb-5 flex items-center justify-center gap-2">
          {scales.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === step ? "w-8 bg-primary" : s.value > 0 ? "w-2 bg-primary/50" : "w-2 bg-border"
              )}
            />
          ))}
          <button
            onClick={() => { if (energy > 0) setStep(4) }}
            className={cn(
              "h-2 rounded-full transition-all",
              step === 4 ? "w-8 bg-primary" : ideationStep === "done" ? "w-2 bg-primary/50" : "w-2 bg-border"
            )}
          />
        </div>

        {/* Scale selector (steps 0-3) */}
        {isScaleStep && current && (
          <div className="flex items-center justify-center gap-3">
            {moodOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "flex h-14 w-14 flex-col items-center justify-center rounded-xl border-2 text-sm font-bold transition-all",
                  current.value === opt.value
                    ? "border-primary bg-primary text-primary-foreground scale-110"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                )}
              >
                {opt.value}
                <span className="text-[9px] font-normal leading-none">{opt.value === 1 ? "Bas" : opt.value === 5 ? "Haut" : ""}</span>
              </button>
            ))}
          </div>
        )}

        {/* Suicidal ideation screening (step 4) */}
        {step === 4 && (
          <div>
            {/* Crisis help banner */}
            {showCrisisHelp && (
              <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  <p className="text-sm font-semibold text-foreground">De l{"'"}aide est disponible</p>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Si tu traverses un moment difficile, n{"'"}hesite pas a contacter quelqu{"'"}un.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="destructive" className="rounded-full text-xs" asChild>
                    <a href="tel:3114"><Phone className="mr-1.5 h-3 w-3" />3114</a>
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full text-xs" asChild>
                    <a href="tel:15"><Phone className="mr-1.5 h-3 w-3" />15 (SAMU)</a>
                  </Button>
                </div>
              </div>
            )}

            {ideationStep === "ask" && (
              <div className="text-center">
                <p className="mb-1 text-sm font-medium text-foreground">
                  As-tu eu des pensees suicidaires aujourd{"'"}hui ?
                </p>
                <p className="mb-5 text-xs text-muted-foreground">
                  Il n{"'"}y a pas de bonne ou mauvaise reponse. Ta securite compte.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="rounded-full px-8"
                      onClick={() => handleIdeationAnswer(true)}
                    >
                      Oui
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full px-8"
                      onClick={() => handleIdeationAnswer(false)}
                    >
                      Non
                    </Button>
                  </div>
                  <button
                    onClick={() => handleIdeationAnswer(null)}
                    className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    Je prefere ne pas repondre
                  </button>
                </div>
              </div>
            )}

            {ideationStep === "intensity" && (
              <div className="text-center">
                <p className="mb-1 text-sm font-medium text-foreground">
                  A quel point ces pensees etaient-elles presentes ?
                </p>
                <p className="mb-5 text-xs text-muted-foreground">
                  1 = tres peu, 5 = tres intensement
                </p>
                <div className="flex items-center justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleIntensity(val)}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all",
                        ideation.intensity === val
                          ? "border-lyra-coral bg-lyra-coral text-card"
                          : "border-border bg-card text-muted-foreground hover:border-lyra-coral/50"
                      )}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {ideationStep === "plan" && (
              <div className="text-center">
                <p className="mb-1 text-sm font-medium text-foreground">
                  As-tu pense a un moyen ou un plan ?
                </p>
                <p className="mb-5 text-xs text-muted-foreground">
                  Ta reponse aide a mieux t{"'"}accompagner. Elle ne sera pas partagee sans ton accord.
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" className="rounded-full px-8" onClick={() => handlePlan(true)}>Oui</Button>
                  <Button variant="outline" className="rounded-full px-8" onClick={() => handlePlan(false)}>Non</Button>
                </div>
              </div>
            )}

            {ideationStep === "intention" && (
              <div className="text-center">
                <p className="mb-1 text-sm font-medium text-foreground">
                  As-tu l{"'"}intention d{"'"}agir ?
                </p>
                <p className="mb-5 text-xs text-muted-foreground">
                  Si oui, des personnes peuvent t{"'"}aider maintenant. Tu n{"'"}es pas seul(e).
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" className="rounded-full px-8" onClick={() => handleIntention(true)}>Oui</Button>
                  <Button variant="outline" className="rounded-full px-8" onClick={() => handleIntention(false)}>Non</Button>
                </div>
              </div>
            )}

            {ideationStep === "done" && canSubmit && (
              <div className="text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Merci pour ta reponse. Ton check-in est pret.
                </p>
                <Button onClick={handleSubmit} className="rounded-full px-8">
                  Enregistrer mon check-in
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
