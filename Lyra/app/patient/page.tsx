"use client"

import { useApp } from "@/lib/app-context"
import { PatientDashboard } from "@/components/app/patient/dashboard"
import { DoctorDashboard } from "@/components/app/doctor/dashboard"
import { ParentDashboard } from "@/components/app/parent/dashboard"

export default function AppHome() {
  const { role } = useApp()

  if (role === "doctor") return <DoctorDashboard />
  if (role === "parent") return <ParentDashboard />
  return <PatientDashboard />
}
