"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Moon,
  Zap,
  Brain,
  BookOpen,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

export function ParentDashboard() {
  const { checkIns, consent, goals, resources } = useApp()

  const patientCheckins = checkIns.filter((c) => c.patientId === "p1")
  const last7 = patientCheckins.slice(-7)
  const avgMood = last7.reduce((s, c) => s + c.mood, 0) / last7.length
  const avgSleep = last7.reduce((s, c) => s + c.sleep, 0) / last7.length
  const avgEnergy = last7.reduce((s, c) => s + c.energy, 0) / last7.length
  const avgStress = last7.reduce((s, c) => s + c.stress, 0) / last7.length

  const moodLabels = ["", "Tres mal", "Mal", "Moyen", "Bien", "Tres bien"]
  const moodTrend = last7.length >= 2
    ? last7[last7.length - 1].mood - last7[0].mood
    : 0

  const parentResources = resources.filter(
    (r) => r.audience === "PARENT" || r.audience === "ALL"
  )

  const isDetailed = consent.parentDetailLevel === "detailed"

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Bonjour Marie
        </h1>
        <p className="mt-1 text-muted-foreground">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
        </p>
      </div>

      {/* Consent indicator */}
      <Card className="mb-6 border-primary/20 bg-lyra-teal-light/30">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Niveau d{"'"}acces : {isDetailed ? "Detaille" : "Global"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isDetailed
                  ? "Camille a choisi de partager ses details avec vous"
                  : "Camille partage une vue globale de son etat"}
              </p>
            </div>
          </div>
          {isDetailed ? (
            <Eye className="h-5 w-5 text-primary" />
          ) : (
            <EyeOff className="h-5 w-5 text-muted-foreground" />
          )}
        </CardContent>
      </Card>

      {/* Overall state */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Etat general de Camille</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {moodLabels[Math.round(avgMood)]}
              </p>
              <p className="text-sm text-muted-foreground">
                Humeur moyenne cette semaine
                {moodTrend > 0 && " - en amelioration"}
                {moodTrend < 0 && " - en baisse"}
                {moodTrend === 0 && " - stable"}
              </p>
            </div>
          </div>

          {isDetailed && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <MiniStat icon={Heart} label="Humeur" value={avgMood} color="text-primary" />
              <MiniStat icon={Moon} label="Sommeil" value={avgSleep} color="text-lyra-lavender" />
              <MiniStat icon={Zap} label="Energie" value={avgEnergy} color="text-lyra-coral" />
              <MiniStat icon={Brain} label="Stress" value={avgStress} color="text-lyra-lavender" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goals */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Resolutions de Camille</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id}>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{goal.title}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {goal.progress}/{goal.target}
                </Badge>
              </div>
              <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resources for parents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-primary" />
            Ressources pour vous
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/resources">
              Voir tout <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {parentResources.slice(0, 4).map((resource) => (
            <div
              key={resource.id}
              className="flex items-start gap-3 rounded-xl bg-secondary p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lyra-lavender-light">
                <BookOpen className="h-4 w-4 text-lyra-lavender" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{resource.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {resource.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  color: string
}) {
  return (
    <div className="rounded-xl bg-secondary p-3 text-center">
      <Icon className={`mx-auto mb-1 h-4 w-4 ${color}`} />
      <p className="text-lg font-bold text-foreground">{value.toFixed(1)}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
