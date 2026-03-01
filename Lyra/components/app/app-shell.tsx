"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useApp } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  ShieldAlert,
  Target,
  BookMarked,
  Settings,
  Mic,
  Users,
  Stethoscope,
  Heart,
  ChevronDown,
  Menu,
  Phone,
  MessageCircleHeart,
  Compass,
  Pill,
  Wind,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect, useCallback, type ReactNode } from "react"

const patientNav = [
  { href: "/patient", label: "Aujourd'hui", icon: LayoutDashboard },
  { href: "/patient/chat", label: "Parler a Lyra", icon: Mic },
  { href: "/patient/calendar", label: "Calendrier", icon: Calendar },
  { href: "/patient/journal", label: "Journal", icon: BookOpen },
  { href: "/patient/proches", label: "Mots de mes proches", icon: MessageCircleHeart },
  { href: "/patient/gps", label: "Mon GPS", icon: Compass },
  { href: "/patient/safety", label: "Kit de secours", icon: ShieldAlert },
  { href: "/patient/goals", label: "Resolutions", icon: Target },
  { href: "/patient/resources", label: "Détente", icon: BookMarked },
  { href: "/patient/settings", label: "Parametres", icon: Settings },
]

const doctorNav = [
  { href: "/medecin", label: "Mes patients", icon: Users },
  { href: "/medecin/patient-detail", label: "Dossier patient", icon: LayoutDashboard },
  { href: "/medecin/settings", label: "Parametres", icon: Settings },
]

