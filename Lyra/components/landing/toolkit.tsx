import { Calendar, BookOpen, ShieldCheck, Target, Smile, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const tools = [
  {
    icon: Calendar,
    title: "Calendrier emotionnel",
    description: "Visualise ton humeur jour apres jour. Repere les tendances, celebre les progres.",
    color: "bg-lyra-teal-light text-primary",
  },
  {
    icon: BookOpen,
    title: "Journal intime",
    description: "Ecris, enregistre ta voix ou ajoute des photos. Ton espace, tes mots.",
    color: "bg-lyra-coral-light text-lyra-coral",
  },
  {
    icon: ShieldCheck,
    title: "Kit de secours",
    description: "Exercices de respiration, techniques d'ancrage et contacts d'urgence toujours a portee de main.",
    color: "bg-lyra-lavender-light text-lyra-lavender",
  },
  {
    icon: Target,
    title: "Resolutions",
    description: "Fixe-toi des objectifs simples et suis ta progression au quotidien.",
    color: "bg-lyra-teal-light text-primary",
  },
  {
    icon: Smile,
    title: "Espace bien-etre",
    description: "Des articles, videos et exercices adaptes a tes besoins du moment.",
    color: "bg-lyra-coral-light text-lyra-coral",
  },
  {
    icon: Sparkles,
    title: "Canal positif",
    description: "Un fil de messages bienveillants pour te rappeler que tu n'es pas seul(e).",
    color: "bg-lyra-lavender-light text-lyra-lavender",
  },
]

export function LandingToolkit() {
  return (
    <section id="outils" className="bg-secondary/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">La boite a outils</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tout ce dont tu as besoin, au meme endroit.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Des outils simples et accessibles pour prendre soin de toi entre les seances, a ton rythme.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              className="group border-border/50 bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <CardContent className="p-6">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{tool.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
