"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pill,
  Check,
  X,
  AlertCircle,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function MedicationPage() {
  const { medications, setMedications, checkIns } = useApp()

  const med = medications[0]
  if (!med) return null

  const takenCount = med.logs.filter((l) => l.taken).length
  const adherence = Math.round((takenCount / med.logs.length) * 100)
  const daysSinceStart = differenceInDays(new Date(), new Date(med.startDate))
  const sideEffectsLogs = med.logs.filter((l) => l.sideEffects)

  // Find treatment change markers in check-in timeline
  const patientCheckins = checkIns.filter((c) => c.patientId === "p1").slice(-14)

  // Toggle today's medication
  const today = new Date().toISOString().split("T")[0]
  const todayLog = med.logs.find((l) => l.date === today)

  const toggleToday = () => {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.id !== med.id) return m
        const existingIdx = m.logs.findIndex((l) => l.date === today)
        if (existingIdx >= 0) {
          const updated = [...m.logs]
          updated[existingIdx] = { ...updated[existingIdx], taken: !updated[existingIdx].taken }
          return { ...m, logs: updated }
        }
        return { ...m, logs: [...m.logs, { date: today, taken: true }] }
      })
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Suivi traitement</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Suivre tes prises et noter les effets.
        </p>
      </div>

      {/* Current medication */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Pill className="h-5 w-5 text-primary" />
              {med.name} {med.dosage}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Calendar className="mr-1 h-3 w-3" />
              Jour {daysSinceStart}
            </Badge>
          </div>
          <CardDescription>{med.frequency} - Depuis le {format(new Date(med.startDate), "d MMMM yyyy", { locale: fr })}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Today's action */}
          <div className="mb-6 rounded-xl bg-lyra-teal-light/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Aujourd{"'"}hui</p>
                <p className="text-xs text-muted-foreground">
                  {todayLog?.taken ? "Prise enregistree" : "Pas encore pris"}
                </p>
              </div>
              <Button
                onClick={toggleToday}
                variant={todayLog?.taken ? "outline" : "default"}
                className="rounded-full"
              >
                {todayLog?.taken ? (
                  <><Check className="mr-1.5 h-4 w-4" />Pris</>
                ) : (
                  <><Pill className="mr-1.5 h-4 w-4" />Marquer comme pris</>
                )}
              </Button>
            </div>
          </div>

          {/* Adherence stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-secondary p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{adherence}%</p>
              <p className="text-xs text-muted-foreground">Adherence</p>
            </div>
            <div className="rounded-xl bg-secondary p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{takenCount}/{med.logs.length}</p>
              <p className="text-xs text-muted-foreground">Prises</p>
            </div>
            <div className="rounded-xl bg-secondary p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{sideEffectsLogs.length}</p>
              <p className="text-xs text-muted-foreground">Effets notes</p>
            </div>
          </div>

          {/* 14-day log grid */}
          <div className="mb-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Historique (14 derniers jours)
            </p>
            <div className="grid grid-cols-7 gap-2">
              {med.logs.slice(-14).map((log) => (
                <div
                  key={log.date}
                  className={cn(
                    "flex flex-col items-center rounded-lg p-2 text-center",
                    log.taken ? "bg-primary/10" : "bg-lyra-coral-light"
                  )}
                >
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(log.date), "d", { locale: fr })}
                  </span>
                  {log.taken ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <X className="h-4 w-4 text-lyra-coral" />
                  )}
                  {log.sideEffects && (
                    <AlertCircle className="mt-0.5 h-3 w-3 text-lyra-coral" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side effects log */}
      {sideEffectsLogs.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-5 w-5 text-lyra-coral" />
              Effets ressentis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sideEffectsLogs.map((log) => (
              <div key={log.date} className="flex items-start gap-3 rounded-xl bg-secondary p-3">
                <Badge variant="outline" className="shrink-0 text-xs">
                  {format(new Date(log.date), "d MMM", { locale: fr })}
                </Badge>
                <p className="text-sm text-foreground">{log.sideEffects}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Mood + medication correlation hint */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-5 w-5 text-primary" />
            Humeur et traitement
          </CardTitle>
          <CardDescription>
            Voir l{"'"}evolution de ton humeur par rapport a tes prises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1.5">
            {patientCheckins.map((c, i) => {
              const logForDay = med.logs.find((l) => l.date === c.date)
              return (
                <div key={c.id} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-full rounded-t transition-all",
                      logForDay?.taken ? "bg-primary" : "bg-lyra-coral/40"
                    )}
                    style={{ height: `${(c.mood / 5) * 60}px` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {format(new Date(c.date), "d", { locale: fr })}
                  </span>
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    logForDay?.taken ? "bg-primary" : "bg-lyra-coral"
                  )} />
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              Pris
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-lyra-coral" />
              Oublie
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-lyra-warm p-4 text-center text-xs text-muted-foreground">
        Ne modifie jamais ton traitement sans avis medical. Ces donnees peuvent etre partagees avec ton medecin.
      </div>
    </div>
  )
}
