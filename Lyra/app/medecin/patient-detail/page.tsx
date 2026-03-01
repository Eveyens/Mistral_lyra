"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Calendar, Bot, Filter, Brain, HeartPulse, MessageSquareWarning, Activity } from "lucide-react"

export default function PatientDetailPage() {
    return (
        <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold text-foreground">Léa Dubois</h1>
                        <Badge variant="destructive" className="bg-lyra-coral hover:bg-lyra-coral-dark">À revoir rapidement</Badge>
                    </div>
                    <p className="text-muted-foreground">15 ans • Prochaine séance: 12 Mar 2024</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs py-1"><Calendar className="h-3 w-3 mr-1" /> Historique complet</Badge>
                    <Badge variant="outline" className="text-xs py-1 bg-primary/5"><Bot className="h-3 w-3 mr-1 text-primary" /> Synthèses IA</Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column - AI Summary & Alerts */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-lyra-coral/30 border-2 shadow-sm">
                        <CardHeader className="bg-lyra-coral-light/20 pb-4">
                            <CardTitle className="flex items-center gap-2 text-lyra-coral-dark">
                                <AlertCircle className="h-5 w-5" />
                                Alerte Récente (Hier, 22h15)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-sm font-medium mb-2">Déclenchement du bouton SOS (Kit de secours).</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                La patiente a utilisé le mode "Je panique" de son kit de secours. Lyra lui a proposé un exercice de respiration puis l'a mise en relation avec "Maman" via son GPS. La situation s'est stabilisée après 20 minutes.
                            </p>
                            <div className="bg-secondary p-3 rounded-lg border text-xs">
                                <strong>Extrait du chat juste avant SOS :</strong><br />
                                <span className="italic text-muted-foreground">"Je n'arrive plus à respirer, tout s'accélère, je suis seule dans ma chambre"</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Brain className="h-5 w-5 text-primary" />
                                Synthèse IA de la semaine
                            </CardTitle>
                            <CardDescription>Analyse croisée du cahier de bord, chat, et calendrier.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Activity className="h-4 w-4" /> Tendance de l'humeur</h4>
                                <p className="text-sm text-muted-foreground">Baisse notable depuis mardi. Les nuits sont courtes (moyenne 5h) et l'énergie déclarée est "dans le rouge" les matins.</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><MessageSquareWarning className="h-4 w-4" /> Thèmes récurrents (Cahier & Chat)</h4>
                                <div className="flex gap-2 mb-2">
                                    <Badge variant="secondary">Lycée / Notes</Badge>
                                    <Badge variant="secondary">Pression parentale</Badge>
                                    <Badge variant="secondary">Isolement</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Forte anxiété liée aux résultats du bac blanc. La patiente exprime souvent le sentiment de "décevoir tout le monde".</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><HeartPulse className="h-4 w-4" /> Observance des outils Lyra</h4>
                                <p className="text-sm text-muted-foreground">Bonne utilisation de la "Zone de repos" (a lu 3 messages de proches). A réussi 2 petits "Objectifs" de marche cette semaine.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Stats & GPS */}
                <div className="space-y-6">
                    {/* Mock Graph Placeholder */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                Calendrier Émotionnel (14j)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 w-full bg-secondary/50 rounded-lg flex items-end justify-between p-2">
                                {/* Simulated bar chart */}
                                {[40, 50, 60, 45, 30, 20, 10, 15, 25, 35, 20, 15, 10, 5].map((h, i) => (
                                    <div key={i} className="w-[5%] bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <p className="text-xs text-center text-muted-foreground mt-2">Score global en baisse</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-stretch gap-2">Mon GPS (Extrait)</CardTitle>
                            <CardDescription className="text-xs">Directives anticipées de la patiente</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <span className="text-xs font-semibold text-primary">Ce qui l'aide:</span>
                                <p className="text-sm text-muted-foreground">Ecouter de la musique forte, câliner le chat, appeler Emma.</p>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-lyra-coral">Ce qui aggrave:</span>
                                <p className="text-sm text-muted-foreground">Lui dire de se calmer, le bruit de la télé, la porte fermée.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="rounded-xl border border-dashed border-border p-4 text-center">
                        <Filter className="mx-auto h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-xs font-medium">Filtrer l'historique brut</p>
                        <p className="text-xs text-muted-foreground mt-1">Accédez aux extraits du journal intime que Léa a accepté de partager avec vous.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
