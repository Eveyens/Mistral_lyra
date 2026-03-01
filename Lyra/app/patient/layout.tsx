"use client"

import { AppProvider } from "@/lib/app-context"
import { AppShell } from "@/components/app/app-shell"
import { useEffect } from "react"
import { useApp } from "@/lib/app-context"

function RoleSetter({ role, children }: { role: "patient" | "doctor" | "parent", children: React.ReactNode }) {
  const { setRole } = useApp()
  useEffect(() => {
    setRole(role)
  }, [role, setRole])
  return <>{children}</>
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <RoleSetter role="patient">
        <AppShell>{children}</AppShell>
      </RoleSetter>
    </AppProvider>
  )
}
