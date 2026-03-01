"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Eye,
  EyeOff,
  Stethoscope,
  Users,
  Bell,
  Lock,
  Info,
} from "lucide-react"

export default function SettingsPage() {
  const { role, consent, setConsent, currentUser } = useApp()

  if (role === "patient") {
    return <PatientSettings consent={consent} setConsent={setConsent} currentUser={currentUser} />
  }

  if (role === "doctor") {
    return <DoctorSettings />
  }

  return <ParentSettings consent={consent} />
}

function PatientSettings({
  consent,
  setConsent,
  currentUser,
}: {
  consent: { doctorShare: boolean; parentShare: boolean; parentDetailLevel: "global" | "detailed" }
  setConsent: (c: typeof consent) => void
  currentUser: { name: string; email: string }
}) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Parametres</h1>
        <p className="mt-1 text-muted-foreground">Gere tes preferences et le partage de tes donnees.</p>
      </div>

      {/* Profile */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Mon profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-foreground">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consent / Data sharing */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-5 w-5 text-primary" />
            Partage de donnees
          </CardTitle>
          <CardDescription>
            Tu gardes le controle total. Tu peux modifier ces choix a tout moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Doctor share */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-lyra-lavender" />
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Partager avec mon medecin
                </Label>
                <p className="text-xs text-muted-foreground">
                  Dr. Martin recevra un resume hebdomadaire et les alertes de risque.
                </p>
              </div>
            </div>
            <Switch
              checked={consent.doctorShare}
              onCheckedChange={(checked) =>
                setConsent({ ...consent, doctorShare: checked })
              }
            />
          </div>

          {/* Parent share */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-lyra-coral" />
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Partager avec mon parent
                </Label>
                <p className="text-xs text-muted-foreground">
                  Marie D. pourra voir certaines informations sur ton etat.
                </p>
              </div>
            </div>
            <Switch
              checked={consent.parentShare}
              onCheckedChange={(checked) =>
                setConsent({ ...consent, parentShare: checked })
              }
            />
          </div>

          {/* Parent detail level */}
          {consent.parentShare && (
            <div className="ml-8 rounded-xl border border-border bg-secondary p-4">
              <p className="mb-3 text-sm font-medium text-foreground">
                Niveau de detail pour ton parent :
              </p>
              <div className="space-y-3">
                <button
                  className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${
                    consent.parentDetailLevel === "global"
                      ? "bg-primary/10 ring-2 ring-primary/30"
                      : "bg-background hover:bg-background/80"
                  }`}
                  onClick={() => setConsent({ ...consent, parentDetailLevel: "global" })}
                >
                  <EyeOff className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Vue globale</p>
                    <p className="text-xs text-muted-foreground">
                      Seulement l{"'"}humeur generale et les objectifs. Pas de details.
                    </p>
                  </div>
                </button>
                <button
                  className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${
                    consent.parentDetailLevel === "detailed"
                      ? "bg-primary/10 ring-2 ring-primary/30"
                      : "bg-background hover:bg-background/80"
                  }`}
                  onClick={() => setConsent({ ...consent, parentDetailLevel: "detailed" })}
                >
                  <Eye className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Vue detaillee</p>
                    <p className="text-xs text-muted-foreground">
                      Sommeil, energie, stress en plus de l{"'"}humeur. Toujours sans le contenu du journal.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Privacy note */}
          <div className="flex items-start gap-2 rounded-xl bg-lyra-warm p-3">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Les entrees privees de ton journal ne sont jamais partagees, meme avec ton medecin. Seul toi peux les voir.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Rappel check-in</Label>
              <p className="text-xs text-muted-foreground">Un rappel quotidien pour ton check-in</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Rappel objectifs</Label>
              <p className="text-xs text-muted-foreground">Rappel pour tes resolutions</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Insights hebdo</Label>
              <p className="text-xs text-muted-foreground">Un resume de ta semaine chaque dimanche</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DoctorSettings() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Parametres</h1>
        <p className="mt-1 text-muted-foreground">Gerez vos preferences professionnelles.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Mon profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lyra-lavender-light text-lg font-semibold text-lyra-lavender">
              S
            </div>
            <div>
              <p className="font-medium text-foreground">Dr. Sophie Martin</p>
              <p className="text-sm text-muted-foreground">dr.martin@demo.lyra</p>
              <Badge className="mt-1 text-xs" variant="secondary">Psychiatre</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Alertes risque</Label>
              <p className="text-xs text-muted-foreground">Notification immediate si un signal HIGH est detecte</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Rapport hebdomadaire</Label>
              <p className="text-xs text-muted-foreground">Recevoir le rapport chaque lundi matin</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-5 w-5 text-primary" />
            A propos de LYRA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            LYRA est un outil d{"'"}aide au suivi longitudinal. Les contenus generes par l{"'"}IA sont informatifs et ne constituent pas un diagnostic. Le medecin reste le seul decisionnaire clinique.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function ParentSettings({
  consent,
}: {
  consent: { doctorShare: boolean; parentShare: boolean; parentDetailLevel: "global" | "detailed" }
}) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Parametres</h1>
        <p className="mt-1 text-muted-foreground">Gerez vos preferences.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Mon profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lyra-coral-light text-lg font-semibold text-lyra-coral">
              M
            </div>
            <div>
              <p className="font-medium text-foreground">Marie D.</p>
              <p className="text-sm text-muted-foreground">marie@demo.lyra</p>
              <Badge className="mt-1 text-xs" variant="secondary">Parent de Camille</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-5 w-5 text-primary" />
            Acces aux donnees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-secondary p-4">
            <div className="mb-2 flex items-center gap-2">
              {consent.parentShare ? (
                <Eye className="h-5 w-5 text-primary" />
              ) : (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              )}
              <p className="text-sm font-medium text-foreground">
                {consent.parentShare
                  ? `Niveau : ${consent.parentDetailLevel === "detailed" ? "Detaille" : "Global"}`
                  : "Partage desactive par Camille"}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Le niveau de partage est defini par Camille. Vous ne pouvez pas le modifier. C{"'"}est un choix important pour sa confiance et son autonomie.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Resume hebdomadaire</Label>
              <p className="text-xs text-muted-foreground">Un resume de l{"'"}etat de Camille chaque semaine</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-foreground">Nouvelles ressources</Label>
              <p className="text-xs text-muted-foreground">Quand de nouvelles ressources parentales sont disponibles</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