const parentNav = [
  { href: "/parent", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/parent/resources", label: "Ressources", icon: BookMarked },
  { href: "/parent/settings", label: "Parametres", icon: Settings },
]

const roleConfig = {
  patient: { label: "Patient", icon: Heart, nav: patientNav, color: "text-primary" },
  doctor: { label: "Medecin", icon: Stethoscope, nav: doctorNav, color: "text-lyra-lavender" },
  parent: { label: "Parent", icon: Users, nav: parentNav, color: "text-lyra-coral" },
}

export function AppShell({ children }: { children: ReactNode }) {
  const { role, setRole, currentUser, trustedContact } = useApp()
  const pathname = usePathname()
  const config = roleConfig[role]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [emergencyOpen, setEmergencyOpen] = useState(false)
  const [calmMode, setCalmMode] = useState(false)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [breathCount, setBreathCount] = useState(0)
  const [breathTimer, setBreathTimer] = useState(60)

  // 60-second calm breathing
  useEffect(() => {
    if (!calmMode) return
    const timer = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          setCalmMode(false)
          setEmergencyOpen(false)
          return 60
        }
        return prev - 1
      })
      setBreathCount((prev) => {
        const durations = { inhale: 4, hold: 4, exhale: 6 }
        if (prev + 1 >= durations[breathPhase]) {
          if (breathPhase === "inhale") setBreathPhase("hold")
          else if (breathPhase === "hold") setBreathPhase("exhale")
          else setBreathPhase("inhale")
          return 0
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [calmMode, breathPhase])

  const startCalm = useCallback(() => {
    setCalmMode(true)
    setBreathPhase("inhale")
    setBreathCount(0)
    setBreathTimer(60)
  }, [])

  const NavContent = () => (
    <nav className="flex flex-col gap-1 px-3">
      {config.nav.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-foreground">Lyra</span>
          </div>

          {/* Role switcher */}
          <div className="px-3 pt-4 pb-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between rounded-xl px-3 text-sm">
                  <span className="flex items-center gap-2">
                    <config.icon className={cn("h-4 w-4", config.color)} />
                    {currentUser.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setRole("patient")}>
                  <Heart className="mr-2 h-4 w-4 text-primary" />
                  Camille D. (Patient)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole("doctor")}>
                  <Stethoscope className="mr-2 h-4 w-4 text-lyra-lavender" />
                  Dr. Sophie Martin (Medecin)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole("parent")}>
                  <Users className="mr-2 h-4 w-4 text-lyra-coral" />
                  Marie D. (Parent)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <NavContent />

          {/* Disclaimer */}
          <div className="mt-auto border-t border-border p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Lyra n{"'"}est pas un service d{"'"}urgence. En cas de danger : 15 / 112 / 3114.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile header + content */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-semibold text-foreground">Lyra</span>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  <config.icon className={cn("mr-1.5 h-3.5 w-3.5", config.color)} />
                  {config.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setRole("patient")}>Patient</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole("doctor")}>Medecin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole("parent")}>Parent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 pt-12">
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ===== FLOATING EMERGENCY BUTTON ===== */}
      {role === "patient" && (
        <>
          <button
            onClick={() => { setEmergencyOpen(true); setCalmMode(false) }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Urgence"
          >
            <ShieldAlert className="h-6 w-6" />
          </button>

          {/* Emergency overlay */}
          {emergencyOpen && (
            <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/60 p-4 sm:items-center">
              <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
                <button
                  onClick={() => { setEmergencyOpen(false); setCalmMode(false) }}
                  className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Fermer</span>
                </button>

                {!calmMode ? (
                  <>
                    <div className="mb-5 text-center">
                      <ShieldAlert className="mx-auto mb-2 h-10 w-10 text-destructive" />
                      <h2 className="text-lg font-bold text-foreground">
                        Tu as besoin d{"'"}aide ?
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Tu n{"'"}es pas seul(e). Choisis ce qui te convient.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Call trusted person */}
                      <a
                        href={`tel:${trustedContact.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-4 rounded-xl bg-primary/10 p-4 transition-colors hover:bg-primary/20"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                          <Phone className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Appeler {trustedContact.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {trustedContact.relationship} - {trustedContact.phone}
                          </p>
                        </div>
                      </a>

                      {/* Call 3114 */}
                      <a
                        href="tel:3114"
                        className="flex items-center gap-4 rounded-xl bg-destructive/10 p-4 transition-colors hover:bg-destructive/20"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive">
                          <Phone className="h-5 w-5 text-destructive-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Appeler le 3114
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Prevention du suicide - 24h/24, gratuit
                          </p>
                        </div>
                      </a>

                      {/* Calm mode */}
                      <button
                        onClick={startCalm}
                        className="flex w-full items-center gap-4 rounded-xl bg-lyra-teal-light p-4 text-left transition-colors hover:bg-primary/10"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <Wind className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Je veux juste me calmer
                          </p>
                          <p className="text-xs text-muted-foreground">
                            60 secondes de respiration guidee
                          </p>
                        </div>
                      </button>

                      {/* Link to full safety page */}
                      <Link
                        href="/patient/safety"
                        onClick={() => setEmergencyOpen(false)}
                        className="flex w-full items-center gap-4 rounded-xl bg-secondary p-4 text-left transition-colors hover:bg-secondary/80 mt-2"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background border border-border">
                          <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Ouvrir le Kit de Secours Complet
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Outils d'ancrage, autres contacts...
                          </p>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  /* Calm breathing mode */
                  <div className="text-center">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">
                      Respire doucement - {breathTimer}s restantes
                    </p>
                    <div className="my-6 flex items-center justify-center">
                      <div
                        className={cn(
                          "flex h-36 w-36 items-center justify-center rounded-full border-4 transition-all duration-1000",
                          breathPhase === "inhale" && "scale-110 border-primary bg-primary/10",
                          breathPhase === "hold" && "scale-110 border-lyra-lavender bg-lyra-lavender-light",
                          breathPhase === "exhale" && "scale-90 border-lyra-coral bg-lyra-coral-light",
                        )}
                      >
                        <div>
                          <p className={cn(
                            "text-3xl font-bold",
                            breathPhase === "inhale" && "text-primary",
                            breathPhase === "hold" && "text-lyra-lavender",
                            breathPhase === "exhale" && "text-lyra-coral",
                          )}>
                            {breathPhase === "inhale" ? "Inspire" : breathPhase === "hold" ? "Retiens" : "Expire"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => { setCalmMode(false); setEmergencyOpen(false) }}
                    >
                      Terminer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
