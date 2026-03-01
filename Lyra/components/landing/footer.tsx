import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      {/* Disclaimer banner */}
      <div className="mx-auto mb-10 max-w-6xl rounded-xl bg-lyra-coral-light p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-lyra-coral" />
          <div className="text-sm text-accent-foreground">
            <p className="font-medium">Important</p>
            <p className="mt-1 text-muted-foreground">
              Lyra n{"'"}est pas un service d{"'"}urgence. En cas de danger immediat, appelez le 15 / 112.
              Les contenus IA sont informatifs et ne remplacent pas un avis medical.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">Lyra</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Un compagnon de sante mentale bienveillant et respectueux.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Produit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#outils" className="hover:text-foreground">La boite a outils</Link></li>
              <li><Link href="#medecin" className="hover:text-foreground">Mode medecin</Link></li>
              <li><Link href="#" className="hover:text-foreground">Offre structures</Link></li>
              <li><Link href="#faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">A propos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Notre mission</Link></li>
              <li><Link href="#" className="hover:text-foreground">Equipe</Link></li>
              <li><Link href="#" className="hover:text-foreground">Presse</Link></li>
              <li><Link href="#" className="hover:text-foreground">Sources & references</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Mentions legales</Link></li>
              <li><Link href="#" className="hover:text-foreground">Confidentialite</Link></li>
              <li><Link href="#" className="hover:text-foreground">CGU</Link></li>
              <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>2026 Lyra. Tous droits reserves. Ceci est un prototype de demonstration.</p>
        </div>
      </div>
    </footer>
  )
}
