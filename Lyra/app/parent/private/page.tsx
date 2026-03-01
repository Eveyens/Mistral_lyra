"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock, FileText, Activity, AlertTriangle, EyeOff } from "lucide-react"

export default function ParentPrivatePage() {
    // In a real app, this data would come from the backend, 
    // filtered by what the patient explicitly opted to share.
    const sharedData = {
        hasOptedIn: true,
        recentAlerts: false,
        generalMood: "Stable, légère anxiété récurrente le soir.",
        medicalNotes: "N'a pas souhaité partager ses notes de journal intime."
    }

    if (!sharedData.hasOptedIn) {
        return (
            <div className="mx-auto max-w-3xl p-6 text-center mt-20">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <EyeOff className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Accès restreint</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Pour le moment, votre proche n'a pas souhaité partager d'informations privées sur son suivi ou son humeur globale avec vous.
                    <br /><br />
                    Lyra respecte strictement ce choix pour maintenir un espace de confiance.
                </p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                    <Lock className="h-6 w-6 text-lyra-lavender" />
                    <h1 className="text-2xl font-bold text-foreground">Informations privées</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Aperçus partagés par votre proche. Ils gardent le contrôle total sur ce que vous pouvez voir.
                </p>
            </div>

            <div className="grid gap-6">
                <Card className="border-lyra-lavender/30">
                    <CardHeader className="bg-lyra-lavender-light/10">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Activity className="h-5 w-5 text-lyra-lavender" />
                            Tendance globale (30 derniers jours)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <p className="font-medium text-foreground">{sharedData.generalMood}</p>
                        <p className="mt-2 text-xs text-muted-foreground">Résumé généré par Lyra, autorisé pour le partage parental.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <AlertTriangle className={sharedData.recentAlerts ? "h-5 w-5 text-lyra-coral" : "h-5 w-5 text-primary"} />
                            Alertes urgentes récents
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {sharedData.recentAlerts ? (
                            <div className="rounded-lg bg-lyra-coral-light p-3 text-sm font-medium text-lyra-coral-dark">
                                Lyra a enregistré une situation de crise (Bouton SOS) le 12 Fév. Les secours ou les contacts GPS ont géré la situation.
                            </div>
                        ) : (
                            <div className="rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
                                Aucune urgence signalée via l'application ces 30 derniers jours.
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <FileText className="h-5 w-5 text-foreground/70" />
                            Détails du Cahier de bord
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border border-dashed p-4 text-center">
                            <EyeOff className="mx-auto mb-2 h-6 w-6 text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground italic">{sharedData.medicalNotes}</p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
