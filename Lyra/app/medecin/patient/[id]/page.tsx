"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Heart,
  Moon,
  Zap,
  Brain,
  AlertTriangle,
  FileText,
  MessageSquare,
  Download,
  TrendingUp,
  CalendarDays,
  Pill,
  Check,
  X,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PatientDetailPage() {
  const { checkIns, journalEntries, voiceSessions, weeklyReport, goals, medications } = useApp()

  const patient = { id: "p1", name: "Camille D." }
  const pCheckIns = checkIns.filter((c) => c.patientId === patient.id)
  const last7 = pCheckIns.slice(-7)
  const last14 = pCheckIns.slice(-14)
  const avgMood = last7.reduce((s, c) => s + c.mood, 0) / last7.length
  const avgSleep = last7.reduce((s, c) => s + c.sleep, 0) / last7.length
  const avgEnergy = last7.reduce((s, c) => s + c.energy, 0) / last7.length
  const avgStress = last7.reduce((s, c) => s + c.stress, 0) / last7.length

  const pJournals = journalEntries.filter(
    (j) => j.patientId === patient.id && j.visibility === "DEFAULT"
  )
  const pSessions = voiceSessions.filter((v) => v.patientId === patient.id)
  const riskSessions = pSessions.filter((v) => v.riskFlag === "HIGH")

  // Suicidal ideation data from check-ins
  const ideationData = last14.map((c) => ({
    date: c.date,
    hasThoughts: c.suicidalIdeation?.hasThoughts,
    intensity: c.suicidalIdeation?.intensity,
    hasPlan: c.suicidalIdeation?.hasPlan,
    hasIntention: c.suicidalIdeation?.hasIntention,
    mood: c.mood,
    sleep: c.sleep,
    stress: c.stress,
  }))

  const ideationDays = ideationData.filter((d) => d.hasThoughts === true)
  const maxIntensity = Math.max(...ideationDays.map((d) => d.intensity || 0), 0)

  // Medication data
  const med = medications[0]

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rapport LYRA - ${patient.name}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #1a1a2e; line-height: 1.6; }
          h1 { color: #4a9a95; margin-bottom: 4px; }
          h2 { color: #4a9a95; margin-top: 24px; border-bottom: 2px solid #e8f4f3; padding-bottom: 8px; }
          .subtitle { color: #666; font-size: 14px; }
          .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 16px 0; }
          .stat { background: #f0faf9; padding: 16px; border-radius: 12px; text-align: center; }
          .stat-value { font-size: 24px; font-weight: bold; }
          .stat-label { font-size: 12px; color: #666; }
          .alert { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; border-radius: 8px; margin: 8px 0; }
          .item { background: #f9fafb; padding: 12px; border-radius: 8px; margin: 8px 0; }
          .badge { display: inline-block; background: #e8f4f3; color: #4a9a95; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; }
          .badge-danger { background: #fef2f2; color: #ef4444; }
          .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .protector { background: #e8f4f3; padding: 12px; border-radius: 8px; }
          .aggravator { background: #fff5f0; padding: 12px; border-radius: 8px; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #999; }
          .ideation-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
          .ideation-table th, .ideation-table td { padding: 8px; border: 1px solid #e5e5e5; font-size: 12px; }
          .ideation-table th { background: #f0faf9; text-align: left; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <h1>Rapport LYRA</h1>
        <p class="subtitle">${patient.name} - Semaine du ${format(new Date(weeklyReport.weekStart), "d MMMM yyyy", { locale: fr })}</p>
        <p class="subtitle">Genere le ${format(new Date(), "d MMMM yyyy", { locale: fr })}</p>

        <h2>Indicateurs cles (7 derniers jours)</h2>
        <div class="stat-grid">
          <div class="stat"><div class="stat-value">${avgMood.toFixed(1)}</div><div class="stat-label">Humeur /5</div></div>
          <div class="stat"><div class="stat-value">${avgSleep.toFixed(1)}</div><div class="stat-label">Sommeil /5</div></div>
          <div class="stat"><div class="stat-value">${avgEnergy.toFixed(1)}</div><div class="stat-label">Energie /5</div></div>
          <div class="stat"><div class="stat-value">${avgStress.toFixed(1)}</div><div class="stat-label">Stress /5</div></div>
        </div>

        ${riskSessions.length > 0 || ideationDays.length > 0 ? `
        <h2>Alertes et ideations</h2>
        ${weeklyReport.alerts.map((a) => `<div class="alert">${a}</div>`).join("")}
        ${ideationDays.length > 0 ? `
        <table class="ideation-table">
          <tr><th>Date</th><th>Intensite</th><th>Plan</th><th>Intention</th><th>Humeur</th><th>Sommeil</th></tr>
          ${ideationDays.map((d) => `
            <tr>
              <td>${format(new Date(d.date), "d MMM", { locale: fr })}</td>
              <td>${d.intensity || "-"}/5</td>
              <td>${d.hasPlan ? "Oui" : "Non"}</td>
              <td>${d.hasIntention ? "Oui" : "Non"}</td>
              <td>${d.mood}/5</td>
              <td>${d.sleep}/5</td>
            </tr>
          `).join("")}
        </table>
        ` : ""}
        ` : ""}

        <h2>Resume de la semaine</h2>
        ${weeklyReport.summary.map((s) => `<div class="item">${s}</div>`).join("")}

        <h2>Themes identifies</h2>
        <p>${weeklyReport.themes.map((t) => `<span class="badge">${t}</span> `).join("")}</p>

        <h2>Facteurs</h2>
        <div class="two-col">
          <div class="protector">
            <strong>Protecteurs</strong><br/>
            ${weeklyReport.aggravatorsProtectors.protectors.map((p) => `<div>- ${p}</div>`).join("")}
          </div>
          <div class="aggravator">
            <strong>Aggravants</strong><br/>
            ${weeklyReport.aggravatorsProtectors.aggravators.map((a) => `<div>- ${a}</div>`).join("")}
          </div>
        </div>

        ${med ? `
        <h2>Traitement</h2>
        <p><strong>${med.name} ${med.dosage}</strong> - ${med.frequency}</p>
        <p>Adherence : ${Math.round((med.logs.filter((l) => l.taken).length / med.logs.length) * 100)}%</p>
        ` : ""}

        <h2>Adherence globale</h2>
        <p><strong>${weeklyReport.adherence}%</strong> d'adherence aux exercices et check-ins.</p>

        <h2>Questions suggerees</h2>
        ${weeklyReport.suggestedQuestions.map((q) => `<div class="item">${q}</div>`).join("")}

        <div class="footer">
          Rapport genere automatiquement par LYRA. Les contenus IA sont informatifs et ne remplacent pas un avis medical.<br/>
          Document confidentiel - Usage medical uniquement.
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Button variant="ghost" size="sm" className="mb-2" asChild>
            <Link href="/app">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Retour
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Dossier de {patient.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Derniere mise a jour : {format(new Date(), "d MMM yyyy", { locale: fr })}
          </p>
        </div>
        <Button onClick={handleExportPDF} className="rounded-full">
          <Download className="mr-2 h-4 w-4" />
          Exporter PDF
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Heart} label="Humeur" value={avgMood} color="text-primary" />
        <StatCard icon={Moon} label="Sommeil" value={avgSleep} color="text-lyra-lavender" />
        <StatCard icon={Zap} label="Energie" value={avgEnergy} color="text-lyra-coral" />
        <StatCard icon={Brain} label="Stress" value={avgStress} color="text-lyra-lavender" />
      </div>

      {/* Risk alerts */}
      {(riskSessions.length > 0 || ideationDays.length > 0) && (
        <Card className="mb-6 border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Signaux de risque et ideations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyReport.alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-background p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-foreground">{a}</p>
              </div>
            ))}
            {riskSessions.map((s) => (
              <div key={s.id} className="rounded-lg bg-background p-3">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">HIGH</Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(s.createdAt), "d MMM yyyy", { locale: fr })}
                  </span>
                </div>
                <p className="text-sm italic text-muted-foreground">
                  {'"'}{s.transcript}{'"'}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ===== SUICIDAL IDEATION GRAPH (Doctor-only) ===== */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Ideations suicidaires (14 jours)
          </CardTitle>
          <CardDescription>
            Correlation avec humeur, sommeil, stress et medication
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ideationDays.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune ideation rapportee sur cette periode.</p>
          ) : (
            <>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-destructive/5 p-3 text-center">
                  <p className="text-2xl font-bold text-destructive">{ideationDays.length}</p>
                  <p className="text-xs text-muted-foreground">Jours avec ideations</p>
                </div>
                <div className="rounded-lg bg-destructive/5 p-3 text-center">
                  <p className="text-2xl font-bold text-destructive">{maxIntensity}/5</p>
                  <p className="text-xs text-muted-foreground">Intensite max</p>
                </div>
                <div className="rounded-lg bg-destructive/5 p-3 text-center">
                  <p className="text-2xl font-bold text-destructive">
                    {ideationDays.filter((d) => d.hasPlan).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Avec plan</p>
                </div>
              </div>

              {/* Visual timeline */}
              <div className="flex items-end gap-1">
                {ideationData.map((d) => {
                  const hasIdeation = d.hasThoughts === true
                  const intensity = d.intensity || 0
                  const noResponse = d.hasThoughts === null
                  return (
                    <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                      {/* Ideation bar */}
                      <div
                        className={cn(
                          "w-full rounded-t transition-all",
                          hasIdeation ? "bg-destructive" : noResponse ? "bg-muted" : "bg-primary/20"
                        )}
                        style={{ height: hasIdeation ? `${(intensity / 5) * 50 + 10}px` : "8px" }}
                      />
                      {/* Mood dot */}
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          d.mood <= 2 ? "bg-lyra-coral" : d.mood >= 4 ? "bg-primary" : "bg-muted-foreground"
                        )}
                      />
                      <span className="text-[9px] text-muted-foreground">
                        {format(new Date(d.date), "d", { locale: fr })}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  Ideation
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-primary/20" />
                  Pas d{"'"}ideation
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  Non repondu
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Mood timeline */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Evolution humeur (14 jours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1.5">
            {last14.map((c) => (
              <div key={c.id} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-primary transition-all"
                  style={{ height: `${(c.mood / 5) * 80}px` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {format(new Date(c.date), "d", { locale: fr })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medication tracking (doctor view) */}
      {med && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Pill className="h-4 w-4 text-primary" />
              Traitement : {med.name} {med.dosage}
            </CardTitle>
            <CardDescription>{med.frequency}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-secondary p-3 text-center">
                <p className="text-xl font-bold text-foreground">
                  {Math.round((med.logs.filter((l) => l.taken).length / med.logs.length) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Adherence</p>
              </div>
              <div className="rounded-lg bg-secondary p-3 text-center">
                <p className="text-xl font-bold text-foreground">
                  {med.logs.filter((l) => l.taken).length}/{med.logs.length}
                </p>
                <p className="text-xs text-muted-foreground">Prises</p>
              </div>
              <div className="rounded-lg bg-secondary p-3 text-center">
                <p className="text-xl font-bold text-foreground">
                  {med.logs.filter((l) => l.sideEffects).length}
                </p>
                <p className="text-xs text-muted-foreground">Effets secondaires</p>
              </div>
            </div>
            <div className="grid grid-cols-14 gap-1">
              {med.logs.slice(-14).map((log) => (
                <div
                  key={log.date}
                  className={cn(
                    "flex flex-col items-center rounded p-1.5 text-center",
                    log.taken ? "bg-primary/10" : "bg-lyra-coral-light"
                  )}
                >
                  <span className="text-[9px] text-muted-foreground">
                    {format(new Date(log.date), "d", { locale: fr })}
                  </span>
                  {log.taken ? (
                    <Check className="h-3 w-3 text-primary" />
                  ) : (
                    <X className="h-3 w-3 text-lyra-coral" />
                  )}
                  {log.sideEffects && (
                    <AlertCircle className="mt-0.5 h-2.5 w-2.5 text-lyra-coral" />
                  )}
                </div>
              ))}
            </div>
            {med.logs.filter((l) => l.sideEffects).length > 0 && (
              <div className="mt-3 space-y-1">
                {med.logs.filter((l) => l.sideEffects).map((log) => (
                  <div key={log.date} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-[10px]">
                      {format(new Date(log.date), "d MMM", { locale: fr })}
                    </Badge>
                    <span>{log.sideEffects}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Goals + Adherence */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Resolutions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((g) => (
              <div key={g.id}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-foreground">{g.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {g.progress}/{g.target}
                  </span>
                </div>
                <Progress value={(g.progress / g.target) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-4 w-4 text-primary" />
              Adherence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-primary/20">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    strokeDasharray={`${(weeklyReport.adherence / 100) * 352} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-bold text-foreground">
                  {weeklyReport.adherence}%
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Check-ins et exercices completes cette semaine
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Voice sessions */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4 text-primary" />
            Sessions IA recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pSessions.map((s) => (
            <div key={s.id} className="rounded-xl bg-secondary p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(s.createdAt), "d MMM yyyy - HH:mm", { locale: fr })}
                </span>
                {s.riskFlag === "HIGH" && (
                  <Badge variant="destructive" className="text-xs">Risque</Badge>
                )}
              </div>
              <p className="mb-2 text-sm italic text-foreground">
                {'"'}{s.transcript}{'"'}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Lyra : {s.aiReplyText}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Journal entries visible to doctor */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Journal (entrees partagees)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pJournals.map((j) => (
            <div key={j.id} className="rounded-xl bg-secondary p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {j.type === "AUDIO" ? "Audio" : "Texte"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(j.createdAt), "d MMM yyyy", { locale: fr })}
                </span>
              </div>
              <p className="text-sm text-foreground">{j.text || j.transcript}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
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
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{value.toFixed(1)}<span className="text-sm font-normal text-muted-foreground">/5</span></p>
      </CardContent>
    </Card>
  )
}
