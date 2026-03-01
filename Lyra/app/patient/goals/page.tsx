"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Target, CheckCircle2, Flame, Sparkles, Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function GoalsPage() {
  const { goals } = useApp()
  const [celebrating, setCelebrating] = useState<string | null>(null)

  const handleGoalClick = (id: string, isComplete: boolean) => {
    if (!isComplete) {
      setCelebrating(id)
      setTimeout(() => setCelebrating(null), 1500)
      // Call context to increment goal later
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lyra-teal-light mb-4 shadow-sm">
          <Target className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Mes Missions</h1>
        <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
          Complète tes petits objectifs chaque jour pour gagner des étoiles et te sentir mieux, un pas à la fois !
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const pct = Math.round((goal.progress / goal.target) * 100)
          const isComplete = goal.progress >= goal.target
          const isCelebrating = celebrating === goal.id

          return (
            <Card
              key={goal.id}
              className={cn(
                "relative overflow-hidden transition-all duration-300 transform rounded-3xl border-2",
                isComplete ? "border-primary bg-primary/5 shadow-md scale-[1.02]" : "border-border/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
                isCelebrating && "scale-110 rotate-3 z-10 shadow-2xl"
              )}
              onClick={() => handleGoalClick(goal.id, isComplete)}
            >
              {/* Confetti / Sparkle overlay on celebration */}
              {isCelebrating && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm animate-in fade-in">
                  <Sparkles className="h-16 w-16 text-yellow-400 animate-spin" />
                </div>
              )}

              <CardContent className="p-6">
                <div className="mb-4 flex justify-between items-start">
                  <div className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner",
                    isComplete ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  )}>
                    {isComplete ? <Star className="h-7 w-7 fill-yellow-400 text-yellow-500" /> : <Flame className="h-7 w-7" />}
                  </div>

                  {isComplete && (
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Fini !
                    </div>
                  )}
                </div>

                <h3 className="mb-1 text-xl font-bold text-foreground">{goal.title}</h3>
                <p className="mb-4 text-sm font-medium text-muted-foreground capitalize">{goal.type}</p>

                <div className="mt-auto">
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-foreground">Avancement</span>
                    <span className={isComplete ? "text-primary" : "text-muted-foreground"}>
                      {goal.progress} / {goal.target} {goal.type === "journal" ? "notes" : "jours"}
                    </span>
                  </div>

                  {/* Playful progress bar */}
                  <div className="h-4 w-full overflow-hidden rounded-full bg-secondary shadow-inner">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        isComplete ? "bg-gradient-to-r from-green-400 to-primary" : "bg-gradient-to-r from-lyra-teal-light to-primary/60"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
