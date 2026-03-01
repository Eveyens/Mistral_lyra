import { BarChart3, FileText, Bell, ClipboardList } from "lucide-react"

const features = [
  { icon: BarChart3, title: "Courbes 30 jours", description: "Humeur, sommeil, energie et stress visualises sur un mois." },
  { icon: FileText, title: "Rapport IA hebdomadaire", description: "Resume genere automatiquement avec themes, signaux et questions." },
  { icon: Bell, title: "Alertes cliniques", description: "Notifications en cas de signal d'alerte detecte (ideation, crise)." },
  { icon: ClipboardList, title: "Export PDF", description: "Un rapport d'une page pret pour la consultation." },
]

export function LandingDoctor() {
  return (
    <section id="medecin" className="bg-secondary/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-lyra-teal-light" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Camille D.</p>
                  <p className="text-xs text-muted-foreground">Dernier check-in : aujourd{"'"}hui</p>
                </div>
                <span className="ml-auto rounded-full bg-lyra-coral-light px-2.5 py-1 text-xs font-medium text-lyra-coral">
                  Tendance positive
                </span>
              </div>

              {/* Mini chart mockup */}
              <div className="mb-4 flex items-end gap-1">
                {[3, 3, 4, 2, 3, 4, 4, 3, 2, 2, 3, 4, 3, 4].map((v, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="rounded-t bg-primary/70 transition-all"
                      style={{ height: `${v * 12}px` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Humeur sur 14 jours</p>

              <div className="rounded-xl bg-secondary p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Synthese IA (assistee)
                </p>
                <ul className="space-y-1.5 text-sm text-card-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Humeur stable avec amelioration en fin de semaine
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lyra-coral" />
                    Stress scolaire identifie comme facteur principal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lyra-lavender" />
                    Signal de risque a explorer en seance
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground italic">
                  Genere automatiquement - a valider par le clinicien.
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Mode medecin</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Preparez vos seances, pas vos questions.
            </h2>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Lyra genere un rapport hebdomadaire avec les tendances, themes recurrents et signaux d{"'"}alerte.
              Vous arrivez en consultation avec une vision claire.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-4">
                  <f.icon className="mb-2 h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-card-foreground">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
