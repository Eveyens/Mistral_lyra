"use client"

import { ExternalLink, Play, BookOpen, Phone, Heart, Users, Brain, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ARTICLES = [
    {
        category: "Anxiété & Dépression",
        color: "bg-blue-100 text-blue-700",
        icon: Brain,
        items: [
            {
                title: "Comprendre l'anxiété chez l'adolescent",
                source: "Psycom.org",
                description: "Signes, causes et comment réagir face à un adolescent anxieux. Guide complet pour les parents.",
                url: "https://www.psycom.org/situations-de-crise/l-angoisse/",
                type: "article",
            },
            {
                title: "Dépression adolescente : comment l'identifier ?",
                source: "Ameli.fr",
                description: "Les symptômes de la dépression chez le jeune et les démarches à suivre pour consulter.",
                url: "https://www.ameli.fr/paris/assure/sante/themes/depression/reconnaitre-depression",
                type: "article",
            },
            {
                title: "Mon ado est déprimé – que faire ?",
                source: "Filsantejeunes.com",
                description: "Conseils pratiques pour les parents face à un adolescent en souffrance psychologique.",
                url: "https://www.filsantejeunes.com/depression-50",
                type: "article",
            },
        ],
    },
    {
        category: "Communication & Lien",
        color: "bg-green-100 text-green-700",
        icon: MessageCircle,
        items: [
            {
                title: "Parler à son ado de santé mentale",
                source: "UNICEF France",
                description: "Comment aborder les sujets difficiles sans braquer votre enfant et maintenir la confiance.",
                url: "https://www.unicef.fr/article/comment-parler-a-son-enfant-de-sante-mentale/",
                type: "article",
            },
            {
                title: "La communication non violente en famille",
                source: "Association CNV France",
                description: "Principes de base de la CNV pour améliorer les échanges avec votre adolescent.",
                url: "https://www.cnvfrance.org/la-cnv/",
                type: "article",
            },
        ],
    },
    {
        category: "Vidéos & Podcasts",
        color: "bg-purple-100 text-purple-700",
        icon: Play,
        items: [
            {
                title: "Santé mentale des ados : comprendre et agir",
                source: "YouTube – PSYCOM",
                description: "Webinaire de 45 min avec des psychiatres sur la santé mentale des adolescents et le rôle des parents.",
                url: "https://www.youtube.com/watch?v=xNGwZa5wg6M",
                type: "video",
            },
            {
                title: "Mon enfant va mal – témoignages de parents",
                source: "YouTube – Fondation FondaMental",
                description: "Des parents témoignent de leur expérience face à la maladie psychique de leur enfant.",
                url: "https://www.youtube.com/@FondationFondaMental",
                type: "video",
            },
            {
                title: "Podcast : Ado & Psy – Émission France Inter",
                source: "France Inter",
                description: "Série de podcasts sur la santé mentale des jeunes : témoignages, conseils, experts.",
                url: "https://www.radiofrance.fr/franceinter/podcasts/si-tu-ecoutes-j-annule-tout",
                type: "podcast",
            },
        ],
    },
    {
        category: "Trouver de l'aide",
        color: "bg-orange-100 text-orange-700",
        icon: Users,
        items: [
            {
                title: "Trouver un psy pour mon enfant",
                source: "Doctolib",
                description: "Annuaire de psychiatres et psychologues spécialisés enfants/adolescents, avec prise de RDV en ligne.",
                url: "https://www.doctolib.fr/psychiatre",
                type: "article",
            },
            {
                title: "Groupes de soutien pour parents",
                source: "UNAFAM",
                description: "L'UNAFAM accompagne les familles de personnes souffrant de troubles psychiques avec des groupes d'échanges.",
                url: "https://www.unafam.org/",
                type: "article",
            },
            {
                title: "Maisons des Adolescents – Trouver la plus proche",
                source: "Maison des Ados",
                description: "Structures d'accueil, d'écoute et d'orientation pour les adolescents et leur famille, gratuitement.",
                url: "https://www.maisondesadolescents.com/",
                type: "article",
            },
        ],
    },
]

const EMERGENCY = [
    { label: "SAMU – Urgences médicales", number: "15", color: "bg-red-50 border-red-200 text-red-700" },
    { label: "3114 – Prévention du suicide (24h/24)", number: "3114", color: "bg-orange-50 border-orange-200 text-orange-700" },
    { label: "Fil Santé Jeunes", number: "0 800 235 236", color: "bg-blue-50 border-blue-200 text-blue-700" },
    { label: "Croix-Rouge Écoute", number: "0 800 858 858", color: "bg-green-50 border-green-200 text-green-700" },
]

export default function ParentResourcesPage() {
    return (
        <div className="mx-auto max-w-4xl p-4 md:p-8 space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    Ressources & Accompagnement
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                    Articles, vidéos et contacts sélectionnés pour vous aider à comprendre et soutenir votre adolescent.
                </p>
            </div>

            {/* Emergency numbers */}
            <section className="rounded-2xl border border-red-100 bg-red-50/40 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Phone className="h-5 w-5 text-red-500" />
                    <h2 className="text-lg font-semibold text-foreground">Numéros d'urgence</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {EMERGENCY.map((e) => (
                        <div key={e.number} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${e.color}`}>
                            <span className="text-sm font-medium">{e.label}</span>
                            <span className="text-xl font-bold tracking-tight">{e.number}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resource sections */}
            {ARTICLES.map((section) => {
                const SectionIcon = section.icon
                return (
                    <section key={section.category}>
                        <div className="flex items-center gap-2 mb-5">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${section.color.split(" ")[0]}`}>
                                <SectionIcon className={`h-4 w-4 ${section.color.split(" ")[1]}`} />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground">{section.category}</h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {section.items.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col rounded-2xl border border-border/50 bg-card p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <Badge
                                            variant="secondary"
                                            className={`text-xs rounded-full px-2 py-0.5 ${section.color}`}
                                        >
                                            {item.type === "video" ? "📹 Vidéo" : item.type === "podcast" ? "🎙️ Podcast" : "📄 Article"}
                                        </Badge>
                                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                                    </div>

                                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1.5 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                                    <p className="mt-3 text-xs font-medium text-primary">{item.source} →</p>
                                </a>
                            ))}
                        </div>
                    </section>
                )
            })}

            {/* Footer note */}
            <div className="rounded-2xl bg-muted/40 border border-border/30 p-5 flex gap-3">
                <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                    Ces ressources sont proposées à titre informatif. En cas de doute sur l'état de santé de votre enfant,
                    consultez un professionnel de santé. Le médecin référent de Lyra reste disponible pour vous accompagner.
                </p>
            </div>
        </div>
    )
}
