"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const moodEmojis: Record<number, { emoji: string; color: string }> = {
  1: { emoji: "😡", color: "bg-red-400" },
  2: { emoji: "😔", color: "bg-orange-300" },
  3: { emoji: "😐", color: "bg-yellow-200" },
  4: { emoji: "🙂", color: "bg-green-300" },
  5: { emoji: "😄", color: "bg-green-400" },
}

const sleepEmojis: Record<number, { emoji: string; color: string }> = {
  1: { emoji: "😫", color: "bg-red-400" },
  2: { emoji: "🥱", color: "bg-orange-300" },
  3: { emoji: "😐", color: "bg-yellow-200" },
  4: { emoji: "😌", color: "bg-green-300" },
  5: { emoji: "😴", color: "bg-indigo-300" },
}

const anxietyEmojis: Record<number, { emoji: string; color: string }> = {
  1: { emoji: "😱", color: "bg-red-400" },
  2: { emoji: "😰", color: "bg-orange-300" },
  3: { emoji: "😥", color: "bg-yellow-200" },
  4: { emoji: "😐", color: "bg-green-300" },
  5: { emoji: "😌", color: "bg-green-400" },
}

const dietEmojis: Record<number, { emoji: string; color: string }> = {
  1: { emoji: "🤢", color: "bg-red-400" },
  2: { emoji: "🍏", color: "bg-orange-300" },
  3: { emoji: "😐", color: "bg-yellow-200" },
  4: { emoji: "😋", color: "bg-green-300" },
  5: { emoji: "🍽️", color: "bg-green-400" },
}

