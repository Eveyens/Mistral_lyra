"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">Lyra</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#comment-ca-marche" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Comment ça marche
          </Link>
          <Link href="#confiance" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Adulte de confiance
          </Link>
          <Link href="#medecin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Mode medecin
          </Link>
          <Link href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/patient">Se connecter</Link>
          </Button>
          <Button size="sm" className="rounded-full" asChild>
            <Link href="/patient">Créer mon espace</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="mt-8 flex flex-col gap-4">
              <Link href="#comment-ca-marche" onClick={() => setOpen(false)} className="text-lg text-foreground">Comment ça marche</Link>
              <Link href="#confiance" onClick={() => setOpen(false)} className="text-lg text-foreground">Adulte de confiance</Link>
              <Link href="#medecin" onClick={() => setOpen(false)} className="text-lg text-foreground">Mode medecin</Link>
              <Link href="#faq" onClick={() => setOpen(false)} className="text-lg text-foreground">FAQ</Link>
              <hr className="my-2 border-border" />
              <Button className="rounded-full" asChild>
                <Link href="/patient">Créer mon espace</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
