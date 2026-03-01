"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Wind,
  Eye,
  Hand,
  Ear,
  Droplets,
  Heart,
  ShieldAlert,
  Timer,
  RotateCcw,
} from "lucide-react"
import { hotlines, copingTools } from "@/lib/demo-data"
import { useState, useEffect, useCallback } from "react"

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Kit de secours</h1>
        <p className="mt-1 text-muted-foreground">
          Outils et contacts pour les moments difficiles.
        </p>
      </div>

      {/* Emergency contacts */}
      <Card className="mb-6 border-destructive/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-destructive">
            <Phone className="h-5 w-5" />
            Numeros d{"'"}urgence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {hotlines.map((h) => (
            <div
              key={h.number}
              className="flex items-center justify-between rounded-xl bg-secondary p-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{h.name}</p>
                <p className="text-xs text-muted-foreground">{h.description}</p>
              </div>
              <Button
                size="sm"
                variant="destructive"
                className="shrink-0 rounded-full"
                asChild
              >
                <a href={`tel:${h.number.replace(/\s/g, "")}`}>
                  <Phone className="mr-1.5 h-3.5 w-3.5" />
                  {h.number}
                </a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Breathing exercise */}
      <BreathingExercise />

      {/* Grounding 5-4-3-2-1 */}
      <GroundingExercise />

      {/* Coping tools list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-5 w-5 text-primary" />
            Mes outils de coping
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {copingTools.map((tool) => (
            <div key={tool.id} className="rounded-xl bg-secondary p-4">
              <div className="mb-1 flex items-center gap-2">
                <Badge variant="outline" className="text-xs capitalize">
                  {tool.type}
                </Badge>
                <p className="text-sm font-medium text-foreground">{tool.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function BreathingExercise() {
  const [active, setActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)

  const durations = { inhale: 4, hold: 7, exhale: 8 }
  const labels = { inhale: "Inspire", hold: "Retiens", exhale: "Expire" }
  const colors = {
    inhale: "text-primary",
    hold: "text-lyra-lavender",
    exhale: "text-lyra-coral",
  }

  const reset = useCallback(() => {
    setActive(false)
    setPhase("inhale")
    setCount(0)
    setCycles(0)
  }, [])

  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev + 1 >= durations[phase]) {
          if (phase === "inhale") setPhase("hold")
          else if (phase === "hold") setPhase("exhale")
          else {
            setPhase("inhale")
            setCycles((c) => c + 1)
          }
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [active, phase])

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Wind className="h-5 w-5 text-primary" />
          Respiration 4-7-8
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!active ? (
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Inspire 4 secondes, retiens 7 secondes, expire 8 secondes.
            </p>
            <Button onClick={() => setActive(true)} className="rounded-full">
              <Timer className="mr-2 h-4 w-4" />
              Commencer
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div
                className={`flex h-32 w-32 items-center justify-center rounded-full border-4 transition-all duration-1000 ${
                  phase === "inhale"
                    ? "scale-110 border-primary bg-primary/10"
                    : phase === "hold"
                    ? "scale-110 border-lyra-lavender bg-lyra-lavender-light"
                    : "scale-90 border-lyra-coral bg-lyra-coral-light"
                }`}
              >
                <div>
                  <p className={`text-3xl font-bold ${colors[phase]}`}>
                    {durations[phase] - count}
                  </p>
                  <p className={`text-sm font-medium ${colors[phase]}`}>
                    {labels[phase]}
                  </p>
                </div>
              </div>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Cycle {cycles + 1}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full" onClick={reset}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Arreter
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function GroundingExercise() {
  const [step, setStep] = useState(0)

  const steps = [
    { count: 5, sense: "que tu VOIS", icon: Eye, color: "text-primary" },
    { count: 4, sense: "que tu TOUCHES", icon: Hand, color: "text-lyra-coral" },
    { count: 3, sense: "que tu ENTENDS", icon: Ear, color: "text-lyra-lavender" },
    { count: 2, sense: "que tu SENS (odeur)", icon: Droplets, color: "text-primary" },
    { count: 1, sense: "que tu GOUTES", icon: ShieldAlert, color: "text-lyra-coral" },
  ]

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Eye className="h-5 w-5 text-primary" />
          Ancrage 5-4-3-2-1
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 0 ? (
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Un exercice sensoriel pour te ramener au moment present.
            </p>
            <Button onClick={() => setStep(1)} className="rounded-full">
              Commencer
            </Button>
          </div>
        ) : step <= 5 ? (
          <div className="text-center">
            <div className="mb-4">
              {(() => {
                const current = steps[step - 1]
                const Icon = current.icon
                return (
                  <>
                    <Icon className={`mx-auto mb-3 h-10 w-10 ${current.color}`} />
                    <p className="text-lg font-semibold text-foreground">
                      Nomme {current.count} chose{current.count > 1 ? "s" : ""}
                    </p>
                    <p className={`text-sm font-medium ${current.color}`}>
                      {current.sense}
                    </p>
                  </>
                )
              })()}
            </div>
            <div className="mb-4 flex justify-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i < step ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <Button onClick={() => setStep(step + 1)} className="rounded-full">
              {step < 5 ? "Suivant" : "Terminer"}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Heart className="mx-auto mb-3 h-10 w-10 text-primary" />
            <p className="mb-1 text-lg font-semibold text-foreground">Bravo !</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Tu es ici, maintenant. Prends un moment pour respirer.
            </p>
            <Button variant="outline" className="rounded-full" onClick={() => setStep(0)}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Recommencer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
