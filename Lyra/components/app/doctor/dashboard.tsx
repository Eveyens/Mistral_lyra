"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  ArrowRight,
  FileText,
  Users,
  TrendingUp,
  MessageSquare,
  Shield,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function DoctorDashboard() {
  const { patients, checkIns, weeklyReport, voiceSessions, journalEntries } = useApp()

  const patientSummaries = patients.map((patient) => {
    const pCheckIns = checkIns.filter((c) => c.patientId === patient.id)
    const last7 = pCheckIns.slice(-7)
    const avgMood = last7.length > 0 ? last7.reduce((s, c) => s + c.mood, 0) / last7.length : 0
    const riskSessions = voiceSessions.filter(
      (v) => v.patientId === patient.id && v.riskFlag === "HIGH"
    )
    return { patient, avgMood, last7, riskSessions, checkInCount: pCheckIns.length }
  })

  const alertPatients = patientSummaries.filter((p) => p.riskSessions.length > 0)

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Bonjour Dr. Martin
        </h1>
        <p className="mt-1 text-muted-foreground">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
        </p>
      </div>

      {/* Alerts */}
      {alertPatients.length > 0 && (
        <Card className="mb-6 border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Alertes necessitant votre attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyReport.alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-background p-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-foreground">{alert}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Patients</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{patients.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Adherence moy.</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{weeklyReport.adherence}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-lyra-coral" />
              <span className="text-xs font-medium text-muted-foreground">Sessions IA</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{voiceSessions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium text-muted-foreground">Signaux risque</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {voiceSessions.filter((v) => v.riskFlag === "HIGH").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly report summary */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              Rapport hebdomadaire - Camille D.
            </CardTitle>
            <Badge variant="secondary">
              Sem. du {format(new Date(weeklyReport.weekStart), "d MMM", { locale: fr })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {weeklyReport.summary.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Themes principaux
              </p>
              <div className="flex flex-wrap gap-1.5">
                {weeklyReport.themes.map((theme) => (
                  <Badge key={theme} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Adherence
              </p>
              <Progress value={weeklyReport.adherence} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">{weeklyReport.adherence}%</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-primary/5 p-3">
              <p className="mb-2 text-xs font-medium text-primary">Facteurs protecteurs</p>
              <div className="space-y-1">
                {weeklyReport.aggravatorsProtectors.protectors.map((p) => (
                  <p key={p} className="text-sm text-foreground">{p}</p>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-lyra-coral-light p-3">
              <p className="mb-2 text-xs font-medium text-lyra-coral">Facteurs aggravants</p>
              <div className="space-y-1">
                {weeklyReport.aggravatorsProtectors.aggravators.map((a) => (
                  <p key={a} className="text-sm text-foreground">{a}</p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Questions suggerees pour la prochaine seance
            </p>
            <div className="space-y-2">
              {weeklyReport.suggestedQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary p-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-sm text-foreground">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Mes patients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patientSummaries.map(({ patient, avgMood, checkInCount, riskSessions }) => (
            <div
              key={patient.id}
              className="flex items-center justify-between rounded-xl bg-secondary p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {checkInCount} check-ins
                    {riskSessions.length > 0 && (
                      <span className="ml-2 text-destructive">
                        {riskSessions.length} alerte(s)
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{avgMood.toFixed(1)}/5</p>
                  <p className="text-xs text-muted-foreground">humeur moy.</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