export default function CalendarPage() {
  const { checkIns, updateCheckIn, addCheckIn } = useApp()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const patientCheckins = checkIns.filter((c) => c.patientId === "p1")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setIsEditing(false)
    setActiveStep(0)
  }, [selectedDate])

  const start = startOfMonth(currentMonth)
  const end = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start, end })
  // Adjust so Monday is 0, Sunday is 6
  let startDay = getDay(start) - 1
  if (startDay === -1) startDay = 6

  const selectedCheckin = selectedDate ? patientCheckins.find((c) => c.date === selectedDate) : null

  const prev = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  const next = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))

  const handleStartCheckin = () => {
    addCheckIn({ patientId: "p1", date: selectedDate!, mood: 3, sleep: 3, energy: 3, stress: 3, anxiety: 3, diet: 3, scarification: false, alcohol: false, tobacco: false, vomiting: false, suicidalThoughts: false, notes: "" })
    setIsEditing(true)
    setActiveStep(0)
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Le calendrier émotionnel</h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Évalue ton humeur et ton sommeil chaque jour pour suivre ton évolution.
        </p>
      </div>

      {/* Selected Day Details */}
      {selectedCheckin ? (
        <Card className="shadow-md border-border bg-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
              <h3 className="text-xl font-bold text-foreground capitalize">
                {format(new Date(selectedCheckin.date), "EEEE d MMMM", { locale: fr })}
              </h3>
            </div>

            {!isEditing ? (
              <div className="animate-in fade-in">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                  {selectedCheckin.mood !== undefined && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/30 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Humeur</span>
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm", moodEmojis[selectedCheckin.mood]?.color)}>
                        {moodEmojis[selectedCheckin.mood]?.emoji}
                      </div>
                    </div>
                  )}
                  {selectedCheckin.sleep !== undefined && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/30 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sommeil</span>
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm", sleepEmojis[selectedCheckin.sleep]?.color)}>
                        {sleepEmojis[selectedCheckin.sleep]?.emoji}
                      </div>
                    </div>
                  )}
                  {selectedCheckin.anxiety !== undefined && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/30 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Anxiété</span>
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm", anxietyEmojis[selectedCheckin.anxiety]?.color)}>
                        {anxietyEmojis[selectedCheckin.anxiety]?.emoji}
                      </div>
                    </div>
                  )}
                  {selectedCheckin.diet !== undefined && (
                    <div className="flex flex-col items-center gap-2 rounded-2xl bg-secondary/30 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alimentation</span>
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm", dietEmojis[selectedCheckin.diet]?.color)}>
                        {dietEmojis[selectedCheckin.diet]?.emoji}
                      </div>
                    </div>
                  )}
                </div>

                {["scarification", "alcohol", "tobacco", "vomiting", "suicidalThoughts"].some(k => (selectedCheckin as any)[k]) && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Comportements signalés</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "scarification", label: "Scarification" },
                        { key: "alcohol", label: "Alcool" },
                        { key: "tobacco", label: "Tabac" },
                        { key: "vomiting", label: "Vomissement" },
                        { key: "suicidalThoughts", label: "Idées Suicidaires" }
                      ].map(({ key, label }) => {
                        if ((selectedCheckin as any)[key]) {
                          return <span key={key} className="px-3 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded-full">{label}</span>
                        }
                        return null
                      })}
                    </div>
                  </div>
                )}

                {selectedCheckin.notes && (
                  <div className="rounded-2xl bg-lyra-teal-light/30 p-5 mb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-lyra-teal-dark">Notes du jour</p>
                    <p className="text-base leading-relaxed text-foreground">{selectedCheckin.notes}</p>
                  </div>
                )}

                <div className="flex justify-center mt-6">
                  <Button onClick={() => { setIsEditing(true); setActiveStep(0); }} variant="outline" className="rounded-full">
                    Modifier ce check-in
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in">
                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mb-8">
                  {[0, 1, 2, 3, 4].map(step => (
                    <div key={step} className={cn("h-2 w-8 sm:w-12 rounded-full transition-colors", activeStep >= step ? "bg-primary" : "bg-primary/20")} />
                  ))}
                </div>

                {activeStep === 0 && (
                  <div className="animate-in slide-in-from-right-8 flex flex-col items-center gap-6 rounded-2xl bg-secondary/30 p-6 sm:p-10">
                    <h4 className="text-xl font-bold text-center">Comment est ton humeur ?</h4>
                    <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                      {Object.entries(moodEmojis).map(([val, { emoji, color }]) => (
                        <button
                          key={val}
                          onClick={() => {
                            updateCheckIn(selectedCheckin.id, { mood: Number(val) })
                            setTimeout(() => setActiveStep(1), 300)
                          }}
                          className={cn(
                            "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full text-3xl sm:text-4xl transition hover:scale-110",
                            selectedCheckin.mood === Number(val) ? color + " shadow-md ring-4 ring-primary/20" : "bg-card shadow hover:bg-secondary"
                          )}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="animate-in slide-in-from-right-8 flex flex-col items-center gap-6 rounded-2xl bg-secondary/30 p-6 sm:p-10">
                    <h4 className="text-xl font-bold text-center">Comment as-tu dormi ?</h4>
                    <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                      {Object.entries(sleepEmojis).map(([val, { emoji, color }]) => (
                        <button
                          key={val}
                          onClick={() => {
                            updateCheckIn(selectedCheckin.id, { sleep: Number(val) })
                            setTimeout(() => setActiveStep(2), 300)
                          }}
                          className={cn(
                            "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full text-3xl sm:text-4xl transition hover:scale-110",
                            selectedCheckin.sleep === Number(val) ? color + " shadow-md ring-4 ring-primary/20" : "bg-card shadow hover:bg-secondary"
                          )}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="animate-in slide-in-from-right-8 flex flex-col items-center gap-6 rounded-2xl bg-secondary/30 p-6 sm:p-10">
                    <h4 className="text-xl font-bold text-center">Quel est ton niveau d'anxiété ?</h4>
                    <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                      {Object.entries(anxietyEmojis).map(([val, { emoji, color }]) => (
                        <button
                          key={val}
                          onClick={() => {
                            updateCheckIn(selectedCheckin.id, { anxiety: Number(val) })
                            setTimeout(() => setActiveStep(3), 300)
                          }}
                          className={cn(
                            "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full text-3xl sm:text-4xl transition hover:scale-110",
                            selectedCheckin.anxiety === Number(val) ? color + " shadow-md ring-4 ring-primary/20" : "bg-card shadow hover:bg-secondary"
                          )}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="animate-in slide-in-from-right-8 flex flex-col items-center gap-6 rounded-2xl bg-secondary/30 p-6 sm:p-10">
                    <h4 className="text-xl font-bold text-center">Comment s'est passée ton alimentation ?</h4>
                    <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
                      {Object.entries(dietEmojis).map(([val, { emoji, color }]) => (
                        <button
                          key={val}
                          onClick={() => {
                            updateCheckIn(selectedCheckin.id, { diet: Number(val) })
                            setTimeout(() => setActiveStep(4), 300)
                          }}
                          className={cn(
                            "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full text-3xl sm:text-4xl transition hover:scale-110",
                            selectedCheckin.diet === Number(val) ? color + " shadow-md ring-4 ring-primary/20" : "bg-card shadow hover:bg-secondary"
                          )}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="animate-in slide-in-from-right-8 flex flex-col rounded-2xl bg-secondary/30 p-6 sm:p-10">
                    <h4 className="text-xl font-bold text-center mb-6">As-tu des comportements ou facteurs à noter ?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {[
                        { key: "scarification", label: "Scarification" },
                        { key: "alcohol", label: "Alcool" },
                        { key: "tobacco", label: "Tabac" },
                        { key: "vomiting", label: "Vomissement" },
                        { key: "suicidalThoughts", label: "Idées Suicidaires" }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between bg-card p-4 rounded-xl shadow-sm border border-border/50 transition-all hover:border-primary/50">
                          <Label htmlFor={key} className="text-sm font-medium cursor-pointer flex-1">{label}</Label>
                          <Switch
                            id={key}
                            checked={!!(selectedCheckin as any)[key]}
                            onCheckedChange={(checked) => updateCheckIn(selectedCheckin.id, { [key]: checked })}
                            className={cn((selectedCheckin as any)[key] && "data-[state=checked]:bg-destructive")}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Button size="lg" onClick={() => setActiveStep(5)} className="rounded-full px-8">
                        Valider
                      </Button>
                    </div>
                  </div>
                )}

                {activeStep === 5 && (
                  <div className="animate-in zoom-in-95 flex flex-col items-center justify-center py-10">
                    <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm">
                      ✨
                    </div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">Check-in terminé !</h4>
                    <p className="text-muted-foreground mb-8 text-center max-w-sm">
                      Merci d'avoir pris le temps de faire le point. C'est une belle étape pour prendre soin de toi.
                    </p>
                    <Button onClick={() => setIsEditing(false)} size="lg" className="rounded-full px-8">
                      Voir mon résumé
                    </Button>
                  </div>
                )}

                {/* Navigation helpers (Back button) */}
                {activeStep > 0 && activeStep < 5 && (
                  <div className="mt-6 flex justify-start">
                    <Button variant="ghost" className="text-muted-foreground" onClick={() => setActiveStep(activeStep - 1)}>
                      <ChevronLeft className="w-4 h-4 mr-1" /> Retour
                    </Button>
                  </div>
                )}
              </div>
            )}

          </CardContent>
        </Card>
      ) : selectedDate && (
        <Card className="border-dashed bg-secondary/20 mb-8">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl">
              ❔
            </div>
            <p className="text-lg font-medium text-foreground">Aucune donnée pour ce jour</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {format(new Date(selectedDate), "EEEE d MMMM", { locale: fr })} n'a pas été évalué.
            </p>
            {isSameDay(new Date(selectedDate), new Date()) && (
              <Button
                onClick={handleStartCheckin}
                className="mt-6 rounded-full" size="lg"
              >
                Faire mon check-in
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 shadow-sm border-border/50 bg-secondary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-background shadow-sm hover:bg-secondary">
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </Button>
          <CardTitle className="text-xl md:text-2xl font-semibold capitalize text-foreground border-b-2 border-primary/20 pb-1">
            {format(currentMonth, "MMMM yyyy", { locale: fr })}
          </CardTitle>
          <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-background shadow-sm hover:bg-secondary">
            <ChevronRight className="h-5 w-5 text-foreground" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 md:gap-4 lg:gap-6">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
              <div key={d} className="py-2 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {d}
              </div>
            ))}

            {/* Empty cells for offset */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="hidden sm:block" />
            ))}

            {days.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd")
              const ci = patientCheckins.find((c) => c.date === dateStr)
              const isToday = isSameDay(day, new Date())
              const isSelected = selectedDate === dateStr

              const dayMood = ci ? moodEmojis[ci.mood] : null

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    "relative flex flex-col items-center justify-between rounded-full bg-card p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md",
                    "h-24 w-12 sm:h-32 sm:w-16 md:h-36 md:w-20 mx-auto",
                    isSelected ? "ring-4 ring-primary ring-offset-2 ring-offset-background" : "border border-border/40",
                    isToday && !isSelected && "ring-2 ring-primary/50 ring-offset-1 ring-offset-background"
                  )}
                >
                  <span className={cn(
                    "mt-2 text-lg sm:text-xl font-bold",
                    isToday ? "text-primary" : "text-foreground"
                  )}>
                    {format(day, "d")}
                  </span>

                  <div className="mb-2 w-full px-1">
                    <div className="mx-auto h-[1px] w-3/4 bg-border/50" />
                  </div>

                  {dayMood ? (
                    <div className={cn(
                      "flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full text-lg sm:text-2xl shadow-inner",
                      dayMood.color
                    )}>
                      {dayMood.emoji}
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground shadow-inner">
                      -
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
