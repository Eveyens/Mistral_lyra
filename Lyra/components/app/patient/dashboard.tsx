"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, ArrowRight, Moon, Calendar } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function PatientDashboard() {
  const { checkIns, journalEntries, goals } = useApp()
  const patientCheckins = checkIns.filter((c) => c.patientId === "p1")

  const recentEntries = journalEntries
    .filter((j) => j.patientId === "p1" && j.visibility === "DEFAULT")
    .slice(0, 3)

  // Insights
  const sleepTrend = patientCheckins.slice(-3).every((c) => c.sleep <= 2)

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Bonjour Camille
        </h1>
        <p className="mt-1 text-muted-foreground">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
        </p>
      </div>

      {/* Mood check-in CTA */}
      <Card className="mb-6">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lyra-teal-light/20">
              <Calendar className="h-6 w-6 text-lyra-teal" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Ton calendrier émotionnel</p>
              <p className="text-sm text-muted-foreground">Prends un moment pour noter comment tu te sens aujourd'hui.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link href="/patient/calendar">
              Mettre à jour
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Talk to Lyra CTA */}
      <Card className="mb-6 border-0 bg-primary text-primary-foreground">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">Parler a Lyra</p>
              <p className="text-sm opacity-90">Ton compagnon vocal est la pour toi.</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full" asChild>
            <Link href="/patient/chat">
              Commencer
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Insights */}
      {sleepTrend && (
        <Card className="mb-6 border-lyra-coral/30 bg-lyra-coral-light/30">
          <CardContent className="flex items-start gap-3 p-4">
            <Moon className="mt-0.5 h-5 w-5 shrink-0 text-lyra-coral" />
            <div>
              <p className="text-sm font-medium text-foreground">Tu dors moins depuis 3 jours</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Ton sommeil semble diminuer. Essaie de te coucher un peu plus tot ce soir ?
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals progress */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Tes resolutions</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/patient/goals">Voir tout <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.slice(0, 3).map((goal) => (
            <div key={goal.id}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{goal.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {goal.progress}/{goal.target}
                </Badge>
              </div>
              <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent journal entries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Ton fil</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/patient/journal">Voir tout <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentEntries.map((entry) => (
            <div key={entry.id} className="rounded-xl bg-secondary p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {entry.type === "AUDIO" ? "Audio" : "Texte"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(entry.createdAt), "d MMM", { locale: fr })}
                </span>
              </div>
              <p className="text-sm text-foreground line-clamp-2">
                {entry.text || entry.transcript}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

