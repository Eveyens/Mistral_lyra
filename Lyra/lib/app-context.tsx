"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  type Role, type User, type CheckIn, type JournalEntry, type VoiceSession,
  type Goal, type WeeklyReport, type Resource, type PositiveMessage,
  type GPSEntry, type MedicationEntry, type TrustedContact,
  demoUsers, checkIns, journalEntries, voiceSessions, goals,
  weeklyReport, resources, positiveMessages as demoPositiveMessages,
  gpsEntry as demoGps, medications as demoMedications, trustedContact as demoTrustedContact,
} from "./demo-data"

interface ConsentSettings {
  doctorShare: boolean
  parentShare: boolean
  parentDetailLevel: "global" | "detailed"
}

interface AppState {
  currentUser: User
  role: Role
  setRole: (role: Role) => void
  patients: User[]
  checkIns: CheckIn[]
  journalEntries: JournalEntry[]
  voiceSessions: VoiceSession[]
  goals: Goal[]
  weeklyReport: WeeklyReport
  resources: Resource[]
  consent: ConsentSettings
  setConsent: (consent: ConsentSettings) => void
  addCheckIn: (checkIn: Omit<CheckIn, "id">) => void
  updateCheckIn: (id: string, updates: Partial<CheckIn>) => void
  todayCheckIn: CheckIn | null
  positiveMessages: PositiveMessage[]
  setPositiveMessages: React.Dispatch<React.SetStateAction<PositiveMessage[]>>
  gps: GPSEntry
  setGps: React.Dispatch<React.SetStateAction<GPSEntry>>
  medications: MedicationEntry[]
  setMedications: React.Dispatch<React.SetStateAction<MedicationEntry[]>>
  trustedContact: TrustedContact
  setTrustedContact: React.Dispatch<React.SetStateAction<TrustedContact>>
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("patient")
  const [consent, setConsent] = useState<ConsentSettings>({
    doctorShare: true,
    parentShare: true,
    parentDetailLevel: "global",
  })
  const [allCheckIns, setAllCheckIns] = useState(checkIns)
  const [posMessages, setPosMessages] = useState(demoPositiveMessages)
  const [gps, setGps] = useState(demoGps)
  const [meds, setMeds] = useState(demoMedications)
  const [trusted, setTrusted] = useState(demoTrustedContact)

  const currentUser = role === "patient" ? demoUsers[0] : role === "doctor" ? demoUsers[2] : demoUsers[3]
  const patients = demoUsers.filter((u) => u.role === "patient")

  const today = new Date().toISOString().split("T")[0]
  const todayCheckIn = allCheckIns.find((c) => c.patientId === "p1" && c.date === today) || null

  const addCheckIn = (checkIn: Omit<CheckIn, "id">) => {
    const newCheckIn = { ...checkIn, id: `ci-new-${Date.now()}` }
    setAllCheckIns((prev) => [...prev, newCheckIn])
  }

  const updateCheckIn = (id: string, updates: Partial<CheckIn>) => {
    setAllCheckIns((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        setRole,
        patients,
        checkIns: allCheckIns,
        journalEntries,
        voiceSessions,
        goals,
        weeklyReport,
        resources,
        consent,
        setConsent,
        addCheckIn,
        updateCheckIn,
        todayCheckIn,
        positiveMessages: posMessages,
        setPositiveMessages: setPosMessages,
        gps,
        setGps,
        medications: meds,
        setMedications: setMeds,
        trustedContact: trusted,
        setTrustedContact: setTrusted,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be inside AppProvider")
  return ctx
}
