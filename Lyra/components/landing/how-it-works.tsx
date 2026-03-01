import { CheckCircle2, ArrowRight } from "lucide-react"

const steps = [
    {
        number: "1",
        title: "Check-in",
        description: "Prenez 1 minute par jour pour faire le point sur votre mood, votre sommeil et votre énergie.",
        color: "bg-lyra-coral-light text-lyra-coral",
    },
    {
        number: "2",
        title: "Continuité",
        description: "Un espace pour écrire, un calendrier émotionnel et un compagnon IA pour vous accompagner au quotidien.",
        color: "bg-lyra-teal-light text-primary",
    },
    {
        number: "3",
        title: "Sécurité",
        description: "Un kit de secours toujours accessible en cas de besoin, et un GPS personnalisé pour mieux vous guider.",
        color: "bg-lyra-lavender-light text-lyra-lavender",
    },
]

export function LandingHowItWorks() {
    return (
        <section id="comment-ca-marche" className="bg-secondary/30 px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Comment ça marche</p>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Un accompagnement en 3 étapes
                    </h2>
                </div>

                <div className="mx-auto mt-16 max-w-5xl">
                    <div className="grid gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.title} className="relative flex flex-col items-center text-center">
                                <div
                                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold ${step.color}`}
                                >
                                    {step.number}
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                                {index < steps.length - 1 && (
                                    <div className="absolute right-0 top-8 hidden -translate-y-1/2 translate-x-1/2 md:block">
                                        <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
