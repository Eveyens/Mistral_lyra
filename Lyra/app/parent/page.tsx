"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldAlert, BookOpen, MessageCircleHeart, Lock, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ParentDashboard() {
    return (
        <div className="mx-auto max-w-4xl p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Espace Proches & Parents</h1>
                <p className="mt-2 text-muted-foreground">
                    Bienvenue. Cet espace est concu pour vous aider a soutenir votre proche, vous informer, et communiquer via Lyra, tout en respectant l{"'"}intimite de chacun.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Link href="/parent/support" className="block">
                    <Card className="h-full transition-colors hover:border-primary/50 hover:bg-muted/50">
                        <CardHeader>
                            <MessageCircleHeart className="h-8 w-8 text-lyra-coral mb-2" />
                            <CardTitle>Soutenir</CardTitle>
                            <CardDescription>Envoyez des mots doux et decouvrez comment l{"'"}aider au quotidien.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/parent/private" className="block">
                    <Card className="h-full transition-colors hover:border-primary/50 hover:bg-muted/50">
                        <CardHeader>
                            <Lock className="h-8 w-8 text-lyra-lavender mb-2" />
                            <CardTitle>Infos Privees</CardTitle>
                            <CardDescription>Consultez les donnees que votre proche a accepte de partager avec vous.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>

            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Ressources & Conseils
            </h2>
            <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Comment parler de sante mentale ?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                            Aborder les sujets difficiles sans braquer. Conseils de pedopsychiatres.
                        </p>
                        <span className="text-xs font-medium text-primary flex items-center gap-1 cursor-pointer">
                            Lire l{"'"}article <ExternalLink className="h-3 w-3" />
                        </span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Comprendre le fonctionnement de Lyra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                            Lyra n{"'"}est pas un medecin, mais un compagnon de route. Voici ses limites.
                        </p>
                        <span className="text-xs font-medium text-primary flex items-center gap-1 cursor-pointer">
                            Lire la charte <ExternalLink className="h-3 w-3" />
                        </span>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-xl border border-lyra-coral/20 bg-lyra-coral-light/30 p-5">
                <div className="flex items-start gap-4">
                    <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-lyra-coral" />
                    <div>
                        <h3 className="font-medium text-lyra-coral-dark mb-1">En cas d{"'"}urgence</h3>
                        <p className="text-sm text-foreground/80 mb-3">
                            Si vous pensez que votre proche est en danger immediat, contactez les services d{"'"}urgence. Ni vous ni Lyra ne pouvez vous substituer aux secours professionnels.
                        </p>
                        <div className="flex gap-4 text-sm font-medium">
                            <span className="bg-white/50 px-2 py-1 rounded">Samu : 15</span>
                            <span className="bg-white/50 px-2 py-1 rounded">Urgence psy : 3114</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
