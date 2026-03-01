import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Stethoscope, Users, Star } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-lyra-teal-light opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-lyra-coral-light opacity-30 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-lyra-lavender-light opacity-30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium">
          <Heart className="mr-1.5 h-3.5 w-3.5 text-lyra-coral" />
          Votre compagnon de santé mentale
        </Badge>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight">
          Devenez l'acteur <br />
          <span className="text-primary">de votre bien-être.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Un soutien quotidien pour les patients, des ressources pour les parents, et un suivi simplifié pour les médecins.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full px-8 text-base" asChild>
            <Link href="/patient">
              <Heart className="mr-2 h-4 w-4" />
              Créer mon espace
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
            <Link href="/medecin">
              <Stethoscope className="mr-2 h-4 w-4" />
              Espace médecin
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
            <Link href="/parent">
              <Users className="mr-2 h-4 w-4" />
              Espace parent
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-lyra-teal-light text-xs font-medium text-primary">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span>Deja <strong className="text-foreground">2 400+</strong> utilisateurs</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-lyra-coral text-lyra-coral" />
              ))}
            </div>
            <span><strong className="text-foreground">4.9/5</strong> sur les stores</span>
          </div>
        </div>
      </div>
    </section>
  )
}
