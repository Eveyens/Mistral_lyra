"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function MedecinDashboard() {
    const patients = [
        {
            id: "p1",
            name: "Léa Dubois",
            age: 15,
            status: "attention",
            lastUpdate: "Aujourd'hui, 09:30",
            aiSummary: "A utilisé le bouton SOS hier soir. Humeur en baisse constante sur les 3 derniers jours selon le calendrier émotionnel.",
            nextAppt: "12 Mar 2024"
        },
        {
            id: "p2",
            name: "Thomas Bernard",
            age: 17,
            status: "stable",
            lastUpdate: "Hier, 18:15",
            aiSummary: "Objectifs de sommeil atteints. Interactions positives avec l'IA. Aucun signe de crise détecté.",
            nextAppt: "20 Mar 2024"
        },
        {
            id: "p3",
            name: "Emma Martin",
            age: 14,
            status: "monitor",
            lastUpdate: "Il y a 2 jours",
            aiSummary: "A mentionné un stress lié à l'école dans le cahier de bord. L'IA a recommandé des exercices de respiration.",
            nextAppt: "15 Mar 2024"
        }
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "attention": return <AlertCircle className="h-5 w-5 text-lyra-coral" />
            case "stable": return <CheckCircle2 className="h-5 w-5 text-primary" />
            case "monitor": return <Clock className="h-5 w-5 text-lyra-lavender" />
            default: return null
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "attention": return <Badge variant="destructive" className="bg-lyra-coral hover:bg-lyra-coral-dark">À revoir rapidement</Badge>
            case "stable": return <Badge variant="default" className="bg-primary hover:bg-primary/90">Stable</Badge>
            case "monitor": return <Badge variant="secondary" className="bg-lyra-lavender-light text-lyra-lavender-dark">À surveiller</Badge>
            default: return null
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Mes Patients</h1>
                    <p className="text-muted-foreground mt-1">Aperçu généré par Lyra (IA) basé sur l'activité entre les séances.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher un patient..." className="pl-9 bg-card" />
                </div>
            </div>

            <div className="grid gap-4">
                {patients.map(p => (
                    <Link href={`/medecin/patient-detail`} key={p.id}>
                        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left column - ID and Status */}
                                    <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-border">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h2 className="text-lg font-bold text-foreground">{p.name}</h2>
                                                <p className="text-sm text-muted-foreground">{p.age} ans</p>
                                            </div>
                                            {getStatusIcon(p.status)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            {getStatusBadge(p.status)}
                                            <span className="text-xs font-semibold text-muted-foreground">Prochaine séance: {p.nextAppt}</span>
                                        </div>
                                    </div>

                                    {/* Right column - AI Summary */}
                                    <div className="p-6 md:w-2/3 bg-lyra-warm/30 rounded-r-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Synthèse IA Continue</span>
                                            <span className="text-xs text-muted-foreground ml-auto bg-white/50 px-2 py-0.5 rounded-full">{p.lastUpdate}</span>
                                        </div>
                                        <p className="text-sm text-foreground leading-relaxed">{p.aiSummary}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
