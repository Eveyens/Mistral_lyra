import { Shield, Eye, ToggleRight, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Partage choisi",
    description: "Tu decides ce qui est partage, avec qui, et quand. Rien n'est force.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    description: "Tu vois exactement ce que ton medecin ou parent peut voir. Pas de surprise.",
  },
  {
    icon: ToggleRight,
    title: "Revocable a tout moment",
    description: "Tu peux couper le partage quand tu veux, en un clic.",
  },
  {
    icon: Lock,
    title: "Donnees protegees",
    description: "Chiffrement de bout en bout. Tes donnees t'appartiennent.",
  },
]

export function LandingTrust() {
  return (
    <section id="confiance" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">L{"'"}adulte de confiance</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tu gardes la main. Toujours.
            </h2>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Lyra te permet de partager certaines informations avec un medecin ou un parent de confiance.
              Mais c{"'"}est toi qui decides. Tu peux changer d{"'"}avis quand tu veux.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lyra-teal-light">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual placeholder - trust card */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-lyra-teal-light">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Contrat de confiance</h3>
                <p className="mt-1 text-sm text-muted-foreground">Gere tes partages</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Partage medecin</p>
                    <p className="text-xs text-muted-foreground">Dr. Sophie Martin</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Partage parent</p>
                    <p className="text-xs text-muted-foreground">Marie D. - Score global uniquement</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Entrees privees</p>
                    <p className="text-xs text-muted-foreground">Visibles uniquement par toi</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-muted-foreground/30" />
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Tu peux modifier ces reglages a tout moment dans les parametres.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
