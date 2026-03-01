import { TrendingUp, BookOpen, MessageCircle } from "lucide-react"

export function LandingParent() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Mode parent</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Accompagner sans envahir.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Un suivi global et non intrusif, des ressources adaptees et des messages de soutien.
            Tout en respectant l{"'"}intimite de votre enfant.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-lyra-coral-light">
              <TrendingUp className="h-7 w-7 text-lyra-coral" />
            </div>
            <h3 className="mb-2 font-semibold text-card-foreground">Tendance bien-etre</h3>
            <p className="text-sm text-muted-foreground">
              Un score global sur 7 jours. Pas de details, juste l{"'"}essentiel pour rester en lien.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-lyra-lavender-light">
              <BookOpen className="h-7 w-7 text-lyra-lavender" />
            </div>
            <h3 className="mb-2 font-semibold text-card-foreground">Ressources parentales</h3>
            <p className="text-sm text-muted-foreground">
              Des articles pour mieux comprendre, ecouter et reagir. Adaptes a la situation.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-lyra-teal-light">
              <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-card-foreground">Messages de soutien</h3>
            <p className="text-sm text-muted-foreground">
              Des messages pre-rediges ou personnalisables pour montrer votre presence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
