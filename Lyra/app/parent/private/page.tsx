"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Lock, FileText, Activity, AlertTriangle, EyeOff,
    Compass, CheckCircle2, XCircle, MessageCircle,
    Phone, TriangleAlert, Lightbulb
} from "lucide-react"
import { useApp } from "@/lib/app-context"

export default function ParentPrivatePage() {
    const { gps } = useApp()

    const sharedData = {
        hasOptedIn: true,
        recentAlerts: false,
        generalMood: "Stable, légère anxiété récurrente le soir.",
        medicalNotes: "N'a pas souhaité partager ses notes de journal intime.",
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
        <div className="mx-auto max-w-3xl p-4 md:p-8 space-y-6">
            <div className="mb-2">
                <div className="mb-2 flex items-center gap-2">
                    <Lock className="h-6 w-6 text-lyra-lavender" />
                    <h1 className="text-2xl font-bold text-foreground">Informations privées</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Aperçus partagés par votre proche. Ils gardent le contrôle total sur ce que vous pouvez voir.
                </p>
            </div>

            {/* Tendance globale */}
            <Card className="border-lyra-lavender/30">
                <CardHeader className="bg-lyra-lavender-light/10 pb-3">
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

            {/* Alertes */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <AlertTriangle className={sharedData.recentAlerts ? "h-5 w-5 text-lyra-coral" : "h-5 w-5 text-primary"} />
                        Alertes urgentes récentes
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

            {/* GPS émotionnel */}
            {gps && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                            <Compass className="h-4 w-4 text-teal-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">GPS Émotionnel partagé</h2>
                    </div>
                    <p className="text-sm text-muted-foreground -mt-2 ml-10">
                        Votre proche a choisi de partager son plan de bien-être pour vous aider à l'accompagner au mieux.
                    </p>

                    {/* Signaux d'alerte */}
                    {gps.earlyWarnings?.length > 0 && (
                        <Card className="border-orange-100">
                            <CardHeader className="pb-3 bg-orange-50/50 rounded-t-xl">
                                <CardTitle className="flex items-center gap-2 text-sm text-orange-700">
                                    <TriangleAlert className="h-4 w-4" />
                                    Signaux d'alerte précoces — quand faire attention
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-3">
                                <ul className="space-y-1.5">
                                    {gps.earlyWarnings.map((w: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Ce qui aide */}
                    {gps.whatHelps?.length > 0 && (
                        <Card className="border-green-100">
                            <CardHeader className="pb-3 bg-green-50/50 rounded-t-xl">
                                <CardTitle className="flex items-center gap-2 text-sm text-green-700">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Ce qui aide votre proche
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-3">
                                <ul className="space-y-1.5">
                                    {gps.whatHelps.map((h: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-400" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Ce qui aggrave */}
                    {gps.whatMakesWorse?.length > 0 && (
                        <Card className="border-red-100">
                            <CardHeader className="pb-3 bg-red-50/50 rounded-t-xl">
                                <CardTitle className="flex items-center gap-2 text-sm text-red-700">
                                    <XCircle className="h-4 w-4" />
                                    Ce qui peut aggraver les choses — à éviter
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-3">
                                <ul className="space-y-1.5">
                                    {gps.whatMakesWorse.map((w: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quoi dire / ne pas dire */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {gps.whatToSay?.length > 0 && (
                            <Card className="border-blue-100">
                                <CardHeader className="pb-3 bg-blue-50/50 rounded-t-xl">
                                    <CardTitle className="flex items-center gap-2 text-sm text-blue-700">
                                        <MessageCircle className="h-4 w-4" />
                                        Phrases utiles à dire
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-3">
                                    <ul className="space-y-2">
                                        {gps.whatToSay.map((s: string, i: number) => (
                                            <li key={i} className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800 italic">
                                                « {s} »
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {gps.whatToAvoidSaying?.length > 0 && (
                            <Card className="border-red-100">
                                <CardHeader className="pb-3 bg-red-50/50 rounded-t-xl">
                                    <CardTitle className="flex items-center gap-2 text-sm text-red-700">
                                        <XCircle className="h-4 w-4" />
                                        Phrases à éviter
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-3">
                                    <ul className="space-y-2">
                                        {gps.whatToAvoidSaying.map((s: string, i: number) => (
                                            <li key={i} className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800 line-through opacity-70">
                                                « {s} »
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Contacts GPS */}
                    {gps.contactPeople?.length > 0 && (
                        <Card className="border-teal-100">
                            <CardHeader className="pb-3 bg-teal-50/50 rounded-t-xl">
                                <CardTitle className="flex items-center gap-2 text-sm text-teal-700">
                                    <Phone className="h-4 w-4" />
                                    Contacts de confiance du GPS
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-3">
                                <div className="space-y-2">
                                    {gps.contactPeople.map((c: { name: string; phone: string; relationship: string }, i: number) => (
                                        <div key={i} className="flex items-center justify-between rounded-lg border border-teal-100 bg-teal-50/30 px-4 py-2.5">
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{c.name}</p>
                                                <p className="text-xs text-muted-foreground">{c.relationship}</p>
                                            </div>
                                            <a
                                                href={`tel:${c.phone.replace(/\s/g, "")}`}
                                                className="text-sm font-semibold text-teal-700 hover:underline"
                                            >
                                                {c.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Journal */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <FileText className="h-5 w-5 text-foreground/70" />
                        Détails du Journal
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
    )
}
